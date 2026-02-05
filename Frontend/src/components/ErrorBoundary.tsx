import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
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
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white p-4 overflow-auto">
          <div className="max-w-2xl w-full p-6 bg-red-50 rounded-xl border border-red-200">
            <h1 className="text-2xl font-bold text-red-900 mb-4">Something went wrong</h1>
            <div className="bg-white p-4 rounded border border-red-100 overflow-auto max-h-[60vh]">
                <p className="font-mono text-red-600 font-bold mb-2">{this.state.error?.message}</p>
                <pre className="font-mono text-xs text-slate-600 whitespace-pre-wrap">
                    {this.state.error?.stack}
                </pre>
            </div>
            <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
                Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
