import Landing from "@/components/Landing";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/landing-bg.png"
          alt="Landing background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <Landing />
    </div>
  );
} 