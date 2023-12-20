export default function Tag({ label = "Casa" }) {
  return (
    <span
      className={`px-2 py-1 text-[10px] text-white shadow rounded-md ${
        label === "Casa" && "bg-orange-500 shadow-orange-500/20"
      } ${label === "Departamento" && "bg-cyan-500 shadow-cyan-400/20"} ${
        label === "Otros" && "bg-violet-600 shadow-violet-400/20"
      }`}
    >
      {label}
    </span>
  );
}
