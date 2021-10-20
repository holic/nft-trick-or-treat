import React from "react";
import { Container } from "@app/components/Container";
import Link from "next/link";

export const TopBar = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="bg-gray-900 bg-opacity-60">
    <Container>
      <div className="py-2 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-baseline gap-0.5 text-3xl">
            <span className="text-yellow-600 font-serif font-medium">NFT</span>
            <span className="text-2xl">🎃</span>
            <span
              className="text-yellow-500"
              style={{ fontFamily: "'Festive', cursive" }}
            >
              Trick-or-Treat
            </span>
          </a>
        </Link>
        {children}
      </div>
    </Container>
  </div>
);
