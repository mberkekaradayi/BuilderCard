"use client";

import {
  useMiniKit,
  useAddFrame,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { BuilderIdentity } from "./components/BuilderIdentity";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BuilderInfoMessage } from "./components/BuilderInfoMessage";
import { PreviewInfoMessage } from "./components/PreviewInfoMessage";
import { ComingSoonMessage } from "./components/ComingSoonMessage";

// Define the possible stages
type AppStage = 'edit' | 'preview' | 'success';

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [appStage, setAppStage] = useState<AppStage>('edit');

  const addFrame = useAddFrame();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  // Handler to track stage changes from BuilderIdentity
  const handleStageChange = (stage: AppStage) => {
    setAppStage(stage);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme bg-gradient-to-br from-blue-950 via-black/90 to-blue-950/95">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 md:px-6 py-3">
        <Navbar saveFrameButton={saveFrameButton} />

        {appStage === 'preview' && <PreviewInfoMessage />}
        {appStage === 'edit' && <BuilderInfoMessage />}
        
        <main className="flex-1">
          <BuilderIdentity 
            onStageChange={handleStageChange}
          />
        </main>

        {appStage === 'edit' && <ComingSoonMessage />}

        <Footer />
      </div>
    </div>
  );
}
