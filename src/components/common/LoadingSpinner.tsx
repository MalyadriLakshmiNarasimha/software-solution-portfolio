export default function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-10 h-10 border-2 border-primary-200 border-t-accent-500 rounded-full animate-spin dark:border-primary-700 dark:border-t-accent-400" />
    </div>
  );
}
