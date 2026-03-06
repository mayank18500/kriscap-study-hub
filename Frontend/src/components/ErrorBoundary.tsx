import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  /** Optional custom fallback. Receives resetErrorBoundary() to let user retry. */
  fallback?: (props: { error: Error; reset: () => void }) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to the console – swap for a real error reporter (Sentry etc.) in prod
    console.error("[ErrorBoundary] Uncaught error:", error, errorInfo);
  }

  /** Reset boundary state without a full page reload */
  private resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      // Allow caller to supply a custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.resetErrorBoundary,
        });
      }

      const isDev = import.meta.env.DEV;

      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm p-4 overflow-auto">
          <div className="max-w-lg w-full p-8 bg-white rounded-2xl border border-red-100 shadow-2xl text-center space-y-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold text-slate-900">
                Something went wrong
              </h1>
              <p className="text-slate-500 text-sm">
                An unexpected error occurred on this page. You can try again or
                reload if the problem persists.
              </p>
            </div>

            {/* Only show technical details in development */}
            {isDev && (
              <div className="text-left bg-slate-50 rounded-xl p-4 border border-slate-100 overflow-auto max-h-48">
                <p className="font-mono text-xs text-red-600 font-bold mb-2">
                  {this.state.error.message}
                </p>
                <pre className="font-mono text-[10px] text-slate-500 whitespace-pre-wrap">
                  {this.state.error.stack}
                </pre>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={this.resetErrorBoundary}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-white text-slate-600 rounded-xl font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-colors active:scale-95"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
