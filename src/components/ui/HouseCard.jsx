import Tag from "./Tag";

export default function HouseCard() {
  return (
    <div className="bg-white rounded-lg">
      {/* house image */}
      <div className="h-64 rounded-lg overflow-hidden">
        <img
          alt="image"
          src="https://a0.muscache.com/im/pictures/cecf5232-1a50-4de5-a4fd-d2fa9aadc431.jpg?im_w=720"
          className="w-full h-full object-cover rounded-lg scale-100 transition-all duration-200 ease-out hover:scale-105"
        />
      </div>

      {/* house info */}
      <div className="py-2">
        <Tag label="Casa" />
        <h4 className="text-black font-bold text-base">Casa bonita</h4>
        <p className="font-light text-sm">A 65 kilometros de distancia</p>
        <p className="font-bold">
          $234.535 CLP <span className="font-light">mes</span>
        </p>
      </div>
    </div>
  );
}
