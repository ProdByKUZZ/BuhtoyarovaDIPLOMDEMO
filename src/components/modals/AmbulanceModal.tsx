import { useState } from "react";
import { Ambulance, Clock, Phone, CheckCircle, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AmbulanceModal({ isOpen, onClose }: AmbulanceModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    urgency: "",
    symptoms: "",
    patientAge: "",
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
      urgency: "",
      symptoms: "",
      patientAge: "",
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
              Заявка принята!
            </h2>
            <p className="text-muted-foreground mb-4">
              Диспетчер свяжется с вами в течение 2-3 минут для уточнения деталей.
            </p>
            <p className="text-sm text-accent font-semibold mb-6">
              При угрозе жизни звоните 112 или 103!
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
            <Ambulance className="w-6 h-6" />
            Вызов частной скорой помощи
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Emergency Warning */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <p className="text-destructive font-semibold text-center">
              ⚠️ При угрозе жизни немедленно звоните 112 или 103!
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-primary-light rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-3">Наша скорая помощь:</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>Прибытие за 15-30 минут</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>Врачи высшей категории</span>
              </div>
              <div className="flex items-center gap-2">
                <Ambulance className="w-4 h-4 text-accent" />
                <span>Современное оборудование</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>Круглосуточно без выходных</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-light rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Стоимость:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Выезд бригады — от 5 000 ₽</li>
              <li>• Консультация врача на дому — от 7 000 ₽</li>
              <li>• Транспортировка в стационар — от 10 000 ₽</li>
            </ul>
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
                <Label htmlFor="phone">Телефон для связи *</Label>
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
              <Label htmlFor="address">Адрес вызова *</Label>
              <Input
                id="address"
                placeholder="г. Москва, ул. Примерная, д. 1, кв. 10 (код домофона)"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Срочность *</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите срочность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Срочно (до 30 мин)</SelectItem>
                    <SelectItem value="moderate">В ближайшее время (до 1 часа)</SelectItem>
                    <SelectItem value="planned">Плановый вызов</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientAge">Возраст пациента</Label>
                <Input
                  id="patientAge"
                  placeholder="Например, 45 лет"
                  value={formData.patientAge}
                  onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Опишите симптомы/причину вызова *</Label>
              <Textarea
                id="symptoms"
                placeholder="Опишите, что беспокоит пациента: симптомы, когда началось, что предпринимали"
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full gap-2"
              disabled={!formData.name || !formData.phone || !formData.address || !formData.urgency || !formData.symptoms}
            >
              <Ambulance className="w-5 h-5" />
              Вызвать скорую
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Или позвоните: <a href="tel:+74951234599" className="text-accent font-semibold">+7 (495) 123-45-99</a>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
