import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { authAPI } from '../services/api';
import { X, Lock, Mail, User, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, loginSuccess, setIsDemoMode } = useChat();

  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'otp'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  if (!isAuthOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        loginSuccess(res.data.user, res.data.token);
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        setInfoMessage('OTP generated! (Check server console or email)');
        setMode('otp');
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authAPI.verifyOTP({
        email: formData.email,
        otp: formData.otp
      });

      if (res.data.success) {
        loginSuccess(res.data.user, res.data.token);
      } else {
        setError(res.data.message || 'Verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setIsDemoMode(true);
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#eef2f7] rounded-3xl p-6 sm:p-8 neu-card relative border border-white/60">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 neu-button"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-[0_6px_18px_rgba(37,99,235,0.35)]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Verify Email OTP'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Login to connect with friends & real-time socket'
              : mode === 'register'
              ? 'Sign up to start messaging instantly'
              : `Enter the OTP sent to ${formData.email}`}
          </p>
        </div>

        {/* Error / Alert banner */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-600 text-xs">
            {infoMessage}
          </div>
        )}

        {/* Form Body */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1 mb-1 block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#eef2f7] text-slate-700 rounded-xl neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#eef2f7] text-slate-700 rounded-xl neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-[0_6px_18px_rgba(37,99,235,0.4)] hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1 mb-1 block">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="johndoe"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#eef2f7] text-slate-700 rounded-xl neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1 mb-1 block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#eef2f7] text-slate-700 rounded-xl neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#eef2f7] text-slate-700 rounded-xl neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-[0_6px_18px_rgba(37,99,235,0.4)] hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Continue with OTP'}
            </button>
          </form>
        )}

        {mode === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1 mb-1 block">Enter 6-digit OTP</label>
              <input
                type="text"
                name="otp"
                maxLength={6}
                value={formData.otp}
                onChange={handleChange}
                required
                placeholder="123456"
                className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold bg-[#eef2f7] text-slate-800 rounded-xl neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm shadow-[0_6px_18px_rgba(16,185,129,0.4)] hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Complete'}
            </button>
          </form>
        )}

        {/* Toggle Mode */}
        <div className="mt-5 pt-4 border-t border-slate-200 text-center space-y-2">
          {mode === 'login' ? (
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}

          {/* Quick Demo Mode fallback */}
          <div>
            <button
              type="button"
              onClick={handleUseDemo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white/60 px-3 py-1.5 rounded-full neu-button mt-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Use Interactive Demo Mode (Instant)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
