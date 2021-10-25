import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { Dialog, Transition } from "@headlessui/react";
import { Player } from "@app/components/Player";
import { OpenSeaAsset } from "@app/utils/types";
import { useProvider } from "ethereal-react";
import * as signedMessageData from "@app/utils/signedMessageData";
import { RingDoorbellMessage } from "@app/utils/signedMessageData";
import { useAsyncFn } from "react-use";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { ethers } from "ethers";
import { TrickOrTreat__factory } from "contracts/typechain";
import { motion, AnimatePresence } from "framer-motion";

const polygonProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_POLYGON_RPC_ENDPOINT
);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  visitor: OpenSeaAsset;
  place: OpenSeaAsset;
  hasVisited: boolean;
  onVisited: () => void;
};

const useRingDoorbell = (setMessage: (message: string) => void) => {
  const provider = useProvider();

  const ringDoorbell = async (data: RingDoorbellMessage) => {
    const message = signedMessageData.stringify(
      "Let's go ring the doorbell and shout 'trick-or-treat!'",
      { ts: Date.now(), data }
    );
    const signature = await provider.getSigner().signMessage(message);
    setMessage("Okay, walking up now… 🤫");

    const result = await fetch("/api/ringDoorbell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        signature,
      }),
    }).then((res) => res.json());

    if (result.error) {
      setMessage(result.message);
      return;
    }

    if (result.transaction) {
      setMessage(
        "I rang the doorbell. Are you ready to shout 'trick-or-treat'? 🎃"
      );

      console.log("got transaction hash", result.transaction);
      const tx = await polygonProvider.waitForTransaction(result.transaction);
      console.log("transaction complete", tx);

      setMessage("Trick or treat! 👻");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const contract = TrickOrTreat__factory.connect(tx.to, polygonProvider);
      for (const log of tx.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog.name === "Treated") {
            setMessage(
              `Yay, they gave us ${parsedLog.args.amount} treats. 🍬 Thanks!`
            );
            return;
          }
          if (parsedLog.name === "Tricked") {
            setMessage(
              `Oh no, they tricked us! 👺 They took ${parsedLog.args.amount} of my treats. Let's get out of here!`
            );
            return;
          }
        } catch (error) {
          // do nothing
          console.log(error);
        }
      }

      console.log("No known evnets found in logs");
      return;
    }
  };

  return useAsyncFn(ringDoorbell, [provider]);
};

export const PlaceDialog = ({
  isOpen,
  onClose,
  visitor,
  place,
  hasVisited,
  onVisited,
}: Props) => {
  const placeImageUrl = place.imageUrl.replace(/=s\d+$/, "=s800");

  const [message, setMessage] = useState(
    hasVisited
      ? "I think we've trick-or-treated here today. 👍"
      : "Well, this is spooky. Are you sure about this? 😰"
  );

  const [{ loading, error }, ringDoorbell] = useRingDoorbell(setMessage);

  // TODO: move this to `useRingDoorbell`?
  useEffect(() => {
    if (error) {
      console.log("Error while ringing doorbell", error);
    }
  }, [error]);

  return (
    <>
      <Head>
        <link rel="preload" href={placeImageUrl} as="image" />
      </Head>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={onClose}
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-xs bg-gray-900 bg-opacity-80"
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
              {isOpen ? (
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
                    {new Array(5).fill(0).map((_value, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 animate-rainfall"
                        style={{
                          willChange: "transform",
                          animationDelay: `-${Math.floor((1500 / 6) * i)}ms`,
                        }}
                      >
                        {new Array(15).fill(0).map((_value, drop) => (
                          <div
                            key={drop}
                            className={`absolute w-1 h-16 -rotate-12 bg-gradient-to-b from-transparent to-gray-300`}
                            style={{
                              top: `${Math.floor(Math.random() * 100)}%`,
                              left: `${Math.floor(Math.random() * 100)}%`,
                              opacity: Math.random() * 0.5 + 0.1,
                            }}
                          ></div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="absolute -top-4 -left-6 flex items-start">
                    <Player imageUrl={visitor.imageUrl} />

                    {/* 
                    // TODO: make our own AnimatePresence thing?
                    enterFrom="translate-y-4 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-1000"
                    leaveFrom="translate-y-0 opacity-100"
                    leaveTo="-translate-y-4 opacity-0"
                    className="bg-white text-black p-3 rounded rounded-bl-none mt-1 ml-2 text-lg"
                    */}

                    <div className="relative w-96">
                      <AnimatePresence>
                        <motion.div
                          key={message}
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -60 }}
                          transition={{ type: "tween" }}
                          className="absolute bg-white text-black p-3 rounded rounded-bl-none mt-1 ml-2 text-lg"
                        >
                          {message}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 flex gap-8 p-8 justify-center">
                    <button
                      type="button"
                      className="px-4 py-3 rounded-lg bg-gray-900 bg-opacity-80 text-xl transition hover:bg-opacity-100 hover:scale-105"
                      onClick={onClose}
                    >
                      Let's get out of here
                    </button>
                    {!hasVisited ? (
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
                          }).then(onVisited);
                          // .finally(onClose);
                        }}
                        disabled={loading}
                      >
                        Ring the doorbell
                        {loading ? <PendingIcon /> : null}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
