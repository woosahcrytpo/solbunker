const fetch = require('node-fetch');

wss.on('connection', (ws) => {
  console.log('Client connected');

  const interval = setInterval(async () => {
    try {
      const res = await fetch('https://public-api.birdeye.so/public/tokenlist?sort_by=volume_24h&sort_type=desc', {
        headers: {
          'X-API-KEY': '83f062fa-7294-4649-ba33-d510573802eb'
        }
      });

      const data = await res.json();
      const token = data.data?.tokens?.[0]; // top token

      if (token) {
        ws.send(JSON.stringify({
          type: 'new_pump_score',
          token: {
            symbol: token.symbol,
            token_address: token.address,
            ai_pump_score: Math.floor(Math.random() * 100),
            confidence: (Math.random() * 100).toFixed(1),
            reason: `Birdeye volume rank #1 - ${token.volume_24h} SOL`
          }
        }));
      }
    } catch (err) {
      console.error('Failed to fetch from Birdeye:', err.message);
    }
  }, 5000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
