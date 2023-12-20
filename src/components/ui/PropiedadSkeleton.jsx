export default function PropiedadSkeleton() {
  return (
    <div role="status" className="w-full animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg dark:bg-gray-200 w-full mb-4" />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-200 w-40  mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5" />
    </div>
  );
}
