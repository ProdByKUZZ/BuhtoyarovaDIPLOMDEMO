import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkupPrograms } from "@/data/clinicData";

interface CheckupProgramsProps {
  onOpenAppointment: () => void;
}

export function CheckupPrograms({ onOpenAppointment }: CheckupProgramsProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Программы чек-апов
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Комплексные программы обследования для вашего здоровья по специальным ценам
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {checkupPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-card rounded-xl p-6 shadow-soft card-hover flex flex-col"
            >
              <div className="mb-4">
                <span className="medical-badge text-xs">{program.forWhom}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                {program.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                {program.description}
              </p>

              {/* Services */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Включает:</p>
                <ul className="space-y-1">
                  {program.services.slice(0, 4).map((service, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                  {program.services.length > 4 && (
                    <li className="text-sm text-primary font-medium">
                      + ещё {program.services.length - 4} услуг
                    </li>
                  )}
                </ul>
              </div>

              {/* Duration & Price */}
              <div className="pt-4 border-t mb-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Длительность: {program.duration}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {program.price.toLocaleString("ru-RU")} ₽
                </p>
              </div>

              <Button onClick={onOpenAppointment} variant="ghost" className="w-full gap-2 text-primary border border-primary/20 hover:bg-primary/5">
                Подробнее
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
