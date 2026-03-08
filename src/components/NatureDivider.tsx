import mountainFog from "@/assets/mountain-fog.jpg";
import coralSunlight from "@/assets/coral-sunlight.jpg";

const LeafDivider = ({ flip = false, className = "" }: { flip?: boolean; className?: string }) => (
  <div className={`relative w-full overflow-hidden ${className}`} style={{ transform: flip ? "scaleY(-1)" : undefined }}>
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
      <path d="M0 40C120 20 240 60 360 35C480 10 600 55 720 40C840 25 960 50 1080 30C1200 10 1320 45 1440 40V80H0V40Z" fill="hsl(155 25% 5%)" />
      <ellipse cx="200" cy="38" rx="30" ry="8" fill="hsl(152 55% 35% / 0.08)" transform="rotate(-15 200 38)" />
      <ellipse cx="700" cy="32" rx="25" ry="6" fill="hsl(38 75% 48% / 0.06)" transform="rotate(10 700 32)" />
      <ellipse cx="1100" cy="42" rx="20" ry="5" fill="hsl(152 55% 35% / 0.06)" transform="rotate(-8 1100 42)" />
    </svg>
  </div>
);

const VineDivider = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-full overflow-hidden ${className}`}>
    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
      <path d="M0 30Q360 5 720 30T1440 30V60H0Z" fill="hsl(155 25% 5%)" />
      <path d="M300 28C310 20 325 22 320 30C315 38 330 35 335 28" stroke="hsl(152 55% 45% / 0.1)" strokeWidth="1.5" fill="none" />
      <path d="M900 25C910 18 920 22 918 28C916 34 928 30 932 24" stroke="hsl(38 75% 48% / 0.08)" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

/** Full-bleed nature photo strip — tall enough to actually see the image */
const NaturePhotoStrip = ({ variant = "canopy", className = "" }: { variant?: "canopy" | "leaves"; className?: string }) => {
  const img = variant === "canopy" ? mountainFog : coralSunlight;
  const annotation = variant === "canopy" 
    ? "somewhere above the clouds ☁️" 
    : "life finds a way, even underwater 🐠";

  return (
    <div className={`relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden ${className}`}>
      <img
        src={img}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {/* Much lighter overlays — let the photo breathe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_25%_5%/0.6)] via-transparent to-[hsl(155_25%_5%/0.6)]" />
      
      {/* Handwritten annotation pinned to the photo */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8">
        <span 
          className="font-handwritten text-white/60 text-sm sm:text-lg italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{ transform: "rotate(-2deg)", display: "inline-block" }}
        >
          — {annotation}
        </span>
      </div>
    </div>
  );
};

/** Handwritten annotation component for sprinkling personality */
const HandwrittenNote = ({ 
  children, 
  rotate = -2, 
  className = "" 
}: { 
  children: React.ReactNode; 
  rotate?: number; 
  className?: string;
}) => (
  <span 
    className={`font-handwritten text-accent/70 inline-block ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {children}
  </span>
);

export { LeafDivider, VineDivider, NaturePhotoStrip, HandwrittenNote };
