import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <h2 className="text-3xl font-display font-bold text-[#FEBD59] mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-lg text-white/80 font-body">
                We're sorry for the inconvenience. Please try refreshing the page.
              </p>
            </div>

            {this.state.error && process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
                <p className="text-sm font-mono text-red-400 break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="mt-8 px-8 py-3 bg-[#FEBD59] text-black font-semibold rounded-full hover:bg-[#FFBC4C] transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
