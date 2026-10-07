import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AfroBox Uncaught Error:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-[#FBF7EE] p-6 text-[#23211E] font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#E6DCBF] text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#1D3E2F]">
                AfroBox Encountered an Issue
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                A browser environment setting or cached asset interrupted the experience. Tap below to reload safely.
              </p>
              {this.state.error?.message && (
                <div className="p-3 bg-stone-100 rounded-xl text-left text-xs text-stone-500 font-mono overflow-x-auto max-h-24">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#1D3E2F] hover:bg-[#142C21] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload App</span>
              </button>
              <button
                onClick={this.handleResetCache}
                className="py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer transition-all"
              >
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
