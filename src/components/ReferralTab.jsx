import React, { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const ReferralTab = () => {
  const { publicKey } = useWallet();

  const referralLink = useMemo(() => {
    if (!publicKey) return 'Connect wallet to get your link';
    return `https://solbunker.app/ref/${publicKey.toBase58()}`;
  }, [publicKey]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">Referral Program</h2>
      <p className="text-sm">Earn 25% of each referred user's trading fees.</p>
      <p className="text-xs text-gray-400 mt-4 break-all">
        Your referral link:
        <br />
        <code>{referralLink}</code>
      </p>
    </div>
  );
};

export default ReferralTab;
