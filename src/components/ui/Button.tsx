interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Button({ children, className = "", isLoading = false, ...props }: ButtonProps) {
  return (
    <button
      className={`
        w-full max-w-xs mx-auto block 
        bg-blue-500 text-white py-3 px-6 rounded-lg 
        transition-colors 
        disabled:opacity-50 disabled:cursor-not-allowed 
        hover:bg-blue-600 
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
