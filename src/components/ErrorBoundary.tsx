import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * @interface Props
 * @property {ReactNode} children - The child components to render.
 * @property {ReactNode} [fallback] - An optional fallback component to render on error.
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * @interface State
 * @property {boolean} hasError - Indicates if an error has been caught.
 * @property {Error} [error] - The caught error.
 */
interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * A React component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * @extends Component<Props, State>
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  /**
   * Updates state so the next render will show the fallback UI.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {State} The new state.
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Logs the error to an error reporting service.
   *
   * @param {Error} error - The error that was caught.
   * @param {ErrorInfo} errorInfo - An object with a `componentStack` key.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  /**
   * Resets the error boundary state, allowing a re-render of the child components.
   */
  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  /**
   * Renders the fallback UI if an error has been caught, otherwise renders the children.
   *
   * @returns {ReactNode} The rendered component.
   */
  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleRetry} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-card rounded border text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;