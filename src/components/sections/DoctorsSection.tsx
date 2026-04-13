import { useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/data/clinicData";

interface DoctorsSectionProps {
  onOpenDoctorDetails: (doctorId: number) => void;
  onOpenAppointment: (doctorId?: number) => void;
}

export function DoctorsSection({ onOpenDoctorDetails, onOpenAppointment }: DoctorsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="doctors" className="py-20 bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Наши врачи
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Высококвалифицированные специалисты с многолетним опытом работы
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-2 py-4 md:px-12"
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctor-card flex-shrink-0 w-[280px] bg-card rounded-lg overflow-hidden shadow-soft card-hover flex flex-col"
              >
                <div
                  className="doctor-image bg-light-gray"
                  style={{ backgroundImage: `url(${doctor.photo})` }}
                />
                <div className="p-5 text-center flex-1 flex flex-col">
                  <h3 className="text-base font-heading font-bold text-foreground mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-accent font-medium text-sm mb-1">{doctor.specialty}</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Стаж: {doctor.experience}
                  </p>

                  <div className="flex gap-2 mt-auto pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs h-8"
                      onClick={() => onOpenDoctorDetails(doctor.id)}
                    >
                      <User className="w-3.5 h-3.5 mr-1" />
                      Профиль
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs h-8 text-primary border border-primary/20 hover:bg-primary/5"
                      onClick={() => onOpenAppointment(doctor.id)}
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      Записаться
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
