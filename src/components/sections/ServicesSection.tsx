import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { services } from "@/data/clinicData";

interface ServicesSectionProps {
  onOpenServiceDetails: (serviceId: number) => void;
}

export function ServicesSection({ onOpenServiceDetails }: ServicesSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -370 : 370;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Наши услуги
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-2 py-4 md:px-12"
          >
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => onOpenServiceDetails(service.id)}
                className="service-card flex-shrink-0 w-[320px] bg-card rounded-xl overflow-hidden shadow-soft cursor-pointer group hover:-translate-y-2 hover:shadow-hover transition-all duration-300 border border-transparent hover:border-primary/20"
              >
                <div className="relative overflow-hidden">
                  <div
                    className="service-image bg-light-gray group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold px-4 py-2 rounded-full bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground group-hover:gap-3 transition-all duration-300">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
