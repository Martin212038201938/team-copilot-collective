import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <Card className="border-2 border-red-300 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">
                {this.props.fallbackTitle || 'Es ist ein Fehler aufgetreten'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600 mb-4">
                Die Komponente konnte nicht korrekt geladen werden. Bitte lade die Seite neu oder kontaktiere den Support.
              </p>
              {this.state.error && (
                <details className="text-xs">
                  <summary className="cursor-pointer font-semibold mb-2">
                    Technische Details anzeigen
                  </summary>
                  <pre className="bg-white p-4 rounded border border-red-200 overflow-auto max-h-60">
                    <div className="mb-2">
                      <strong>Fehler:</strong>
                      <div className="mt-1">{this.state.error.toString()}</div>
                    </div>
                    {this.state.errorInfo && (
                      <div className="mt-4">
                        <strong>Stack Trace:</strong>
                        <div className="mt-1">{this.state.errorInfo.componentStack}</div>
                      </div>
                    )}
                  </pre>
                </details>
              )}
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Seite neu laden
              </button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
