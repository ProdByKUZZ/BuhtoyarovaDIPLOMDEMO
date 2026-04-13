export interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  details: string;
  category: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  photo: string;
  description: string;
  qualification: string;
  education: string;
  educationDetails: {
    university: string;
    residency?: string;
    courses?: string[];
  };
  workHistory: {
    place: string;
    period: string;
    role: string;
  }[];
  publications?: {
    title: string;
    journal: string;
    year: number;
  }[];
  experienceDetails: string;
  services: string[];
  rating: number;
  videoIntro?: string;
  certificates?: string[];
  specializations?: string[];
}

export interface PriceItem {
  service: string;
  description: string;
  price: string;
  priceValue: number;
}

export interface Prices {
  [key: string]: PriceItem[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
}

export interface CheckupProgram {
  id: number;
  name: string;
  description: string;
  price: number;
  services: string[];
  forWhom: string;
  duration: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  service: string;
  doctor?: string;
  source: string;
}

export const services: Service[] = [
  {
    id: 1,
    name: "Терапия",
    description: "Комплексная диагностика и лечение заболеваний внутренних органов. Лечение ОРВИ, гриппа, хронических заболеваний.",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Терапия - основа медицины. Наши терапевты проводят комплексное обследование, назначают эффективное лечение и сопровождают пациентов на всех этапах выздоровления.",
    category: "therapy"
  },
  {
    id: 2,
    name: "Кардиология",
    description: "Диагностика и лечение сердечно-сосудистых заболеваний. Современные методы лечения аритмии, гипертонии, ИБС.",
    image: "https://images.unsplash.com/photo-1628348068343-eb9c7bd51d6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Кардиология в нашей клинике - это современные методы диагностики и лечения сердечно-сосудистых заболеваний.",
    category: "cardiology"
  },
  {
    id: 3,
    name: "Неврология",
    description: "Лечение заболеваний нервной системы. Диагностика и терапия мигрени, остеохондроза, невралгий.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Неврология - одно из ключевых направлений нашей клиники.",
    category: "neurology"
  },
  {
    id: 4,
    name: "Педиатрия",
    description: "Профилактика, диагностика и лечение заболеваний у детей любого возраста.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Педиатрия - забота о здоровье детей от рождения до 18 лет.",
    category: "pediatrics"
  },
  {
    id: 5,
    name: "Стоматология",
    description: "Полный спектр стоматологических услуг: от лечения до протезирования и имплантации.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Стоматология включает все современные методы лечения.",
    category: "dentistry"
  },
  {
    id: 6,
    name: "Диагностика",
    description: "Полный комплекс диагностических исследований: МРТ, КТ, УЗИ, эндоскопия.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Современная диагностика - залог точного диагноза.",
    category: "diagnostics"
  },
  {
    id: 7,
    name: "Гинекология",
    description: "Полный спектр услуг для женского здоровья: консультации, УЗИ, ведение беременности.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Гинекология - бережное отношение к женскому здоровью.",
    category: "gynecology"
  },
  {
    id: 8,
    name: "Лабораторные анализы",
    description: "Более 1000 видов анализов: кровь, моча, кал, гормоны, аллергены, ПЦР-диагностика.",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Наша лаборатория оснащена новейшими анализаторами.",
    category: "analyses"
  },
  {
    id: 9,
    name: "Реабилитация и ЛФК",
    description: "Восстановление после травм, операций, инсультов. Лечебная физкультура и кинезиотерапия.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Комплексная реабилитация под контролем опытных специалистов.",
    category: "rehabilitation"
  },
  {
    id: 10,
    name: "Психология и психотерапия",
    description: "Помощь при стрессе, депрессии, тревожности, панических атаках, семейных кризисах.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Квалифицированная психологическая помощь в комфортных условиях.",
    category: "psychology"
  },
  {
    id: 11,
    name: "Вакцинация",
    description: "Прививки для детей и взрослых по национальному календарю и для выезда за рубеж.",
    image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    details: "Вакцинация сертифицированными вакцинами ведущих производителей.",
    category: "vaccination"
  }
];

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Иванова Анна Сергеевна",
    specialty: "Терапевт",
    experience: "12 лет",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Специалист по внутренним болезням, кандидат медицинских наук",
    qualification: "Высшая категория, к.м.н.",
    education: "Первый МГМУ им. И.М. Сеченова",
    educationDetails: {
      university: "Первый Московский государственный медицинский университет им. И.М. Сеченова (2010–2016)",
      residency: "Ординатура по терапии, НМИЦ терапии и профилактической медицины (2016–2018)",
      courses: ["Функциональная диагностика (2020)", "Пульмонология (2022)", "УЗИ-диагностика (2023)"]
    },
    workHistory: [
      { place: "ГКБ №1 им. Н.И. Пирогова", period: "2018–2021", role: "Врач-терапевт приёмного отделения" },
      { place: "Клиника «Медикал Плюс»", period: "2021–н.в.", role: "Ведущий терапевт" }
    ],
    publications: [
      { title: "Особенности ведения пациентов с метаболическим синдромом", journal: "Терапевтический архив", year: 2021 },
      { title: "Персонализированный подход к лечению артериальной гипертензии", journal: "Кардиология", year: 2023 }
    ],
    experienceDetails: "12 лет клинической практики",
    services: ["Терапия", "Диагностика"],
    rating: 4.9,
    specializations: ["Лечение хронических заболеваний", "Профилактика сердечно-сосудистых заболеваний"]
  },
  {
    id: 2,
    name: "Петров Дмитрий Владимирович",
    specialty: "Кардиолог",
    experience: "15 лет",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Врач высшей категории, специалист по заболеваниям сердечно-сосудистой системы",
    qualification: "Высшая категория, д.м.н.",
    education: "РНИМУ им. Н.И. Пирогова",
    educationDetails: {
      university: "Российский национальный исследовательский медицинский университет им. Н.И. Пирогова (2007–2013)",
      residency: "Ординатура по кардиологии, НМИЦ кардиологии им. Е.И. Чазова (2013–2015)",
      courses: ["Интервенционная кардиология (2018)", "Эхокардиография экспертного класса (2020)", "Аритмология (2022)"]
    },
    workHistory: [
      { place: "НМИЦ кардиологии им. Е.И. Чазова", period: "2015–2019", role: "Научный сотрудник, врач-кардиолог" },
      { place: "ГКБ №15 им. О.М. Филатова", period: "2019–2022", role: "Заведующий кардиологическим отделением" },
      { place: "Клиника «Медикал Плюс»", period: "2022–н.в.", role: "Ведущий кардиолог" }
    ],
    publications: [
      { title: "Ранняя диагностика коронарного синдрома: мета-анализ", journal: "Кардиология", year: 2019 },
      { title: "Эффективность статинотерапии у пациентов с ИБС", journal: "Российский кардиологический журнал", year: 2021 },
      { title: "Суточное мониторирование ЭКГ: новые подходы", journal: "Клиническая медицина", year: 2023 }
    ],
    experienceDetails: "15 лет, из них 8 лет в кардиохирургии",
    services: ["Кардиология", "Диагностика"],
    rating: 4.8,
    specializations: ["Лечение аритмии", "Профилактика инфаркта", "Реабилитация после инфаркта"]
  },
  {
    id: 3,
    name: "Сидорова Елена Викторовна",
    specialty: "Педиатр",
    experience: "10 лет",
    photo: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Специалист по детским болезням, врач первой категории",
    qualification: "Первая категория",
    education: "СПбГПМУ",
    educationDetails: {
      university: "Санкт-Петербургский государственный педиатрический медицинский университет (2012–2018)",
      residency: "Ординатура по педиатрии, НМИЦ здоровья детей (2018–2020)",
      courses: ["Детская аллергология (2021)", "Вакцинопрофилактика (2022)", "Неонатология (2023)"]
    },
    workHistory: [
      { place: "Детская городская клиническая больница №9", period: "2020–2023", role: "Врач-педиатр" },
      { place: "Клиника «Медикал Плюс»", period: "2023–н.в.", role: "Педиатр" }
    ],
    publications: [
      { title: "Современные подходы к вакцинации детей с аллергическими заболеваниями", journal: "Педиатрия", year: 2022 }
    ],
    experienceDetails: "10 лет педиатрической практики",
    services: ["Педиатрия", "Вакцинация"],
    rating: 4.9,
    specializations: ["Детские инфекции", "Профилактика заболеваний", "Вакцинация"]
  },
  {
    id: 4,
    name: "Козлов Алексей Николаевич",
    specialty: "Стоматолог",
    experience: "8 лет",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Специалист по протезированию и восстановлению зубов",
    qualification: "Высшая категория",
    education: "МГМСУ им. А.И. Евдокимова",
    educationDetails: {
      university: "Московский государственный медико-стоматологический университет им. А.И. Евдокимова (2013–2018)",
      residency: "Ординатура по стоматологии ортопедической, ЦНИИС и ЧЛХ (2018–2020)",
      courses: ["Имплантология (Nobel Biocare, 2021)", "Эстетическая реставрация (2022)", "Цифровая стоматология (2023)"]
    },
    workHistory: [
      { place: "Стоматологическая клиника «Дентал Премиум»", period: "2020–2023", role: "Врач стоматолог-ортопед" },
      { place: "Клиника «Медикал Плюс»", period: "2023–н.в.", role: "Стоматолог-ортопед" }
    ],
    experienceDetails: "8 лет, специализация - эстетическая стоматология",
    services: ["Стоматология"],
    rating: 4.7,
    specializations: ["Эстетическая реставрация", "Имплантация", "Виниры"]
  },
  {
    id: 5,
    name: "Федорова Мария Игоревна",
    specialty: "Гинеколог",
    experience: "14 лет",
    photo: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Врач высшей категории, специалист по женскому здоровью",
    qualification: "Высшая категория, к.м.н.",
    education: "РУДН",
    educationDetails: {
      university: "Российский университет дружбы народов (2008–2014)",
      residency: "Ординатура по акушерству и гинекологии, НМИЦ АГиП им. В.И. Кулакова (2014–2016)",
      courses: ["Репродуктология (2019)", "Кольпоскопия экспертного класса (2021)", "УЗИ в гинекологии (2023)"]
    },
    workHistory: [
      { place: "НМИЦ АГиП им. В.И. Кулакова", period: "2016–2020", role: "Врач акушер-гинеколог" },
      { place: "Клиника «Медикал Плюс»", period: "2020–н.в.", role: "Ведущий гинеколог" }
    ],
    publications: [
      { title: "Ведение беременности высокого риска: клинические рекомендации", journal: "Акушерство и гинекология", year: 2020 },
      { title: "Эффективность ЭКО при эндометриозе", journal: "Проблемы репродукции", year: 2022 }
    ],
    experienceDetails: "14 лет, специализация - репродуктология",
    services: ["Гинекология"],
    rating: 4.9,
    specializations: ["Ведение беременности", "Ведение беременности после ЭКО", "Лечение бесплодия"]
  },
  {
    id: 6,
    name: "Николаев Сергей Петрович",
    specialty: "Невролог",
    experience: "18 лет",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Доктор медицинских наук, специалист по заболеваниям нервной системы",
    qualification: "Высшая категория, д.м.н.",
    education: "СЗГМУ им. И.И. Мечникова",
    educationDetails: {
      university: "Северо-Западный государственный медицинский университет им. И.И. Мечникова (2004–2010)",
      residency: "Ординатура по неврологии, Институт мозга человека РАН (2010–2012)",
      courses: ["Нейрофизиология (2016)", "Ботулинотерапия (2019)", "Транскраниальная магнитная стимуляция (2022)"]
    },
    workHistory: [
      { place: "Институт мозга человека им. Н.П. Бехтеревой РАН", period: "2012–2017", role: "Научный сотрудник, врач-невролог" },
      { place: "ГКБ №31", period: "2017–2021", role: "Зав. неврологическим отделением" },
      { place: "Клиника «Медикал Плюс»", period: "2021–н.в.", role: "Ведущий невролог" }
    ],
    publications: [
      { title: "Хроническая мигрень: патогенез и современная терапия", journal: "Неврология, нейропсихиатрия, психосоматика", year: 2018 },
      { title: "Транскраниальная магнитная стимуляция при депрессии", journal: "Журнал неврологии и психиатрии", year: 2020 },
      { title: "Остеохондроз позвоночника: мифы и реальность", journal: "РМЖ", year: 2023 }
    ],
    experienceDetails: "18 лет, из них 10 лет в нейрохирургии",
    services: ["Неврология", "Реабилитация"],
    rating: 4.8,
    specializations: ["Лечение хронической боли", "Мигрень", "Остеохондроз"]
  },
  {
    id: 7,
    name: "Морозова Ольга Александровна",
    specialty: "Реабилитолог / Врач ЛФК",
    experience: "9 лет",
    photo: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Специалист по восстановительной медицине и реабилитации",
    qualification: "Высшая категория",
    education: "РНИМУ им. Н.И. Пирогова",
    educationDetails: {
      university: "РНИМУ им. Н.И. Пирогова (2012–2018)",
      residency: "Ординатура по ЛФК и спортивной медицине, НМИЦ реабилитации и курортологии (2018–2020)",
      courses: ["Кинезиотейпирование (2021)", "PNF-терапия (2022)", "Реабилитация после инсульта (2023)"]
    },
    workHistory: [
      { place: "НМИЦ реабилитации и курортологии", period: "2020–2023", role: "Врач-реабилитолог" },
      { place: "Клиника «Медикал Плюс»", period: "2023–н.в.", role: "Врач ЛФК и реабилитации" }
    ],
    publications: [
      { title: "Кинезиотерапия при дорсопатиях: рандомизированное исследование", journal: "Вопросы курортологии", year: 2022 }
    ],
    experienceDetails: "9 лет практики в реабилитации",
    services: ["Реабилитация и ЛФК"],
    rating: 4.8,
    specializations: ["Реабилитация после травм", "ЛФК", "Кинезиотерапия", "Реабилитация после инсульта"]
  },
  {
    id: 8,
    name: "Белова Татьяна Дмитриевна",
    specialty: "Психотерапевт",
    experience: "11 лет",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Клинический психолог, психотерапевт. Когнитивно-поведенческая терапия.",
    qualification: "Высшая категория",
    education: "МГУ им. М.В. Ломоносова",
    educationDetails: {
      university: "МГУ им. М.В. Ломоносова, факультет психологии (2010–2015)",
      residency: "Ординатура по психиатрии, НМИЦ психиатрии и наркологии им. В.П. Сербского (2015–2017)",
      courses: ["Когнитивно-поведенческая терапия (сертификация BABCP, 2019)", "EMDR-терапия (2021)", "Схема-терапия (2023)"]
    },
    workHistory: [
      { place: "ПКБ №1 им. Н.А. Алексеева", period: "2017–2020", role: "Психотерапевт" },
      { place: "Частная практика", period: "2020–2023", role: "Психотерапевт" },
      { place: "Клиника «Медикал Плюс»", period: "2023–н.в.", role: "Ведущий психотерапевт" }
    ],
    publications: [
      { title: "КПТ при генерализованном тревожном расстройстве: обзор исследований", journal: "Психиатрия и психофармакотерапия", year: 2021 }
    ],
    experienceDetails: "11 лет, специализация - КПТ",
    services: ["Психология и психотерапия"],
    rating: 4.9,
    specializations: ["Тревожные расстройства", "Депрессия", "Панические атаки", "Семейная терапия"]
  },
  {
    id: 9,
    name: "Григорьев Павел Андреевич",
    specialty: "Иммунолог / Вакцинолог",
    experience: "7 лет",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Специалист по иммунопрофилактике и вакцинации",
    qualification: "Первая категория",
    education: "Первый МГМУ им. И.М. Сеченова",
    educationDetails: {
      university: "Первый МГМУ им. И.М. Сеченова (2014–2020)",
      residency: "Ординатура по аллергологии-иммунологии, ГНЦ Институт иммунологии (2020–2022)",
      courses: ["Вакцинопрофилактика (2023)", "Иммунотерапия аллергических заболеваний (2024)"]
    },
    workHistory: [
      { place: "ГНЦ Институт иммунологии ФМБА", period: "2022–2024", role: "Врач аллерголог-иммунолог" },
      { place: "Клиника «Медикал Плюс»", period: "2024–н.в.", role: "Иммунолог-вакцинолог" }
    ],
    experienceDetails: "7 лет, специализация - иммунопрофилактика",
    services: ["Вакцинация"],
    rating: 4.7,
    specializations: ["Вакцинация детей и взрослых", "Иммунодефициты", "Аллергология"]
  }
];

export const prices: Prices = {
  therapy: [
    { service: "Консультация терапевта", description: "Первичный осмотр и консультация", price: "2 000 ₽", priceValue: 2000 },
    { service: "Повторная консультация терапевта", description: "В течение 2 недель после первичного приема", price: "1 500 ₽", priceValue: 1500 },
    { service: "ЭКГ с расшифровкой", description: "Электрокардиограмма с заключением врача", price: "1 200 ₽", priceValue: 1200 },
    { service: "Суточное мониторирование ЭКГ", description: "Холтеровское мониторирование", price: "4 500 ₽", priceValue: 4500 },
    { service: "УЗИ брюшной полости", description: "Комплексное ультразвуковое исследование", price: "2 800 ₽", priceValue: 2800 },
    { service: "УЗИ щитовидной железы", description: "Исследование с допплерографией", price: "1 800 ₽", priceValue: 1800 },
    { service: "Оформление больничного листа", description: "Электронный лист нетрудоспособности", price: "500 ₽", priceValue: 500 },
    { service: "Внутривенная капельница", description: "Инфузионная терапия (без стоимости препаратов)", price: "1 000 ₽", priceValue: 1000 },
    { service: "Внутримышечная инъекция", description: "Введение препарата (без стоимости препарата)", price: "300 ₽", priceValue: 300 },
    { service: "Справка о состоянии здоровья", description: "Для работодателя, ГИБДД, оружие", price: "1 500 ₽", priceValue: 1500 },
    { service: "Диспансеризация", description: "Профилактический осмотр с анализами", price: "5 000 ₽", priceValue: 5000 },
    { service: "Консультация на дому", description: "Выезд терапевта (в пределах МКАД)", price: "5 000 ₽", priceValue: 5000 },
  ],
  cardiology: [
    { service: "Консультация кардиолога", description: "Первичный осмотр и консультация", price: "2 500 ₽", priceValue: 2500 },
    { service: "Повторная консультация кардиолога", description: "В течение 2 недель", price: "2 000 ₽", priceValue: 2000 },
    { service: "Эхокардиография (УЗИ сердца)", description: "Исследование с допплерографией", price: "3 500 ₽", priceValue: 3500 },
    { service: "Суточное мониторирование АД", description: "Мониторинг артериального давления", price: "3 000 ₽", priceValue: 3000 },
    { service: "Нагрузочные тесты (тредмил)", description: "Тест с физической нагрузкой", price: "5 000 ₽", priceValue: 5000 },
    { service: "Коронарография", description: "Рентгеноконтрастное исследование сосудов сердца", price: "25 000 ₽", priceValue: 25000 },
    { service: "Велоэргометрия", description: "Нагрузочный тест на велотренажёре", price: "4 500 ₽", priceValue: 4500 },
    { service: "Липидный профиль", description: "Анализ крови на холестерин", price: "1 500 ₽", priceValue: 1500 },
    { service: "Кардиомаркеры", description: "Анализ на тропонин, миоглобин, КФК-МВ", price: "3 000 ₽", priceValue: 3000 },
    { service: "Подбор антигипертензивной терапии", description: "С контролем АД в течение суток", price: "4 000 ₽", priceValue: 4000 },
    { service: "Стресс-ЭхоКГ", description: "УЗИ сердца с нагрузкой", price: "6 000 ₽", priceValue: 6000 },
    { service: "Чреспищеводная ЭхоКГ", description: "Углублённое исследование сердца", price: "7 000 ₽", priceValue: 7000 },
  ],
  neurology: [
    { service: "Консультация невролога", description: "Первичный осмотр и консультация", price: "2 500 ₽", priceValue: 2500 },
    { service: "Повторная консультация невролога", description: "В течение 2 недель", price: "2 000 ₽", priceValue: 2000 },
    { service: "Электроэнцефалография (ЭЭГ)", description: "Исследование биоэлектрической активности мозга", price: "3 200 ₽", priceValue: 3200 },
    { service: "МРТ головного мозга", description: "Магнитно-резонансная томография", price: "6 000 ₽", priceValue: 6000 },
    { service: "Электронейромиография", description: "Исследование нервно-мышечной передачи", price: "4 500 ₽", priceValue: 4500 },
    { service: "МРТ позвоночника (1 отдел)", description: "Шейный, грудной или поясничный отдел", price: "5 500 ₽", priceValue: 5500 },
    { service: "Дуплексное сканирование сосудов шеи", description: "УЗДГ брахиоцефальных артерий", price: "3 000 ₽", priceValue: 3000 },
    { service: "Блокада лечебная", description: "Паравертебральная блокада", price: "3 500 ₽", priceValue: 3500 },
    { service: "Ботулинотерапия при мигрени", description: "Инъекции (без стоимости препарата)", price: "5 000 ₽", priceValue: 5000 },
    { service: "Мануальная терапия", description: "Сеанс 45-60 минут", price: "4 000 ₽", priceValue: 4000 },
    { service: "Иглорефлексотерапия", description: "Сеанс акупунктуры", price: "3 000 ₽", priceValue: 3000 },
    { service: "Транскраниальная магнитная стимуляция", description: "Сеанс ТМС", price: "3 500 ₽", priceValue: 3500 },
  ],
  pediatrics: [
    { service: "Консультация педиатра", description: "Первичный осмотр и консультация", price: "2 000 ₽", priceValue: 2000 },
    { service: "Повторная консультация педиатра", description: "В течение 2 недель", price: "1 500 ₽", priceValue: 1500 },
    { service: "Вакцинация (без стоимости препарата)", description: "Осмотр + введение вакцины", price: "800 ₽", priceValue: 800 },
    { service: "Профилактический осмотр", description: "Комплексный осмотр ребенка", price: "3 500 ₽", priceValue: 3500 },
    { service: "Оформление справки", description: "В школу, детский сад, спортивную секцию", price: "1 000 ₽", priceValue: 1000 },
    { service: "Оформление карты в детский сад", description: "Полное обследование", price: "8 000 ₽", priceValue: 8000 },
    { service: "Оформление карты в школу", description: "Полное обследование", price: "10 000 ₽", priceValue: 10000 },
    { service: "Вызов педиатра на дом", description: "В пределах МКАД", price: "4 000 ₽", priceValue: 4000 },
    { service: "Общий анализ крови (ребёнок)", description: "Забор крови из пальца", price: "700 ₽", priceValue: 700 },
    { service: "УЗИ органов брюшной полости (ребёнок)", description: "Для детей до 18 лет", price: "2 500 ₽", priceValue: 2500 },
    { service: "Массаж детский (общий)", description: "Сеанс 30-40 минут", price: "2 000 ₽", priceValue: 2000 },
    { service: "ЛФК для детей", description: "Индивидуальное занятие", price: "1 800 ₽", priceValue: 1800 },
  ],
  dentistry: [
    { service: "Консультация стоматолога", description: "Первичный осмотр и консультация", price: "1 500 ₽", priceValue: 1500 },
    { service: "Профессиональная гигиена", description: "Чистка зубов ультразвуком + Air Flow", price: "5 000 ₽", priceValue: 5000 },
    { service: "Лечение кариеса", description: "Пломба светоотверждаемая", price: "4 500 ₽", priceValue: 4500 },
    { service: "Имплантация (1 зуб)", description: "Установка импланта с абатментом", price: "45 000 ₽", priceValue: 45000 },
    { service: "Отбеливание", description: "Профессиональное отбеливание ZOOM", price: "25 000 ₽", priceValue: 25000 },
    { service: "Удаление зуба", description: "Простое удаление", price: "3 000 ₽", priceValue: 3000 },
    { service: "Удаление зуба мудрости", description: "Сложное хирургическое удаление", price: "8 000 ₽", priceValue: 8000 },
    { service: "Лечение пульпита", description: "1 канал", price: "6 000 ₽", priceValue: 6000 },
    { service: "Коронка металлокерамическая", description: "Изготовление + установка", price: "15 000 ₽", priceValue: 15000 },
    { service: "Виниры (1 зуб)", description: "Керамический винир E-max", price: "30 000 ₽", priceValue: 30000 },
    { service: "Брекет-система", description: "Металлические брекеты (1 челюсть)", price: "50 000 ₽", priceValue: 50000 },
    { service: "Элайнеры (полный курс)", description: "Невидимые капы", price: "180 000 ₽", priceValue: 180000 },
    { service: "Панорамный снимок (ОПТГ)", description: "Цифровая ортопантомограмма", price: "1 200 ₽", priceValue: 1200 },
    { service: "КТ зубов (3D)", description: "Конусно-лучевая томография", price: "3 500 ₽", priceValue: 3500 },
  ],
  diagnostics: [
    { service: "МРТ (один отдел)", description: "Магнитно-резонансная томография", price: "5 500 ₽", priceValue: 5500 },
    { service: "КТ (один отдел)", description: "Компьютерная томография", price: "4 000 ₽", priceValue: 4000 },
    { service: "УЗИ комплексное", description: "Все органы брюшной полости", price: "4 500 ₽", priceValue: 4500 },
    { service: "Эндоскопия", description: "Гастроскопия или колоноскопия", price: "8 000 ₽", priceValue: 8000 },
    { service: "Рентген (1 снимок)", description: "Цифровая рентгенография", price: "1 500 ₽", priceValue: 1500 },
    { service: "Маммография", description: "Обследование молочных желез", price: "3 000 ₽", priceValue: 3000 },
    { service: "Денситометрия", description: "Измерение плотности костной ткани", price: "3 500 ₽", priceValue: 3500 },
    { service: "Гастроскопия под седацией", description: "ЭГДС с медикаментозным сном", price: "12 000 ₽", priceValue: 12000 },
    { service: "Колоноскопия под седацией", description: "ФКС с медикаментозным сном", price: "15 000 ₽", priceValue: 15000 },
    { service: "МРТ всего тела", description: "Полное сканирование организма", price: "35 000 ₽", priceValue: 35000 },
    { service: "УЗИ молочных желез", description: "С допплерографией", price: "2 500 ₽", priceValue: 2500 },
    { service: "Флюорография", description: "Цифровая флюорография", price: "800 ₽", priceValue: 800 },
    { service: "Спирометрия", description: "Исследование функции лёгких", price: "1 500 ₽", priceValue: 1500 },
    { service: "МРТ с контрастом", description: "Дополнительно к стоимости МРТ", price: "4 000 ₽", priceValue: 4000 },
  ],
  gynecology: [
    { service: "Консультация гинеколога", description: "Первичный осмотр и консультация", price: "2 500 ₽", priceValue: 2500 },
    { service: "УЗИ органов малого таза", description: "Трансабдоминальное + трансвагинальное", price: "2 800 ₽", priceValue: 2800 },
    { service: "Кольпоскопия", description: "Расширенная кольпоскопия", price: "2 000 ₽", priceValue: 2000 },
    { service: "Цитология (ПАП-тест)", description: "Мазок на онкоцитологию", price: "1 500 ₽", priceValue: 1500 },
    { service: "Ведение беременности (1 триместр)", description: "Пакет обследований + консультации", price: "45 000 ₽", priceValue: 45000 },
    { service: "Ведение беременности (полный курс)", description: "До 36 недель", price: "120 000 ₽", priceValue: 120000 },
    { service: "Гормональный профиль", description: "Комплекс женских гормонов", price: "4 500 ₽", priceValue: 4500 },
    { service: "Установка ВМС", description: "Без стоимости спирали", price: "3 500 ₽", priceValue: 3500 },
    { service: "Гистероскопия", description: "Диагностическая гистероскопия", price: "15 000 ₽", priceValue: 15000 },
    { service: "Биопсия шейки матки", description: "Забор материала + гистология", price: "5 000 ₽", priceValue: 5000 },
  ],
  analyses: [
    { service: "Общий анализ крови", description: "С лейкоцитарной формулой", price: "600 ₽", priceValue: 600 },
    { service: "Биохимия крови (базовая)", description: "8 показателей", price: "1 500 ₽", priceValue: 1500 },
    { service: "Биохимия крови (расширенная)", description: "20 показателей", price: "3 500 ₽", priceValue: 3500 },
    { service: "Общий анализ мочи", description: "С микроскопией осадка", price: "400 ₽", priceValue: 400 },
    { service: "Анализ кала (копрограмма)", description: "Общий анализ кала", price: "500 ₽", priceValue: 500 },
    { service: "Анализ кала на скрытую кровь", description: "Иммунохимический метод", price: "800 ₽", priceValue: 800 },
    { service: "Анализ кала на дисбактериоз", description: "Микробиологическое исследование", price: "1 800 ₽", priceValue: 1800 },
    { service: "Анализ кала на яйца гельминтов", description: "Паразитологическое исследование", price: "500 ₽", priceValue: 500 },
    { service: "Общий анализ мочи по Нечипоренко", description: "Количественное определение", price: "500 ₽", priceValue: 500 },
    { service: "Анализ мочи по Зимницкому", description: "Концентрационная функция почек", price: "600 ₽", priceValue: 600 },
    { service: "Бак. посев мочи", description: "С чувствительностью к антибиотикам", price: "1 200 ₽", priceValue: 1200 },
    { service: "Гормоны щитовидной железы", description: "ТТГ, Т3, Т4", price: "1 800 ₽", priceValue: 1800 },
    { service: "Коагулограмма", description: "Свёртываемость крови", price: "1 200 ₽", priceValue: 1200 },
    { service: "ПЦР на COVID-19", description: "Результат за 24 часа", price: "1 500 ₽", priceValue: 1500 },
    { service: "Комплекс ИППП (12 инфекций)", description: "ПЦР-диагностика", price: "5 500 ₽", priceValue: 5500 },
    { service: "Витамин D", description: "25-OH витамин D", price: "1 800 ₽", priceValue: 1800 },
    { service: "Анализ на аллергены (панель)", description: "40 аллергенов", price: "8 000 ₽", priceValue: 8000 },
    { service: "Гликированный гемоглобин", description: "Контроль сахарного диабета", price: "900 ₽", priceValue: 900 },
    { service: "Группа крови + резус-фактор", description: "Определение группы крови", price: "700 ₽", priceValue: 700 },
    { service: "Онкомаркеры (1 показатель)", description: "ПСА, СА-125, СА-15-3, РЭА и др.", price: "1 200 ₽", priceValue: 1200 },
    { service: "Забор крови из вены", description: "Процедура взятия крови", price: "300 ₽", priceValue: 300 },
    { service: "Срочный анализ (cito)", description: "Результат за 2 часа (доп.)", price: "500 ₽", priceValue: 500 },
  ],
  rehabilitation: [
    { service: "Консультация реабилитолога", description: "Первичный осмотр и план реабилитации", price: "2 500 ₽", priceValue: 2500 },
    { service: "Сеанс ЛФК (индивидуальный)", description: "45-60 минут с инструктором", price: "2 500 ₽", priceValue: 2500 },
    { service: "Сеанс ЛФК (групповой)", description: "Группа до 6 человек, 60 минут", price: "1 200 ₽", priceValue: 1200 },
    { service: "Кинезиотейпирование", description: "Наложение кинезио-тейпов (1 зона)", price: "1 500 ₽", priceValue: 1500 },
    { service: "Массаж лечебный (общий)", description: "60 минут", price: "3 500 ₽", priceValue: 3500 },
    { service: "Массаж лечебный (1 зона)", description: "30 минут", price: "2 000 ₽", priceValue: 2000 },
    { service: "Физиотерапия (1 сеанс)", description: "Магнитотерапия, электрофорез и др.", price: "1 000 ₽", priceValue: 1000 },
    { service: "Программа реабилитации после инсульта", description: "Курс 10 занятий", price: "22 000 ₽", priceValue: 22000 },
    { service: "Программа реабилитации после травм", description: "Курс 10 занятий", price: "20 000 ₽", priceValue: 20000 },
    { service: "Механотерапия", description: "Занятие на тренажёрах", price: "1 800 ₽", priceValue: 1800 },
  ],
  psychology: [
    { service: "Консультация психотерапевта", description: "Первичная консультация, 60 минут", price: "4 000 ₽", priceValue: 4000 },
    { service: "Повторная консультация", description: "50 минут", price: "3 500 ₽", priceValue: 3500 },
    { service: "Сеанс КПТ", description: "Когнитивно-поведенческая терапия, 50 минут", price: "4 000 ₽", priceValue: 4000 },
    { service: "Семейная консультация", description: "60-90 минут, пара/семья", price: "6 000 ₽", priceValue: 6000 },
    { service: "Психологическое тестирование", description: "Комплексная диагностика", price: "3 000 ₽", priceValue: 3000 },
    { service: "Детский психолог", description: "Консультация, 45 минут", price: "3 000 ₽", priceValue: 3000 },
    { service: "EMDR-терапия", description: "Сеанс, 60 минут", price: "5 000 ₽", priceValue: 5000 },
    { service: "Абонемент (4 сеанса)", description: "Скидка 10%", price: "14 400 ₽", priceValue: 14400 },
    { service: "Абонемент (8 сеансов)", description: "Скидка 15%", price: "27 200 ₽", priceValue: 27200 },
  ],
  vaccination: [
    { service: "Осмотр перед вакцинацией", description: "Консультация врача", price: "800 ₽", priceValue: 800 },
    { service: "Вакцина «Пентаксим»", description: "Дифтерия, столбняк, коклюш, полиомиелит, ХИБ", price: "3 500 ₽", priceValue: 3500 },
    { service: "Вакцина «Инфанрикс Гекса»", description: "6-компонентная вакцина", price: "4 500 ₽", priceValue: 4500 },
    { service: "Вакцина от гриппа", description: "Ультрикс Квадри / Ваксигрипп", price: "1 500 ₽", priceValue: 1500 },
    { service: "Вакцина от клещевого энцефалита", description: "ФСМЕ-Иммун / Энцевир", price: "2 500 ₽", priceValue: 2500 },
    { service: "Вакцина «Превенар 13»", description: "Пневмококковая инфекция", price: "4 000 ₽", priceValue: 4000 },
    { service: "Вакцина от ВПЧ (Гардасил 9)", description: "Вирус папилломы человека", price: "12 000 ₽", priceValue: 12000 },
    { service: "Вакцина от гепатита B", description: "Энджерикс-B", price: "1 500 ₽", priceValue: 1500 },
    { service: "Вакцина АДС-М", description: "Дифтерия, столбняк (ревакцинация)", price: "800 ₽", priceValue: 800 },
    { service: "Вакцина от кори, краснухи, паротита", description: "Приорикс / MMR-II", price: "2 000 ₽", priceValue: 2000 },
    { service: "Индивидуальный график вакцинации", description: "Составление графика для ребёнка", price: "2 000 ₽", priceValue: 2000 },
  ],
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Кардиолог за 5 минут: что важно знать о давлении",
    excerpt: "Артериальное давление — один из главных показателей здоровья. Разбираемся, какие цифры считать нормой.",
    author: "Петров Дмитрий Владимирович",
    authorRole: "Кардиолог, д.м.н.",
    date: "10 января 2026",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Кардиология",
    readTime: "5 мин"
  },
  {
    id: 2,
    title: "Мифы о детском здоровье: развенчиваем заблуждения",
    excerpt: "Педиатр разбирает популярные мифы о детском здоровье и объясняет, как защитить ребенка от болезней.",
    author: "Сидорова Елена Викторовна",
    authorRole: "Педиатр",
    date: "5 января 2026",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Педиатрия",
    readTime: "7 мин"
  },
  {
    id: 3,
    title: "Головная боль: когда пора к врачу?",
    excerpt: "Невролог объясняет, какие виды головной боли требуют обращения к специалисту.",
    author: "Николаев Сергей Петрович",
    authorRole: "Невролог, д.м.н.",
    date: "1 января 2026",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Неврология",
    readTime: "6 мин"
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    author: "Екатерина М.",
    rating: 5,
    date: "15 марта 2026",
    text: "Была на приёме у кардиолога Петрова Д.В. Очень внимательный врач, всё подробно объяснил, назначил обследование. Результаты ЭхоКГ были готовы в тот же день. Рекомендую!",
    service: "Кардиология",
    doctor: "Петров Дмитрий Владимирович",
    source: "2ГИС"
  },
  {
    id: 2,
    author: "Алексей К.",
    rating: 5,
    date: "10 марта 2026",
    text: "Лечу зубы только здесь. Козлов Алексей Николаевич — мастер своего дела. Поставил коронку — идеально, не отличишь от настоящего зуба. Клиника чистая, персонал вежливый.",
    service: "Стоматология",
    doctor: "Козлов Алексей Николаевич",
    source: "2ГИС"
  },
  {
    id: 3,
    author: "Ольга В.",
    rating: 5,
    date: "5 марта 2026",
    text: "Веду беременность у Федоровой М.И. Потрясающий специалист, всегда на связи, отвечает на все вопросы. Чувствую себя в надёжных руках. Спасибо!",
    service: "Гинекология",
    doctor: "Федорова Мария Игоревна",
    source: "2ГИС"
  },
  {
    id: 4,
    author: "Дмитрий С.",
    rating: 4,
    date: "28 февраля 2026",
    text: "Обратился с болями в спине к неврологу Николаеву С.П. Провёл тщательный осмотр, направил на МРТ. После курса лечения стало значительно лучше. Единственный минус — ожидание записи 3 дня.",
    service: "Неврология",
    doctor: "Николаев Сергей Петрович",
    source: "2ГИС"
  },
  {
    id: 5,
    author: "Марина А.",
    rating: 5,
    date: "20 февраля 2026",
    text: "Привожу ребёнка к педиатру Сидоровой Е.В. уже второй год. Замечательный доктор — ребёнок её обожает и не боится. Все прививки делаем здесь.",
    service: "Педиатрия",
    doctor: "Сидорова Елена Викторовна",
    source: "2ГИС"
  },
  {
    id: 6,
    author: "Андрей П.",
    rating: 5,
    date: "15 февраля 2026",
    text: "Проходил реабилитацию после операции на колене. Морозова О.А. составила отличную программу, через 2 месяца полностью восстановился. Профессионалы!",
    service: "Реабилитация",
    doctor: "Морозова Ольга Александровна",
    source: "2ГИС"
  },
  {
    id: 7,
    author: "Наталья Л.",
    rating: 5,
    date: "10 февраля 2026",
    text: "Обратилась к психотерапевту Беловой Т.Д. с паническими атаками. После 8 сеансов КПТ атаки прекратились полностью. Очень благодарна!",
    service: "Психотерапия",
    doctor: "Белова Татьяна Дмитриевна",
    source: "2ГИС"
  },
  {
    id: 8,
    author: "Игорь Н.",
    rating: 4,
    date: "5 февраля 2026",
    text: "Сдавал расширенный анализ крови. Всё быстро, результаты пришли на почту уже на следующий день. Удобная запись через сайт. Цены адекватные для центра Москвы.",
    service: "Анализы",
    source: "2ГИС"
  }
];

export const faqData = [
  {
    category: "Подготовка к процедурам",
    questions: [
      {
        question: "Как подготовиться к УЗИ брюшной полости?",
        answer: "За 3 дня до исследования исключите из рациона газообразующие продукты (бобовые, капусту, чёрный хлеб, газированные напитки). Последний приём пищи — за 6-8 часов до УЗИ. Исследование проводится натощак. Можно пить воду без газа."
      },
      {
        question: "Как подготовиться к анализу крови?",
        answer: "Кровь сдаётся строго натощак (8-12 часов голодания). Накануне исключите алкоголь, жирную пищу, интенсивные физические нагрузки. Утром можно выпить стакан воды без газа. Не курите за 1 час до сдачи. Если принимаете лекарства — уточните у врача, нужно ли их отменять."
      },
      {
        question: "Нужна ли подготовка к МРТ?",
        answer: "Специальной подготовки не требуется. Перед процедурой необходимо снять все металлические украшения, часы, ремни. Сообщите врачу, если у вас есть кардиостимулятор, металлические импланты или клаустрофобия. МРТ с контрастом проводится натощак."
      },
      {
        question: "Как подготовиться к гастроскопии?",
        answer: "Последний приём пищи — за 8-10 часов до процедуры. Не пейте воду за 2 часа до исследования. Если процедура проводится под седацией, необходимо прийти с сопровождающим и не садиться за руль в день исследования."
      }
    ]
  },
  {
    category: "Медицинские вопросы",
    questions: [
      {
        question: "Что делать при боли в груди?",
        answer: "При острой боли в груди, особенно если она отдаёт в левую руку, челюсть или спину, немедленно вызовите скорую помощь (103 или +7 495 123-45-67 для вызова нашей скорой). До приезда примите нитроглицерин под язык (если назначен врачом), примите полусидячее положение. Не игнорируйте боль в груди — это может быть признаком инфаркта."
      },
      {
        question: "Когда нужно обращаться к неврологу?",
        answer: "Обратитесь к неврологу при: частых головных болях, головокружении, онемении конечностей, болях в спине и шее, нарушениях сна, снижении памяти, после черепно-мозговых травм. Экстренно — при внезапной сильной головной боли, нарушении речи, асимметрии лица."
      },
      {
        question: "Выдают ли больничный лист онлайн?",
        answer: "Электронный лист нетрудоспособности (больничный) оформляется при очном приёме у терапевта. Дистанционно оформить больничный нельзя — это требование законодательства. Запишитесь на приём к терапевту, и при наличии показаний больничный будет оформлен в день обращения."
      }
    ]
  },
  {
    category: "Организационные вопросы",
    questions: [
      {
        question: "Можно ли с ребёнком без очереди?",
        answer: "Да, дети до 3 лет и дети-инвалиды обслуживаются вне очереди. Также вне очереди принимаются беременные женщины и ветераны. В нашей клинике приём ведётся по записи, поэтому ожидание минимально — обычно не более 5-10 минут."
      },
      {
        question: "Какие документы нужны для приёма?",
        answer: "Для взрослых: паспорт, полис ДМС (при наличии), результаты предыдущих обследований. Для детей: свидетельство о рождении (или паспорт с 14 лет), паспорт сопровождающего родителя, полис ОМС/ДМС, прививочный сертификат (при вакцинации)."
      },
      {
        question: "Как отменить или перенести запись?",
        answer: "Отменить или перенести запись можно через личный кабинет на сайте, по телефону +7 (495) 123-45-67 или в чате с онлайн-помощником. Просим уведомлять об отмене не позднее чем за 2 часа до назначенного времени."
      },
      {
        question: "Работает ли клиника в выходные?",
        answer: "Да! Основные филиалы (Тверская, Ленинский проспект) работают: Пн-Пт с 8:00 до 21:00, Сб-Вс с 9:00 до 18:00. Филиал в Химках: Пн-Пт с 9:00 до 20:00, Сб с 10:00 до 17:00, Вс — выходной."
      },
      {
        question: "Есть ли рассрочка на дорогостоящие услуги?",
        answer: "Да, мы предоставляем беспроцентную рассрочку на стоматологические услуги от 30 000 ₽ (на 3 или 6 месяцев) и на программы ведения беременности. Подробности уточняйте у администратора или по телефону."
      }
    ]
  },
  {
    category: "Вакцинация",
    questions: [
      {
        question: "Какие прививки нужны взрослому?",
        answer: "Взрослым рекомендуется: ревакцинация АДС-М (дифтерия, столбняк) каждые 10 лет, ежегодная вакцинация от гриппа, вакцинация от гепатита B (если не привиты), от пневмококка (после 65 лет или при хронических заболеваниях), от клещевого энцефалита (при проживании в эндемичных районах)."
      },
      {
        question: "Можно ли делать прививку при насморке?",
        answer: "Лёгкий насморк без повышения температуры не является противопоказанием. Однако решение принимает врач после осмотра. При температуре выше 37,5°C, обострении хронических заболеваний, острых инфекциях вакцинацию следует отложить."
      }
    ]
  }
];

export const symptoms: Symptom[] = [
  { id: "headache", name: "Головная боль", category: "Общие" },
  { id: "fever", name: "Повышенная температура", category: "Общие" },
  { id: "cough", name: "Кашель", category: "Дыхательная система" },
  { id: "chest_pain", name: "Боль в груди", category: "Сердечно-сосудистая" },
  { id: "stomach_pain", name: "Боль в животе", category: "ЖКТ" },
  { id: "back_pain", name: "Боль в спине", category: "Опорно-двигательная" },
  { id: "fatigue", name: "Усталость, слабость", category: "Общие" },
  { id: "dizziness", name: "Головокружение", category: "Неврология" },
  { id: "shortness_breath", name: "Одышка", category: "Дыхательная система" },
  { id: "joint_pain", name: "Боль в суставах", category: "Опорно-двигательная" },
  { id: "skin_rash", name: "Сыпь на коже", category: "Дерматология" },
  { id: "toothache", name: "Зубная боль", category: "Стоматология" },
  { id: "anxiety", name: "Тревога, беспокойство", category: "Психология" },
  { id: "insomnia", name: "Нарушение сна", category: "Психология" },
];

export const checkupPrograms: CheckupProgram[] = [
  {
    id: 1,
    name: "Базовый чек-ап",
    description: "Комплексное обследование для оценки общего состояния здоровья",
    price: 15000,
    services: ["Консультация терапевта", "Общий анализ крови", "Биохимия крови", "ЭКГ", "УЗИ брюшной полости"],
    forWhom: "Для всех от 18 лет",
    duration: "2-3 часа"
  },
  {
    id: 2,
    name: "Кардио чек-ап",
    description: "Углубленное обследование сердечно-сосудистой системы",
    price: 25000,
    services: ["Консультация кардиолога", "ЭКГ", "ЭхоКГ", "Суточное мониторирование АД", "Липидный профиль"],
    forWhom: "Для людей 40+ или с факторами риска",
    duration: "3-4 часа"
  },
  {
    id: 3,
    name: "Женское здоровье",
    description: "Комплексное обследование для женщин",
    price: 22000,
    services: ["Консультация гинеколога", "УЗИ малого таза", "Маммография", "Цитология", "Гормональный профиль"],
    forWhom: "Для женщин от 25 лет",
    duration: "3-4 часа"
  },
  {
    id: 4,
    name: "Детский чек-ап",
    description: "Профилактическое обследование для детей",
    price: 12000,
    services: ["Консультация педиатра", "Общие анализы", "УЗИ органов", "Консультация ЛОР", "Консультация офтальмолога"],
    forWhom: "Для детей от 3 до 18 лет",
    duration: "2-3 часа"
  }
];

export const clinicBranches = [
  {
    id: 1,
    name: "Медикал Плюс на Тверской",
    address: "ул. Тверская, д. 15",
    phone: "+7 (495) 123-45-67",
    hours: "Пн-Пт: 8:00-21:00, Сб-Вс: 9:00-18:00",
    coordinates: [55.7558, 37.6173]
  },
  {
    id: 2,
    name: "Медикал Плюс на Ленинском",
    address: "Ленинский проспект, д. 72",
    phone: "+7 (495) 123-45-68",
    hours: "Пн-Пт: 8:00-21:00, Сб-Вс: 9:00-18:00",
    coordinates: [55.6930, 37.5688]
  },
  {
    id: 3,
    name: "Медикал Плюс в Химках",
    address: "г. Химки, ул. Центральная, д. 5",
    phone: "+7 (495) 123-45-69",
    hours: "Пн-Пт: 9:00-20:00, Сб: 10:00-17:00",
    coordinates: [55.8970, 37.4296]
  }
];
