"use client";

import { Button, Icon } from "./DemoComponents";
import { Theme } from "./CardCustomizer";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import Image from "next/image";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState(false);

  const generateCard = async () => {
    if (cardRef.current === null) return;
    
    try {
      // Improved quality options
      const options = {
        pixelRatio: 3, // Higher pixel ratio for better resolution
        quality: 1.0, // Maximum quality
        backgroundColor: '#000', // Match background color to avoid transparency issues
        style: {
          transform: 'scale(1)', // Ensure no scaling issues
          'transform-origin': 'top left',
        }
      };
      
      const dataUrl = await htmlToImage.toPng(cardRef.current, options);
      
      // Check if we're in a mini-app environment or on mobile
      const isMiniApp = 
        window.navigator.userAgent.includes('Warpcast') || 
        window.location.href.includes('miniapp') ||
        window.self !== window.top || // Detect iframe
        (window.location.ancestorOrigins && 
         window.location.ancestorOrigins.length > 0 && 
         window.location.ancestorOrigins[0].includes('warpcast')) ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || // Mobile device
        (window.innerWidth <= 768); // Small screen
      
      if (isMiniApp) {
        // In mini-app, directly show the image
        setGeneratedImage(dataUrl);
        setDownloadError(true); // Use the same view for showing the image
      } else {
        // In regular browser, try download
        try {
          const link = document.createElement('a');
          link.download = `buildercard-${handle}.png`;
          link.href = dataUrl;
          link.click();
          
          // Continue to success state
          onConfirm();
        } catch (downloadError) {
          console.error('Download error:', downloadError);
          // Fallback for download errors
          setGeneratedImage(dataUrl);
          setDownloadError(true);
        }
      }
    } catch (error) {
      console.error('Error generating card:', error);
      setDownloadError(true);
    }
  };

  // If we have a generated image but couldn't download it, show it for manual saving
  if (generatedImage && downloadError) {
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
              variant="outline" 
              onClick={onCancel}
              className="flex-1 text-white"
              icon={<Icon name="arrow-right" size="sm" className="transform rotate-180" />}
            >
              Go Back & Edit
            </Button>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">Preview Your BuilderCard</h3>
          <p className="text-sm text-[var(--app-foreground-muted)]">Review your card before saving</p>
        </div>
        
        <div className="p-6">
          <div 
            ref={cardRef}
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
              
              <div className="space-y-3">
                <div className="text-sm font-medium">
                  <span>Building:</span>
                </div>
                
                <p className="text-[var(--app-foreground-muted)] pl-1">
                  {building || <span className="italic">Not specified</span>}
                </p>
                
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
            <span className="text-white text-sm font-bold drop-shadow-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.5)' }}>BuilderCard</span>
            <span className="text-white text-xs font-bold drop-shadow-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.5)' }}>Built on Base</span>
          </div>
          </div>
        </div>
        
        <div className="p-4 flex flex-col md:flex-row gap-3 border-t border-[var(--app-card-border)]">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1 text-white"
            icon={<Icon name="arrow-right" size="sm" className="transform rotate-180" />}
          >
            Go Back & Edit
          </Button>
          
          <Button 
            variant="primary" 
            onClick={generateCard}
            className="flex-1 text-white"
            icon={<Icon name="check" size="sm" />}
          >
            Save My Card
          </Button>
        </div>
      </div>
    </div>
  );
} 