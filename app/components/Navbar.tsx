"use client";

type NavbarProps = {
  saveFrameButton: React.ReactNode;
};

export function Navbar({ saveFrameButton }: NavbarProps) {
  return (
    <header className="flex justify-between items-center mb-6 h-14 border-b border-[var(--app-card-border)] pb-4">
      <div className="flex items-center space-x-2">
        <div className="bg-[#0052FF] text-white rounded-md w-8 h-8 flex items-center justify-center text-xl">
          🪪
        </div>
        <h1 className="text-2xl font-bold text-[var(--app-foreground)]">BuilderCard</h1>
      </div>
      <div>
        {saveFrameButton}
      </div>
    </header>
  );
} 