import { useState, useEffect } from 'react';
import axios from 'axios';
import GameImage from './components/GameImage';
import ScoreForm from './components/ScoreForm';
import Leaderboard from './components/Leaderboard';
import waldoImage from './assets/waldoimg.jpeg';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [elapsed, setElapsed] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [gameKey, setGameKey] = useState(0); // changing this forces GameImage to fully reset

  const startGame = async () => {
    const [charsRes] = await Promise.all([
      axios.get('/api/characters'),
      axios.post('/api/start', {}, { withCredentials: true })
    ]);
    setCharacters(charsRes.data.map(c => c.name));
    setFoundCharacters([]);
    setGameComplete(false);
    setElapsed(null);
    setShowLeaderboard(false);
    setGameKey(prev => prev + 1); // forces GameImage to remount and clear markers
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleCorrectFind = async (characterName) => {
    const newFound = [...foundCharacters, characterName];
    setFoundCharacters(newFound);

    if (newFound.length === characters.length) {
      const res = await axios.get('/api/elapsed', { withCredentials: true });
      setElapsed(res.data.elapsed);
      setGameComplete(true);
    }
  };

  const handleScoreSaved = () => {
    setShowLeaderboard(true);
  };

  return (
    <div className="app">
      <h1>Where's Waldo?</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 8 }}>
        <p style={{ margin: 0 }}>
          Find: {characters.filter(c => !foundCharacters.includes(c)).join(', ') || '🎉 All found!'}
        </p>
        <button onClick={startGame} style={{ padding: '6px 16px', cursor: 'pointer' }}>
          🔄 Restart
        </button>
      </div>

      <GameImage
        key={gameKey}
        imageSrc={waldoImage}
        characters={characters}
        foundCharacters={foundCharacters}
        onCorrectFind={handleCorrectFind}
      />

      {gameComplete && !showLeaderboard && (
        <ScoreForm elapsed={elapsed} onSaved={handleScoreSaved} />
      )}

      {showLeaderboard && (
        <>
          <Leaderboard />
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button
              onClick={startGame}
              style={{ padding: '10px 24px', fontSize: 16, cursor: 'pointer' }}
            >
              🎮 Play Again
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;