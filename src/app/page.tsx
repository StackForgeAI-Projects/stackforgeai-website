import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Products } from "@/components/sections/products";
import { Services } from "@/components/sections/services";
import { Impact } from "@/components/sections/impact";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background text-foreground min-h-screen antialiased">
        <Hero />
        <About />
        <Products />
        {/* Bridge wrapper: a single SF watermark spans Services → Impact,
            sitting on z-index -1 behind both. `isolate` keeps stacking scoped
            and `overflow-x-clip` keeps the oversized rotated bg from causing
            horizontal scroll. */}
        <div className="relative isolate overflow-x-clip">
          <div
            aria-hidden
            className="pointer-events-none absolute select-none"
            style={{
              left: "78%",
              top: "50%",
              width: "min(4200px, 300vw)",
              aspectRatio: "3 / 1",
              backgroundImage: "url('/sf-bg-logo.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              opacity: 0.13,
              transform: "translate(-50%, -50%) rotate(-12deg)",
              maskImage: "radial-gradient(ellipse 75% 100% at 50% 50%, black 70%, transparent 98%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 100% at 50% 50%, black 70%, transparent 98%)",
              zIndex: -1,
            }}
          />
          <Services />
          <Impact />
        </div>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
