import { Stethoscope, Phone, MapPin, Clock, Mail, Home, Ambulance, Briefcase, MessageSquare, Play, Users } from "lucide-react";

interface FooterProps {
  onOpenHomeVisit: () => void;
  onOpenAmbulance: () => void;
  onOpenCareer: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const footerLinks = {
  services: [
    { label: "Терапия", href: "#services" },
    { label: "Кардиология", href: "#services" },
    { label: "Неврология", href: "#services" },
    { label: "Педиатрия", href: "#services" },
    { label: "Стоматология", href: "#services" },
    { label: "Лабораторные анализы", href: "#services" },
  ],
  info: [
    { label: "О клинике", href: "#about" },
    { label: "Врачи", href: "#doctors" },
    { label: "Цены", href: "#prices" },
    { label: "Блог", href: "#blog" },
  ],
};

export function Footer({ onOpenHomeVisit, onOpenAmbulance, onOpenCareer, onOpenPrivacy, onOpenTerms }: FooterProps) {
  return (
    <footer id="contacts" className="bg-foreground text-primary-foreground py-16">
      <div className="container">
        {/* Special Services */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <button
            onClick={onOpenHomeVisit}
            className="flex items-center gap-4 p-4 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors text-left"
          >
            <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center">
              <Home className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Анализы на дому</h4>
              <p className="text-xs text-primary-foreground/60">Выезд медсестры</p>
            </div>
          </button>
          <button
            onClick={onOpenAmbulance}
            className="flex items-center gap-4 p-4 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors text-left"
          >
            <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center">
              <Ambulance className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Частная скорая</h4>
              <p className="text-xs text-primary-foreground/60">Приезд за 15-30 мин</p>
            </div>
          </button>
          <button
            onClick={onOpenCareer}
            className="flex items-center gap-4 p-4 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors text-left"
          >
            <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Работа у нас</h4>
              <p className="text-xs text-primary-foreground/60">Открытые вакансии</p>
            </div>
          </button>
        </div>

        {/* Map - Yandex */}
        <div className="mb-12 rounded-lg overflow-hidden h-64">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7f9c8e5f0f8a4f5d9b0c8e5f0f8a4f5d&amp;source=constructor&amp;ll=37.617635%2C55.755814&amp;z=15&amp;pt=37.617635%2C55.755814%2Cpm2rdm"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Карта клиники"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold font-heading">Медикал Плюс</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
              Современная многопрофильная клиника с 12-летним опытом работы. Мы заботимся о вашем здоровье.
            </p>
            <div className="flex gap-3">
              {/* VKontakte */}
              <a
                href="https://vk.com/medicalplus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-[#0077FF] hover:-translate-y-0.5 transition-all"
                title="ВКонтакте"
              >
                <Users className="w-4 h-4" />
              </a>
              {/* Rutube */}
              <a
                href="https://rutube.ru/channel/medicalplus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-[#D4262E] hover:-translate-y-0.5 transition-all"
                title="Rutube"
              >
                <Play className="w-4 h-4" />
              </a>
              {/* Messenger Max */}
              <a
                href="https://max.ru/medicalplus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-[#168DE2] hover:-translate-y-0.5 transition-all"
                title="Max Messenger"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent after:rounded-full">
              Услуги
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent after:rounded-full">
              Информация
            </h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent after:rounded-full">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  г. Москва, ул. Тверская, д. 15
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+74951234567"
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@medical-plus.ru"
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  info@medical-plus.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Пн-Пт: 8:00-21:00<br />
                  Сб-Вс: 9:00-18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-primary-foreground/10 text-center text-primary-foreground/50 text-xs">
          <p>© 2026 Медикал Плюс. Все права защищены. ООО «Медикал Плюс» | ИНН 7700000000 | ОГРН 1234567890123</p>
          <p className="mt-2 space-x-3">
            <button onClick={onOpenPrivacy} className="hover:text-primary-foreground transition-colors underline-offset-2 hover:underline">
              Политика конфиденциальности
            </button>
            <span>|</span>
            <button onClick={onOpenTerms} className="hover:text-primary-foreground transition-colors underline-offset-2 hover:underline">
              Пользовательское соглашение
            </button>
            <span>|</span>
            <a href="#" className="hover:text-primary-foreground transition-colors underline-offset-2 hover:underline">
              Лицензии
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
