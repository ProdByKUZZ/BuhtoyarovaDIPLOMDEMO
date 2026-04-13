import { useState } from "react";
import { Briefcase, CheckCircle, Users, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const vacancies = [
  { id: "therapist", name: "Терапевт" },
  { id: "cardiologist", name: "Кардиолог" },
  { id: "neurologist", name: "Невролог" },
  { id: "pediatrician", name: "Педиатр" },
  { id: "dentist", name: "Стоматолог" },
  { id: "gynecologist", name: "Гинеколог" },
  { id: "nurse", name: "Медицинская сестра" },
  { id: "administrator", name: "Администратор" },
  { id: "other", name: "Другая позиция" },
];

export function CareerModal({ isOpen, onClose }: CareerModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    education: "",
    about: "",
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
      email: "",
      position: "",
      experience: "",
      education: "",
      about: "",
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
              Спасибо за интерес к работе в нашей клинике! HR-специалист свяжется с вами в течение 3 рабочих дней.
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
            <Briefcase className="w-6 h-6" />
            Работа в Медикал Плюс
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Why Us */}
          <div className="bg-primary-light rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-3">Почему выбирают нас:</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Дружный коллектив профессионалов</span>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Бесплатное обучение и повышение квалификации</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Конкурентная заработная плата</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>ДМС для сотрудников и членов семьи</span>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Открытые вакансии:</h4>
            <div className="flex flex-wrap gap-2">
              {vacancies.map((vacancy) => (
                <span
                  key={vacancy.id}
                  className="px-3 py-1 rounded-full bg-light text-muted-foreground text-sm border border-border"
                >
                  {vacancy.name}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">ФИО *</Label>
                <Input
                  id="name"
                  placeholder="Иванов Иван Иванович"
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
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Желаемая должность *</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                  <SelectContent>
                    {vacancies.map((vacancy) => (
                      <SelectItem key={vacancy.id} value={vacancy.id}>
                        {vacancy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Опыт работы</Label>
                <Input
                  id="experience"
                  placeholder="Например, 5 лет"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Образование</Label>
              <Input
                id="education"
                placeholder="Название учебного заведения, год окончания"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">Расскажите о себе</Label>
              <Textarea
                id="about"
                placeholder="Ваш опыт, навыки, почему хотите работать у нас"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                rows={4}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              * Вы также можете отправить резюме на email: <a href="mailto:hr@medical-plus.ru" className="text-accent font-semibold">hr@medical-plus.ru</a>
            </p>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full gap-2"
              disabled={!formData.name || !formData.phone || !formData.email || !formData.position}
            >
              <Briefcase className="w-5 h-5" />
              Отправить заявку
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
