import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, ExternalLink } from "lucide-react";
import { useState } from "react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoUrl: string;
  title: string;
}

export function PreviewModal({ isOpen, onClose, demoUrl, title }: PreviewModalProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex flex-col w-full h-full max-w-[1600px] max-h-[900px] bg-[#111] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border-b border-white/5">
              <div className="flex items-center gap-4">
                <h3 className="text-white font-display font-semibold hidden sm:block">
                  {title} - Live Preview
                </h3>
                <div className="flex bg-black/50 rounded-lg p-1 border border-white/5 ml-4">
                  <button
                    onClick={() => setDevice("desktop")}
                    className={`p-2 rounded-md transition-colors ${
                      device === "desktop" ? "bg-primary text-black" : "text-gray-400 hover:text-white"
                    }`}
                    title="Desktop View"
                  >
                    <Monitor size={18} />
                  </button>
                  <button
                    onClick={() => setDevice("mobile")}
                    className={`p-2 rounded-md transition-colors ${
                      device === "mobile" ? "bg-primary text-black" : "text-gray-400 hover:text-white"
                    }`}
                    title="Mobile View"
                  >
                    <Smartphone size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">Open in new tab</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 w-full flex items-center justify-center bg-[#0a0a0a] p-4 sm:p-8 overflow-hidden">
              <motion.div
                layout
                initial={false}
                animate={{
                  width: device === "desktop" ? "100%" : "375px",
                  height: "100%",
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative rounded-xl overflow-hidden bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
              >
                {/* Fake Browser Chrome for Mobile */}
                {device === "mobile" && (
                  <div className="absolute top-0 left-0 w-full h-6 bg-black flex items-center justify-center z-10 rounded-t-xl">
                    <div className="w-16 h-1.5 bg-white/20 rounded-full"></div>
                  </div>
                )}
                
                <iframe
                  src={demoUrl}
                  className={`w-full h-full bg-white border-none ${device === "mobile" ? "pt-6" : ""}`}
                  title={`${title} Preview`}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
