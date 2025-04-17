
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

const MobileWarning: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("stickyToonMobileDismissed");
    setHasBeenDismissed(!!dismissed);
    
    if (isMobile && !dismissed) {
      setIsOpen(true);
    }
  }, [isMobile]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("stickyToonMobileDismissed", "true");
    setHasBeenDismissed(true);
  };

  if (!isMobile || hasBeenDismissed || !isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 pr-10 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
        <h3 className="font-bold text-lg mb-2">Tip: Desktop Experience</h3>
        <p className="text-sm text-gray-600">
          For the best experience with dragging and organizing notes, we recommend using Sticky Toon Notes on a desktop device.
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
