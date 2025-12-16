import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardTab = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/leaderboard');
        setLeaders(res.data);
      } catch (err) {
        console.error('❌ Error fetching leaderboard:', err.message);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 max-w-xl mx-auto text-center">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">Leaderboard</h2>

      <div className="bg-zinc-800 p-4 rounded-xl shadow-md text-left">
        {leaders.length === 0 ? (
          <p className="text-gray-400">No data yet...</p>
        ) : (
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr>
                <th className="text-left">Rank</th>
                <th className="text-left">Wallet</th>
                <th className="text-right">Profit (SOL)</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((entry, idx) => (
                <tr key={idx} className="border-t border-zinc-700">
                  <td>{idx + 1}</td>
                  <td className="break-all">{entry.wallet}</td>
                  <td className="text-right">{entry.profit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTab;
