import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { EditField } from "./BuilderCard";

type SocialHandles = {
  github: string;
  warpcast: string;
  twitter: string;
};

export const renderSocialLink = (
  platform: string, 
  handle: string,
  currentEdit: EditField,
  setCurrentEdit: (field: EditField) => void,
  updateSocial: (platform: keyof SocialHandles, value: string) => void
) => {
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

export const renderEditableText = (
  value: string, 
  onChange: (value: string) => void, 
  fieldType: EditField,
  placeholder: string,
  isEditing: boolean,
  setCurrentEdit: (field: EditField) => void,
  originalValue: string
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
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
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
              onChange(originalValue);
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