import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prices, doctors, services } from "@/data/clinicData";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: string[];
}

interface ChatBotProps {
  onOpenAppointment: () => void;
}

const quickReplies = [
  "Записаться на приём",
  "Часы работы",
  "Контакты",
  "Цены",
  "Найти врача",
  "Анализы на дому",
  "Вызвать скорую",
];

// Normalize text: lowercase + remove common Russian word endings for fuzzy matching
const normalize = (text: string): string => {
  return text.toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();
};

// Stem-like matching: check if query contains any root of the keyword
const fuzzyMatch = (text: string, keywords: string[]): boolean => {
  const normalized = normalize(text);
  return keywords.some(keyword => {
    const root = normalize(keyword);
    // Try matching root (at least 3 chars) in the text
    if (root.length <= 3) return normalized.includes(root);
    // Try progressively shorter prefixes for stemming
    for (let len = root.length; len >= Math.min(root.length, 4); len--) {
      const prefix = root.substring(0, len);
      if (normalized.includes(prefix)) return true;
    }
    return false;
  });
};

// Price lookup helper with fuzzy matching
const findPriceForService = (query: string): string | null => {
  const normalized = normalize(query);
  // Remove common question words
  const cleaned = normalized
    .replace(/сколько стоит|сколько стоят|какая цена|подскажите|скажите|узнать|цена на|стоимость/g, "")
    .trim();
  
  if (!cleaned || cleaned.length < 3) return null;
  
  for (const [, items] of Object.entries(prices)) {
    for (const item of items) {
      const serviceName = normalize(item.service);
      // Check if the cleaned query contains a significant part of the service name
      const serviceWords = serviceName.split(" ").filter(w => w.length > 3);
      const matchCount = serviceWords.filter(word => {
        for (let len = word.length; len >= Math.min(word.length, 4); len--) {
          if (cleaned.includes(word.substring(0, len))) return true;
        }
        return false;
      }).length;
      
      if (matchCount >= Math.max(1, serviceWords.length * 0.5)) {
        return `${item.service}: ${item.price}\n${item.description}`;
      }
    }
  }
  return null;
};

// Doctor lookup helper with fuzzy matching
const findDoctor = (query: string): string | null => {
  const normalized = normalize(query);
  for (const doctor of doctors) {
    const docName = normalize(doctor.name);
    const docSpec = normalize(doctor.specialty);
    
    // Match by name parts
    const nameParts = docName.split(" ");
    if (nameParts.some(part => part.length > 3 && normalized.includes(part.substring(0, Math.min(part.length, 5))))) {
      return `${doctor.name}\n${doctor.specialty}, стаж: ${doctor.experience}\n${doctor.qualification}`;
    }
    
    // Match by specialty with stemming
    for (let len = docSpec.length; len >= Math.min(docSpec.length, 4); len--) {
      if (normalized.includes(docSpec.substring(0, len))) {
        return `${doctor.name}\n${doctor.specialty}, стаж: ${doctor.experience}\n${doctor.qualification}`;
      }
    }
  }
  return null;
};

// Document requirements with expanded keywords
const documentRequirements: { keywords: string[]; value: string }[] = [
  {
    keywords: ["узи", "ультразвук"],
    value: "Для УЗИ органов брюшной полости необходимо:\n• Натощак (не есть 6-8 часов)\n• Не пить газированные напитки\n• Возьмите с собой паспорт и полис ОМС"
  },
  {
    keywords: ["анализ", "кровь", "мочу", "моча", "кал", "калл"],
    value: "Для сдачи анализов:\n• Кровь — натощак (8-12 часов голода)\n• Моча — утренняя порция в стерильный контейнер\n• Кал — в стерильный контейнер, доставить в течение 3 часов\n• Возьмите паспорт\n• Можно пить воду"
  },
  {
    keywords: ["мрт", "томограф"],
    value: "Для МРТ необходимо:\n• Убрать все металлические предметы\n• Сообщить о наличии имплантов\n• Результаты предыдущих обследований\n• Паспорт и направление (если есть)"
  },
  {
    keywords: ["гастроскоп", "фгдс", "эгдс"],
    value: "Для гастроскопии:\n• Не есть минимум 8-10 часов\n• Не пить за 4 часа до процедуры\n• Не курить\n• Возьмите полотенце и паспорт"
  },
  {
    keywords: ["колоноскоп", "фкс"],
    value: "Для колоноскопии требуется подготовка за 2-3 дня:\n• Специальная диета\n• Приём слабительных препаратов\n• Подробную инструкцию вышлем после записи"
  },
  {
    keywords: ["экг", "электрокардиограмм", "кардиограмм"],
    value: "Для ЭКГ:\n• Специальной подготовки не требуется\n• Возьмите паспорт\n• Наденьте удобную одежду"
  },
  {
    keywords: ["прием", "приём", "консультаци", "осмотр"],
    value: "Для приёма врача:\n• Паспорт\n• Полис ОМС или ДМС (если есть)\n• Результаты предыдущих обследований\n• Список принимаемых препаратов"
  },
  {
    keywords: ["стоматолог", "зуб", "зубн"],
    value: "Для приёма стоматолога:\n• Паспорт\n• Результаты предыдущих снимков (если есть)\n• Поешьте перед приёмом\n• Не употребляйте алкоголь за 24 часа"
  },
];

const findDocumentRequirements = (query: string): string | null => {
  const normalized = normalize(query);
  for (const req of documentRequirements) {
    if (req.keywords.some(kw => normalized.includes(kw))) {
      return req.value;
    }
  }
  return null;
};

// Expanded keyword-based responses with multiple trigger forms
const responseRules: { keywords: string[]; response: string; options?: string[] }[] = [
  {
    keywords: ["записаться", "записать", "запись", "запиши", "запишите", "хочу на приём", "хочу на прием", "хочу к врачу"],
    response: "Отлично! Я могу помочь вам записаться на приём. Нажмите кнопку ниже, чтобы открыть форму записи, или напишите, к какому специалисту вы хотите попасть.",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["час работ", "часы работы", "время работы", "график работы", "режим работы", "когда работ", "когда открыт", "когда закрыт", "рабочее время", "расписание"],
    response: "Мы работаем:\n• Пн-Пт: 8:00-21:00\n• Сб-Вс: 9:00-18:00\n\nВы можете записаться онлайн в любое удобное время!"
  },
  {
    keywords: ["до скольки", "до скольких", "до какого час", "до которого"],
    response: "Мы работаем:\n• Пн-Пт: до 21:00\n• Сб-Вс: до 18:00\n\nВы можете прийти без записи, но лучше записаться заранее!"
  },
  {
    keywords: ["во сколько открыва", "когда откроет", "со скольки", "с какого час"],
    response: "Мы открываемся:\n• Пн-Пт: в 8:00\n• Сб-Вс: в 9:00\n\nПриходите, мы вас ждём!"
  },
  {
    keywords: ["контакт", "телефон", "номер", "позвони", "связаться"],
    response: "📍 Адрес: г. Москва, ул. Тверская, д. 15\n📞 Телефон: +7 (495) 123-45-67\n✉️ Email: info@medical-plus.ru\n\nМы всегда рады вам помочь!"
  },
  {
    keywords: ["цен", "стоимост", "прайс", "прейскурант", "тариф"],
    response: "Наши цены прозрачны и доступны:\n• Консультация терапевта — 2 000₽\n• Консультация кардиолога — 2 500₽\n• Общий анализ крови — 600₽\n• Общий анализ мочи — 400₽\n• УЗИ — от 1 800₽\n• МРТ — от 5 500₽\n\nНапишите название услуги, и я подскажу точную цену!"
  },
  {
    keywords: ["найти врач", "какие врач", "врач", "доктор", "специалист", "какой врач"],
    response: "У нас работают более 50 специалистов:\n• Терапевт — Иванова А.С.\n• Кардиолог — Петров Д.В.\n• Невролог — Николаев С.П.\n• Педиатр — Сидорова Е.В.\n• Стоматолог — Козлов А.Н.\n• Гинеколог — Федорова М.И.\n\nНапишите нужную специальность для подробной информации!"
  },
  {
    keywords: ["терапевт"],
    response: "Рекомендую записаться к Ивановой Анне Сергеевне — терапевт высшей категории, к.м.н., стаж 12 лет.\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["кардиолог"],
    response: "У нас работает кардиолог — Петров Дмитрий Владимирович, д.м.н., стаж 15 лет.\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["невролог", "неврологу"],
    response: "Рекомендую Николаева Сергея Петровича — невролог с 18-летним опытом, д.м.н. Специализируется на лечении мигрени и хронической боли.\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["педиатр"],
    response: "Наш педиатр — Сидорова Елена Викторовна, стаж 10 лет. Специалист по детским инфекциям и вакцинации.\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["стоматолог", "зубной", "зубн"],
    response: "Козлов Алексей Николаевич — стоматолог-ортопед высшей категории, 8 лет опыта.\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["гинеколог"],
    response: "Федорова Мария Игоревна — гинеколог высшей категории, к.м.н., 14 лет опыта. Ведение беременности, репродуктология.\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["анализ на дому", "анализы на дому", "выезд на дом", "медсестр", "сдать анализ дома"],
    response: "Мы выезжаем на дом для сдачи анализов! 🏠\n\n• Выезд от 500₽ (бесплатно при заказе от 3000₽)\n• Приезжаем в удобное для вас время\n• Результаты на email за 24-48 часов\n\nДоступны: анализы крови, мочи, ПЦР-тесты, гормоны.\n\nХотите оформить заявку?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["скорую", "скорая", "экстренн", "срочн", "неотложн"],
    response: "Частная скорая помощь 🚑\n\n• Прибытие за 15-30 минут\n• Врачи высшей категории\n• Работаем круглосуточно\n\nСтоимость:\n• Выезд бригады — от 5 000₽\n• Консультация врача на дому — от 7 000₽\n\n⚠️ При угрозе жизни звоните 112 или 103!",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["адрес", "где находит", "как добрать", "где вы", "местоположени", "расположен"],
    response: "Наши филиалы:\n\n📍 ул. Тверская, д. 15 (м. Тверская)\n📍 Ленинский просп., д. 72 (м. Университет)\n📍 г. Химки, ул. Центральная, д. 5\n\n📞 +7 (495) 123-45-67"
  },
  {
    keywords: ["парковк", "парковать", "машину", "автомобил"],
    response: "Рядом с клиникой на Тверской есть платная парковка. Для клиентов скидка 50% — попросите талон на ресепшен.\n\nНа Ленинском есть бесплатная парковка."
  },
  {
    keywords: ["телемедицин", "онлайн консультаци", "видео консультаци", "видеозвон", "дистанционн"],
    response: "Онлайн-консультации доступны! 💻\n\n• Консультация через видеосвязь\n• Все специалисты\n• Стоимость от 1 500₽\n\nИдеально для повторных консультаций.",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["оплат", "платить", "оплачивать", "картой", "наличн", "рассрочк"],
    response: "Способы оплаты:\n\n• Наличные\n• Банковские карты (Visa, MasterCard, МИР)\n• Apple Pay / Google Pay / SberPay\n• Рассрочка на крупные суммы\n• ДМС (работаем с большинством страховых)"
  },
  {
    keywords: ["дмс", "страхов", "полис"],
    response: "Мы работаем с большинством страховых компаний:\n• Ингосстрах\n• РЕСО-Гарантия\n• Согласие\n• АльфаСтрахование\n• Ренессанс\n• ВСК\n\n📞 +7 (495) 123-45-67 для уточнения"
  },
  {
    keywords: ["работа у вас", "устроиться", "вакансии", "вакансия", "резюме", "трудоустройств"],
    response: "Хотите работать в нашей клинике? 👨‍⚕️\n\nОткрытые вакансии:\n• Врачи различных специальностей\n• Медицинские сёстры\n• Администраторы\n\nМы предлагаем:\n• Конкурентную зарплату\n• ДМС для сотрудников\n• Профессиональное развитие\n\nОтправьте резюме на hr@medical-plus.ru"
  },
  {
    keywords: ["общий анализ крови", "оак", "клинический анализ крови"],
    response: "💉 Общий анализ крови (ОАК):\n\nСтоимость: 600 ₽ (забор крови +300 ₽)\nПодготовка: натощак, 8-12 часов голода\nРезультат: 1 рабочий день\nВозможен забор на дому!\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["анализ мочи", "общий анализ мочи", "оам"],
    response: "🧪 Общий анализ мочи (ОАМ):\n\nСтоимость: 400 ₽\nПодготовка: утренняя порция в стерильный контейнер\nРезультат: 1 рабочий день\n\nТакже доступны:\n• Анализ по Нечипоренко — 500₽\n• Анализ по Зимницкому — 600₽\n• Бак. посев — 1 200₽\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["анализ кала", "копрограмм", "кал на"],
    response: "🧪 Анализы кала:\n\n• Копрограмма — 500 ₽\n• На скрытую кровь — 800 ₽\n• На дисбактериоз — 1 800 ₽\n• На яйца гельминтов — 500 ₽\n\nПодготовка: стерильный контейнер, доставить в течение 3 часов\n\nХотите записаться?",
    options: ["Открыть форму записи"]
  },
  {
    keywords: ["спасиб", "благодар"],
    response: "Пожалуйста! 😊 Если у вас будут ещё вопросы — я всегда на связи. Будьте здоровы!"
  },
  {
    keywords: ["здравствуйте", "привет", "добрый день", "добрый вечер", "доброе утро", "хай", "hello"],
    response: "Здравствуйте! 👋 Рады вас приветствовать! Чем могу помочь?\n\nМогу подсказать цены, информацию о врачах, помочь записаться на приём или ответить на другие вопросы."
  },
];

export function ChatBot({ onOpenAppointment }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Здравствуйте! 👋 Я виртуальный помощник клиники «Медикал Плюс». Чем могу помочь?\n\nМогу подсказать:\n• Цены на услуги\n• Часы работы\n• Информацию о врачах\n• Помочь записаться на приём\n• Подготовку к анализам",
      isBot: true,
      options: quickReplies,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const normalized = normalize(text);
      let response = "";
      let options: string[] | undefined;

      // Check for price queries
      if (fuzzyMatch(normalized, ["стоит", "цена", "сколько", "стоимость", "почём", "почем", "прайс"])) {
        const priceInfo = findPriceForService(normalized);
        if (priceInfo) {
          response = `💰 ${priceInfo}\n\nХотите записаться на эту услугу?`;
          options = ["Открыть форму записи", "Другие цены"];
        }
      }

      // Check for document requirements
      if (!response && fuzzyMatch(normalized, ["документ", "что нужно", "что взять", "подготовк", "как подготов", "что с собой", "что брать"])) {
        const docInfo = findDocumentRequirements(normalized);
        if (docInfo) {
          response = docInfo;
        } else {
          response = "Для большинства консультаций нужен только паспорт. Напишите название услуги, и я подскажу точную подготовку!";
        }
      }

      // Check for doctor search by name
      if (!response && fuzzyMatch(normalized, ["иванов", "петров", "сидоров", "козлов", "федоров", "николаев"])) {
        const doctorInfo = findDoctor(normalized);
        if (doctorInfo) {
          response = `👨‍⚕️ ${doctorInfo}\n\nХотите записаться?`;
          options = ["Открыть форму записи"];
        }
      }

      // Check rule-based responses
      if (!response) {
        for (const rule of responseRules) {
          if (rule.keywords.some(kw => normalized.includes(kw))) {
            response = rule.response;
            options = rule.options;
            break;
          }
        }
      }

      // Try fuzzy match on rules if still no response
      if (!response) {
        for (const rule of responseRules) {
          if (fuzzyMatch(normalized, rule.keywords)) {
            response = rule.response;
            options = rule.options;
            break;
          }
        }
      }

      // Try price lookup as last resort
      if (!response) {
        const priceInfo = findPriceForService(normalized);
        if (priceInfo) {
          response = `💰 ${priceInfo}\n\nХотите записаться?`;
          options = ["Открыть форму записи"];
        }
      }

      // Doctor search as last resort
      if (!response) {
        const doctorInfo = findDoctor(normalized);
        if (doctorInfo) {
          response = `👨‍⚕️ ${doctorInfo}\n\nХотите записаться?`;
          options = ["Открыть форму записи"];
        }
      }

      // Default response
      if (!response) {
        response = "Извините, я не совсем понял ваш вопрос. Могу помочь с:\n\n• Записью на приём\n• Ценами на услуги\n• Часами работы\n• Подготовкой к анализам\n• Информацией о врачах\n• Анализами на дому\n\nПопробуйте переформулировать вопрос или выберите один из вариантов ниже.";
        options = quickReplies.slice(0, 4);
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        options,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  const handleQuickReply = (reply: string) => {
    if (reply === "Открыть форму записи" || reply === "Записаться на приём") {
      setIsOpen(false);
      onOpenAppointment();
    } else if (reply === "Другие цены") {
      handleSend("Цены");
    } else {
      handleSend(reply);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-hover flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-foreground text-primary-foreground rotate-0"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-xl shadow-hover overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-hero text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Помощник клиники</h4>
              <p className="text-xs opacity-80">Онлайн</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-light">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex items-start gap-2 ${
                  message.isBot ? "" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="w-3.5 h-3.5" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                </div>
                <div
                  className={`chat-bubble ${
                    message.isBot ? "chat-bubble-bot" : "chat-bubble-user"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
              
              {/* Quick Replies */}
              {message.options && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(option)}
                      className="px-3 py-1 text-xs rounded-full bg-card border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Напишите сообщение..."
              className="flex-1 h-9 text-sm"
            />
            <Button type="submit" size="icon" className="h-9 w-9 bg-primary hover:bg-primary-dark text-primary-foreground">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
