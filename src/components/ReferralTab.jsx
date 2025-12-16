import React from "react";

export default function ReferralTab() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700 }}>Referral Program</h2>
      <p>Earn 25% of each referred user&apos;s trading fees.</p>
      <p style={{ marginTop: 12, wordBreak: "break-all", opacity: 0.8 }}>
        Your referral link:
        <br />
        <code>https://solbunker.app/ref/CONNECT_WALLET</code>
      </p>
      <p style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
        Wallet connect comes next.
      </p>
    </div>
  );
}
