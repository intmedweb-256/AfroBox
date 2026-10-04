import React from 'react';
import { X, ShieldCheck, BookOpen, Globe, UserCheck, AlertCircle, Sparkles, Volume2 } from 'lucide-react';
import { Challenge } from '../../types/riddleBrain';
import { riddleBrainService } from '../../services/riddleBrainService';

interface CulturalProvenanceInspectorProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onPlayVoice?: (text: string) => void;
}

export const CulturalProvenanceInspector: React.FC<CulturalProvenanceInspectorProps> = ({
  challenge,
  isOpen,
  onClose,
  onPlayVoice
}) => {
  if (!isOpen) return null;

  const meta = riddleBrainService.getRepresentationMeta(challenge.representationMode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FBF7EE] w-full max-w-2xl rounded-3xl border-2 border-[#E6DCBF] shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 bg-[#F0E8D0] border-b border-[#E0D4B2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1D3E2F] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#23211E] font-['Urbanist'] leading-tight">
                Cultural Provenance & Rights
              </h3>
              <p className="text-[11px] sm:text-xs text-[#7C4728] line-clamp-1">
                Authentic documentation & community attribution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#7C4728] flex items-center justify-center transition-colors shrink-0 touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-sm text-[#23211E]">
          {/* Representation Mode Banner */}
          <div className={`p-4 rounded-2xl border ${meta.colorClass} space-y-1.5`}>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold">
                Representation Mode: {meta.badgeLabel}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/70">
                {meta.isTraditional ? '🌿 Authentic Tradition' : '💡 Original Pedagogical Problem'}
              </span>
            </div>
            <p className="text-xs leading-relaxed opacity-95">{meta.description}</p>
          </div>

          {/* Core Provenance Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#7C4728] block">
                Geographic Origin & Community
              </span>
              <div className="font-bold text-sm text-[#23211E] flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#E25822]" />
                <span>{challenge.country} ({challenge.region})</span>
              </div>
              <p className="text-xs text-[#5C4033]">{challenge.community}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#7C4728] block">
                Language & Vernacular
              </span>
              <div className="font-bold text-sm text-[#23211E] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#1D3E2F]" />
                <span>{challenge.language}</span>
              </div>
              {challenge.accentRegion && (
                <span className="text-[11px] font-semibold text-[#7C4728] capitalize">
                  Regional Cadence: {challenge.accentRegion.replace('-', ' ')}
                </span>
              )}
            </div>
          </div>

          {/* Traditional Performance Formula (if applicable) */}
          {challenge.traditionalContext && (
            <div className="p-4 rounded-2xl bg-[#F0E8D0] border border-[#E0D4B2] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#7C4728] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D9822B]" />
                  <span>Call-and-Response Oral Performance</span>
                </span>
                {challenge.traditionalContext.openingFormula && onPlayVoice && (
                  <button
                    onClick={() =>
                      onPlayVoice(
                        `${challenge.traditionalContext?.openingFormula} ${challenge.traditionalContext?.responseFormula}`
                      )
                    }
                    className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-white text-[#7C4728] hover:bg-[#FAF3E0]"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#E25822]" />
                    <span>Hear Chant</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-[#23211E]">
                <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D4B2]">
                  <span className="text-[#7C4728] block text-[10px]">Caller:</span>
                  <span className="text-sm font-extrabold text-[#E25822]">
                    "{challenge.traditionalContext.openingFormula}"
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D4B2]">
                  <span className="text-[#7C4728] block text-[10px]">Response:</span>
                  <span className="text-sm font-extrabold text-[#1D3E2F]">
                    "{challenge.traditionalContext.responseFormula}"
                  </span>
                </div>
              </div>
              {challenge.traditionalContext.performanceSetting && (
                <p className="text-xs text-[#5C4033] italic pt-1">
                  Setting: {challenge.traditionalContext.performanceSetting}
                </p>
              )}
            </div>
          )}

          {/* Cultural Context Narrative */}
          <div className="space-y-1.5">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#7C4728]">
              Living Cultural Context
            </h4>
            <p className="text-xs text-[#3E3832] leading-relaxed bg-white p-3.5 rounded-2xl border border-[#E6DCBF]">
              {challenge.culturalContext}
            </p>
          </div>

          {/* Source, Collector & Rights */}
          <div className="p-4 rounded-2xl bg-white border border-[#E6DCBF] space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#7C4728] flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#1D3E2F]" />
              <span>Source Documentation & Rights</span>
            </h4>

            <div className="space-y-1.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-[#F0E8D0]">
                <span className="text-[#7C4728] font-medium">Source Material:</span>
                <span className="font-semibold text-right text-[#23211E]">{challenge.source}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-[#F0E8D0]">
                <span className="text-[#7C4728] font-medium">Author / Collector:</span>
                <span className="font-semibold text-right text-[#23211E]">
                  {challenge.sourceAuthorOrCollector}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[#7C4728] font-medium">Rights Status:</span>
                <span className="font-bold text-[#1D3E2F] px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[11px]">
                  {challenge.rightsStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F0E8D0] border-t border-[#E0D4B2] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#23211E] text-white text-xs font-bold hover:bg-[#3D3833] transition-colors"
          >
            Close Provenance
          </button>
        </div>
      </div>
    </div>
  );
};
