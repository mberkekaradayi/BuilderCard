"use client";

import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { Theme } from "./CardCustomizer";
import { renderSocialLink, renderEditableText } from "./builderCardUtils";

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
  }, [currentEdit, handle, building, socials, projectLink]);

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
                      ? renderEditableText(handle, setHandle, "handle", "yourhandle", true, setCurrentEdit, originalHandle)
                      : <span>{handle || "yourhandle"}</span>
                    }
                    {currentEdit !== "handle" && <FaEdit className="ml-2 inline-block opacity-50 cursor-pointer" size={16} onClick={() => setCurrentEdit("handle")} />}
                  </h3>
                  <p className="text-xs text-[var(--app-foreground-muted)]">Builder on Base</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm font-medium flex items-center">
                <h4 className="font-semibold text-[var(--app-foreground)]">Building:</h4>
                {currentEdit !== "building" && (
                  <FaEdit className="ml-2 inline-block opacity-50 cursor-pointer" size={16} onClick={() => setCurrentEdit("building")} />
                )}
                {currentEdit === "building" && (
                  <div className="flex items-center ml-2">
                    <button 
                      className="text-green-500 hover:text-green-600 p-2 mr-2 text-lg"
                      onClick={() => setCurrentEdit('none')}
                      title="Save changes"
                    >
                      ✓
                    </button>
                    <button 
                      className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] p-2 text-lg"
                      onClick={() => {
                        setBuilding(originalBuilding);
                        setCurrentEdit('none');
                      }}
                      title="Discard changes"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-[var(--app-foreground-muted)] pl-1">
                {currentEdit === "building" 
                  ? <div className="relative w-full">
                      <input
                        type="text"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                        placeholder="What are you building?"
                        className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-md text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setCurrentEdit('none');
                          }
                        }}
                      />
                    </div>
                  : <span>{building || <span className="italic">What are you building?</span>}</span>
                }
              </p>
              
              <div className="text-sm font-medium flex items-center">
                <span>Connect</span>
                {currentEdit !== "socials" && (
                  <FaEdit className="ml-2 inline-block opacity-50 cursor-pointer" size={16} onClick={() => setCurrentEdit("socials")} />
                )}
                {currentEdit === "socials" && (
                  <div className="flex items-center ml-2">
                    <button
                      className="text-green-500 hover:text-green-600 p-2 mr-2 text-lg"
                      onClick={() => setCurrentEdit("none")}
                      title="Save changes"
                    >
                      ✓
                    </button>
                    <button
                      className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] p-2 text-lg"
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
                )}
              </div>
              
              {currentEdit === "socials" ? (
                <div className="py-2">
                  {renderSocialLink('warpcast', socials.warpcast, currentEdit, setCurrentEdit, updateSocial)}
                  {renderSocialLink('github', socials.github, currentEdit, setCurrentEdit, updateSocial)}
                  {renderSocialLink('twitter', socials.twitter, currentEdit, setCurrentEdit, updateSocial)}
                </div>
              ) : (
                <div className="flex flex-col gap-2 pl-1 py-1">
                  {socials.warpcast && (
                    <div className="flex items-center ">
                      {renderSocialLink('warpcast', socials.warpcast, currentEdit, setCurrentEdit, updateSocial)}
                    </div>
                  )}
                  
                  {socials.github && (
                    <div className="flex items-center">
                      {renderSocialLink('github', socials.github, currentEdit, setCurrentEdit, updateSocial)}
                    </div>
                  )}
                  
                  {socials.twitter && (
                    <div className="flex items-center">
                      {renderSocialLink('twitter', socials.twitter, currentEdit, setCurrentEdit, updateSocial)}
                    </div>
                  )}
                  
                  {!socials.warpcast && !socials.github && !socials.twitter && (
                    <div 
                      className="text-xs text-[var(--app-foreground-muted)] italic"
                    >
                      Add your social media handles
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-3">
                <div className="text-sm font-medium text-[var(--app-foreground)] cursor-pointer flex items-center">
                  <span>Project</span>
                  {currentEdit !== "projectLink" && (
                    <FaEdit className="ml-2 inline-block opacity-50 cursor-pointer" size={16} onClick={() => setCurrentEdit("projectLink")} />
                  )}
                  {currentEdit === "projectLink" && (
                    <div className="flex items-center ml-2">
                      <button 
                        className="text-green-500 hover:text-green-600 p-2 mr-2 text-lg"
                        onClick={() => setCurrentEdit('none')}
                        title="Save changes"
                      >
                        ✓
                      </button>
                      <button 
                        className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] p-2 text-lg"
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
                  )}
                </div>
                
                {currentEdit === "projectLink" ? (
                  <div className="py-2">
                    <div className="relative">
                      <input
                        type="url"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        placeholder="https://yourproject.xyz"
                        className="w-full mt-2 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-md text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setCurrentEdit('none');
                          }
                        }}
                      />
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
                        className="text-xs text-[var(--app-foreground-muted)] italic"
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
            <span className="text-white text-sm font-bold drop-shadow-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.5)' }}>BuilderCard</span>
            <span className="text-white text-xs font-bold drop-shadow-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.5)' }}>Built on Base</span>
          </div>
        </div>
      </div>
    </div>
  );
} 