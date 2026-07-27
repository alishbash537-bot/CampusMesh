import React, { useState } from 'react';
import { ActiveView, AlertItem } from '../../types';
import { MOCK_ALERTS } from '../../data/mockData';

import { useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface AlertsViewProps {
  setActiveView: (view: ActiveView) => void;
  customAlerts?: AlertItem[];
}

export const AlertsView: React.FC<AlertsViewProps> = ({ setActiveView, customAlerts = [] }) => {
  const [filter, setFilter] = useState<'all' | 'high' | 'nearby'>('all');
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  const [firebaseAlerts, setFirebaseAlerts] = useState<any[]>([]);

useEffect(() => {
  const q = query(
    collection(db, "emergencies"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const alerts = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      priority: "HIGH PRIORITY",
      timeAgo: "Just now",
      description: doc.data().details || "",
      distance: "Campus",
      statusText: doc.data().status || "Active",
      category: doc.data().category,
    }));

    setFirebaseAlerts(alerts);
  });

  return () => unsubscribe();
}, []);

const allAlerts = [...firebaseAlerts, ...MOCK_ALERTS];

  const filteredAlerts = allAlerts.filter((alert) => {
    if (filter === 'high') return alert.priority === 'HIGH PRIORITY';
    if (filter === 'nearby') return alert.distance.includes('m away') && !alert.distance.includes('km');
    return true;
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-28">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="font-headline text-2xl font-bold text-[#191c1e] mb-1">Active Alerts</h2>
        <p className="font-body text-sm text-[#424654]">Real-time safety timeline for your current zone.</p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full font-label text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'all'
              ? 'bg-[#0040a1] text-white shadow-md'
              : 'bg-[#e6e8ea] text-[#424654] hover:bg-surface-variant'
          }`}
        >
          All Alerts
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-4 py-2 rounded-full font-label text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'high'
              ? 'bg-[#0040a1] text-white shadow-md'
              : 'bg-[#e6e8ea] text-[#424654] hover:bg-surface-variant'
          }`}
        >
          High Priority
        </button>
        <button
          onClick={() => setFilter('nearby')}
          className={`px-4 py-2 rounded-full font-label text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'nearby'
              ? 'bg-[#0040a1] text-white shadow-md'
              : 'bg-[#e6e8ea] text-[#424654] hover:bg-surface-variant'
          }`}
        >
          Nearby
        </button>
      </div>

      {/* Alerts Timeline */}
      <div className="relative space-y-6">
        {/* Timeline Connecting Line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#c3c6d6]/40 -z-0"></div>

        {filteredAlerts.map((item) => {
          const isHigh = item.priority === 'HIGH PRIORITY';
          const isMedium = item.priority === 'MEDIUM PRIORITY';

          return (
            <div key={item.id} className="relative flex gap-4 items-start group z-10">
              {/* Timeline Badge Node */}
              <div
                className={`mt-4 w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md border-4 border-[#f7f9fb] ${
                  isHigh
                    ? 'bg-[#ba1a1a] text-white'
                    : isMedium
                    ? 'bg-[#0040a1] text-white'
                    : 'bg-[#006a6a] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {isHigh ? 'emergency' : isMedium ? 'security' : 'notifications'}
                </span>
              </div>

              {/* Card Container */}
              <div className="flex-1 bg-white border border-outline-variant p-4 rounded-2xl shadow-xs hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`px-2.5 py-1 rounded-lg font-label text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      isHigh
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : isMedium
                        ? 'bg-[#dae2ff] text-[#0040a1]'
                        : 'bg-[#93f2f2]/50 text-[#004f4f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs fill-1">
                      {isHigh ? 'priority_high' : isMedium ? 'info' : 'stars'}
                    </span>
                    {item.priority}
                  </div>
                  <span className="font-label text-xs text-[#424654]">{item.timeAgo}</span>
                </div>

                <h3 className="font-headline text-lg font-bold text-[#191c1e] mb-1">{item.title}</h3>
                <p className="font-body text-sm text-[#424654] mb-3 leading-relaxed">{item.description}</p>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-[#424654] font-label text-xs">
                    <span className="material-symbols-outlined text-base">distance</span>
                    {item.distance}
                  </div>
                  <div className="flex items-center gap-1 text-[#006a6a] font-label text-xs font-semibold">
                    <span className="material-symbols-outlined text-base fill-1">check_circle</span>
                    {item.statusText}
                  </div>
                </div>

                {/* Optional Map / Image Preview */}
                {item.imageUrl && (
                  <div className="w-full h-40 rounded-xl mb-3 overflow-hidden border border-outline-variant">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Actions */}
                {isHigh ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setActiveView('map')}
                      className="bg-[#e6e8ea] hover:bg-surface-variant text-[#0040a1] font-label text-xs font-bold py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
                      View
                    </button>
                    <button 
                      onClick={() => setActiveView('map')}
                      className="bg-[#0040a1] hover:bg-[#003080] text-white font-label text-xs font-bold py-2 rounded-xl flex flex-col items-center justify-center gap-1 shadow-xs transition-all active:scale-95"
                    >
                      <span className="material-symbols-outlined text-lg">navigation</span>
                      Navigate
                    </button>
                    <button 
                      onClick={() => alert('Alert link copied to mesh clipboard!')}
                      className="bg-[#e6e8ea] hover:bg-surface-variant text-[#424654] font-label text-xs font-bold py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">share</span>
                      Share
                    </button>
                  </div>
                ) : isMedium ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setActiveView('map')}
                      className="bg-[#e6e8ea] hover:bg-surface-variant text-[#191c1e] font-label text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">map</span>
                      See Route
                    </button>
                    <button 
                      onClick={() => alert('Alert shared on CampusMesh channel!')}
                      className="bg-[#e6e8ea] hover:bg-surface-variant text-[#191c1e] font-label text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">share</span>
                      Share
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddedToCalendar(true)}
                    className="w-full border border-outline text-[#191c1e] font-label text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {addedToCalendar ? 'event_available' : 'event'}
                    </span>
                    {addedToCalendar ? 'Added to Calendar' : 'Add to Calendar'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    
      {/* Quick Report Alert FAB */}
      <button
  onClick={() => {
    alert("Button works!");
    setActiveView("emergency");
  }}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "80px",
    height: "80px",
    background: "red",
    color: "white",
    borderRadius: "50%",
    zIndex: 999999,
    fontSize: "40px",
    border: "5px solid yellow"
  }}
>
+
</button>

    </div>
  );
};