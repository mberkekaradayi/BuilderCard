"use client";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { cardCustomizerThemes } from "./card-customizer-themes";
import {cardCustomizerEmojis} from "./card-customizer-emojis";

export type Theme = typeof cardCustomizerThemes[0];

type CardCustomizerProps = {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  currentEmoji: string;
  onEmojiChange: (emoji: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export function CardCustomizer({
  currentTheme,
  onThemeChange,
  currentEmoji,
  onEmojiChange,
  isOpen,
  onToggle
}: CardCustomizerProps) {
  return (
    <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--app-card-border)] flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <div className="flex items-center">
          <h4 className="text-sm font-medium text-[var(--app-foreground)]">Customize Your Card</h4>
          {!isOpen && (
            <div className="flex items-center ml-2">
              <div 
                className="w-4 h-4 rounded-full mr-1"
                style={{ backgroundColor: currentTheme.colors.primary }}
              ></div>
              <div 
                className="text-sm"
              >
                {currentEmoji}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {isOpen ? (
            <FaChevronUp className="text-[var(--app-foreground-muted)]" size={14} />
          ) : (
            <FaChevronDown className="text-[var(--app-foreground-muted)]" size={14} />
          )}
        </div>
      </div>
      
      {isOpen && (
          <div className="flex flex-col space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-[var(--app-foreground-muted)] mb-2">Choose Theme</div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {cardCustomizerThemes.map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      onClick={() => onThemeChange(theme)}
                      className={`h-10 w-10 sm:h-10 sm:w-10 rounded-md transition-colors border-2 ${
                        currentTheme.name === theme.name ? "border-white" : "border-transparent"
                      }`}
                      style={{ backgroundColor: theme.colors.primary }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-[var(--app-foreground-muted)] mb-2">Choose Emoji</div>
                <div className="grid grid-cols-3 sm:grid-cols-5 sm:grid-rows-2 gap-3 sm:gap-4 pr-1 sm:pr-2">
                  {cardCustomizerEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => onEmojiChange(emoji)}
                      className={`w-11  h-11 sm:w-12 sm:h-12 text-lg sm:text-xl flex items-center justify-center rounded-md transition-colors ${
                        currentEmoji === emoji 
                          ? "text-white border-2 border-white" 
                          : "bg-[var(--app-gray)]/80 hover:bg-[var(--app-gray-dark)]/90"
                      }`}
                      style={{ backgroundColor: currentEmoji === emoji ? currentTheme.colors.primary : "" }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
} 