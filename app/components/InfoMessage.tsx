"use client";

import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

export function InfoMessage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6 mt-4 overflow-hidden">
      <div className="p-4 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)] shadow-sm transition-all duration-300">
        <div className="flex items-start">
          <div className="text-[var(--app-accent)] mr-3 mt-1 flex-shrink-0">
            <FaInfoCircle size={18} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-1 text-[var(--app-foreground)]">Create Your BuilderCard</h2>
            <p className="text-sm text-[var(--app-foreground-muted)] mb-2">
              Build and cast your personal BuilderCard to showcase your projects and connect with other builders on Base.
            </p>
            
            {expanded && (
              <div className="mt-3 text-xs text-[var(--app-foreground-muted)] space-y-2 animate-fade-in">
                <p>👤 <span className="font-medium">Step 1:</span> Fill in your builder identity info</p>
                <p>🎨 <span className="font-medium">Step 2:</span> Customize your card&apos;s appearance</p>
                <p>🚀 <span className="font-medium">Step 3:</span> Review and cast to your feed</p>
              </div>
            )}
            
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="text-xs font-medium text-[var(--app-accent)] mt-2 flex items-center hover:underline focus:outline-none"
            >
              {expanded ? "Show less" : "Learn more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 