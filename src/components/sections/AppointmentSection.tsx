import { Calendar, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppointmentSectionProps {
  onOpenAppointment: () => void;
}

export function AppointmentSection({ onOpenAppointment }: AppointmentSectionProps) {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Запишитесь на приём онлайн
          </h2>
          <p className="text-lg opacity-90 mb-10">
            Выберите удобное время и врача. Мы свяжемся с вами для подтверждения записи в течение 15 минут.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary-foreground/10">
              <Clock className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">Быстрая запись</p>
                <p className="text-xs opacity-80">За 2 минуты</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary-foreground/10">
              <Phone className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">Подтверждение</p>
                <p className="text-xs opacity-80">В течение 15 минут</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary-foreground/10">
              <Mail className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">SMS-напоминание</p>
                <p className="text-xs opacity-80">За день до визита</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary-foreground/10">
              <Calendar className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">Личный кабинет</p>
                <p className="text-xs opacity-80">История визитов</p>
              </div>
            </div>
          </div>

          <Button
            onClick={onOpenAppointment}
            variant="accent"
            size="lg"
            className="gap-2"
          >
            <Calendar className="w-5 h-5" />
            Записаться на приём
          </Button>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-foreground/5 rounded-full blur-3xl" />
    </section>
  );
}
