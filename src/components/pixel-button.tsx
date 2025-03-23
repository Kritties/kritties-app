export default function PixelButton({
  children,
  onClick,
}: Readonly<{ children?: React.ReactNode; onClick?: () => void }>) {
  return (
    <button
      onClick={onClick}
      className="size-16 p-2 rounded-md bg-pink-300 hover:bg-pink-400 active:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition shadow-md flex items-center justify-center"
    >
      <div className="size-12 bg-pink-200 rounded-md shadow-inner flex justify-center items-center">
        {children}
      </div>
    </button>
  );
}
