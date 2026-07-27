import React, { useState } from 'react';
import { ActiveView, UserProfile } from '../../types';

interface LoginViewProps {
  setActiveView: (view: ActiveView) => void;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const LoginView: React.FC<LoginViewProps> = ({ setActiveView, setUser }) => {
  const [email, setEmail] = useState('student@university.edu');
  const [password, setPassword] = useState('••••••••');
  const [remember, setRemember] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: 'John Doe',
      studentId: '2024-84921',
      email: email || 'student@university.edu',
      department: 'Computer Science',
      year: '3rd Year',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwVqtJp1xd4JTDV2rF39Rz8iexJ5BPKPgVrrS6kFRoxOkDmhLmiU7kB06i-UIBKtoXKz4MQpzGePyfaz7s3toKEF-ewLCGGRS3OZR2yMpd66HwNCxglTfiAGeG4sderzPIE15Tt1J43C150_Ah7Qs42bXz9wfSbZlShSRzhhQNPps6vBGzDYEV0iPei_uOlzvka0ThsEomYIxXvECuEA-OxA41wDYSbe1FIlask4XOEUiieB-j0sXTpujbokcS72pUcfaPWBYNXY_8',
      isLoggedIn: true,
    });
    setActiveView('home');
  };

  const handleEmergencySOS = () => {
    setActiveView('emergency');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-outline-variant overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Column - Hero Visual */}
        <div className="relative hidden md:block min-h-[500px]">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbw-HezDG-f4Z0Podan406j35yB03Lvlg1h23ojpireFNB2rVsxE1b-gu3jd2FPqG4PNsRKI8pFmNY76rx6mUEvqtxneFcRKp8ZEr0dTMWAcgBleSDWSvHBAgT3b7-kT9skAwGclp8zIGBIvgz7PeDMA3R7J92T9oOjD0Ul-j1n8KPTz6k9ITcS5VrTP8IsUOLZP8YbiXAZnK-VRcBFBB174hxRHJjSCSjY0Scz6iiX7MIib-YlAVLQAZm_2veszv8iVWpYTPeI7CK" 
            alt="Campus Dusk" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001847] via-[#0040a1]/60 to-transparent"></div>
          
          <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/20">
              <span className="material-symbols-outlined text-[#90efef] fill-1">hub</span>
              <span className="font-headline font-bold text-sm">CampusMesh</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-headline text-2xl font-bold leading-tight">Decentralized. Resilient. Campus First.</h2>
              <p className="font-body text-xs text-[#dae2ff] leading-relaxed">
                Stay connected even during power and internet outages using peer-to-peer mesh technology.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="p-6 md:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2 md:hidden">
                <span className="material-symbols-outlined text-[#0040a1] text-2xl fill-1">hub</span>
                <span className="font-headline font-bold text-lg text-[#0040a1]">CampusMesh</span>
              </div>
              <h1 className="font-headline text-2xl md:text-3xl font-bold text-[#191c1e] mb-1">Welcome Back</h1>
              <p className="font-body text-sm text-[#424654]">Sign in to access your local mesh node.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* University Email */}
              <div className="space-y-1">
                <label className="font-label text-xs font-bold text-[#424654]" htmlFor="login-email">
                  University Email
                </label>
                <div className="relative flex items-center group">
                  <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                    alternate_email
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full h-13 pl-12 pr-4 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] outline-none transition-all text-[#191c1e]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="font-label text-xs font-bold text-[#424654]" htmlFor="login-password">
                  Password
                </label>
                <div className="relative flex items-center group">
                  <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                    lock
                  </span>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-13 pl-12 pr-4 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] outline-none transition-all text-[#191c1e]"
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 cursor-pointer font-body text-[#424654]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-[#0040a1] focus:ring-[#0040a1]"
                  />
                  Remember node credentials
                </label>
                <a href="#" className="font-label font-bold text-[#0040a1] hover:underline">
                  Forgot?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full h-13 bg-[#0056d2] text-white hover:bg-[#0040a1] active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-2 font-headline text-base font-bold shadow-md mt-2"
              >
                <span>Sign In</span>
                <span className="material-symbols-outlined">login</span>
              </button>
            </form>

            {/* Emergency SOS Access */}
            <div className="mt-6 pt-6 border-t border-outline-variant">
              <button
                onClick={handleEmergencySOS}
                className="w-full h-12 bg-[#ffdad6] text-[#93000a] hover:bg-[#ffb4ab] border border-[#ba1a1a]/30 font-label text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span className="material-symbols-outlined text-base fill-1">warning</span>
                <span>Emergency Mode (No Login Required)</span>
              </button>
            </div>
          </div>

          {/* Don't have account */}
          <div className="mt-8 text-center pt-4 border-t border-outline-variant">
            <p className="font-label text-xs text-[#424654]">
              Don't have a mesh node profile?{' '}
              <button
                onClick={() => setActiveView('register')}
                className="text-[#0040a1] font-bold ml-1 hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
