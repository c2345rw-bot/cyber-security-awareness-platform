import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'uz' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    uz: string;
    ru: string;
  };
}

const translations: Translations = {
  app_title: { en: 'CyberSafe Teens', uz: 'CyberSafe Yoshlar', ru: 'CyberSafe Подростки' },
  nav_home: { en: 'Home', uz: 'Bosh sahifa', ru: 'Главная' },
  nav_lessons: { en: 'Lessons', uz: 'Darslar', ru: 'Уроки' },
  nav_simulator: { en: 'Simulator', uz: 'Simulyator', ru: 'Симулятор' },
  nav_password: { en: 'Passwords', uz: 'Parollar', ru: 'Пароли' },
  nav_scams: { en: 'Scams', uz: 'Firibgarlik', ru: 'Мошенничество' },
  nav_leaderboard: { en: 'Leaderboard', uz: 'Reyting', ru: 'Рейтинг' },
  nav_dashboard: { en: 'Dashboard', uz: 'Shaxsiy panel', ru: 'Панель' },

  start_learning: { en: 'Start Learning', uz: "O'rganishni Boshlash", ru: 'Начать Обучение' },
  home_hero_title: { en: 'Stay Safe Online', uz: "Onlayn Xavfsiz Bo'ling", ru: 'Будьте в безопасности онлайн' },
  home_hero_subtitle: {
    en: 'Learn to spot scams, secure your accounts, and protect your digital life.',
    uz: "Firibgarliklarni aniqlashni, hisoblaringizni himoyalashni va raqamli hayotingizni asrashni o'rganing.",
    ru: 'Научитесь распознавать мошенничество, защищать свои аккаунты и свою цифровую жизнь.',
  },

  /* Home page — platform content stats (always accurate, never engagement-inflated) */
  stat_section_label: { en: 'What the platform includes', uz: 'Platforma nima o\'z ichiga oladi', ru: 'Что включает платформа' },
  stat_lessons_available: { en: 'Lessons Available', uz: "Mavjud darslar", ru: 'Доступно уроков' },
  stat_simulator_scenarios: { en: 'Simulator Scenarios', uz: "Simulyator stsenariylari", ru: 'Сценариев симулятора' },
  stat_languages: { en: 'Languages Supported', uz: "Qo'llab-quvvatlanadigan tillar", ru: 'Поддерживаемых языков' },
  stat_quiz_questions: { en: 'Quiz Questions', uz: "Test savollari", ru: 'Вопросов в тестах' },

  /* Home — content blocks */
  real_threats_title: { en: 'Real Threats. Real Defense.', uz: "Haqiqiy tahdidlar. Haqiqiy mudofaa.", ru: 'Реальные угрозы. Реальная защита.' },
  real_threats_desc: {
    en: 'Cyber attacks aren\'t just for corporations. Teenagers in Central Asia are targeted daily by Telegram scams, fake job offers, and cracked apps containing malware. CyberSafe Teens teaches you to recognise and avoid these specific threats.',
    uz: "Kiberhujumlar faqat korporatsiyalar uchun emas. Markaziy Osiyodagi o'smirlar har kuni Telegram firibgarliklari, soxta ish takliflari va zararli dasturlar o'rnatilgan ilovalar nishoniga oladi.",
    ru: 'Кибератаки — не только для корпораций. Подростки Центральной Азии ежедневно становятся жертвами мошенников в Telegram, фейковых вакансий и взломанных приложений с вирусами.',
  },
  what_youll_learn: { en: "What You'll Learn", uz: "Siz nima o'rganasiz", ru: 'Чему вы научитесь' },
  learn_item_1: { en: 'Spotting Phishing & Scams', uz: "Fishing va firibgarliklarni aniqlash", ru: 'Распознавать фишинг и мошенничество' },
  learn_item_2: { en: 'Creating Uncrackable Passwords', uz: "Buzib bo'lmaydigan parollar yaratish", ru: 'Создавать надёжные пароли' },
  learn_item_3: { en: 'Securing Social Media Accounts', uz: "Ijtimoiy tarmoq hisoblarini himoyalash", ru: 'Защищать аккаунты в соцсетях' },
  learn_item_4: { en: 'Safe Downloading Practices', uz: "Xavfsiz yuklab olish amaliyoti", ru: 'Безопасно скачивать файлы' },

  known_threats_title: { en: 'Threats Relevant to You', uz: "Siz uchun dolzarb tahdidlar", ru: 'Угрозы, актуальные для вас' },
  threat_telegram_title: { en: 'Telegram Prize Scams', uz: "Telegram mukofot firibgarliklari", ru: 'Мошенничество с призами в Telegram' },
  threat_telegram_desc: {
    en: 'Fake Telegram bots claim you\'ve won a prize and ask for personal details or a "processing fee" to release your reward.',
    uz: "Soxta Telegram botlar siz g'olib bo'lganingizni da'vo qilib, mukofotingizni olish uchun shaxsiy ma'lumotlaringizni yoki \"xizmat haqi\" talab qiladi.",
    ru: 'Поддельные Telegram-боты сообщают о выигрыше и просят личные данные или «плату за обработку» для получения приза.',
  },
  threat_phishing_title: { en: 'Instagram Verification Phishing', uz: "Instagram tasdiqlash fishinggi", ru: 'Фишинг верификации Instagram' },
  threat_phishing_desc: {
    en: 'Messages claiming your account needs "official verification" redirect you to fake login pages that steal your password.',
    uz: "Hisobingiz \"rasmiy tasdiqlash\" talab qiladi degan xabarlar siz parolingizni o'g'irlaydigan soxta kirish sahifalariga yo'naltiradi.",
    ru: 'Сообщения о необходимости «официальной верификации» аккаунта ведут на поддельные страницы входа для кражи пароля.',
  },
  threat_passwords_title: { en: 'Weak Password Takeovers', uz: "Zaif parollar orqali kirish", ru: 'Взлом аккаунтов через слабые пароли' },
  threat_passwords_desc: {
    en: 'Simple or reused passwords across Telegram, Instagram, and email make it trivial for attackers to access all your accounts at once.',
    uz: "Telegram, Instagram va elektron pochtada oddiy yoki qayta ishlatiladigan parollar tajovuzkorlarga barcha hisoblaringizga bir vaqtda kirish imkonini beradi.",
    ru: 'Простые или повторно используемые пароли в Telegram, Instagram и почте позволяют злоумышленникам захватить все ваши аккаунты сразу.',
  },

  /* Auth / username */
  enter_username: { en: 'Enter your username to track progress', uz: "Jarayonni kuzatish uchun foydalanuvchi nomingizni kiriting", ru: 'Введите имя пользователя для отслеживания прогресса' },
  enter_username_desc: {
    en: 'No account required — your progress is stored locally using your chosen username.',
    uz: "Hisob talab qilinmaydi — jarayoningiz tanlagan foydalanuvchi nomingiz orqali saqlanadi.",
    ru: 'Аккаунт не нужен — ваш прогресс сохраняется по выбранному вами имени пользователя.',
  },
  username: { en: 'Username', uz: "Foydalanuvchi nomi", ru: 'Имя пользователя' },
  save: { en: 'Save', uz: 'Saqlash', ru: 'Сохранить' },
  logout: { en: 'Logout', uz: 'Chiqish', ru: 'Выйти' },

  /* Dashboard */
  progress_title: { en: 'Your Progress', uz: "Sizning jarayoningiz", ru: 'Ваш прогресс' },
  total_xp: { en: 'Total XP', uz: 'Umumiy XP', ru: 'Всего XP' },
  streak: { en: 'Day Streak', uz: 'Kunlik seriya', ru: 'Дней подряд' },
  badges: { en: 'Badges Earned', uz: "Olingan nishonlar", ru: 'Полученные значки' },
  completed_lessons: { en: 'Completed Lessons', uz: 'Tugallangan darslar', ru: 'Пройденные уроки' },
  dashboard_fresh_start: { en: 'Nothing here yet — start a lesson to earn XP!', uz: "Hali hech narsa yo'q — XP topish uchun darsni boshlang!", ru: 'Пока пусто — начните урок, чтобы заработать XP!' },

  /* Leaderboard */
  leaderboard_title: { en: 'Leaderboard', uz: 'Peshqadamlar', ru: 'Рейтинг' },
  leaderboard_subtitle: { en: 'Rankings are based on real XP earned by completing lessons and quizzes.', uz: "Reytinglar darslar va testlarni bajarish orqali topilgan haqiqiy XP asosida hisoblanadi.", ru: 'Рейтинг основан на реальных XP, заработанных за уроки и тесты.' },
  leaderboard_empty_title: { en: 'No learners on the board yet', uz: "Hali reytingda o'quvchi yo'q", ru: 'Пока никого в рейтинге нет' },
  leaderboard_empty_desc: { en: 'Be the first! Complete lessons and quizzes to earn XP and claim the top spot.', uz: "Birinchi bo'ling! XP topish uchun darslar va testlarni bajaring.", ru: 'Будьте первым! Проходите уроки и тесты, чтобы заработать XP.' },
  leaderboard_real_data_note: { en: 'All rankings shown here reflect real activity on this platform.', uz: "Bu yerda ko'rsatilgan barcha reytinglar ushbu platformadagi haqiqiy faoliyatni aks ettiradi.", ru: 'Все рейтинги здесь отражают реальную активность на платформе.' },
  rank: { en: 'Rank', uz: "O'rin", ru: 'Место' },
  user_label: { en: 'User', uz: 'Foydalanuvchi', ru: 'Пользователь' },

  /* Password checker */
  password_title: { en: 'Password Strength Checker', uz: 'Parol xavfsizligini tekshirish', ru: 'Проверка надёжности пароля' },
  password_placeholder: { en: 'Type a password to test...', uz: 'Tekshirish uchun parol kiriting...', ru: 'Введите пароль для проверки...' },
  crack_time: { en: 'Estimated time to crack:', uz: 'Buzish uchun taxminiy vaqt:', ru: 'Примерное время взлома:' },
  password_tips: { en: 'Tips to improve:', uz: 'Yaxshilash uchun maslahatlar:', ru: 'Советы по улучшению:' },

  /* Simulator */
  simulator_title: { en: 'Phishing Simulator', uz: 'Fishing Simulyatori', ru: 'Симулятор фишинга' },
  is_this_safe: { en: 'Is this message safe or a scam?', uz: 'Bu xabar xavfsizmi yoki firibgarlikmi?', ru: 'Это сообщение безопасное или мошенническое?' },
  btn_safe: { en: 'SAFE', uz: 'XAVFSIZ', ru: 'БЕЗОПАСНО' },
  btn_scam: { en: 'SCAM', uz: 'FIRIBGARLIK', ru: 'МОШЕННИЧЕСТВО' },
  next_scenario: { en: 'Next Scenario', uz: 'Keyingi vaziyat', ru: 'Следующий сценарий' },
  correct: { en: 'Correct!', uz: "To'g'ri!", ru: 'Правильно!' },
  incorrect: { en: 'Incorrect!', uz: "Noto'g'ri!", ru: 'Неправильно!' },
  warning_signs: { en: 'Warning Signs:', uz: 'Ogohlantiruvchi belgilar:', ru: 'Тревожные признаки:' },

  /* Scam reports */
  scams_title: { en: 'Scam Reports', uz: 'Firibgarlik xabarlari', ru: 'Жалобы на мошенничество' },
  scams_subtitle: { en: 'Real scam messages collected to help you recognise and avoid them.', uz: "Ularni tanish va qochish uchun to'plangan haqiqiy firibgarlik xabarlari.", ru: 'Реальные мошеннические сообщения для распознавания и защиты.' },
  scams_examples_notice: {
    en: 'The examples below are real scam message patterns curated by the CyberSafe Teens team. Community members can also submit scams they encounter using the button above.',
    uz: "Quyidagi misollar CyberSafe Teens jamoasi tomonidan to'plangan haqiqiy firibgarlik xabarlari namunalaridir. Jamiyat a'zolari ham uchratgan firibgarliklarni yuqoridagi tugma orqali yuborishlari mumkin.",
    ru: 'Примеры ниже — это реальные образцы мошеннических сообщений, собранные командой CyberSafe Teens. Участники сообщества также могут сообщать о мошенничестве через кнопку выше.',
  },
  scams_empty_title: { en: 'No scam reports yet', uz: "Hali firibgarlik xabarlari yo'q", ru: 'Жалоб на мошенничество пока нет' },
  scams_empty_desc: { en: 'Be the first to submit a scam you have encountered.', uz: 'Uchratgan firibgarliklaringizni birinchi bo\'lib yuboring.', ru: 'Будьте первым, кто сообщит о встреченном мошенничестве.' },
  all_reports: { en: 'All', uz: 'Barchasi', ru: 'Все' },
  report_scam: { en: 'Report a Scam', uz: 'Firibgarlik haqida xabar berish', ru: 'Сообщить о мошенничестве' },
  platform: { en: 'Platform', uz: 'Platforma', ru: 'Платформа' },
  category: { en: 'Category', uz: 'Toifa', ru: 'Категория' },
  select_category: { en: 'Select a category', uz: 'Toifani tanlang', ru: 'Выберите категорию' },
  message: { en: 'Message', uz: 'Xabar', ru: 'Сообщение' },
  scam_message_placeholder: { en: 'Paste the scam message here...', uz: 'Firibgarlik xabarini bu yerga joylashtiring...', ru: 'Вставьте мошенническое сообщение сюда...' },
  submit_report: { en: 'Submit Report', uz: 'Xabarni yuborish', ru: 'Отправить отчёт' },
  submitting: { en: 'Submitting...', uz: 'Yuborilmoqda...', ru: 'Отправка...' },
  report_submitted_success: { en: 'Report submitted. Thank you!', uz: "Xabar yuborildi. Rahmat!", ru: 'Жалоба отправлена. Спасибо!' },
  report_submitted_error: { en: 'Failed to submit. Please try again.', uz: "Yuborib bo'lmadi. Qayta urinib ko'ring.", ru: 'Не удалось отправить. Попробуйте ещё раз.' },

  /* Lessons */
  lessons_title: { en: 'Learning Path', uz: "O'rganish yo'li", ru: 'Путь обучения' },
  level: { en: 'Level', uz: 'Daraja', ru: 'Уровень' },
  xp: { en: 'XP', uz: 'XP', ru: 'XP' },
  mins: { en: 'mins', uz: 'daqiqa', ru: 'мин' },
  read_lesson: { en: 'Read Lesson', uz: "Darsni o'qish", ru: 'Читать урок' },
  real_example: { en: 'Real Example:', uz: 'Haqiqiy misol:', ru: 'Реальный пример:' },
  what_to_do: { en: 'What to do:', uz: 'Nima qilish kerak:', ru: 'Что делать:' },
  take_quiz: { en: 'Take Quiz', uz: 'Testni ishlash', ru: 'Пройти тест' },
  quiz: { en: 'Quiz', uz: 'Test', ru: 'Тест' },
  submit_quiz: { en: 'Submit Answers', uz: 'Javoblarni yuborish', ru: 'Отправить ответы' },
  quiz_passed: { en: 'Quiz Passed!', uz: "Testdan o'tdingiz!", ru: 'Тест пройден!' },
  quiz_failed: { en: 'Quiz Failed.', uz: "Testdan o'ta olmadingiz.", ru: 'Тест не пройден.' },
  return_lessons: { en: 'Return to Lessons', uz: 'Darslarga qaytish', ru: 'Вернуться к урокам' },

  /* Generic */
  empty_state: { en: 'No data available yet.', uz: "Hozircha ma'lumot yo'q.", ru: 'Данных пока нет.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('cybersafe_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    localStorage.setItem('cybersafe_lang', lang);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key].en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
