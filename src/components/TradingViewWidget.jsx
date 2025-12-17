import React, { useEffect, useRef } from "react";

export default function TradingViewWidget({ symbol = "BINANCE:BTCUSDT", interval = "1" }) {
  const hostRef = useRef(null);
  const scriptAddedRef = useRef(false);

  useEffect(() => {
    if (!hostRef.current) return;

    // Create a unique container for each render so TradingView can mount cleanly
    const containerId = `tv_${Math.random().toString(36).slice(2)}`;
    hostRef.current.innerHTML = `<div id="${containerId}" style="height:100%;width:100%"></div>`;

    const mountWidget = () => {
      if (!window.TradingView || typeof window.TradingView.widget !== "function") return;

      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval,
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        withdateranges: true,
        hide_side_toolbar: false,
        container_id: containerId,

        // Studies (reliable)
        studies: ["MACD@tv-basicstudies", "EMA@tv-basicstudies", "EMA@tv-basicstudies"],

        // If overrides don't apply in your account, it's still fine (won't break)
        studies_overrides: {
          "ema.length": 9,
          "ema.length#2": 21
        }
      });
    };

    // Load TradingView script once
    if (!scriptAddedRef.current && !document.getElementById("tvjs")) {
      const script = document.createElement("script");
      script.id = "tvjs";
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = mountWidget;
      document.body.appendChild(script);
      scriptAddedRef.current = true;
    } else {
      // Script already present
      mountWidget();
    }
  }, [symbol, interval]);

  return (
    <div
      style={{
        height: 520,
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #1f2937",
        background: "#0b1220"
      }}
      ref={hostRef}
    />
  );
}
