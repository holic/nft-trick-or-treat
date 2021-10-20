import React from "react";

type Props = {
  imageUrl?: string;
};

export const Player = ({ imageUrl }: Props) => (
  <a className="group relative">
    <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-gray-900 bg-gray-700">
      <img src={imageUrl} />
    </div>
    <img
      src="/pumpkin-bucket.png"
      className="w-16 h-16 absolute bottom-0 -right-1"
    />
  </a>
);
