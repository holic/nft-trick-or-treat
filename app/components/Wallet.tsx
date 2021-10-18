import { useENSForAddress } from "ethereal-react";
import { PendingIcon } from "@app/components/PendingIcon";
import { Suspense } from "@app/components/Suspense";

const shortAddress = (address: string) =>
  address.replace(/^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{3})$/i, "$1…$2");

const WalletConnected = () => {
  const ens = useENSForAddress();
  return <div>👻 {ens ? shortAddress(ens) : null}</div>;
};

export const Wallet = () => {
  return (
    <div className="text-gray-400">
      <Suspense fallback={<PendingIcon />}>
        <WalletConnected />
      </Suspense>
    </div>
  );
};
