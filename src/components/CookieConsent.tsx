import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-slide-up">
      <div className="container">
        <div className="bg-card border border-border rounded-xl p-6 shadow-hover max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Cookie className="w-8 h-8 text-accent flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-foreground">
              Мы используем файлы cookie для улучшения работы сайта и анализа трафика. 
              Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
              <button
                onClick={() => document.getElementById("privacy-modal")?.click()}
                className="text-primary underline hover:no-underline"
              >
                Политикой конфиденциальности
              </button>{" "}
              и{" "}
              <button
                onClick={() => document.getElementById("terms-modal")?.click()}
                className="text-primary underline hover:no-underline"
              >
                Пользовательским соглашением
              </button>.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button onClick={decline} variant="outline" size="sm">
              Отклонить
            </Button>
            <Button onClick={accept} variant="accent" size="sm">
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
