import React, { useState } from "react";
import TokenTab from "./TokenTab";
import ReferralTab from "./ReferralTab";
import MirrorTab from "./MirrorTab";
import LeaderboardTab from "./LeaderboardTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tokens");

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        border: "1px solid #2a2a2a",
        background: activeTab === id ? "#06b6d4" : "#111827",
        color: "white",
        cursor: "pointer",
        fontWeight: 700
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f14", color: "white", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 1 }}>SOL-BUNKER</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>The bunker opens. The war begins.</div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <TabButton id="tokens" label="Tokens" />
          <TabButton id="referrals" label="Referrals" />
          <TabButton id="mirror" label="Mirror" />
          <TabButton id="leaderboard" label="Leaderboard" />
        </div>
      </div>

      <div style={{ marginTop: 16, padding: 14, borderRadius: 14, border: "1px solid #1f2937", background: "#0f172a" }}>
        {activeTab === "tokens" && <TokenTab />}
        {activeTab === "referrals" && <ReferralTab />}
        {activeTab === "mirror" && <MirrorTab />}
        {activeTab === "leaderboard" && <LeaderboardTab />}
      </div>
    </div>
  );
}
