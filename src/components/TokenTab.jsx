import React, { useEffect, useState } from "react";
import TradingViewWidget from "./TradingViewWidget";

export default function TokenTab() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    // Safe WS: if backend isn't running, app still loads
    let ws;
    try {
      ws = new WebSocket("ws://localhost:4000");
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.type === "new_pump_score" && data?.token) {
            setTokens((prev) => [data.token, ...prev]);
          }
        } catch (e) {
          // ignore bad messages
        }
      };
    } catch (e) {
      // ignore if ws fails
    }

    return () => {
      try {
        if (ws) ws.close();
      } catch (e) {}
    };
  }, []);

  const handleBuy = (token) => {
    // For now: placeholder until we wire real execution
    alert(`Buy clicked: ${token?.symbol || "TOKEN"}`);
  };

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* TradingView chart panel */}
      <TradingViewWidget symbol="BINANCE:BTCUSDT" interval="1" />

      {/* Token cards */}
      <div style={{ display: "grid", gap: 12 }}>
        {tokens.length === 0 ? (
          <div style={{ padding: 14, border: "1px solid #1f2937", borderRadius: 12, background: "#0b1220" }}>
            <div style={{ fontWeight: 800 }}>No signals yet</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
              When your backend sends <code>new_pump_score</code>, tokens will appear here.
            </div>
          </div>
        ) : (
          tokens.map((token, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #1f2937",
                borderRadius: 14,
                padding: 14,
                background: "#0b1220",
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ minWidth: 240 }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#22d3ee" }}>
                  {token.symbol || "TOKEN"}
                </div>

                <div style={{ fontSize: 12, opacity: 0.7, wordBreak: "break-all" }}>
                  {token.token_address || ""}
                </div>

                <div style={{ marginTop: 6, fontSize: 13 }}>
                  Score:{" "}
                  <span style={{ fontWeight: 900, color: "#4ade80" }}>
                    {token.ai_pump_score ?? "-"}
                  </span>{" "}
                  <span style={{ opacity: 0.8 }}>
                    (Conf: {token.confidence ?? "-"})
                  </span>
                </div>

                {token.reason ? (
                  <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7, fontStyle: "italic" }}>
                    {token.reason}
                  </div>
                ) : null}
              </div>

              <button
                onClick={() => handleBuy(token)}
                style={{
                  background: "#22c55e",
                  border: "none",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

