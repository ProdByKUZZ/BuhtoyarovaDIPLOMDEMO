import { useState } from "react";
import { Home, Clock, Phone, CheckCircle, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HomeVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const homeVisitServices = [
  "Общий анализ крови",
  "Биохимический анализ крови",
  "Анализ мочи",
  "Гормоны щитовидной железы",
  "Коагулограмма",
  "Маркеры инфекций (ВИЧ, гепатиты)",
  "Мазки на флору",
  "ПЦР-тесты",
];

export function HomeVisitModal({ isOpen, onClose }: HomeVisitModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    tests: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
      date: "",
      time: "",
      tests: "",
      comment: "",
    });
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Заявка отправлена!
            </h2>
            <p className="text-muted-foreground mb-6">
              Наш менеджер свяжется с вами в течение 30 минут для подтверждения времени выезда.
            </p>
            <Button onClick={handleClose} variant="accent">
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-primary flex items-center gap-2">
            <Home className="w-6 h-6" />
            Сдать анализы на дому
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Info Block */}
          <div className="bg-primary-light rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">Преимущества выезда на дом:</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Выезд медсестры в удобное для вас время
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Все необходимые расходные материалы включены
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Результаты на email в течение 24-48 часов
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Стоимость выезда — от 500₽ (бесплатно при заказе от 3000₽)
              </li>
            </ul>
          </div>

          {/* Available Tests */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Доступные анализы:</h4>
            <div className="flex flex-wrap gap-2">
              {homeVisitServices.map((test, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-light text-muted-foreground text-sm border border-border"
                >
                  {test}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес *</Label>
              <Input
                id="address"
                placeholder="г. Москва, ул. Примерная, д. 1, кв. 10"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Желаемая дата *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Желаемое время</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tests">Какие анализы нужно сдать? *</Label>
              <Textarea
                id="tests"
                placeholder="Перечислите необходимые анализы или прикрепите направление"
                value={formData.tests}
                onChange={(e) => setFormData({ ...formData, tests: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                placeholder="Дополнительная информация (код домофона, этаж и т.д.)"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full gap-2"
              disabled={!formData.name || !formData.phone || !formData.address || !formData.date || !formData.tests}
            >
              <TestTube className="w-5 h-5" />
              Оформить заявку
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
