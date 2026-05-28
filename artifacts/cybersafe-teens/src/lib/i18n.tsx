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
  
  start_learning: { en: 'Start Learning', uz: 'O`rganishni Boshlash', ru: 'Начать Обучение' },
  home_hero_title: { en: 'Stay Safe Online', uz: 'Onlayn Xavfsiz Bo`ling', ru: 'Будьте в безопасности онлайн' },
  home_hero_subtitle: { en: 'Learn to spot scams, secure your accounts, and protect your digital life.', uz: 'Firibgarliklarni aniqlashni, hisoblaringizni himoyalashni va raqamli hayotingizni asrashni o`rganing.', ru: 'Научитесь распознавать мошенничество, защищать свои аккаунты и свою цифровую жизнь.' },
  
  stats_users: { en: 'Users', uz: 'Foydalanuvchilar', ru: 'Пользователи' },
  stats_lessons: { en: 'Lessons Completed', uz: 'Tugallangan darslar', ru: 'Пройдено уроков' },
  stats_scams: { en: 'Scams Reported', uz: 'Xabar qilingan firibgarlik', ru: 'Жалоб на мошенничество' },
  stats_quizzes: { en: 'Quizzes Taken', uz: 'Olingan testlar', ru: 'Пройдено тестов' },

  enter_username: { en: 'Enter your username to track progress', uz: 'Jarayonni kuzatish uchun foydalanuvchi nomingizni kiriting', ru: 'Введите имя пользователя для отслеживания прогресса' },
  username: { en: 'Username', uz: 'Foydalanuvchi nomi', ru: 'Имя пользователя' },
  save: { en: 'Save', uz: 'Saqlash', ru: 'Сохранить' },
  logout: { en: 'Logout', uz: 'Chiqish', ru: 'Выйти' },
  
  progress_title: { en: 'Your Progress', uz: 'Sizning jarayoningiz', ru: 'Ваш прогресс' },
  total_xp: { en: 'Total XP', uz: 'Umumiy XP', ru: 'Всего XP' },
  streak: { en: 'Day Streak', uz: 'Kunlik seriya', ru: 'Дней подряд' },
  badges: { en: 'Badges Earned', uz: 'Olingan nishonlar', ru: 'Полученные значки' },
  completed_lessons: { en: 'Completed Lessons', uz: 'Tugallangan darslar', ru: 'Пройденные уроки' },
  
  leaderboard_title: { en: 'Leaderboard', uz: 'Peshqadamlar', ru: 'Рейтинг' },
  rank: { en: 'Rank', uz: 'O`rin', ru: 'Место' },
  
  password_title: { en: 'Password Strength Checker', uz: 'Parol xavfsizligini tekshirish', ru: 'Проверка надежности пароля' },
  password_placeholder: { en: 'Type a password to test...', uz: 'Tekshirish uchun parol kiriting...', ru: 'Введите пароль для проверки...' },
  crack_time: { en: 'Estimated time to crack:', uz: 'Buzish uchun taxminiy vaqt:', ru: 'Примерное время взлома:' },
  password_tips: { en: 'Tips to improve:', uz: 'Yaxshilash uchun maslahatlar:', ru: 'Советы по улучшению:' },
  
  simulator_title: { en: 'Phishing Simulator', uz: 'Fishing Simulyatori', ru: 'Симулятор фишинга' },
  is_this_safe: { en: 'Is this message safe or a scam?', uz: 'Bu xabar xavfsizmi yoki firibgarlikmi?', ru: 'Это сообщение безопасное или мошенническое?' },
  btn_safe: { en: 'SAFE', uz: 'XAVFSIZ', ru: 'БЕЗОПАСНО' },
  btn_scam: { en: 'SCAM', uz: 'FIRIBGARLIK', ru: 'МОШЕННИЧЕСТВО' },
  next_scenario: { en: 'Next Scenario', uz: 'Keyingi vaziyat', ru: 'Следующий сценарий' },
  correct: { en: 'Correct!', uz: 'To`g`ri!', ru: 'Правильно!' },
  incorrect: { en: 'Incorrect!', uz: 'Noto`g`ri!', ru: 'Неправильно!' },
  warning_signs: { en: 'Warning Signs:', uz: 'Ogohlantiruvchi belgilar:', ru: 'Тревожные признаки:' },
  
  scams_title: { en: 'Community Scam Reports', uz: 'Hamjamiyat firibgarlik xabarlari', ru: 'Жалобы сообщества на мошенничество' },
  report_scam: { en: 'Report a Scam', uz: 'Firibgarlik haqida xabar berish', ru: 'Сообщить о мошенничестве' },
  platform: { en: 'Platform', uz: 'Platforma', ru: 'Платформа' },
  category: { en: 'Category', uz: 'Toifa', ru: 'Категория' },
  message: { en: 'Message', uz: 'Xabar', ru: 'Сообщение' },
  submit_report: { en: 'Submit Report', uz: 'Xabarni yuborish', ru: 'Отправить отчет' },
  
  lessons_title: { en: 'Learning Path', uz: 'O`rganish yo`li', ru: 'Путь обучения' },
  level: { en: 'Level', uz: 'Daraja', ru: 'Уровень' },
  xp: { en: 'XP', uz: 'XP', ru: 'XP' },
  mins: { en: 'mins', uz: 'daqiqa', ru: 'мин' },
  read_lesson: { en: 'Read Lesson', uz: 'Darsni o`qish', ru: 'Читать урок' },
  real_example: { en: 'Real Example:', uz: 'Haqiqiy misol:', ru: 'Реальный пример:' },
  what_to_do: { en: 'What to do:', uz: 'Nima qilish kerak:', ru: 'Что делать:' },
  take_quiz: { en: 'Take Quiz', uz: 'Testni ishlash', ru: 'Пройти тест' },
  quiz: { en: 'Quiz', uz: 'Test', ru: 'Тест' },
  submit_quiz: { en: 'Submit Answers', uz: 'Javoblarni yuborish', ru: 'Отправить ответы' },
  quiz_passed: { en: 'Quiz Passed!', uz: 'Testdan o`tdingiz!', ru: 'Тест пройден!' },
  quiz_failed: { en: 'Quiz Failed.', uz: 'Testdan o`ta olmadingiz.', ru: 'Тест не пройден.' },
  return_lessons: { en: 'Return to Lessons', uz: 'Darslarga qaytish', ru: 'Вернуться к урокам' },
  
  empty_state: { en: 'No data available yet.', uz: 'Hozircha ma`lumot yo`q.', ru: 'Данных пока нет.' }
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
