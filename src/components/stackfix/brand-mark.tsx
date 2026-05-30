import Image from "next/image";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="StackForgeAI"
      width={947}
      height={157}
      className={`h-5 w-auto object-contain md:h-6 ${className}`}
      draggable={false}
      priority
    />
  );
}
