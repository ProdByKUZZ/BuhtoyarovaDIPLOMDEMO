import { useState } from "react";
import { Calendar, CheckCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { doctors, prices } from "@/data/clinicData";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctorId?: number;
  appointmentType?: "clinic" | "online";
}

const serviceCategories = [
  { id: "therapy", name: "Терапия" },
  { id: "cardiology", name: "Кардиология" },
  { id: "neurology", name: "Неврология" },
  { id: "pediatrics", name: "Педиатрия" },
  { id: "dentistry", name: "Стоматология" },
  { id: "diagnostics", name: "Диагностика" },
  { id: "gynecology", name: "Гинекология" },
  { id: "analyses", name: "Лабораторные анализы" },
  { id: "rehabilitation", name: "Реабилитация и ЛФК" },
  { id: "psychology", name: "Психотерапия" },
  { id: "vaccination", name: "Вакцинация" },
];

export function AppointmentModal({ isOpen, onClose, selectedDoctorId, appointmentType = "clinic" }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    doctor: selectedDoctorId?.toString() || "",
    date: "",
    time: "",
    promoCode: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) return;
    setIsSuccess(true);
  };

  const handleClose = () => {
    setFormData({ name: "", phone: "", email: "", category: "", doctor: "", date: "", time: "", promoCode: "" });
    setSelectedServices([]);
    setIsSuccess(false);
    setConsentGiven(false);
    onClose();
  };

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) ? prev.filter((s) => s !== serviceName) : [...prev, serviceName]
    );
  };

  const totalPrice = selectedServices.reduce((sum, serviceName) => {
    const allPrices = Object.values(prices).flat();
    const service = allPrices.find((p) => p.service === serviceName);
    return sum + (service?.priceValue || 0);
  }, 0);

  const isOnline = appointmentType === "online";

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Заявка отправлена!</h2>
            <p className="text-muted-foreground mb-6">
              {isOnline
                ? "Мы свяжемся с вами для подтверждения онлайн-консультации в течение 15 минут."
                : "Мы свяжемся с вами в течение 15 минут для подтверждения записи."}
            </p>
            <Button onClick={handleClose} variant="accent">Закрыть</Button>
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
            {isOnline && <Video className="w-6 h-6" />}
            {isOnline ? "Онлайн-консультация" : "Запись на приём"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input id="name" placeholder="Иван Иванов" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input id="phone" type="tel" placeholder="+7 (999) 999-99-99" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@mail.ru" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Направление *</Label>
              <Select value={formData.category} onValueChange={(value) => { setFormData({ ...formData, category: value }); setSelectedServices([]); }}>
                <SelectTrigger><SelectValue placeholder="Выберите направление" /></SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Врач</Label>
              <Select value={formData.doctor} onValueChange={(value) => setFormData({ ...formData, doctor: value })}>
                <SelectTrigger><SelectValue placeholder="Любой врач" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Любой врач</SelectItem>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>{doctor.name} — {doctor.specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.category && prices[formData.category] && (
            <div className="space-y-2">
              <Label>Выберите услуги *</Label>
              <div className="max-h-48 overflow-y-auto border rounded-lg p-3 bg-light space-y-2">
                {prices[formData.category].map((service, index) => (
                  <label key={index} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedServices.includes(service.service) ? "bg-primary-light border-l-4 border-primary" : "hover:bg-primary-light/50"}`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={selectedServices.includes(service.service)} onChange={() => toggleService(service.service)} className="w-4 h-4 accent-primary" />
                      <span className="text-foreground text-sm">{service.service}</span>
                    </div>
                    <span className="font-semibold text-primary whitespace-nowrap text-sm">{service.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {selectedServices.length > 0 && (
            <div className="bg-primary-light p-4 rounded-lg text-center animate-fade-in">
              <span className="text-lg font-semibold text-primary">Итого: {totalPrice.toLocaleString("ru-RU")} ₽</span>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Желаемая дата</Label>
              <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Желаемое время</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                <SelectTrigger><SelectValue placeholder="Выберите время" /></SelectTrigger>
                <SelectContent>
                  {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="promo">Промокод (при наличии)</Label>
            <Input id="promo" placeholder="Например: REVIEW-ABC123" value={formData.promoCode} onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })} />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
            <Checkbox id="consent" checked={consentGiven} onCheckedChange={(checked) => setConsentGiven(checked === true)} className="mt-0.5" />
            <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              Я даю согласие на обработку персональных данных в соответствии с{" "}
              <span className="text-primary underline">Политикой конфиденциальности</span> и{" "}
              <span className="text-primary underline">Пользовательским соглашением</span>
            </Label>
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full gap-2"
            disabled={!formData.name || !formData.phone || !formData.category || selectedServices.length === 0 || !consentGiven}
          >
            {isOnline ? <Video className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
            {isOnline ? "Записаться на онлайн-консультацию" : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
