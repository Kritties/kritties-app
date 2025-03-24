export function Button({
  children,
  onClick,
}: Readonly<{ children: React.ReactNode; onClick?: (e: React.FormEvent) => void }>) {
  return (
    <button
      className="h-[2.5rem] bg-pink-200 border-4 border-pink-300 hover:border-pink-400 active:border-pink-500 focus:outline-none transition shadow-md flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
