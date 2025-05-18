"use client";

import { Button, Icon } from "../DemoComponents";
import Image from "next/image";

type SuccessCardProps = {
  returnToEdit: () => void;
  generatedImage?: string | null;
};

export function SuccessCard({ returnToEdit, generatedImage }: SuccessCardProps) {
  // If there's a generated image, show the tap and hold screen
  if (generatedImage) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
            <h3 className="text-lg font-medium text-[var(--app-foreground)]">Your BuilderCard is Ready</h3>
            <p className="text-sm text-[var(--app-foreground-muted)]">Press and hold the image to save it to your device</p>
          </div>
          
          <div className="p-6">
            <Image 
              src={generatedImage}
              alt="Your BuilderCard" 
              width={600}
              height={400}
              className="w-full rounded-lg border border-[var(--app-card-border)] shadow-md"
              priority
            />
            <p className="text-xs text-center mt-2 text-[var(--app-foreground-muted)]">
              Tap and hold the image to save it to your device
            </p>
          </div>
          
          <div className="p-4 flex flex-col md:flex-row gap-3 border-t border-[var(--app-card-border)]">
            <Button 
              variant="primary" 
              onClick={returnToEdit}
              className="flex-1 text-white"
              icon={<Icon name="arrow-right" size="sm" className="transform rotate-180" />}
            >
              Create Another Card
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Regular success page
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden p-10 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#0052FF20]">
          <Icon name="check" size="lg" className="text-[#0052FF]" />
        </div>
        <h3 className="text-xl font-medium text-[var(--app-foreground)] mb-2">
          Success!
        </h3>
        <p className="text-center text-[var(--app-foreground-muted)] mb-2">
          Your BuilderCard has been saved!
        </p>
        <div className="text-xs text-[var(--app-foreground-muted)] mt-2">
          Share your card with the Base community.
        </div>
        <Button 
          variant="primary" 
          onClick={returnToEdit}
          className="mt-6 text-white"
          icon={<Icon name="arrow-right" size="sm" className="transform rotate-180" />}
        >
          Create Another Card
        </Button>
      </div>
    </div>
  );
} 