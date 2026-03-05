import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ResumesPage from "./pages/resume/ResumesPage";
import ResumeBuilderPage from "./pages/resume/ResumeBuilderPage";
import AIToolsPage from "./pages/ai/AIToolsPage";
import JobTrackerPage from "./pages/jobs/JobTrackerPage";
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <MainLayout>{children}</MainLayout>;
};

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
            />
            <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
            />
            <Route
                path="/dashboard"
                element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
                path="/resume"
                element={<ProtectedRoute><ResumesPage /></ProtectedRoute>}
            />
            <Route
                path="/resume/new"
                element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>}
            />
            <Route
                path="/resume/:id"
                element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>}
            />
            <Route
                path="/ai"
                element={<ProtectedRoute><AIToolsPage /></ProtectedRoute>}
            />
            <Route
                path="/jobs"
                element={<ProtectedRoute><JobTrackerPage /></ProtectedRoute>}
            />
            <Route
                path="/"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
            />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: "#1e293b",
                            color: "#f8fafc",
                            borderRadius: "12px",
                        },
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;