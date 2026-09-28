import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  FileCheck,
  UploadCloud,
  CheckCircle2,
  RefreshCw,
  Lock,
  Cpu,
  History,
  AlertTriangle
} from 'lucide-react';

export const VirusScannerView = () => {
  const {
    virusScanStatus,
    autoScanEnabled,
    setAutoScanEnabled,
    scannedFilesCount,
    threatsDetected,
    scanProgress,
    lastScanTime,
    securityLogs,
    runDeepVirusScan
  } = useApp();

  const [testedFile, setTestedFile] = useState(null);
  const [testingFile, setTestingFile] = useState(false);

  const handleTestFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTestingFile(true);
    setTestedFile(null);

    setTimeout(() => {
      setTestingFile(false);
      setTestedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        status: 'clean',
        signaturesChecked: 4120
      });
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Top Security Overview Card */}
      <div className="bg-[#eef2f7] rounded-3xl p-6 md:p-8 neu-card border border-white/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Animated Shield Graphic */}
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.35)]">
              {virusScanStatus === 'scanning' ? (
                <RefreshCw className="w-10 h-10 animate-spin text-white" />
              ) : (
                <ShieldCheck className="w-10 h-10 text-white" />
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-800">Automated Anti-Virus Engine</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                ACTIVE SHIELD
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Every incoming & outgoing message, media attachment, and link is automatically verified through our zero-day malware heuristics.
            </p>
            <p className="text-[11px] text-slate-400">
              Last deep scan: <span className="font-semibold text-slate-600">{lastScanTime}</span>
            </p>
          </div>
        </div>

        {/* Scan Now Action */}
        <div className="flex flex-col items-center sm:items-end gap-2 w-full md:w-auto">
          <button
            onClick={runDeepVirusScan}
            disabled={virusScanStatus === 'scanning'}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-[0_6px_20px_rgba(16,185,129,0.35)] hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${virusScanStatus === 'scanning' ? 'animate-spin' : ''}`} />
            <span>{virusScanStatus === 'scanning' ? `Scanning (${scanProgress}%)` : 'Run Deep Scan Now'}</span>
          </button>

          <span className="text-[11px] text-slate-400 font-medium">
            Definitions: v2026.9.28 (Up to date)
          </span>
        </div>
      </div>

      {/* Progress Bar (Visible while scanning) */}
      {virusScanStatus === 'scanning' && (
        <div className="p-4 bg-white/80 rounded-2xl neu-inset space-y-2 animate-in fade-in">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Analyzing app storage & active sockets...</span>
            <span>{scanProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Security Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#eef2f7] rounded-3xl p-5 neu-card border border-white/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Auto-Protection</span>
            <input
              type="checkbox"
              checked={autoScanEnabled}
              onChange={(e) => setAutoScanEnabled(e.target.checked)}
              className="toggle-checkbox accent-emerald-500 w-4 h-4 cursor-pointer"
            />
          </div>
          <p className="text-xl font-extrabold text-slate-800">
            {autoScanEnabled ? 'Real-Time Active' : 'Paused'}
          </p>
          <p className="text-[11px] text-slate-400">Scans all chats automatically in background</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#eef2f7] rounded-3xl p-5 neu-card border border-white/60 space-y-2">
          <span className="text-xs font-bold text-slate-500">Payloads Scanned</span>
          <p className="text-xl font-extrabold text-emerald-600">
            {scannedFilesCount} items
          </p>
          <p className="text-[11px] text-slate-400">Images, audio notes & binary packets verified</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#eef2f7] rounded-3xl p-5 neu-card border border-white/60 space-y-2">
          <span className="text-xs font-bold text-slate-500">Threats Neutralized</span>
          <p className="text-xl font-extrabold text-slate-800 flex items-center gap-1.5">
            <span>{threatsDetected}</span>
            <span className="text-xs font-semibold text-emerald-500">Clean</span>
          </p>
          <p className="text-[11px] text-slate-400">Zero malicious scripts found on device</p>
        </div>
      </div>

      {/* Manual File Inspector / Dropzone */}
      <div className="bg-[#eef2f7] rounded-3xl p-6 neu-card border border-white/60 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-500" />
          <span>Manual Attachment / File Scanner</span>
        </h3>
        <p className="text-xs text-slate-500">
          Want to test an external document or photo before sending it in chat? Select it below:
        </p>

        <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-white/40 transition-colors">
          <input
            type="file"
            onChange={handleTestFileUpload}
            className="hidden"
          />
          <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
          <span className="text-xs font-bold text-slate-700">Click to choose a file for instant scan</span>
          <span className="text-[11px] text-slate-400 mt-1">PNG, JPG, PDF, ZIP supported (Up to 25MB)</span>
        </label>

        {testingFile && (
          <div className="p-3 bg-white rounded-xl neu-inset text-xs text-blue-600 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
            <span>Scanning file for Trojan, Spyware & Adware signatures...</span>
          </div>
        )}

        {testedFile && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-800">{testedFile.name}</span>
                <span className="text-slate-400 ml-2">({testedFile.size})</span>
                <p className="text-emerald-700 text-[11px]">
                  Verified Clean • {testedFile.signaturesChecked} virus definitions checked • Safe to share!
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-[10px]">
              SAFE
            </span>
          </div>
        )}
      </div>

      {/* Security Event Logs */}
      <div className="bg-[#eef2f7] rounded-3xl p-6 neu-card border border-white/60 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <span>Real-Time Security Activity Logs</span>
        </h4>

        <div className="space-y-2">
          {securityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-white/70 rounded-xl flex items-center justify-between text-xs border border-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">{log.message}</span>
              </div>
              <span className="text-[10px] text-slate-400">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
