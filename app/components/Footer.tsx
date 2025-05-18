"use client";

import { useOpenUrl } from "@coinbase/onchainkit/minikit";
import { SiFarcaster } from "react-icons/si";
import { TbBrandCoinbase } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsDash } from "react-icons/bs";

export function Footer() {
  const openUrl = useOpenUrl();
  
  return (
    <footer className="mt-6 pt-4 flex flex-col items-center border-t border-[var(--app-card-border)]">
      <div className="w-full flex justify-center items-center p-2 mb-3">
        <span className="text-[var(--app-foreground-muted)] mx-1"><BsDash /></span>
        <p className="text-xs text-[var(--app-foreground-muted)]">
          2025 © BuilderCard
        </p>
        <span className="text-[var(--app-foreground-muted)] mx-1"><BsDash /></span>
      </div>
      <div className="flex space-x-4 mb-3">
        <button 
          onClick={() => openUrl("https://warpcast.com/mbk")}
          className="text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)] transition-colors text-xl"
          aria-label="Warpcast"
        >
          <SiFarcaster />
        </button>
        <button
          onClick={() => openUrl("https://github.com/mberkekaradayi")}
          className="text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)] transition-colors text-xl"
          aria-label="GitHub"
        >
          <FaGithub />
        </button>
        <button
          onClick={() => openUrl("https://x.com/mberkekaradayi")}
          className="text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)] transition-colors text-xl"
          aria-label="Twitter/X"
        >
          <FaXTwitter />
        </button>
        <button
          onClick={() => openUrl("https://base.org/builders/minikit")}
          className="text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)] transition-colors text-xl"
          aria-label="Base"
        >
          <TbBrandCoinbase />
        </button>
      </div>
    </footer>
  );
} 