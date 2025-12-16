import React, { useEffect, useRef } from "react";

export default function TradingViewWidget({ symbol = "BINANCE:BTCUSDT", interval = "1" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget if symbol changes
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      // eslint-disable-next-line no-undef
      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval, // "1" = 1m, "5" = 5m, "15" = 15m, etc.
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_legend: false,
        allow_symbol_change: true,
        container_id: "tv_container",
        withdateranges: true,
        hide_side_toolbar: false,
        details: false,
        hotlist: false,
        calendar: false,
    studies: [
  "MACD@tv-basicstudies",
  "EMA@tv-basicstudies",
  "EMA@tv-basicstudies"
],
studies_overrides: {
  "ema.length": 9,
  "ema.length#2": 21
},


    containerRef.current.appendChild(script);
  }, [symbol, interval]);

  return (
    <div style={{ height: 520, width: "100%", borderRadius: 14, overflow: "hidden", border: "1px solid #1f2937" }}>
      <div id="tv_container" ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
