import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4 font-mono text-sm text-red-900 break-all overflow-auto">
          <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-4">{this.state.error?.message}</p>
          <pre className="bg-red-100 p-2 rounded">{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
