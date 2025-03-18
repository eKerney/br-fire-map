import { useEffect, useRef } from 'react';

// Components
import ControlPanel from '../ControlPanel/ControlPanel';

// Controllers
import MapController from '../../controllers/MapController';

// Styles
import './MapView.scss';

const MapView = () => {
  // REFS
  const mapviewEl = useRef(null);

  useEffect(() => {
    MapController.initializeMap(mapviewEl);
  }, []);

  return (
    <div className='mapview-container'>
      <div className='mapview' ref={mapviewEl} />
      <ControlPanel />
    </div>
  );
};

export default MapView;
