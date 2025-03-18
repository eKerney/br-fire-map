import { RefObject } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';

// Store
import store from './../store/store';
import { setMapLoaded } from '../store/slices/mapSlice';

// Config
import { firesFeatureLayer, wildfiresFeatureLayer } from '../configs/layers.config.ts';
import LayerList from '@arcgis/core/widgets/LayerList';

export const esriMap = new Map({
  basemap: 'gray',
});


/**
 * Controller used to manage anything map related.
 */
class MapController {
  #map?: __esri.Map = esriMap;
  #mapview?: __esri.MapView;
  #mapLayers?: __esri.Layer[];
  firesLayerView: __esri.FeatureLayerView | undefined;

  /**
   * Initialize the MapView and Map
   * @param domRef - the dom element to render the map onto
   */
  initializeMap = async (domRef: RefObject<HTMLDivElement>) => {
    if (!domRef.current) {
      return;
    }

    this.#mapview = new MapView({
      map: esriMap,
      container: domRef.current,
      center: [-98.5795, 39.8283],
      constraints: {
        minScale: 25000000,
        maxScale: 10000,
      },
    });

    // Quick way to add layerList widget
    //
    // const layerList = new LayerList({
    //   view: this.#mapview
    // });
    //
    // this.#mapview.ui.add(layerList, "bottom-right");

    this.#mapview?.ui.move('zoom', 'top-right');
    this.#mapview?.ui.add(['control-panel'], 'top-right');

    this.#mapview?.when(() => {
      this.#mapLayers = [];

      // add layers to map 
      this.#mapLayers.push(firesFeatureLayer);
      esriMap?.add(firesFeatureLayer);
      this.#mapLayers.push(wildfiresFeatureLayer);
      esriMap?.add(wildfiresFeatureLayer);


      this.#mapview?.whenLayerView(firesFeatureLayer)?.then((featureLayerView) => {
        this.firesLayerView = featureLayerView;
      });

      store.dispatch(setMapLoaded(true));
    });
  };

  updateLayerVisibility = (id: string) => {
    // DOCS that may help: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#visible
    // if (this.firesLayerView) this.firesLayerView.visible = !this.firesLayerView?.visible;
    const selectedLayer = this.#mapview?.map.findLayerById(id);
    if (selectedLayer) selectedLayer.visible = !selectedLayer?.visible;
  };

  updateFeatureFilter = async (brightness: number, confidence: number) => {
    if (this.firesLayerView) {
      const where = `brightness > ${brightness} AND percent_confidence > ${confidence}`;
      this.firesLayerView.filter = new FeatureFilter({
        where: where,
      });
    }
  };

  get map() {
    return this.#map;
  }

  get mapView() {
    return this.#mapview;
  }

  get mapLayers() {
    return this.#mapLayers;
  }
}

const mapController = new MapController();

declare global {
  interface Window {
    mapController: typeof mapController;
  }
}

if (process.env.NODE_ENV === 'development') {
  window.mapController = mapController;
}

export default mapController;
