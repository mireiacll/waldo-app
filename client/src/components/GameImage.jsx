import { useState } from 'react';
import axios from 'axios';
import TargetingBox from './TargetingBox';
import CharacterMarker from './CharacterMarker';

function GameImage({ imageSrc, characters, foundCharacters, onCorrectFind }) {
  const [targetBox, setTargetBox] = useState(null); // { x, y, xPct, yPct }
  const [markers, setMarkers] = useState([]);        // [{ x, y, name }]
  const [message, setMessage] = useState('');

  const handleImageClick = (e) => {
    // If a targeting box is already open, close it instead
    if (targetBox) {
      setTargetBox(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    // Pixel position relative to the image — used to position the targeting box on screen
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Percentage position — this is what we send to the backend
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    setTargetBox({ x, y, xPct, yPct });
    setMessage('');
  };

  const handleCharacterSelect = async (characterName) => {
    try {
        const res = await axios.post('/api/validate', {
        characterName,
        x: targetBox.xPct,
        y: targetBox.yPct
        }, { withCredentials: true });

        if (res.data.correct) {
        // Check if marker already exists before adding
        setMarkers(prev => {
            if (prev.find(m => m.name === characterName)) return prev;
            return [...prev, {
            x: res.data.position.x,
            y: res.data.position.y,
            name: characterName
            }];
        });
        setMessage(`✅ You found ${characterName}!`);
        onCorrectFind(characterName);
        } else {
        setMessage(`❌ ${characterName} isn't there, keep looking!`);
        }
    } catch (err) {
        setMessage('Something went wrong');
    }

    setTargetBox(null);
    };

  // Characters still left to find (don't show already-found ones in dropdown)
  const remainingCharacters = characters.filter(c => !foundCharacters.includes(c));

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={imageSrc}
        alt="Where's Waldo"
        onClick={handleImageClick}
        style={{ display: 'block', maxWidth: '100%', cursor: 'crosshair' }}
        draggable={false}
      />

      {/* Targeting box + dropdown shown on click */}
      {targetBox && (
        <TargetingBox
          x={targetBox.x}
          y={targetBox.y}
          characters={remainingCharacters}
          onSelect={handleCharacterSelect}
          onClose={() => setTargetBox(null)}
        />
      )}

      {/* Permanent markers for found characters */}
      {markers.map(marker => (
        <CharacterMarker
          key={marker.name}
          x={marker.x}
          y={marker.y}
          name={marker.name}
        />
      ))}

      {message && <p style={{ color: 'white', background: '#333', padding: '8px' }}>{message}</p>}
    </div>
  );
}

export default GameImage;