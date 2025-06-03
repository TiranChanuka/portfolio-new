"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log("3D Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-foreground/10">
            <div className="text-center">
              <p className="text-foreground/70 mb-2">
                3D visualization temporarily unavailable
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="text-sm text-blue-500 hover:text-blue-400 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
