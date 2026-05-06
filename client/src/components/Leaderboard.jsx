import { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('/api/scores').then(res => setScores(res.data));
  }, []);

  return (
    <div style={{ marginTop: 32, maxWidth: 400, margin: '0 auto' }}>
      <h2>🏆 Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ccc' }}>#</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ccc' }}>Name</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ccc' }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => (
            <tr key={score._id}>
              <td style={{ padding: 8 }}>{i + 1}</td>
              <td style={{ padding: 8 }}>{score.playerName}</td>
              <td style={{ padding: 8 }}>{score.timeSeconds}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;