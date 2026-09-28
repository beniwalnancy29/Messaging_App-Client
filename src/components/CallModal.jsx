import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  ShieldCheck,
  Maximize2,
  Minimize2
} from 'lucide-react';

export const CallModal = () => {
  const {
    activeCall,
    endCall,
    isMicMuted,
    setIsMicMuted,
    isCameraOff,
    setIsCameraOff,
    currentUser
  } = useApp();

  const [callDuration, setCallDuration] = useState(0);
  const [callState, setCallState] = useState('ringing'); // 'ringing' | 'connected'
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  // Transition from ringing to connected after 2.5 seconds
  useEffect(() => {
    if (!activeCall) return;

    setCallState('ringing');
    setCallDuration(0);

    const ringTimeout = setTimeout(() => {
      setCallState('connected');
    }, 2400);

    return () => clearTimeout(ringTimeout);
  }, [activeCall]);

  // Timer for connected call
  useEffect(() => {
    let timer;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  if (!activeCall) return null;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isVideo = activeCall.type === 'video';
  const contact = activeCall.contact;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#eef2f7] rounded-[36px] overflow-hidden neu-card border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.35)] flex flex-col justify-between min-h-[520px]">
        {/* Top Call Info */}
        <div className="p-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {isVideo ? 'Apna Video Call' : 'Apna Voice Call'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>End-to-End Encrypted</span>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
          {isVideo ? (
            /* Video Call Display */
            <div className="relative w-full h-72 rounded-3xl overflow-hidden bg-slate-900 shadow-inner flex items-center justify-center">
              {/* Remote Contact Video stream simulation */}
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-full h-full object-cover opacity-85 scale-105 filter blur-[0.5px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

              {/* Status overlay */}
              <div className="absolute top-4 left-4 text-white">
                <h4 className="text-sm font-bold drop-shadow-md">{contact.name}</h4>
                <p className="text-[11px] text-white/80">
                  {callState === 'ringing' ? 'Ringing...' : formatDuration(callDuration)}
                </p>
              </div>

              {/* Local User PIP View */}
              <div className="absolute bottom-4 right-4 w-24 h-32 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-slate-800">
                {!isCameraOff ? (
                  <img
                    src={currentUser.avatar}
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-white">
                    <VideoOff className="w-5 h-5 text-slate-400" />
                    <span className="text-[9px] text-slate-400 mt-1">Cam Off</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Audio Call Display */
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Pulsing Avatar Rings */}
              <div className="relative">
                {callState === 'connected' && (
                  <>
                    <span className="absolute -inset-4 rounded-full bg-blue-400/20 animate-ping duration-1000" />
                    <span className="absolute -inset-8 rounded-full bg-blue-400/10 animate-pulse duration-1000" />
                  </>
                )}
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800">{contact.name}</h3>
                <p className="text-xs font-semibold text-blue-600 mt-1">
                  {callState === 'ringing' ? (
                    <span className="animate-pulse">Ringing...</span>
                  ) : (
                    <span>Connected • {formatDuration(callDuration)}</span>
                  )}
                </p>
              </div>

              {/* Audio frequency wave simulation */}
              {callState === 'connected' && (
                <div className="flex items-center gap-1.5 h-6">
                  {[40, 75, 55, 90, 60, 100, 70, 45, 80, 50].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Call Controls */}
        <div className="p-6 pb-8 bg-[#e8ecf2] border-t border-[#d8e0ea] flex items-center justify-center gap-4 z-20">
          {/* Mute Mic */}
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
            className={`w-12 h-12 rounded-full flex items-center justify-center neu-button transition-all ${
              isMicMuted ? 'bg-rose-100 text-rose-600' : 'text-slate-700'
            }`}
          >
            {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Video (for video call) */}
          {isVideo && (
            <button
              onClick={() => setIsCameraOff(!isCameraOff)}
              title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
              className={`w-12 h-12 rounded-full flex items-center justify-center neu-button transition-all ${
                isCameraOff ? 'bg-rose-100 text-rose-600' : 'text-slate-700'
              }`}
            >
              {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          )}

          {/* Speaker Toggle */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            title={isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
            className={`w-12 h-12 rounded-full flex items-center justify-center neu-button transition-all ${
              !isSpeakerOn ? 'text-slate-400' : 'text-blue-600'
            }`}
          >
            {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={endCall}
            title="End Call"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(244,63,94,0.45)] hover:scale-105 active:scale-95 transition-all"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
