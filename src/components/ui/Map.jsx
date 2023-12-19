import { useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

export default function Map({ latitude = -38.738374, longitude = -72.590627 }) {
  const mapRef = useRef(null);
  const [viewPort, setViewPort] = useState({
    latitude,
    longitude,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  });

  return (
    <ReactMapGL
      {...viewPort}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        borderRadius: "1rem",
      }}
      minZoom={5}
      maxZoom={15}
      ref={(instance) => (mapRef.current = instance)}
      onMove={(e) => setViewPort(e.viewState)}
    >
      <Marker latitude={latitude} longitude={longitude} anchor="bottom">
        <FontAwesomeIcon
          icon={faLocationPin}
          size="lg"
          className="text-red-500"
        />
      </Marker>
    </ReactMapGL>
  );
}
