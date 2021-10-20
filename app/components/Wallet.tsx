import { useUserAddress } from "ethereal-react";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { Suspense } from "@app/components/Suspense";

const shortAddress = (address: string) =>
  address.replace(/^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{3})$/i, "$1…$2");

const WalletConnected = () => {
  const address = useUserAddress();
  return <div>👻 {address ? shortAddress(address) : null}</div>;
};

export const Wallet = () => (
  <Suspense fallback={<PendingIcon />}>
    <WalletConnected />
  </Suspense>
);
