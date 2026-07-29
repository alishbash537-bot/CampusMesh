// src/services/bluetoothService.ts
//
// REAL Web Bluetooth integration — this connects to actual nearby BLE
// peripherals using the Nordic UART Service (NUS), a de facto standard
// for BLE "serial" messaging supported by ESP32, Arduino/nRF boards,
// and many commercial BLE modules.
//
// HONESTY NOTE: a web page can only act as a BLE client/central. It can
// discover and connect to a real peripheral device, but it can NEVER
// act as a peripheral itself — so two browser tabs cannot connect to
// each other this way. To message between two real "CampusMesh nodes,"
// one side must be dedicated BLE hardware (see hardware/esp32-nus-firmware.ino).

const NUS_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const NUS_RX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // app -> device
const NUS_TX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // device -> app

export type BluetoothConnectionStatus =
  | 'idle'
  | 'requesting'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'unsupported'
  | 'error';

type MessageHandler = (message: string) => void;
type StatusHandler = (status: BluetoothConnectionStatus) => void;

class BluetoothService {
  private device: BluetoothDevice | null = null;
  private rxCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private txCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;

  private messageHandlers = new Set<MessageHandler>();
  private statusHandlers = new Set<StatusHandler>();

  isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  }

  onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onStatusChange(handler: StatusHandler) {
    this.statusHandlers.add(handler);
    return () => this.statusHandlers.delete(handler);
  }

  private emitStatus(status: BluetoothConnectionStatus) {
    this.statusHandlers.forEach((h) => h(status));
  }

  private emitMessage(message: string) {
    this.messageHandlers.forEach((h) => h(message));
  }

  /** Opens the browser's native device picker. Must be called from a real click handler. */
  async requestAndConnect(): Promise<{ deviceName: string }> {
    if (!this.isSupported()) {
      this.emitStatus('unsupported');
      throw new Error('Web Bluetooth is not supported in this browser.');
    }

    this.emitStatus('requesting');

    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [NUS_SERVICE_UUID] }],
      optionalServices: [NUS_SERVICE_UUID],
    });

    this.device.addEventListener('gattserverdisconnected', () => {
      this.emitStatus('disconnected');
    });

    this.emitStatus('connecting');

    if (!this.device.gatt) {
      throw new Error('This device does not expose a GATT server.');
    }

    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(NUS_SERVICE_UUID);

    this.rxCharacteristic = await service.getCharacteristic(NUS_RX_CHARACTERISTIC_UUID);
    this.txCharacteristic = await service.getCharacteristic(NUS_TX_CHARACTERISTIC_UUID);

    await this.txCharacteristic.startNotifications();
    this.txCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
      const target = event.target as BluetoothRemoteGATTCharacteristic;
      if (!target.value) return;
      this.emitMessage(new TextDecoder().decode(target.value));
    });

    this.emitStatus('connected');
    return { deviceName: this.device.name || 'Unknown CampusMesh Node' };
  }

  async sendMessage(text: string): Promise<void> {
    if (!this.rxCharacteristic) throw new Error('Not connected to a device.');

    const encoded = new TextEncoder().encode(text);
    // BLE writes are capped (~20 bytes without MTU negotiation) — chunk
    // longer messages so nothing silently gets truncated.
    const CHUNK_SIZE = 20;
    for (let i = 0; i < encoded.length; i += CHUNK_SIZE) {
      await this.rxCharacteristic.writeValue(encoded.slice(i, i + CHUNK_SIZE));
    }
  }

  disconnect(): void {
    if (this.device?.gatt?.connected) this.device.gatt.disconnect();
    this.device = null;
    this.rxCharacteristic = null;
    this.txCharacteristic = null;
  }
}

export const bluetoothService = new BluetoothService();