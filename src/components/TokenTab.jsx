import React, { useEffect, useState } from 'react';
import { buyToken } from '../services/buyService';

const TokenTab = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_pump_score') {
        setTokens((prev) => [data.token, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  const handleBuy = (token) => {
    buyToken(token);
  };

  return (
    <div className="space-y-4">
      {tokens.map((token, index) => (
        <div key={index} className="bg-zinc-800 p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-cyan-400">{token.symbol}</p>
              <p className="text-sm text-gray-400">{token.token_address}</p>
              <p className="text-sm">
                Score: <span className="text-green-400 font-bold">{token.ai_pump_score}</span> (Conf: {token.confidence})
              </p>
              <p className="text-xs italic text-gray-500">{token.reason}</p>
            </div>
            <button
              onClick={() => handleBuy(token)}
              className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenTab;
