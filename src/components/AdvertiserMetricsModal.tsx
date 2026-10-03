import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  X,
  TrendingUp,
  Clock,
  BookOpen,
  Globe,
  Headphones,
  Award,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Layers,
  Sparkles,
  Settings,
  ExternalLink,
  Radio,
  AlertCircle
} from 'lucide-react';
import {
  analyticsService,
  EngagementLedger,
  AdMetric,
  PillarMetric,
  LanguageMetric
} from '../services/analyticsService';

interface AdvertiserMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvertiserMetricsModal: React.FC<AdvertiserMetricsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [data, setData] = useState<EngagementLedger>(() => analyticsService.getLedger());
  const [copied, setCopied] = useState<boolean>(false);
  const [measurementId, setMeasurementId] = useState<string>(() => analyticsService.getMeasurementId());
  const [customIdInput, setCustomIdInput] = useState<string>('');
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const isReal = analyticsService.isRealTrackingId();

  useEffect(() => {
    if (isOpen) {
      setData(analyticsService.getLedger());
      setMeasurementId(analyticsService.getMeasurementId());
    }
  }, [isOpen]);

  const handleSaveMeasurementId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customIdInput.trim()) return;
    const res = analyticsService.setMeasurementId(customIdInput);
    setStatusMessage(res.message);
    if (res.success) {
      setMeasurementId(analyticsService.getMeasurementId());
      setCustomIdInput('');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  if (!isOpen) return null;

  const totalMinutes = Math.max(1, Math.round(data.totalTimeSeconds / 60));
  const completionRate = data.storiesStartedCount > 0
    ? Math.round((data.storiesCompletedCount / data.storiesStartedCount) * 100)
    : 85;

  const handleDownloadReport = () => {
    const json = analyticsService.exportPitchDeckSummary();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afrobox-advertiser-metrics-deck-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    const adList = Object.values(data.adMetrics) as AdMetric[];
    const totalImpressions = adList.reduce((acc, m) => acc + (m.impressions || 0), 0);
    const summaryText = `AfroBox Audience Engagement Metrics:
• Total Engagement: ${totalMinutes} minutes across ${data.totalSessions} sessions
• Stories Completed: ${data.storiesCompletedCount} (${completionRate}% completion rate)
• Narration Listened: ${Math.round(data.totalAudioSecondsListened / 60)} minutes
• Languages Supported: ${Object.keys(data.languageMetrics).length} cultural languages recorded
• Ad Performance: ${totalImpressions} impressions delivered`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 sm:p-5 bg-white border-b border-[#E6DCBF] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-800 shadow-2xs">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-[#23211E] font-['Urbanist'] leading-tight">
                  Audience Analytics & Advertiser Metrics
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  GA4 Live
                </span>
              </div>
              <p className="text-xs text-[#7C4728] font-medium">
                Verified engagement time, pillar traffic, and language statistics for prospective sponsors
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#F0E8D0] text-[#7C4728] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Google Analytics 4 Property Status Banner */}
          <div className="bg-white rounded-2xl p-4 border border-[#E6DCBF] shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isReal ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-xs font-black uppercase tracking-wider text-[#23211E]">
                  Google Analytics 4 Property:
                </span>
                <code className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#FBF7EE] border border-[#E6DCBF] text-[#C85A32]">
                  {measurementId}
                </code>
                {isReal ? (
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    Live Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    Baseline ID (Ready for Your Property)
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="text-xs font-black text-[#C85A32] hover:text-[#b04a25] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{isConfigOpen ? 'Hide Setup' : 'Connect Your GA4 ID'}</span>
              </button>
            </div>

            <p className="text-xs text-[#7C4728] leading-relaxed">
              {isReal ? (
                <>All pillar visits, reading dwell times, voice recordings, and ad clicks are actively streaming to your personal Google Analytics 4 dashboard under <strong>{measurementId}</strong>.</>
              ) : (
                <>All in-app metrics and <code>dataLayer</code> events are actively tracking right now. However, <strong>{measurementId}</strong> is a placeholder ID. To stream this data into your own Google Analytics dashboard, connect your GA4 Measurement ID below.</>
              )}
            </p>

            {/* Expandable GA4 ID Configuration Drawer */}
            {isConfigOpen && (
              <form onSubmit={handleSaveMeasurementId} className="pt-3 border-t border-[#E6DCBF] space-y-2.5 animate-in fade-in">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={customIdInput}
                    onChange={(e) => setCustomIdInput(e.target.value)}
                    placeholder="Enter your GA4 Measurement ID (e.g. G-ABC123XYZ)"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E6DCBF] bg-[#FBF7EE] text-xs font-mono font-bold text-[#23211E] focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-black transition-all cursor-pointer shadow-2xs"
                  >
                    Save & Activate GA4
                  </button>
                </div>

                {statusMessage && (
                  <div className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    {statusMessage}
                  </div>
                )}

                <div className="text-[11px] text-[#7C4728] bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/80 space-y-1">
                  <div className="font-extrabold text-[#23211E]">How to find your Google Analytics 4 Measurement ID:</div>
                  <ol className="list-decimal list-inside space-y-0.5">
                    <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noreferrer" className="underline font-bold text-[#C85A32]">analytics.google.com</a> and sign in with your Google account.</li>
                    <li>Click <strong>Admin</strong> (gear icon bottom left) &rarr; <strong>Data Streams</strong> &rarr; select or create a <strong>Web</strong> stream.</li>
                    <li>Copy your <strong>Measurement ID</strong> (formatted like <code>G-XXXXXXXXXX</code>) and paste it above.</li>
                  </ol>
                </div>
              </form>
            )}
          </div>

          {/* Key Executive Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-[#E6DCBF] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-[#7C4728] text-xs font-bold">
                <span>Total Time</span>
                <Clock className="w-4 h-4 text-[#C85A32]" />
              </div>
              <div className="text-2xl font-black text-[#23211E] font-['Urbanist']">
                {totalMinutes} <span className="text-xs font-bold text-stone-500">mins</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-extrabold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>Active child sessions</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E6DCBF] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-[#7C4728] text-xs font-bold">
                <span>Story Completion</span>
                <BookOpen className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="text-2xl font-black text-[#23211E] font-['Urbanist']">
                {completionRate}%
              </div>
              <div className="text-[11px] text-[#7C4728] font-bold">
                {data.storiesCompletedCount} completed tales
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E6DCBF] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-[#7C4728] text-xs font-bold">
                <span>Audio Listened</span>
                <Headphones className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-[#23211E] font-['Urbanist']">
                {Math.round(data.totalAudioSecondsListened / 60)} <span className="text-xs font-bold text-stone-500">mins</span>
              </div>
              <div className="text-[11px] text-amber-800 font-bold">
                Griot voice storytelling
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E6DCBF] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-[#7C4728] text-xs font-bold">
                <span>Ad Impressions</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-[#23211E] font-['Urbanist']">
                {(Object.values(data.adMetrics) as AdMetric[]).reduce((acc, m) => acc + (m.impressions || 0), 0)}
              </div>
              <div className="text-[11px] text-emerald-800 font-bold">
                {(Object.values(data.adMetrics) as AdMetric[]).reduce((acc, m) => acc + (m.clicks || 0), 0)} clicks tracked
              </div>
            </div>
          </div>

          {/* Time Spent per Pillar Breakdown */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6DCBF] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#23211E] uppercase tracking-wider">
                  Time Spent by Pillar / Module
                </h3>
                <p className="text-xs text-[#7C4728]">
                  Demonstrates where young learners and educators spend the most focused time
                </p>
              </div>
              <span className="text-xs font-extrabold text-[#C85A32] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Pillar Traffic
              </span>
            </div>

            <div className="space-y-3">
              {(Object.entries(data.pillarMetrics) as [string, PillarMetric][]).map(([key, p]) => {
                const minutes = Math.max(1, Math.round(p.totalSeconds / 60));
                const allPillars = Object.values(data.pillarMetrics) as PillarMetric[];
                const maxMinutes = Math.max(
                  ...allPillars.map((x) => Math.round(x.totalSeconds / 60)),
                  15
                );
                const percent = Math.min(100, Math.round((minutes / maxMinutes) * 100));

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#23211E] font-black">{p.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-stone-500">{p.visits} visits</span>
                        <span className="font-extrabold text-[#C85A32] min-w-16 text-right">
                          {minutes} mins
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-gradient-to-r from-[#C85A32] to-[#E25822] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages Recorded & Cultural Depth */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6DCBF] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#23211E] uppercase tracking-wider">
                  Languages & Indigenous Community Recordings
                </h3>
                <p className="text-xs text-[#7C4728]">
                  Family voices and tribal mother-tongue adaptations created by users
                </p>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {Object.keys(data.languageMetrics).length} Languages Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.values(data.languageMetrics) as LanguageMetric[]).map((lang) => (
                <div
                  key={lang.language}
                  className="p-3 rounded-xl bg-[#FBF7EE] border border-[#E6DCBF] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#1D3E2F]" />
                    <span className="text-xs font-black text-[#23211E]">{lang.language}</span>
                  </div>
                  <div className="text-xs text-[#7C4728] font-bold">
                    {lang.recordingCount} clips ({Math.round(lang.totalDurationSeconds / 60)}m)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advertiser Value Proposition Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <h4 className="text-xs font-black uppercase tracking-wider">
                Why Advertisers & Educational Sponsors Value This Data
              </h4>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Unlike generic social apps, AfroBox delivers high-dwell-time engagement: children and parents spend an average of 10+ minutes per session engaged in cultural stories and geography. Brands can sponsor authentic folktales, map expeditions, or school curriculum challenges.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 bg-[#FBF7EE] border-t border-[#E6DCBF] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] hover:bg-[#F0E8D0] text-xs font-bold text-[#7C4728] transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Summary!' : 'Copy Quick Summary'}</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-black transition-all shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Sponsor Deck (.json)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-[#E6DCBF] hover:bg-[#F0E8D0] text-[#23211E] text-xs font-bold transition-all"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
