import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import MapController from '../../controllers/MapController';

// Redux
import { mapLoaded as mapLoadedSelector } from './../../store/slices/mapSlice';

// Styles
import './ControlPanel.scss';

const ControlPanel = () => {
  // LOCAL STATE
  const [brightnessValue, setBrightnessValue] = useState<number>(0);
  const [confidenceValue, setConfidenceValue] = useState<number>(0);
  const [layerToggleID, setLayerToggleID] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);
  // REDUX
  const mapLoaded = useSelector(mapLoadedSelector);

  useEffect(() => {
    if (mapLoaded) {
      MapController.updateFeatureFilter(brightnessValue, confidenceValue);
    }
  }, [brightnessValue, confidenceValue, mapLoaded]);

  const layerToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(prev => !prev);
    mapLoaded ? MapController.updateLayerVisibility(e.target.id) : '';
  }

  return (
    <div className='control-panel' id='control-panel'>
      <div className='control-container'>
        <p>Brightness Greater Than {brightnessValue}</p>
        <input
          type='range'
          min='0'
          max='11'
          step='0.1'
          value={brightnessValue}
          id='brightnessRange'
          onChange={(e) => setBrightnessValue(e.target.valueAsNumber)}
        />
      </div>
      <div className='control-container'>
        <p>Confidence Greater Than {confidenceValue}</p>
        <input
          type='range'
          min='0'
          max='100'
          value={confidenceValue}
          id='confidenceRange'
          onChange={(e) => setConfidenceValue(e.target.valueAsNumber)}
        />
      </div>
      <div className='control-container'>
        <input
          type='checkbox'
          id='us-fires'
          checked={checked}
          onChange={(e) => layerToggle(e)}
        >
        </input>  US Fires Layer
      </div>
    </div>
  );
};

export default ControlPanel;
