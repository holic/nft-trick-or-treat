import { Fragment } from "react";
import Head from "next/head";
import { Dialog, Transition } from "@headlessui/react";
import { Player } from "@app/components/Player";
import { OpenSeaAsset } from "@app/utils/types";
import { useProvider } from "ethereal-react";
import { useToast } from "@app/utils/useToast";
import * as signedMessageData from "@app/utils/signedMessageData";
import { RingDoorbellMessage } from "@app/utils/signedMessageData";
import { useAsyncFn } from "react-use";
import { PendingIcon } from "@app/components/icons/PendingIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  visitor: OpenSeaAsset;
  place: OpenSeaAsset;
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

export const PlaceDialog = ({ isOpen, onClose, visitor, place }: Props) => {
  const placeImageUrl = place.imageUrl.replace(/=s\d+$/, "=s800");
  const [{ loading, error, value }, ringDoorbell] = useRingDoorbell();

  return (
    <>
      <Head>
        <link rel="preload" href={placeImageUrl} as="image" />
      </Head>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={onClose}
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-xs bg-gray-900 bg-opacity-40"
        >
          <Dialog.Overlay className="fixed inset-0" />
          <div className="flex flex-col pt-[10vh] pb-[60vh] items-center">
            <Transition.Child
              enter="transition ease-out duration-500"
              enterFrom="transform scale-90 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition ease-out duration-100"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-90 opacity-0"
            >
              <div
                className="relative max-w-screen-sm outline-none"
                tabIndex={0}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img src={placeImageUrl} className="bg-gray-900" />
                  {/* Apply some spooky filters */}
                  <div className="absolute inset-0 bg-blue-900 opacity-40 mix-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60"></div>
                  <div
                    className="absolute inset-0 bg-gray-800 bg-opacity-70"
                    style={{
                      boxShadow: "inset 0 0 6rem 1rem rgba(0, 0, 0, .5)",
                    }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, white 0, rgba(255,255,255,.5) 30%, rgba(255,255,255,.2) 50%, transparent 70%)",
                    }}
                  ></div>
                  {/* Make it rain */}
                  {/* TODO: turn this into an SVG for better perf? */}
                  {new Array(100).fill(0).map((_value, i) => {
                    const delay = Math.floor(Math.random() * 500);
                    return (
                      <div
                        key={i}
                        className={`absolute top-0 -rotate-12 w-1 h-16 bg-gradient-to-b from-transparent to-gray-300 animate-rainfall`}
                        style={{
                          top: `${Math.floor(Math.random() * -200)}%`,
                          left: `${Math.floor(Math.random() * 100 - 15)}%`,
                          animationDelay: `${Math.floor(
                            Math.random() * 1000
                          )}ms`,
                          opacity: Math.random() * 0.5 + 0.1,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="absolute -top-4 -left-6 flex items-start">
                  <Player imageUrl={visitor.imageUrl} />
                  <div className="bg-white text-black p-3 rounded rounded-bl-none mt-1 ml-2 text-lg">
                    Well, this is spooky. Are you sure about this? 😰
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 flex gap-8 p-8 justify-center">
                  <button
                    type="button"
                    className="px-4 py-3 rounded-lg bg-yellow-500 text-xl text-black transition hover:bg-yellow-300 hover:scale-105 disabled:saturate-50 disabled:opacity-60 disabled:cursor-default flex items-center gap-2"
                    onClick={() => {
                      ringDoorbell({
                        visitor: {
                          contractAddress: visitor.tokenAddress,
                          tokenId: visitor.tokenId,
                        },
                        place: {
                          contractAddress: place.tokenAddress,
                          tokenId: place.tokenId,
                        },
                      }).finally(onClose);
                    }}
                    disabled={loading || value}
                  >
                    Ring the doorbell
                    {loading ? <PendingIcon /> : null}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-3 rounded-lg bg-gray-900 bg-opacity-80 text-xl transition hover:bg-opacity-100 hover:scale-105"
                    onClick={onClose}
                  >
                    Let's get out of here
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
