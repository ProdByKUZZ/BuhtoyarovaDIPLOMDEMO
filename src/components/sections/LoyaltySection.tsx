import { Gift, Star, Percent, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Gift,
    title: "Кэшбэк бонусами",
    description: "До 5% от стоимости каждой услуги возвращается бонусами на ваш счёт"
  },
  {
    icon: Star,
    title: "1 бонус = 1 рубль",
    description: "Оплачивайте бонусами до 20% стоимости услуг при следующем визите"
  },
  {
    icon: Calendar,
    title: "Бонусы на праздники",
    description: "500 бонусов на Новый Год, 8 Марта и другие праздники. 1000 бонусов в день рождения!"
  },
  {
    icon: Percent,
    title: "Скидка за отзыв",
    description: "Оставьте отзыв на 2ГИС и получите промокод на 10% скидку"
  }
];

export function LoyaltySection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Программа лояльности
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Заботьтесь о здоровье и получайте бонусы за каждый визит
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-soft border border-border/50 hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-primary-light text-primary">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-primary rounded-xl p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-heading font-bold mb-3">Начните копить бонусы уже сегодня</h3>
          <p className="opacity-90 max-w-xl mx-auto">
            Программа лояльности активируется автоматически при первом визите. 
            Отслеживайте баланс бонусов в личном кабинете.
          </p>
        </div>
      </div>
    </section>
  );
}
