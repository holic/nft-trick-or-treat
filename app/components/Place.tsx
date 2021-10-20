import { useState } from "react";
import { OpenSeaAsset } from "@app/utils/types";
import { useProvider } from "ethereal-react";
import * as signedMessageData from "@app/utils/signedMessageData";
import { RingDoorbellMessage } from "@app/utils/signedMessageData";
import { useAsyncFn } from "react-use";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { CheckIcon } from "@app/components/icons/CheckIcon";
import classNames from "classnames";
import { useToast } from "@app/utils/useToast";
import { PlaceDialog } from "@app/components/PlaceDialog";

type Props = {
  visitor: OpenSeaAsset;
  place: OpenSeaAsset;
  name: string;
};

export const Place = ({ visitor, place, name }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hasVisited, setVisited] = useState(false);

  return (
    <>
      <div className="w-40">
        <button
          type="button"
          className={classNames("rounded-xl overflow-hidden relative group")}
          onClick={() => setDialogOpen(true)}
        >
          <img
            src={place.imageUrl}
            className={classNames(
              "w-40 h-40 filter transition group-hover:saturate-100 saturate-50"
            )}
          />
          <span
            className="absolute inset-0 bg-gray-800 bg-opacity-20 group-hover:opacity-0 transition"
            style={{
              boxShadow: "inset 0 0 4rem 1rem rgba(41, 37, 36, .9)",
            }}
          ></span>

          {hasVisited ? (
            <span
              className={classNames(
                "absolute bottom-2 right-2 text-2xl text-white bg-yellow-600 transition duration-500 rounded-full p-0.5 group-hover:opacity-50"
              )}
            >
              <CheckIcon />
            </span>
          ) : null}
        </button>
        <div className="text-center text-xs">{name}</div>
      </div>

      <PlaceDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        visitor={visitor}
        place={place}
        onVisited={() => setVisited(true)}
      />
    </>
  );
};
