import { ethers } from "ethers";

// TODO: extract this from contract method?
export type RingDoorbellMessage = {
  visitor: {
    contractAddress: string;
    tokenId: string;
  };
  place: {
    contractAddress: string;
    tokenId: string;
  };
};

export type Envelope<T> = {
  ts: number;
  data: T;
};

export const stringify = (
  message: string,
  data: Envelope<RingDoorbellMessage>
) => {
  return `${message}\n\n\n${JSON.stringify(data)}`;
};

export const parse = (message: string, signature: string) => {
  const address = ethers.utils.verifyMessage(message, signature);
  // TODO: do something better than optimistically type casting from any
  const { ts, data }: Envelope<RingDoorbellMessage> = JSON.parse(
    // Strip message ahead of JSON data
    message.replace(/^[^{]+/, "")
  );
  // TODO: move this check elsewhere?
  if (Date.now() - ts > 1000 * 30) {
    throw new Error("Message is too old");
  }
  return { address, data: data };
};
