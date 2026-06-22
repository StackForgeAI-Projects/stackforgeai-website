/**
 * Homepage testimonial portraits — real photography (Unsplash), not AI-generated.
 * Each client is a distinct person so no face repeats across the site.
 */
export const mainTestimonialAvatars = {
  sandrine: {
    src: "/testimonials/main-sandrine.jpg",
    alt: "Portrait of Sandrine I., director of digital at a Kigali institute",
  },
  eric: {
    src: "/testimonials/main-eric.jpg",
    alt: "Portrait of Eric N., chief technology officer at a pan-African fintech",
  },
  patrick: {
    src: "/testimonials/main-patrick.jpg",
    alt: "Portrait of Patrick H., founder of an African agritech startup",
  },
} as const;

export type MainTestimonialAvatarKey = keyof typeof mainTestimonialAvatars;
