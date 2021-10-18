import React from "react";
import { Wallet } from "@app/components/Wallet";
import { Container } from "@app/components/Container";

export const TopBar = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="bg-gray-900 bg-opacity-60">
    <Container>
      <div className="py-2 flex items-center justify-between">
        <div className="flex items-baseline gap-0.5 text-3xl">
          <span className="text-yellow-600 font-serif font-medium">NFT</span>
          <span className="text-2xl">🎃</span>
          <span
            className="text-yellow-500"
            style={{ fontFamily: "'Festive', cursive" }}
          >
            Trick-or-Treat
          </span>
        </div>
        {children}
      </div>
    </Container>
  </div>
);
