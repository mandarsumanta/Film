import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary-bg flex items-center justify-center px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Error Icon */}
            <motion.div 
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
                Something Went Wrong
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                We encountered an unexpected error while loading the page. 
                This isn't the kind of plot twist we were going for.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <summary className="cursor-pointer text-red-400 font-medium mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-xs text-red-300 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                variant="primary" 
                onClick={this.handleReload}
                className="w-full sm:w-auto"
              >
                Reload Page
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => window.location.href = '/'}
                className="w-full sm:w-auto"
              >
                Go to Homepage
              </Button>
            </motion.div>

            {/* Additional Help */}
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-text-secondary text-sm">
                If this problem persists, please{' '}
                <a 
                  href="/contact" 
                  className="text-accent-gold hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/contact';
                  }}
                >
                  contact us
                </a>{' '}
                and let us know what you were trying to do.
              </p>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

