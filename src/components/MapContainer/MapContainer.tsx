import DeckGL from "@deck.gl/react/typed";
import { Map } from "react-map-gl";
import maplibregl from "maplibre-gl";

const initialMapView = {
  latitude: 0,
  longitude: 0,
  zoom: 2,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

const basemapStyle =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

export function MapContainer() {
  return (
    <DeckGL initialViewState={initialMapView} controller={true}>
      <Map
        reuseMaps
        mapLib={maplibregl}
        mapStyle={basemapStyle}
        styleDiffing={true}
        attributionControl={false}
      />
    </DeckGL>
  );
}
