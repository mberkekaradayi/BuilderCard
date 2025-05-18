"use client";

import { FaRocket } from "react-icons/fa";
import { useState } from "react";

export function ComingSoonMessage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6 mt-8 overflow-hidden">
      <div className="p-4 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)] shadow-sm transition-all duration-300">
        <div className="flex items-start">
          <div className="text-[var(--app-accent)] mr-3 mt-1 flex-shrink-0">
            <FaRocket size={18} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-1 text-[var(--app-foreground)]">Coming Soon</h2>
        
    
            {expanded && (
              <div className="mt-3 text-xs text-[var(--app-foreground-muted)] space-y-3 animate-fade-in ">
                <p>📣 <span className="font-medium">Direct Farcaster Posting:</span> Share your BuilderCard directly to your Farcaster feed</p>
                <p>🔄 <span className="font-medium">Project Updates:</span> Keep your BuilderCard up-to-date with your latest achievements</p>
                <p>🤝 <span className="font-medium">Builder Discovery:</span> Connect with other builders through a searchable directory</p>
              </div>
            )}
            
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="text-xs font-medium text-[var(--app-accent)] mt-2 flex items-center hover:underline focus:outline-none"
            >
              {expanded ? "Show less" : "What's next?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
