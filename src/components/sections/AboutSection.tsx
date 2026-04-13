import { CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { title: "Более 12 лет опыта", description: "Успешной работы на медицинском рынке" },
  { title: "50+ специалистов", description: "Врачей разных направлений" },
  { title: "20 000+ пациентов", description: "Доверивших нам свое здоровье" },
  { title: "Современное оборудование", description: "Для точной диагностики и лечения" }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            О нашей клинике
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-hover transition-transform hover:scale-[1.02]">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Интерьер клиники"
              className="w-full h-auto"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
              Ваше здоровье — наша главная ценность
            </h3>
            <p className="text-muted-foreground mb-4 text-lg">
              В клинике «Медикал Плюс» мы создали пространство, где современные медицинские технологии сочетаются с теплым, человеческим отношением к каждому пациенту.
            </p>
            <p className="text-muted-foreground mb-8">
              Наша команда — это более 50 высококвалифицированных специалистов, которые ежедневно доказывают, что качественная медицина может быть доступной и комфортной.
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-light hover:bg-primary-light hover:translate-x-2 transition-all"
                >
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="accent" className="gap-2">
              <FileText className="w-4 h-4" />
              Наши лицензии
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
