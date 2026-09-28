import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  UserPlus,
  Mail,
  User,
  KeyRound,
  Sparkles,
  Lock,
  Globe,
  Camera
} from 'lucide-react';

export const CreateAccountModal = () => {
  const { isCreateAccountOpen, setIsCreateAccountOpen, registerFreshAccount } = useApp();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  ];

  if (!isCreateAccountOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) return;

    registerFreshAccount({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      bio: bio.trim(),
      avatar: selectedAvatar,
      isPrivate
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#eef2f7] rounded-3xl p-6 md:p-8 neu-card border border-white/70 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setIsCreateAccountOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full neu-button flex items-center justify-center text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-[0_6px_18px_rgba(37,99,235,0.35)]">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Create Fresh Account</h2>
          <p className="text-xs text-slate-400 mt-1">
            Join the Neumorphic Social Messaging network with your custom profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Selector */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="relative">
              <img
                src={selectedAvatar}
                alt="Selected avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                <Camera className="w-3 h-3" />
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              {sampleAvatars.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(url)}
                  className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                    selectedAvatar === url ? 'border-blue-500 scale-110 shadow-md' : 'border-white opacity-70'
                  }`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Beniwal Nancy"
                className="w-full px-3.5 py-2.5 text-xs bg-[#eef2f7] rounded-xl neu-inset outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Username / Handle</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. @nancy_b"
                className="w-full px-3.5 py-2.5 text-xs bg-[#eef2f7] rounded-xl neu-inset outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-xs bg-[#eef2f7] rounded-xl neu-inset outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-[#eef2f7] rounded-xl neu-inset outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Bio / Status</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="What do you do? (e.g. Designer, Explorer ✨)"
              className="w-full px-3.5 py-2.5 text-xs bg-[#eef2f7] rounded-xl neu-inset outline-none text-slate-800"
            />
          </div>

          {/* Account Privacy Choice */}
          <div className="p-3.5 bg-white/70 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">Select Account Privacy:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                  !isPrivate ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-slate-200 text-slate-500'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs">Public Account</span>
                <span className="text-[10px] opacity-80">Anyone can discover & message</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                  isPrivate ? 'border-purple-500 bg-purple-50 text-purple-700 font-bold' : 'border-slate-200 text-slate-500'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span className="text-xs">Private Account</span>
                <span className="text-[10px] opacity-80">Only approved friends</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:shadow-lg transition-all"
          >
            Create My Account & Start Messaging
          </button>
        </form>
      </div>
    </div>
  );
};
