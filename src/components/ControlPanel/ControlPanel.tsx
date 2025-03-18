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
  // us-fires
  const [brightnessValue, setBrightnessValue] = useState<number>(0);
  const [confidenceValue, setConfidenceValue] = useState<number>(0);
  // us-wildfires
  const [dailyAcres, setDailyAcres] = useState<number>(0);
  const [percentContained, setPercentContained] = useState<number>(0);

  const [firesChecked, setFiresChecked] = useState<boolean>(true);
  const [wildfiresChecked, setWildfiresChecked] = useState<boolean>(true);

  // REDUX
  const mapLoaded = useSelector(mapLoadedSelector);

  useEffect(() => {
    if (mapLoaded) {
      MapController.updateFeatureFilter(brightnessValue, confidenceValue, percentContained, dailyAcres);
      // MapController.updateFeatureFilter(brightnessValue, confidenceValue);
    }
  }, [brightnessValue, confidenceValue, mapLoaded, percentContained, dailyAcres]);

  const layerToggle = (callback: React.Dispatch<React.SetStateAction<boolean>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    callback((prev: boolean) => !prev);
    mapLoaded ? MapController.updateLayerVisibility(e.target.id) : '';
  }

  return (
    <div className='control-panel' id='control-panel'>
      <div className='control-container'>

        <div className='control-container'>
          <input
            type='checkbox'
            id='us-fires'
            checked={firesChecked}
            onChange={layerToggle(setFiresChecked)}
          >
          </input>  US Fires Layer
          <br /><br />
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

        <br /><br />
        <div className='control-container'>
          <input
            type='checkbox'
            id='us-wildfires'
            checked={wildfiresChecked}
            onChange={layerToggle(setWildfiresChecked)}
          >
          </input>  Wildfires Layer - ESRI
          <br /><br />
          <p>Acres Greater Than {dailyAcres}</p>
          <input
            type='range'
            min='0'
            max='50000'
            step='1000'
            value={dailyAcres}
            id='dailyAcres'
            onChange={(e) => setDailyAcres(e.target.valueAsNumber)}
          />
        </div>
        <div className='control-container'>
          <p>% Contained Greater Than {percentContained}</p>
          <input
            type='range'
            min='0'
            max='100'
            value={percentContained}
            id='percentContained'
            onChange={(e) => setPercentContained(e.target.valueAsNumber)}
          />
        </div>

      </div>
    </div >
  );
};

export default ControlPanel;
