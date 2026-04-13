import { useState } from "react";
import { Menu, Phone, X, Stethoscope, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onOpenAppointment: () => void;
  onOpenLogin: () => void;
  onOpenHomeVisit: () => void;
  onOpenAmbulance: () => void;
  onOpenCareer: () => void;
}

const navLinks = [
  { href: "#about", label: "О клинике" },
  { href: "#services", label: "Услуги" },
  { href: "#prices", label: "Цены" },
  { href: "#doctors", label: "Врачи" },
  { href: "#blog", label: "Блог" },
  { href: "#contacts", label: "Контакты" },
];

export function Header({ onOpenAppointment, onOpenLogin, onOpenHomeVisit, onOpenAmbulance, onOpenCareer }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-soft animate-slide-down">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center transition-transform group-hover:scale-105">
            <Stethoscope className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-primary font-heading tracking-tight">
            Медикал Плюс
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Phone */}
          <a
            href="tel:+74951234567"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-semibold transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span>+7 (495) 123-45-67</span>
          </a>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="lg:hidden rounded-full w-12 h-12"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-6 border-b text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-primary font-heading">
                      Медикал Плюс
                    </span>
                  </div>
                  <a
                    href="tel:+74951234567"
                    className="flex items-center justify-center gap-2 text-primary font-semibold text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    +7 (495) 123-45-67
                  </a>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className="w-full text-left px-4 py-3 rounded-lg text-foreground font-medium hover:bg-primary-light hover:text-primary hover:translate-x-2 transition-all border-l-4 border-transparent hover:border-primary"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Actions */}
                <div className="p-6 border-t space-y-3">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAppointment();
                    }}
                    className="w-full gap-2"
                    variant="accent"
                  >
                    <Calendar className="w-4 h-4" />
                    Записаться
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full gap-2"
                    variant="default"
                  >
                    <User className="w-4 h-4" />
                    Личный кабинет
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button onClick={onOpenLogin} variant="outline" className="gap-2">
              <User className="w-4 h-4" />
              Кабинет
            </Button>
            <Button onClick={onOpenAppointment} variant="accent" className="gap-2">
              <Calendar className="w-4 h-4" />
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
