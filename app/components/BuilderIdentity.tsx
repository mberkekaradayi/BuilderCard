"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Button, Icon } from "./DemoComponents";
import { CardCustomizer, CARD_THEMES, type Theme } from "./CardCustomizer";
import { BuilderCard, type EditField } from "./BuilderCard";
import { PreviewCard } from "./PreviewCard";

type SocialHandles = {
  github: string;
  warpcast: string;
  twitter: string;
};

export function BuilderIdentity() {
  const { address } = useAccount();
  
  // Form state
  const [handle, setHandle] = useState("");
  const [building, setBuilding] = useState("");
  const [socials, setSocials] = useState<SocialHandles>({
    github: "",
    warpcast: "",
    twitter: ""
  });
  const [emoji, setEmoji] = useState("🛠️");
  const [projectLink, setProjectLink] = useState("");
  const [theme, setTheme] = useState<Theme>(CARD_THEMES[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Customizer state - starting with null to avoid hydration mismatch
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean | null>(null);
  
  // Edit state
  const [currentEdit, setCurrentEdit] = useState<EditField>("none");
  
  // Preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Initialize client-side state after hydration
  useEffect(() => {
    setIsCustomizerOpen(false);
  }, []);

  // Handle click outside to close editor
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    function handleClickOutside(event: MouseEvent) {
      // If clicking outside and we're editing something, close the edit
      if (currentEdit !== "none" && !event.target) {
        setCurrentEdit("none");
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentEdit]);

  // Prefill the handle if available
  useEffect(() => {
    if (!address) return;
    
    setHandle(`user_${address.substring(2, 6)}`);
    setSocials(prev => ({
      ...prev,
      warpcast: `user_${address.substring(2, 6)}`
    }));
  }, [address]);

  const handleCast = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setBuilding("");
      setSocials({
        github: "",
        warpcast: "",
        twitter: ""
      });
      setProjectLink("");
      setIsPreviewOpen(false);
    }, 2000);
  };

  const handleShowPreview = () => {
    setIsPreviewOpen(true);
    setCurrentEdit("none");
  };

  const updateSocial = (platform: keyof SocialHandles, value: string) => {
    setSocials(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  if (showSuccess) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden p-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${theme.colors.primary}20` }}>
            <Icon name="check" size="lg" className="text-[#0052FF]" />
          </div>
          <h3 className="text-xl font-medium text-[var(--app-foreground)] mb-2">
            Success!
          </h3>
          <p className="text-center text-[var(--app-foreground-muted)] mb-2">
            Your BuilderCard has been cast!
          </p>
          <div className="text-xs text-[var(--app-foreground-muted)] mt-2">
            Share your card with the Base community.
          </div>
        </div>
      </div>
    );
  }

  // Don't render until client-side initialization is complete
  if (isCustomizerOpen === null) {
    return null;
  }

  if (isPreviewOpen) {
    return (
      <PreviewCard
        handle={handle}
        building={building}
        socials={socials}
        projectLink={projectLink}
        emoji={emoji}
        theme={theme}
        onCancel={() => setIsPreviewOpen(false)}
        onConfirm={handleCast}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
      {/* Card Customizer Component */}
      <CardCustomizer 
        currentTheme={theme}
        onThemeChange={setTheme}
        currentEmoji={emoji}
        onEmojiChange={setEmoji}
        isOpen={isCustomizerOpen}
        onToggle={() => setIsCustomizerOpen(!isCustomizerOpen)}
      />
        
      {/* Builder Card Component */}
      <BuilderCard
        handle={handle}
        setHandle={setHandle}
        building={building}
        setBuilding={setBuilding}
        socials={socials}
        updateSocial={updateSocial}
        projectLink={projectLink}
        setProjectLink={setProjectLink}
        emoji={emoji}
        theme={theme}
        currentEdit={currentEdit}
        setCurrentEdit={setCurrentEdit}
      />
      
      {/* Action Button */}
      <Button 
        variant="primary" 
        onClick={handleShowPreview}
        className="w-full"
        icon={<Icon name="arrow-right" size="sm" />}
      >
        Preview My BuilderCard
      </Button>
    </div>
  );
} 