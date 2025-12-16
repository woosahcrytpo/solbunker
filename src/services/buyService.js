import axios from 'axios';

export const buyToken = async (token) => {
  try {
    console.log(`🛒 [BUY] Buying token: ${token.symbol} at ${token.token_address}`);

    await axios.post('http://localhost:4000/api/auto-buy', {
      tokenAddress: token.token_address,
      symbol: token.symbol,
      ai_pump_score: token.ai_pump_score,
    });

    console.log('✅ [BUY] Auto-buy request sent.');
  } catch (err) {
    console.error('❌ [BUY] Error buying token:', err.message);
  }
};
