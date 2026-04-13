import { useState } from "react";
import { ChevronRight, CheckCircle, RotateCcw, Video, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { symptoms, doctors } from "@/data/clinicData";

interface SymptomCheckerProps {
  onOpenAppointment: (doctorId?: number, type?: "clinic" | "online") => void;
}

const symptomToSpecialty: { [key: string]: string[] } = {
  headache: ["Невролог", "Терапевт"],
  fever: ["Терапевт", "Педиатр"],
  cough: ["Терапевт", "Педиатр"],
  chest_pain: ["Кардиолог", "Терапевт"],
  stomach_pain: ["Терапевт", "Гастроэнтеролог"],
  back_pain: ["Невролог", "Ортопед"],
  fatigue: ["Терапевт", "Эндокринолог"],
  dizziness: ["Невролог", "Кардиолог"],
  shortness_breath: ["Кардиолог", "Терапевт"],
  joint_pain: ["Ревматолог", "Ортопед"],
  skin_rash: ["Дерматолог", "Аллерголог"],
  toothache: ["Стоматолог"],
  anxiety: ["Психолог", "Психотерапевт"],
  insomnia: ["Невролог", "Психотерапевт"],
  vision_problems: ["Офтальмолог"],
};

const bodyParts = [
  { id: "head", label: "Голова" },
  { id: "chest", label: "Грудная клетка" },
  { id: "stomach", label: "Живот" },
  { id: "back", label: "Спина" },
  { id: "joints", label: "Суставы / конечности" },
  { id: "skin", label: "Кожа" },
  { id: "teeth", label: "Зубы / полость рта" },
  { id: "general", label: "Общее состояние" },
  { id: "mental", label: "Эмоциональное состояние" },
];

export function SymptomChecker({ onOpenAppointment }: SymptomCheckerProps) {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [age, setAge] = useState("");
  const [hasChronicDiseases, setHasChronicDiseases] = useState("");
  const [consultationType, setConsultationType] = useState<"clinic" | "online">("clinic");

  // Online consultation booking state
  const [showOnlineForm, setShowOnlineForm] = useState(false);
  const [onlineForm, setOnlineForm] = useState({ name: "", phone: "", date: "", time: "" });
  const [selectedOnlineDoctor, setSelectedOnlineDoctor] = useState<number | null>(null);
  const [onlineBooked, setOnlineBooked] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const getRecommendedDoctors = () => {
    const specialties = new Set<string>();
    selectedSymptoms.forEach((symptomId) => {
      const specs = symptomToSpecialty[symptomId] || [];
      specs.forEach((s) => specialties.add(s));
    });
    return doctors.filter((doctor) =>
      [...specialties].some((spec) => doctor.specialty.includes(spec))
    );
  };

  const getUrgencyLevel = () => {
    if (intensity === "Сильно" && duration === "Сегодня") return "high";
    if (intensity === "Сильно" || (intensity === "Умеренно" && duration === "Больше недели")) return "medium";
    return "low";
  };

  const reset = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setDuration("");
    setIntensity("");
    setBodyPart("");
    setAge("");
    setHasChronicDiseases("");
    setConsultationType("clinic");
    setShowOnlineForm(false);
    setOnlineForm({ name: "", phone: "", date: "", time: "" });
    setSelectedOnlineDoctor(null);
    setOnlineBooked(false);
  };

  const recommendedDoctors = getRecommendedDoctors();
  const urgency = getUrgencyLevel();
  const totalSteps = 4;

  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnlineBooked(true);
  };

  return (
    <section className="py-20 bg-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Подбор врача по симптомам
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ответьте на несколько вопросов, и мы подберём подходящего специалиста
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div key={s} className="flex items-center">
                <div className={`step-indicator ${step > s ? "completed" : step === s ? "active" : "pending"}`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < totalSteps && (
                  <div className={`w-12 h-1 mx-1 rounded-full transition-colors ${step > s ? "bg-secondary" : "bg-light-gray"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Body part + Symptoms */}
          {step === 1 && (
            <div className="bg-card rounded-xl p-8 shadow-soft animate-fade-in">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                Шаг 1: Что вас беспокоит?
              </h3>

              <div className="mb-6">
                <p className="font-medium mb-3 font-sans">Область тела:</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {bodyParts.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => setBodyPart(part.id)}
                      className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                        bodyPart === part.id
                          ? "border-primary bg-primary-light text-primary"
                          : "border-light-gray hover:border-primary/50"
                      }`}
                    >
                      {part.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="font-medium mb-3 font-sans">Выберите симптомы:</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                      selectedSymptoms.includes(symptom.id)
                        ? "border-primary bg-primary-light"
                        : "border-light-gray hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedSymptoms.includes(symptom.id)
                        ? "border-primary bg-primary"
                        : "border-gray"
                    }`}>
                      {selectedSymptoms.includes(symptom.id) && (
                        <CheckCircle className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium text-sm">{symptom.name}</span>
                  </button>
                ))}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={selectedSymptoms.length === 0}
                variant="accent"
                className="w-full gap-2"
              >
                Продолжить
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Duration & Intensity */}
          {step === 2 && (
            <div className="bg-card rounded-xl p-8 shadow-soft animate-fade-in">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                Шаг 2: Подробности
              </h3>

              <div className="mb-6">
                <p className="font-medium mb-3 font-sans">Как давно появились симптомы?</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Сегодня", "2-3 дня", "Неделя", "Больше недели"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setDuration(option)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        duration === option
                          ? "border-primary bg-primary-light"
                          : "border-light-gray hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="font-medium mb-3 font-sans">Насколько сильно вас беспокоит?</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Слегка", "Умеренно", "Сильно"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setIntensity(option)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        intensity === option
                          ? "border-primary bg-primary-light"
                          : "border-light-gray hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">Назад</Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!duration || !intensity}
                  variant="accent"
                  className="flex-1 gap-2"
                >
                  Продолжить
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Additional info */}
          {step === 3 && (
            <div className="bg-card rounded-xl p-8 shadow-soft animate-fade-in">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                Шаг 3: Дополнительная информация
              </h3>

              <div className="mb-6">
                <p className="font-medium mb-3 font-sans">Ваш возраст:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["До 18 лет", "18-35 лет", "36-55 лет", "Старше 55"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setAge(option)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        age === option
                          ? "border-primary bg-primary-light"
                          : "border-light-gray hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="font-medium mb-3 font-sans">Есть ли хронические заболевания?</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Нет", "Да", "Не знаю"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setHasChronicDiseases(option)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        hasChronicDiseases === option
                          ? "border-primary bg-primary-light"
                          : "border-light-gray hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="font-medium mb-3 font-sans">Формат консультации:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConsultationType("clinic")}
                    className={`p-4 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-3 ${
                      consultationType === "clinic"
                        ? "border-primary bg-primary-light"
                        : "border-light-gray hover:border-primary/50"
                    }`}
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">В клинике</p>
                      <p className="text-xs text-muted-foreground">Очный приём</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setConsultationType("online")}
                    className={`p-4 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-3 ${
                      consultationType === "online"
                        ? "border-primary bg-primary-light"
                        : "border-light-gray hover:border-primary/50"
                    }`}
                  >
                    <Video className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">Онлайн</p>
                      <p className="text-xs text-muted-foreground">Видеоконсультация</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">Назад</Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!age || !hasChronicDiseases}
                  variant="accent"
                  className="flex-1 gap-2"
                >
                  Получить рекомендации
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="bg-card rounded-xl p-8 shadow-soft animate-fade-in">
              {/* Urgency alert */}
              {urgency === "high" && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive text-sm">Рекомендуем срочный осмотр</p>
                    <p className="text-sm text-muted-foreground">Ваши симптомы требуют скорейшего обращения к специалисту. При угрозе жизни вызовите скорую помощь: 103</p>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  Рекомендуемые специалисты
                </h3>
                <p className="text-muted-foreground">
                  На основе ваших ответов мы подобрали подходящих врачей
                </p>
              </div>

              {recommendedDoctors.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {recommendedDoctors.slice(0, 3).map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-light hover:bg-primary-light transition-colors"
                    >
                      <img src={doctor.photo} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                        <p className="text-accent text-sm">{doctor.specialty}</p>
                        <p className="text-muted-foreground text-sm">Стаж: {doctor.experience}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary border border-primary/20 hover:bg-primary/5 text-xs"
                          onClick={() => onOpenAppointment(doctor.id, "clinic")}
                        >
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          В клинику
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-secondary border border-secondary/20 hover:bg-secondary/5 text-xs"
                          onClick={() => {
                            setSelectedOnlineDoctor(doctor.id);
                            setShowOnlineForm(true);
                          }}
                        >
                          <Video className="w-3.5 h-3.5 mr-1" />
                          Онлайн
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground mb-8">
                  Рекомендуем записаться к терапевту для первичной консультации.
                </p>
              )}

              {/* Online consultation form */}
              {showOnlineForm && !onlineBooked && (
                <div className="mb-8 p-6 rounded-xl bg-primary-light border border-primary/20 animate-fade-in">
                  <h4 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Запись на онлайн-консультацию
                  </h4>
                  <form onSubmit={handleOnlineSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sc-name" className="font-sans text-sm">Ваше имя *</Label>
                        <Input
                          id="sc-name"
                          placeholder="Иван Иванов"
                          value={onlineForm.name}
                          onChange={(e) => setOnlineForm({ ...onlineForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sc-phone" className="font-sans text-sm">Телефон *</Label>
                        <Input
                          id="sc-phone"
                          type="tel"
                          placeholder="+7 (999) 999-99-99"
                          value={onlineForm.phone}
                          onChange={(e) => setOnlineForm({ ...onlineForm, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sc-date" className="font-sans text-sm">Дата *</Label>
                        <Input
                          id="sc-date"
                          type="date"
                          value={onlineForm.date}
                          onChange={(e) => setOnlineForm({ ...onlineForm, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sc-time" className="font-sans text-sm">Время</Label>
                        <Select value={onlineForm.time} onValueChange={(v) => setOnlineForm({ ...onlineForm, time: v })}>
                          <SelectTrigger><SelectValue placeholder="Выберите время" /></SelectTrigger>
                          <SelectContent>
                            {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"].map(t => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setShowOnlineForm(false)} className="flex-1">
                        Отмена
                      </Button>
                      <Button type="submit" variant="accent" className="flex-1 gap-2">
                        <Video className="w-4 h-4" />
                        Записаться онлайн
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {onlineBooked && (
                <div className="mb-8 p-6 rounded-xl bg-secondary/10 border border-secondary/20 text-center animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-secondary mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-foreground mb-2">Заявка на онлайн-консультацию отправлена!</h4>
                  <p className="text-sm text-muted-foreground">Мы свяжемся с вами для подтверждения в течение 15 минут.</p>
                </div>
              )}

              <Button onClick={reset} variant="outline" className="w-full gap-2">
                <RotateCcw className="w-4 h-4" />
                Пройти заново
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
