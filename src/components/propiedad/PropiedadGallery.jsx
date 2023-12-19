export default function PropiedadGallery({ images }) {
  return (
    <div className="grid sm:grid-rows-3 sm:grid-cols-2 md:grid-rows-1 md:grid-cols-4 gap-2 rounded-md">
      {images?.map((item, index) => (
        <div
          key={index}
          className={`${
            index === 0
              ? "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2"
              : "row-span-auto"
          }`}
        >
          <img
            alt="room"
            src={item}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
