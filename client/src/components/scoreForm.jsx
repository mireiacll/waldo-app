import { useState } from 'react';
import axios from 'axios';

function ScoreForm({ elapsed, onSaved }) {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await axios.post('/api/scores', { playerName: name }, { withCredentials: true });
    setSubmitted(true);
    onSaved();
  };

  if (submitted) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        background: 'white', padding: 32, borderRadius: 8,
        textAlign: 'center', minWidth: 300
      }}>
        <h2>🎉 You found everyone!</h2>
        <p>Your time: <strong>{elapsed} seconds</strong></p>
        <p>Enter your name for the leaderboard:</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Your name"
          style={{ padding: 8, fontSize: 16, width: '100%', marginBottom: 12 }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '10px 24px', fontSize: 16, cursor: 'pointer' }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ScoreForm;