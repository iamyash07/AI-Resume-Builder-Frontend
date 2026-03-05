import { Component } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-white flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10">
                            <FiAlertTriangle className="text-4xl text-gray-300 mx-auto mb-4" />
                            <h2 className="text-lg font-semibold text-black mb-2">
                                Something went wrong
                            </h2>
                            <p className="text-sm text-gray-400 mb-6">
                                An unexpected error occurred. Please try refreshing the page.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition mx-auto"
                            >
                                <FiRefreshCw className="text-sm" />
                                Refresh Page
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