import React, { useEffect, useRef, useState } from 'react';
import { ActiveView, BluetoothMeshMessage } from '../../types';
import { bluetoothService, BluetoothConnectionStatus } from '../../services/bluetoothService';

interface BluetoothMeshViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const BluetoothMeshView: React.FC<BluetoothMeshViewProps> = ({ setActiveView }) => {
  const [status, setStatus] = useState<BluetoothConnectionStatus>('idle');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [messages, setMessages] = useState<BluetoothMeshMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [simulationMode, setSimulationMode] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const supported = bluetoothService.isSupported();

  useEffect(() => {
    const unsubStatus = bluetoothService.onStatusChange(setStatus);
    const unsubMsg = bluetoothService.onMessage((text) => {
      setMessages((prev) => [
        ...prev,
        { id: `dev-${Date.now()}`, from: 'device', text, time: nowLabel() },
      ]);
    });
    return () => {
      unsubStatus();
      unsubMsg();
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const nowLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleScanAndConnect = async () => {
    setErrorText(null);
    try {
      const { deviceName } = await bluetoothService.requestAndConnect();
      setDeviceName(deviceName);
      setSimulationMode(false);
    } catch (err) {
      // Includes the user simply cancelling the device picker — not a real error.
      setErrorText(err instanceof Error ? err.message : 'Could not connect to device.');
    }
  };

  const handleDisconnect = () => {
    bluetoothService.disconnect();
    setDeviceName(null);
    setStatus('idle');
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const outgoing: BluetoothMeshMessage = {
      id: `me-${Date.now()}`,
      from: 'me',
      text: inputText.trim(),
      time: nowLabel(),
    };
    setMessages((prev) => [...prev, outgoing]);
    const textToSend = inputText.trim();
    setInputText('');

    if (simulationMode) {
      // Clearly-labeled local echo — NOT real Bluetooth traffic.
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: `sim-${Date.now()}`, from: 'device', text: `[Simulated echo] ${textToSend}`, time: nowLabel() },
        ]);
      }, 600);
      return;
    }

    try {
      await bluetoothService.sendMessage(textToSend);
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Failed to send message.');
    }
  };

  const isConnected = status === 'connected' || simulationMode;

  return (
    <div className="px-4 pt-6 pb-32 max-w-lg mx-auto">
      {/* Back */}
      <button
        onClick={() => setActiveView('home')}
        className="flex items-center gap-1 text-[#0040a1] font-label text-sm font-semibold mb-4"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to Home
      </button>

      <h2 className="font-headline text-2xl font-bold text-[#191c1e] mb-1">Bluetooth Direct Connect</h2>
      <p className="font-body text-sm text-[#424654] mb-6">
        Connect directly to a nearby BLE device and exchange messages — no internet required.
      </p>

      {/* Browser support / limitations notice */}
      {!supported && (
        <div className="bg-[#ffdad6] border border-[#ba1a1a]/20 rounded-2xl p-4 mb-6">
          <p className="font-label text-sm font-bold text-[#93000a] mb-1">Not supported in this browser</p>
          <p className="font-body text-xs text-[#93000a]">
            Web Bluetooth requires Chrome, Edge, or Opera on Android or Desktop. It is not available on iOS
            (Safari) or Firefox on any platform. You can still try Simulated Peer mode below to preview the feature.
          </p>
        </div>
      )}

      {/* Connection card */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-outline-variant mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-label text-xs text-[#424654] uppercase tracking-wider font-bold">Status</p>
            <p className="font-headline text-lg font-bold text-[#191c1e] mt-0.5">
              {statusLabel(status, simulationMode)}
            </p>
            {deviceName && <p className="font-body text-xs text-[#424654] mt-0.5">{deviceName}</p>}
          </div>
          <span
            className={`material-symbols-outlined text-3xl ${isConnected ? 'text-[#006a6a]' : 'text-[#c3c6d6]'}`}
          >
            bluetooth_connected
          </span>
        </div>

        {!isConnected ? (
          <button
            onClick={handleScanAndConnect}
            disabled={!supported}
            className="w-full py-3 rounded-xl bg-[#0040a1] text-white font-label text-sm font-bold disabled:opacity-40 active:scale-98 transition-all"
          >
            Scan for Nearby Device
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="w-full py-3 rounded-xl bg-[#ffdad6] text-[#93000a] font-label text-sm font-bold active:scale-98 transition-all"
          >
            Disconnect
          </button>
        )}

        {errorText && <p className="font-body text-xs text-[#93000a] mt-3">{errorText}</p>}

        {/* Simulation toggle — always visibly labeled */}
        <label className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant">
          <input
            type="checkbox"
            checked={simulationMode}
            onChange={(e) => {
              setSimulationMode(e.target.checked);
              if (e.target.checked) setDeviceName('Simulated Peer (not real Bluetooth)');
              else setDeviceName(null);
            }}
          />
          <span className="font-label text-xs text-[#424654]">
            Use Simulated Peer (demo mode — no real Bluetooth traffic)
          </span>
        </label>
      </div>

      {/* Message thread */}
      {isConnected && (
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-outline-variant flex flex-col">
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto mb-3">
            {messages.length === 0 && (
              <p className="font-body text-xs text-[#424654] text-center py-6">
                No messages yet. Say hello to your connected device.
              </p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.from === 'me' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-3.5 py-2 rounded-2xl text-sm max-w-[80%] ${
                    m.from === 'me' ? 'bg-[#90efef] text-[#002020]' : 'bg-[#f2f4f6] text-[#191c1e]'
                  }`}
                >
                  {m.text}
                </div>
                <span className="font-label text-[10px] text-[#737785] mt-0.5">{m.time}</span>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-outline-variant">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-[#f2f4f6] rounded-full px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-[#006a6a] text-white flex items-center justify-center disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
      )}

      {/* Honest limitations panel */}
      <details className="mt-6 bg-[#f2f4f6] rounded-2xl p-4">
        <summary className="font-label text-xs font-bold text-[#424654] cursor-pointer">
          What's real vs. simulated here?
        </summary>
        <ul className="font-body text-xs text-[#424654] mt-3 space-y-2 list-disc pl-4">
          <li><b>Real:</b> device scanning, GATT connection, and message send/receive — all genuine Web Bluetooth API calls to an actual nearby BLE peripheral.</li>
          <li><b>Not possible in any browser:</b> two phones running CampusMesh cannot connect to each other directly — web pages can't act as a Bluetooth peripheral. One side must be dedicated hardware.</li>
          <li><b>Not implemented:</b> multi-hop relay / true mesh routing — this is a direct one-to-one link only.</li>
          <li><b>Simulated Peer mode</b> is a local echo for previewing the UI — it never sends real Bluetooth data.</li>
        </ul>
      </details>
    </div>
  );
};

function statusLabel(status: BluetoothConnectionStatus, simulated: boolean): string {
  if (simulated) return 'Connected (Simulated)';
  switch (status) {
    case 'requesting': return 'Choosing device…';
    case 'connecting': return 'Connecting…';
    case 'connected': return 'Connected';
    case 'disconnected': return 'Disconnected';
    case 'unsupported': return 'Not Supported';
    case 'error': return 'Error';
    default: return 'Not Connected';
  }
}