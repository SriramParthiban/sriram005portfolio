import mountainFog from "@/assets/mountain-fog.jpg";
import coralSunlight from "@/assets/coral-sunlight.jpg";

/** Full-bleed nature photo strip — tall, clearly visible */
const NaturePhotoStrip = ({ variant = "canopy", className = "" }: { variant?: "canopy" | "leaves"; className?: string }) => {
  const img = variant === "canopy" ? mountainFog : coralSunlight;

  return (
    <div className={`relative w-full h-44 sm:h-56 md:h-72 lg:h-80 overflow-hidden ${className}`}>
      <img
        src={img}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {/* Subtle edge blending only — let the photo dominate */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_25%_5%/0.5)] via-transparent to-[hsl(155_25%_5%/0.5)]" />
    </div>
  );
};

export { NaturePhotoStrip };
