import { Calendar, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onOpenAppointment: () => void;
}

export function HeroSection({ onOpenAppointment }: HeroSectionProps) {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-hero text-primary-foreground pt-32 pb-40 overflow-hidden hero-wave">
      <div className="container relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            Медицина будущего уже сегодня
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 font-light">
            Инновационные технологии лечения, лучшие специалисты и индивидуальный подход к каждому пациенту в современной клинике премиум-класса.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onOpenAppointment}
              variant="accent"
              size="lg"
              className="gap-2 text-base"
            >
              <Calendar className="w-5 h-5" />
              Записаться на приём
            </Button>
            <Button
              onClick={scrollToAbout}
              variant="secondary"
              size="lg"
              className="gap-2 text-base bg-primary-foreground/10 hover:bg-primary-foreground/20 border-0"
            >
              <ArrowDown className="w-5 h-5" />
              Узнать больше
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
    </section>
  );
}
