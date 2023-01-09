import "./index.scss";
import NavHeader from "src/components/NavHeader";
import MapMarkPoint from "src/components/Map/Mark";

function Map() {
  return (
    <div id="map">
      <NavHeader title="地图找房"></NavHeader>
      <MapMarkPoint />
    </div>
  );
}

export default Map;
