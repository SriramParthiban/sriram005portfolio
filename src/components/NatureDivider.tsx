import natureWaterfall from "@/assets/nature-waterfall.jpg";
import natureMountains from "@/assets/nature-mountains.jpg";

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

/** Full-bleed nature photo strip between sections */
const NaturePhotoStrip = ({ variant = "canopy", className = "" }: { variant?: "canopy" | "leaves"; className?: string }) => {
  const img = variant === "canopy" ? natureWaterfall : natureMountains;
  return (
    <div className={`relative w-full h-32 sm:h-44 md:h-56 overflow-hidden ${className}`}>
      <img
        src={img}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_25%_5%)] via-transparent to-[hsl(155_25%_5%)]" />
      <div className="absolute inset-0 bg-[hsl(155_25%_5%/0.30)]" />
    </div>
  );
};

export { LeafDivider, VineDivider, NaturePhotoStrip };
