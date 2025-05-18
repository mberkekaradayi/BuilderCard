"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { Theme } from "./CardCustomizer";

type SocialHandles = {
  github: string;
  warpcast: string;
  twitter: string;
};

export type EditField = "handle" | "building" | "socials" | "projectLink" | "none";

type BuilderCardProps = {
  handle: string;
  setHandle: (value: string) => void;
  building: string;
  setBuilding: (value: string) => void;
  socials: SocialHandles;
  updateSocial: (platform: keyof SocialHandles, value: string) => void;
  projectLink: string;
  setProjectLink: (value: string) => void;
  emoji: string;
  theme: Theme;
  currentEdit: EditField;
  setCurrentEdit: (field: EditField) => void;
};

export function BuilderCard({
  handle,
  setHandle,
  building,
  setBuilding,
  socials,
  updateSocial,
  projectLink,
  setProjectLink,
  emoji,
  theme,
  currentEdit,
  setCurrentEdit
}: BuilderCardProps) {
  
  // State to store original values for discard functionality
  const [originalHandle, setOriginalHandle] = useState(handle);
  const [originalBuilding, setOriginalBuilding] = useState(building);
  const [originalSocials, setOriginalSocials] = useState(socials);
  const [originalProjectLink, setOriginalProjectLink] = useState(projectLink);
  
  // When starting to edit, save the original values
  useEffect(() => {
    if (currentEdit === 'handle') {
      setOriginalHandle(handle);
    } else if (currentEdit === 'building') {
      setOriginalBuilding(building);
    } else if (currentEdit === 'socials') {
      setOriginalSocials({...socials});
    } else if (currentEdit === 'projectLink') {
      setOriginalProjectLink(projectLink);
    }
  }, [currentEdit]);

  // Helper to render social links
  const renderSocialLink = (platform: string, handle: string) => {
    if (!handle && currentEdit !== "socials") return null;
    
    let url = '';
    let icon = null;
    let placeholder = '';
    
    switch (platform) {
      case 'github':
        url = `https://github.com/${handle}`;
        icon = <FaGithub className="mr-1" />;
        placeholder = 'github username';
        break;
      case 'warpcast':
        url = `https://warpcast.com/${handle}`;
        icon = <SiFarcaster className="mr-1" />;
        placeholder = 'warpcast handle';
        break;
      case 'twitter':
        url = `https://twitter.com/${handle.replace('@', '')}`;
        icon = <FaXTwitter className="mr-1" />;
        placeholder = 'twitter handle';
        break;
    }
    
    if (currentEdit === "socials") {
      return (
        <div className="flex items-center w-full mb-2">
          <div className="inline-flex items-center px-3 border border-r-0 border-[var(--app-card-border)] rounded-l-md bg-[var(--app-gray)] text-[var(--app-foreground-muted)]">
            {icon}
          </div>
          <input
            type="text"
            value={handle}
            onChange={(e) => updateSocial(platform as keyof SocialHandles, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-r-md text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
          />
        </div>
      );
    }
    
    if (!handle) {
      return (
        <div className="flex items-center opacity-60 hover:opacity-100" onClick={() => setCurrentEdit("socials")}>
          {icon}
          <span className="text-[var(--app-foreground-muted)] text-sm italic">Add {placeholder}</span>
        </div>
      );
    }
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center text-[var(--app-foreground)] hover:text-[var(--app-accent)] transition-colors"
        onClick={(e) => {
          e.preventDefault();
          setCurrentEdit("socials");
        }}
      >
        {icon}
        <span>{handle}</span>
      </a>
    );
  };

  const renderEditableText = (
    value: string, 
    onChange: (value: string) => void, 
    fieldType: EditField,
    placeholder: string,
    isEditing: boolean
  ) => {
    if (isEditing) {
      return (
        <div className="relative w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pr-16 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-md text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setCurrentEdit('none');
              }
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex">
            <button 
              className="text-green-500 hover:text-green-600 p-1 mr-1"
              onClick={() => setCurrentEdit('none')}
              title="Save changes"
            >
              ✓
            </button>
            <button 
              className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] p-1"
              onClick={() => {
                // Discard changes by reverting to original value
                if (fieldType === 'handle') {
                  setHandle(originalHandle);
                } else if (fieldType === 'building') {
                  setBuilding(originalBuilding);
                }
                setCurrentEdit('none');
              }}
              title="Discard changes"
            >
              ✕
            </button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className="relative group cursor-pointer" 
        onClick={() => setCurrentEdit(fieldType)}
      >
        <span>{value || placeholder}</span>
      </div>
    );
  };

  return (
    <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
        <h3 className="text-lg font-medium text-[var(--app-foreground)]">BuilderCard</h3>
      </div>
      
      {/* Card Preview */}
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
                    @
                    {currentEdit === "handle" 
                      ? renderEditableText(handle, setHandle, "handle", "yourhandle", true)
                      : renderEditableText(handle, setHandle, "handle", "yourhandle", false)
                    }
                  </h3>
                  <p className="text-xs text-[var(--app-foreground-muted)]">Builder on Base</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--app-card-bg)] rounded-lg p-4 mb-5">
              <h4 className="font-semibold mb-2 text-[var(--app-foreground)]">Building:</h4>
              <p className="text-[var(--app-foreground-muted)]">
                {currentEdit === "building" 
                  ? renderEditableText(building, setBuilding, "building", "What are you building?", true)
                  : renderEditableText(building, setBuilding, "building", "What are you building?", false)
                }
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm font-medium" onClick={() => setCurrentEdit("socials")}>
                <span>Connect</span>
                {currentEdit !== "socials" && <FaEdit className="ml-2 inline-block opacity-50" size={12} />}
              </div>
              
              {currentEdit === "socials" ? (
                <div className="py-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-[var(--app-foreground-muted)]">Edit social handles</span>
                    <div className="flex">
                      <button
                        className="text-green-500 hover:text-green-600 p-1 mr-1"
                        onClick={() => setCurrentEdit("none")}
                        title="Save changes"
                      >
                        ✓
                      </button>
                      <button
                        className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] p-1"
                        onClick={() => {
                          // Restore original values
                          updateSocial('github', originalSocials.github);
                          updateSocial('warpcast', originalSocials.warpcast);
                          updateSocial('twitter', originalSocials.twitter);
                          setCurrentEdit("none");
                        }}
                        title="Discard changes"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  {renderSocialLink('warpcast', socials.warpcast)}
                  {renderSocialLink('github', socials.github)}
                  {renderSocialLink('twitter', socials.twitter)}
                </div>
              ) : (
                <div className="flex flex-col gap-2 pl-1 py-1">
                  {socials.warpcast && (
                    <div className="flex items-center ">
                      {renderSocialLink('warpcast', socials.warpcast)}
                    </div>
                  )}
                  
                  {socials.github && (
                    <div className="flex items-center">
                      {renderSocialLink('github', socials.github)}
                    </div>
                  )}
                  
                  {socials.twitter && (
                    <div className="flex items-center">
                      {renderSocialLink('twitter', socials.twitter)}
                    </div>
                  )}
                  
                  {!socials.warpcast && !socials.github && !socials.twitter && (
                    <div 
                      className="text-xs text-[var(--app-foreground-muted)] italic cursor-pointer hover:text-[var(--app-foreground)]"
                      onClick={() => setCurrentEdit("socials")}
                    >
                      Add your social handles to connect
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-3">
                <div className="text-sm font-medium text-[var(--app-foreground)] cursor-pointer" onClick={() => setCurrentEdit("projectLink")}>
                  <span>Project</span>
                  {currentEdit !== "projectLink" && <FaEdit className="ml-2 inline-block opacity-50" size={12} />}
                </div>
                
                {currentEdit === "projectLink" ? (
                  <div className="py-2">
                    <div className="relative">
                      <input
                        type="url"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        placeholder="https://yourproject.xyz"
                        className="w-full mt-2 pr-16 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-md text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setCurrentEdit('none');
                          }
                        }}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex">
                        <button 
                          className="text-green-500 hover:text-green-600 p-1 mr-1"
                          onClick={() => setCurrentEdit('none')}
                          title="Save changes"
                        >
                          ✓
                        </button>
                        <button 
                          className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] p-1"
                          onClick={() => {
                            // Discard changes by reverting to original value
                            setProjectLink(originalProjectLink);
                            setCurrentEdit('none');
                          }}
                          title="Discard changes"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pl-1 py-1">
                    {projectLink ? (
                      <div className="flex items-center">
                        <a
                          href={projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm flex items-center text-[var(--app-foreground)] hover:text-[var(--app-accent)] transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentEdit("projectLink");
                          }}
                        >
                          {projectLink.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    ) : (
                      <div 
                        className="text-xs text-[var(--app-foreground-muted)] italic cursor-pointer hover:text-[var(--app-foreground)]"
                        onClick={() => setCurrentEdit("projectLink")}
                      >
                        Add a link to your project
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="py-3 px-4 flex justify-between items-center" style={{ backgroundColor: theme.colors.primary }}>
            <span className="text-white text-sm font-medium">BuilderCard</span>
            <span className="text-white/70 text-xs">Built on Base</span>
          </div>
        </div>
      </div>
    </div>
  );
} 