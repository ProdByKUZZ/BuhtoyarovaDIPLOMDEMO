import { UserCheck, Microscope, HandCoins, Heart, Ambulance, Laptop } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Опытные врачи",
    description: "Более 50 врачей высшей категории, кандидатов и докторов медицинских наук"
  },
  {
    icon: Microscope,
    title: "Современная диагностика",
    description: "Новейшее оборудование экспертного класса для точной диагностики"
  },
  {
    icon: HandCoins,
    title: "Доступные цены",
    description: "Прозрачное ценообразование и программы лояльности для пациентов"
  },
  {
    icon: Heart,
    title: "Забота и комфорт",
    description: "Индивидуальный подход и комфортные условия премиум-класса"
  },
  {
    icon: Ambulance,
    title: "Экстренная помощь",
    description: "Круглосуточная служба неотложной помощи и скорая медицинская помощь"
  },
  {
    icon: Laptop,
    title: "Онлайн-консультации",
    description: "Дистанционные консультации с врачами через видеосвязь в удобное время"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Почему выбирают нас
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-card rounded-lg p-8 text-center shadow-soft card-hover border border-transparent hover:border-primary-light"
            >
              <div className="feature-icon mx-auto mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
