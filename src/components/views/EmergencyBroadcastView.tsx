import React, { useState } from "react";
import { ActiveView } from "../../types";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

interface EmergencyBroadcastViewProps {
  setActiveView: (view: ActiveView) => void;
  onNewAlertCreated?: (
    title: string,
    category: string,
    details: string
  ) => void;
}

export const EmergencyBroadcastView: React.FC<
  EmergencyBroadcastViewProps
> = ({ setActiveView, onNewAlertCreated }) => {

  const [selectedCategory, setSelectedCategory] = useState("Medical");
  const [details, setDetails] = useState("");
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(false);

  const categories = [
    { name: "Medical", icon: "medical_services" },
    { name: "Fire", icon: "local_fire_department" },
    { name: "Violence", icon: "shield_with_heart" },
    { name: "Natural Disaster", icon: "storm" },
    { name: "Suspicious Activity", icon: "visibility" },
    { name: "Need Assistance", icon: "handshake" },
    { name: "Custom / Other", icon: "edit_note" },
  ];

 const handleBroadcast = async () => {
  console.log("Emergency button clicked");

  if (!selectedCategory) {
    alert("Please select an emergency category first.");
    return;
  }

    setBroadcasting(true);

    try {

      await addDoc(collection(db, "emergencies"), {
        title: `${selectedCategory} Emergency`,
        category: selectedCategory,
        details: details,
        gpsEnabled: gpsEnabled,
        status: "active",
        createdAt: serverTimestamp(),
      });


      setBroadcasting(false);
      setBroadcastDone(true);


      onNewAlertCreated?.(
        `${selectedCategory} Emergency`,
        selectedCategory,
        details
      );


      setTimeout(() => {
        setActiveView("alerts");
      }, 1500);


    } catch (error) {

      console.error("Firebase error:", error);
      alert("Failed to send emergency alert");
      setBroadcasting(false);

    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-28">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Emergency Broadcast
        </h1>

        <p className="text-sm text-gray-600">
          Send emergency alerts through CampusMesh.
        </p>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">

        {categories.map((cat)=>(
          <button
            key={cat.name}
            onClick={()=>setSelectedCategory(cat.name)}
            className={`p-4 rounded-xl border ${
              selectedCategory === cat.name
              ? "bg-red-200 border-red-600"
              : "bg-white"
            }`}
          >

            <span className="material-symbols-outlined">
              {cat.icon}
            </span>

            <p className="text-sm mt-2">
              {cat.name}
            </p>

          </button>
        ))}

      </div>

      {/* Detailed Input & Settings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-outline-variant rounded-2xl p-4 shadow-xs">
            <label className="block font-label text-xs font-bold text-[#424654] mb-2" htmlFor="emergency-details">
              Details (Location within building, number of people, etc.)
            </label>
            <textarea
              id="emergency-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide quick context..."
              rows={4}
              className="w-full bg-[#f7f9fb] border border-outline-variant rounded-xl p-3 font-body text-sm focus:ring-2 focus:ring-[#940010] focus:border-transparent outline-none resize-none transition-all text-[#191c1e]"
            />
          </div>

          <div className="flex items-center justify-between bg-white border border-outline-variant rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dae2ff] flex items-center justify-center text-[#0040a1]">
                <span className="material-symbols-outlined">my_location</span>
              </div>
              <div>
                <p className="font-label text-sm font-bold text-[#191c1e]">Broadcast GPS Location</p>
                <p className="font-label text-xs text-[#424654]">Attaches precise coordinates to alert</p>
              </div>
            </div>
            <button
              onClick={() => setGpsEnabled(!gpsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                gpsEnabled ? 'bg-[#0040a1]' : 'bg-[#e0e3e5]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  gpsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Right Side: Hub Status Card */}
        <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-xs flex flex-col">
          <div className="h-44 relative bg-slate-900">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM-A5ThGFk5DJKKkZ_4W67lBNWn1ggKLeELzj0QHQW91mSPXSzCWkOV87t34ID_kn_4yUzDR9d-89itccU8lR5iciojgJOjPXnOPek3Av0qvp4nntGFAraKEb7Kq2eMsLPKZl9D-ZeTpapn0KU_T3blD4WUrW88LJkuWCYZ0bmq84U69cypIdiZOw0-griGgy4_TVwUZ2dyyN17HshXurPRXHww7dh9wK6gF8pR0fh1rHZV_Z5vSXjP_muy0FwSuHgk3AhuGqLibhk" 
              alt="Mesh broadcast map" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#006a6a] rounded-full animate-pulse"></span>
              <span className="text-white font-label text-xs font-bold shadow-xs">Mesh Online (14 Peers)</span>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h3 className="font-label text-sm font-bold text-[#191c1e]">Current Hub: West Quad A</h3>
            <div className="flex gap-1.5 py-1">
              <div className="h-1.5 flex-1 bg-[#006a6a] rounded-full"></div>
              <div className="h-1.5 flex-1 bg-[#006a6a] rounded-full"></div>
              <div className="h-1.5 flex-1 bg-[#006a6a] rounded-full"></div>
              <div className="h-1.5 flex-1 bg-[#e0e3e5] rounded-full"></div>
            </div>
            <p className="font-label text-xs text-[#424654]">Signal strength is optimal for instant mesh broadcast.</p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="sticky bottom-20 md:static">
        <button

          onClick={()=>setGpsEnabled(!gpsEnabled)}

          className="px-4 py-2 bg-blue-500 text-white rounded"

        >

          {gpsEnabled ? "ON" : "OFF"}

        </button>

      </div>




      <button

        onClick={handleBroadcast}

        disabled={broadcasting || broadcastDone}

        className="w-full bg-red-600 text-white p-5 rounded-xl font-bold"

      >

        {broadcastDone
        ? "Alert Sent"
        : broadcasting
        ? "Sending..."
        : "Broadcast Emergency"}

      </button>


    </div>
  );
};