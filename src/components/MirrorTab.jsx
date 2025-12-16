import React, { useState } from 'react';
import axios from 'axios';

const MirrorTab = () => {
  const [walletInput, setWalletInput] = useState('');
  const [mirrorList, setMirrorList] = useState([]);

  const handleAddMirror = async () => {
    if (!walletInput) return;

    try {
      await axios.post('http://localhost:4000/api/mirror', {
        user: 'YOUR_MAIN_WALLET_ADDRESS',
        mirrorWallet: walletInput,
      });

      setMirrorList((prev) => [...prev, walletInput]);
      setWalletInput('');
      console.log('✅ Mirror wallet added:', walletInput);
    } catch (err) {
      console.error('❌ Error adding mirror wallet:', err.message);
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto text-center">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">Mirror Trading</h2>

      <div className="flex space-x-2 justify-center mb-4">
        <input
          type="text"
          value={walletInput}
          onChange={(e) => setWalletInput(e.target.value)}
          placeholder="Wallet address to mirror"
          className="w-2/3 px-4 py-2 rounded bg-zinc-800 text-white"
        />
        <button
          onClick={handleAddMirror}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          Add Mirror
        </button>
      </div>

      <div className="text-left">
        <h3 className="text-cyan-200 mb-2">Mirrored Wallets:</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          {mirrorList.map((wallet, idx) => (
            <li key={idx}>🔄 {wallet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MirrorTab;
