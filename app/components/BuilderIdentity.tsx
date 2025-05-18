"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Button, Icon } from "./DemoComponents";
import { cardCustomizerThemes } from "./card-customizer/card-customizer-themes";
import { CardCustomizer, type Theme } from "./card-customizer/card-customizer";
import { BuilderCard, type EditField } from "./stage-cards/builder-card";
import {PreviewCard} from "./stage-cards/preview-card";
import { SuccessCard } from "./stage-cards/success-card";
import { AppStage } from "../page";

type SocialHandles = {
  github: string;
  warpcast: string;
  twitter: string;
};

type BuilderIdentityProps = {
  stage: AppStage;
  setStage: (stage: AppStage) => void;
};

export function BuilderIdentity({ stage, setStage }: BuilderIdentityProps) {
  const { address } = useAccount();
  
  const [handle, setHandle] = useState("");
  const [building, setBuilding] = useState("");
  const [socials, setSocials] = useState<SocialHandles>({
    github: "",
    warpcast: "",
    twitter: ""
  });
  const [emoji, setEmoji] = useState("🛠️");
  const [projectLink, setProjectLink] = useState("");
  const [theme, setTheme] = useState<Theme>(cardCustomizerThemes[0]);
  
  // Customizer state - starting with null to avoid hydration mismatch
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean | null>(null);
  
  // Edit state
  const [currentEdit, setCurrentEdit] = useState<EditField>("none");
  
  // Image state for saving/downloading
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Initialize client-side state after hydration
  useEffect(() => {
    setIsCustomizerOpen(false);
  }, []);

  // Prefill the handle if available
  useEffect(() => {
    if (!address) return;
    
    setHandle(`user_${address.substring(2, 6)}`);
    setSocials(prev => ({
      ...prev,
      warpcast: `user_${address.substring(2, 6)}`
    }));
  }, [address]);

  const handleSave = () => {
    setStage('success');
  };

  const handleShowPreview = () => {
    setStage('preview');
    setCurrentEdit("none");
  };

  const returnToEdit = () => {
    // Reset form for creating another card
    setHandle(address ? `user_${address.substring(2, 6)}` : "");
    setBuilding("");
    setSocials({
      github: "",
      warpcast: address ? `user_${address.substring(2, 6)}` : "",
      twitter: ""
    });
    setProjectLink("");
    setGeneratedImage(null);
    setStage('edit');
  };

  const updateSocial = (platform: keyof SocialHandles, value: string) => {
    setSocials(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
    setStage('success');
  };

   // Don't render until client-side initialization is complete
   if (isCustomizerOpen === null) {
    return null;
  }

  if (stage === 'success') {
    return (
      <SuccessCard 
        returnToEdit={returnToEdit}
        generatedImage={generatedImage}
      />
    );
  }

  if (stage === 'preview') {
    return (
      <PreviewCard
        handle={handle}
        building={building}
        socials={socials}
        projectLink={projectLink}
        emoji={emoji}
        theme={theme}
        onCancel={returnToEdit}
        onConfirm={handleSave}
        onImageGenerated={handleImageGenerated}
      />
    );
  }

  // Edit stage
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
        className="w-full text-white"
        icon={<Icon name="arrow-right" size="sm" />}
      >
        Preview My BuilderCard
      </Button>
    </div>
  );
} 