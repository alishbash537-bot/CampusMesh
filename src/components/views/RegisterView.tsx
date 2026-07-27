import React, { useState } from 'react';
import { ActiveView, UserProfile } from '../../types';

interface RegisterViewProps {
  setActiveView: (view: ActiveView) => void;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ setActiveView, setUser }) => {
  const [fullName, setFullName] = useState('John Doe');
  const [studentId, setStudentId] = useState('2024-84921');
  const [email, setEmail] = useState('doe.j@university.edu');
  const [department, setDepartment] = useState('cs');
  const [year, setYear] = useState('3');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');
  const [terms, setTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: fullName || 'John Doe',
      studentId: studentId || '2024-84921',
      email: email || 'doe.j@university.edu',
      department: department === 'cs' ? 'Computer Science' : 'Engineering',
      year: `${year}rd Year`,
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwVqtJp1xd4JTDV2rF39Rz8iexJ5BPKPgVrrS6kFRoxOkDmhLmiU7kB06i-UIBKtoXKz4MQpzGePyfaz7s3toKEF-ewLCGGRS3OZR2yMpd66HwNCxglTfiAGeG4sderzPIE15Tt1J43C150_Ah7Qs42bXz9wfSbZlShSRzhhQNPps6vBGzDYEV0iPei_uOlzvka0ThsEomYIxXvECuEA-OxA41wDYSbe1FIlask4XOEUiieB-j0sXTpujbokcS72pUcfaPWBYNXY_8',
      isLoggedIn: true,
    });
    setActiveView('home');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col justify-between p-4 md:p-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#90efef]/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#dae2ff]/30 rounded-full blur-3xl pointer-events-none"></div>

      <main className="flex-grow flex items-center justify-center relative z-10 py-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-outline-variant overflow-hidden">
          {/* Form Banner Header */}
          <div className="bg-[#0040a1] p-6 md:p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="font-headline text-2xl md:text-3xl font-bold mb-1">Join the Network</h1>
              <p className="font-body text-sm text-[#dae2ff]/90">
                Secure mesh communication for your university campus.
              </p>
            </div>
            <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
              <span className="material-symbols-outlined text-[100px]">person_add</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="md:col-span-2 space-y-1">
              <label className="font-label text-xs font-bold text-[#424654]" htmlFor="full_name">
                Full Name
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                  person
                </span>
                <input
                  id="full_name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-13 pl-12 pr-4 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Student ID */}
            <div className="space-y-1">
              <label className="font-label text-xs font-bold text-[#424654]" htmlFor="student_id">
                Student ID
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                  badge
                </span>
                <input
                  id="student_id"
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="2024-XXXXX"
                  className="w-full h-13 pl-12 pr-4 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* University Email */}
            <div className="space-y-1">
              <label className="font-label text-xs font-bold text-[#424654]" htmlFor="email">
                University Email
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                  alternate_email
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doe.j@university.edu"
                  className="w-full h-13 pl-12 pr-4 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="font-label text-xs font-bold text-[#424654]" htmlFor="department">
                Department
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                  account_balance
                </span>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-13 pl-12 pr-8 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] outline-none appearance-none transition-all text-[#191c1e]"
                >
                  <option value="cs">Computer Science</option>
                  <option value="eng">Engineering</option>
                  <option value="bus">Business School</option>
                  <option value="med">Medicine</option>
                  <option value="arts">Faculty of Arts</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#737785] pointer-events-none">
                  arrow_drop_down
                </span>
              </div>
            </div>

            {/* Year of Study */}
            <div className="space-y-1">
              <label className="font-label text-xs font-bold text-[#424654]" htmlFor="year">
                Year of Study
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                  school
                </span>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full h-13 pl-12 pr-8 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] outline-none appearance-none transition-all text-[#191c1e]"
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="grad">Graduate Studies</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#737785] pointer-events-none">
                  arrow_drop_down
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="font-label text-xs font-bold text-[#424654]" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                  lock
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-13 pl-12 pr-4 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] outline-none transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="font-label text-xs font-bold text-[#424654]" htmlFor="confirm_password">
                Confirm Password
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-[#737785] group-focus-within:text-[#0040a1]">
                  lock_reset
                </span>
                <input
                  id="confirm_password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-13 pl-12 pr-4 bg-[#f7f9fb] border border-outline-variant rounded-xl font-body text-sm focus:ring-2 focus:ring-[#0040a1] outline-none transition-all"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="md:col-span-2 flex items-start gap-2 py-2">
              <input
                id="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded border-outline-variant text-[#0040a1] focus:ring-[#0040a1] cursor-pointer"
              />
              <label className="font-body text-xs text-[#424654] leading-normal" htmlFor="terms">
                I agree to the{' '}
                <a href="#" className="text-[#0040a1] font-bold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#0040a1] font-bold hover:underline">
                  Privacy Policy
                </a>{' '}
                regarding university mesh data sharing.
              </label>
            </div>

            {/* Create Account Button */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full h-14 bg-[#0056d2] text-white hover:bg-[#0040a1] active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-2 font-headline text-base font-bold shadow-md"
              >
                <span>Create Account</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Login Redirect Footer */}
          <div className="bg-[#eceef0] px-6 py-4 border-t border-outline-variant text-center">
            <p className="font-label text-xs text-[#424654]">
              Already have an account?{' '}
              <button
                onClick={() => setActiveView('login')}
                className="text-[#0040a1] font-bold ml-1 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Security Badges */}
      <footer className="py-4 text-center opacity-70 relative z-10">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-[#424654]">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <p className="font-label text-xs">End-to-end encrypted campus network</p>
        </div>
        <p className="font-label text-[11px] text-[#424654]">© 2024 University Systems. CampusMesh v2.4.0</p>
      </footer>
    </div>
  );
};
