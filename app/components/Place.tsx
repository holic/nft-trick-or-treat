import { NFT } from "@app/utils/types";
import { useProvider } from "ethereal-react";
import * as signedMessageData from "@app/utils/signedMessageData";
import { RingDoorbellMessage } from "@app/utils/signedMessageData";
import { useAsyncFn } from "react-use";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { CheckIcon } from "@app/components/icons/CheckIcon";
import classNames from "classnames";
import { useToast } from "@app/utils/useToast";

type Props = {
  visitor: NFT;
  place: NFT;
  name: string;
  imageUrl: string;
};

const useRingDoorbell = () => {
  const provider = useProvider();
  const { addToast } = useToast();

  const ringDoorbell = async (data: RingDoorbellMessage) => {
    const message = signedMessageData.stringify(
      "Let's go ring the doorbell and shout 'trick-or-treat!'",
      { ts: Date.now(), data }
    );
    const signature = await provider.getSigner().signMessage(message);
    const result = await fetch("/api/ringDoorbell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        signature,
      }),
    }).then((res) => res.json());

    if (result.error) {
      addToast(`🎃 ${result.message}`);
    }

    // For successes, we'll let the event listener generate a toast
    return true;
  };

  return useAsyncFn(ringDoorbell, [provider]);
};

export const Place = ({ visitor, place, name, imageUrl }: Props) => {
  const [{ loading, error, value }, ringDoorbell] = useRingDoorbell();
  const isDisabled = loading || value;

  console.log("got error", error, value);

  return (
    <div className="w-40">
      <button
        type="button"
        className={classNames(
          "rounded-xl overflow-hidden relative disabled:cursor-default",
          isDisabled ? "filter" : "group"
        )}
        onClick={() => {
          ringDoorbell({
            visitor,
            place,
          });
        }}
        disabled={!!isDisabled}
      >
        <img
          src={imageUrl}
          className={classNames(
            "w-40 h-40 filter  group-hover:saturate-100 transition",
            isDisabled ? "saturate-0" : "saturate-50"
          )}
        />
        <span
          className="absolute inset-0 bg-gray-800 bg-opacity-20 group-hover:opacity-0 transition"
          style={{
            boxShadow: "inset 0 0 4rem 1rem rgba(41, 37, 36, .9)",
          }}
        ></span>

        <span
          className={classNames(
            "absolute inset-0 flex items-center justify-center text-4xl text-white bg-black bg-opacity-60 transition duration-500",
            loading ? "opacity-100" : "opacity-0"
          )}
        >
          <PendingIcon />
        </span>

        <span
          className={classNames(
            "absolute bottom-2 right-2 text-2xl text-white bg-yellow-600 transition duration-500 rounded-full p-0.5",
            value ? "group-hover:opacity-50 " : "opacity-0"
          )}
        >
          <CheckIcon />
        </span>
      </button>
      <div className="text-center text-xs">{name}</div>
    </div>
  );
};
