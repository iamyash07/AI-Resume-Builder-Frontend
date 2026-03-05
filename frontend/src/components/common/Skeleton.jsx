const Skeleton = ({ className = "" }) => (
    <div
        className={`animate-pulse bg-gray-100 rounded-xl ${className}`}
    />
);

export const DashboardSkeleton = () => (
    <div className="space-y-8 max-w-5xl">
        {/* Header */}
        <div className="border-b border-gray-100 pb-6 space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-3">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-24" />
                </div>
            ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32" />
                ))}
            </div>
        </div>

        {/* Recent Resumes */}
        <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24" />
                ))}
            </div>
        </div>
    </div>
);

export const ResumesSkeleton = () => (
    <div className="space-y-8 max-w-5xl">
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            ))}
        </div>
    </div>
);

export const JobsSkeleton = () => (
    <div className="space-y-8 max-w-5xl">
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
            ))}
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            ))}
        </div>
    </div>
);

export default Skeleton;