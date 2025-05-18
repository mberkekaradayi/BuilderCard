"use client";

import { Button } from "./DemoComponents";
import { useOpenUrl } from "@coinbase/onchainkit/minikit";
import { SiFarcaster } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  const openUrl = useOpenUrl();
  
  return (
    <footer className="mt-6 pt-4 flex flex-col items-center border-t border-[var(--app-card-border)]">
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
      </div>
      <div className="w-full flex justify-between items-center mb-2">
        <p className="text-xs text-[var(--app-foreground-muted)]">
          2025 © BuilderCard
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="text-[var(--ock-text-foreground-muted)] text-xs"
          onClick={() => openUrl("https://base.org/builders/minikit")}
        >
          Built on Base with MiniKit
        </Button>
      </div>
    </footer>
  );
} 