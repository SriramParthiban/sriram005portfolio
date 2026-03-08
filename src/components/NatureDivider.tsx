import mountainFog from "@/assets/mountain-fog.jpg";
import coralSunlight from "@/assets/coral-sunlight.jpg";

/** Full-bleed nature photo strip — tall, clearly visible */
const NaturePhotoStrip = ({ variant = "canopy", className = "" }: { variant?: "canopy" | "leaves"; className?: string }) => {
  const img = variant === "canopy" ? mountainFog : coralSunlight;

  return (
    <div className={`relative w-screen left-1/2 -translate-x-1/2 h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden ${className}`}>
      <img
        src={img}
        alt=""
        className="h-full w-full object-cover object-[center_60%]"
        loading="lazy"
      />
      {/* Very subtle edge blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_25%_5%/0.25)] via-transparent to-[hsl(155_25%_5%/0.25)]" />
    </div>
  );
};

export { NaturePhotoStrip };
