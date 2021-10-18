import { useConnectToWallet } from "ethereal-react";

export const WalletConnectButton = () => {
  const [connect, { loading, error }] = useConnectToWallet();
  return (
    <div>
      {error && <div>Error connecting to wallet: {error.message}</div>}

      <button
        type="button"
        className="border-2 border-yellow-600 text-white hover:bg-yellow-800 hover:bg-opacity-50 transition rounded-lg font-medium py-1 px-2"
        onClick={connect}
        disabled={loading}
      >
        Connect wallet
      </button>
    </div>
  );
};
