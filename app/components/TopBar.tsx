import React from "react";
import { Container } from "@app/components/Container";
import Link from "next/link";

export const TopBar = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="bg-gray-900 bg-opacity-60">
    <Container>
      <div className="py-2 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-baseline gap-0.5 text-3xl group">
            <span className="text-yellow-600 font-serif font-medium group-hover:text-white transition">
              NFT
            </span>
            <span className="text-2xl">🎃</span>
            <span
              className="text-yellow-500 group-hover:text-white transition"
              style={{ fontFamily: "'Festive', cursive" }}
            >
              Trick-or-Treat
            </span>
          </a>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/about">
            <a className="text-yellow-500 hover:text-white transition">About</a>
          </Link>
          <Link href="/leaderboard">
            <a className="text-yellow-500 hover:text-white transition">
              Leaderboard
            </a>
          </Link>
        </div>
        {children}
      </div>
    </Container>
  </div>
);
