"use client";

import { Button, Icon } from "./DemoComponents";
import { Theme } from "./CardCustomizer";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";

type SocialHandles = {
  github: string;
  warpcast: string;
  twitter: string;
};

type PreviewCardProps = {
  handle: string;
  building: string;
  socials: SocialHandles;
  projectLink: string;
  emoji: string;
  theme: Theme;
  onCancel: () => void;
  onConfirm: () => void;
};

export function PreviewCard({
  handle,
  building,
  socials,
  projectLink,
  emoji,
  theme,
  onCancel,
  onConfirm
}: PreviewCardProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">Preview Your BuilderCard</h3>
          <p className="text-sm text-[var(--app-foreground-muted)]">Review your card before casting</p>
        </div>
        
        <div className="p-6">
          <div 
            className="rounded-lg overflow-hidden border border-[var(--app-card-border)] shadow-md" 
            style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.colors.primary}10, ${theme.colors.primary}30)` }}
          >
            <div className="p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <div 
                    className="text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    {emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--app-foreground)] flex items-center">
                      @{handle}
                    </h3>
                    <p className="text-xs text-[var(--app-foreground-muted)]">Builder on Base</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--app-card-bg)] rounded-lg p-4 mb-5">
                <h4 className="font-semibold mb-2 text-[var(--app-foreground)]">Building:</h4>
                <p className="text-[var(--app-foreground-muted)]">
                  {building || "Not specified"}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">
                  <span>Connect</span>
                </div>
                
                <div className="flex flex-col gap-2 pl-1 py-1">
                  {socials.warpcast && (
                    <div className="flex items-center">
                      <div 
                        className="flex items-center text-[var(--app-foreground)]"
                      >
                        <SiFarcaster className="mr-1" />
                        <span>{socials.warpcast}</span>
                      </div>
                    </div>
                  )}
                  
                  {socials.github && (
                    <div className="flex items-center">
                      <div 
                        className="flex items-center text-[var(--app-foreground)]"
                      >
                        <FaGithub className="mr-1" />
                        <span>{socials.github}</span>
                      </div>
                    </div>
                  )}
                  
                  {socials.twitter && (
                    <div className="flex items-center">
                      <div 
                        className="flex items-center text-[var(--app-foreground)]"
                      >
                        <FaXTwitter className="mr-1" />
                        <span>{socials.twitter}</span>
                      </div>
                    </div>
                  )}
                  
                  {!socials.warpcast && !socials.github && !socials.twitter && (
                    <div className="text-xs text-[var(--app-foreground-muted)] italic">
                      No social handles added
                    </div>
                  )}
                </div>
                
                <div className="mt-3">
                  <div className="text-sm font-medium text-[var(--app-foreground)]">
                    <span>Project</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 pl-1 py-1">
                    {projectLink ? (
                      <div className="flex items-center">
                        <div
                          className="text-sm flex items-center text-[var(--app-foreground)]"
                        >
                  
                          {projectLink.replace(/^https?:\/\//, '')}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-[var(--app-foreground-muted)] italic">
                        No project link added
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="py-3 px-4 flex justify-between items-center" style={{ backgroundColor: theme.colors.primary }}>
              <span className="text-white text-sm font-medium">BuilderCard</span>
              <span className="text-white/70 text-xs">Built on Base</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 flex flex-col md:flex-row gap-3 border-t border-[var(--app-card-border)]">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
            icon={<Icon name="arrow-right" size="sm" className="transform rotate-180" />}
          >
            Go Back & Edit
          </Button>
          
          <Button 
            variant="primary" 
            onClick={onConfirm}
            className="flex-1"
            icon={<Icon name="check" size="sm" />}
          >
            Cast My Card
          </Button>
        </div>
      </div>
    </div>
  );
} 