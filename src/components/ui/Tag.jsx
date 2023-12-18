export default function Tag({ label = "" }) {
  return (
    <span className="px-2 py-1 text-[10px] text-white bg-orange-500 shadow shadow-orange-500/20 rounded-md">
      {label}
    </span>
  );
}
