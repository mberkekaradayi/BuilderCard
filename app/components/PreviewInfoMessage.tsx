"use client";

import { FaEye } from "react-icons/fa";
import { useState } from "react";

export function PreviewInfoMessage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6 mt-4 overflow-hidden">
      <div className="p-4 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)] shadow-sm transition-all duration-300">
        <div className="flex items-start">
          <div className="text-[var(--app-accent)] mr-3 mt-1 flex-shrink-0">
            <FaEye size={18} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-1 text-[var(--app-foreground)]">Preview Mode</h2>
            <p className="text-sm text-[var(--app-foreground-muted)] mb-2">
              This is a preview of your BuilderCard. You can see how it will appear to other users.
            </p>
            
            {expanded && (
              <div className="mt-3 text-xs text-[var(--app-foreground-muted)] space-y-3 animate-fade-in ">
                <p>👁️ <span className="font-medium">Preview:</span> See your card as others will see it</p>
                <p>🔄 <span className="font-medium">Edit:</span> Return to editing mode to make changes</p>
                <p>✅ <span className="font-medium">Confirm:</span> Save your card when you&apos;re done</p>
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