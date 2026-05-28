import { Router } from "express";
import { CheckPasswordBody } from "@workspace/api-zod";

const router = Router();

const COMMON_PASSWORDS = new Set([
  "password", "123456", "12345678", "qwerty", "abc123", "111111", "password1",
  "1234567890", "letmein", "admin", "welcome", "monkey", "dragon", "master",
  "superman", "qwerty123", "1q2w3e4r", "pass", "000000", "iloveyou",
]);

function analyzePassword(password: string) {
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);
  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase());

  let score = 0;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (hasUppercase && hasLowercase) score++;
  if (hasNumbers) score++;
  if (hasSymbols) score++;
  if (isCommon) score = 0;
  score = Math.min(4, score);

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const label = labels[score];

  // Crack time estimation (rough)
  let charSet = 0;
  if (hasLowercase) charSet += 26;
  if (hasUppercase) charSet += 26;
  if (hasNumbers) charSet += 10;
  if (hasSymbols) charSet += 32;
  if (charSet === 0) charSet = 26;

  const combinations = Math.pow(charSet, length);
  const guessesPerSecond = 1e10; // 10 billion guesses/sec for modern hardware
  const seconds = combinations / guessesPerSecond;

  let timeToCrackEn: string;
  let timeToCrackUz: string;
  let timeToCrackRu: string;

  if (isCommon) {
    timeToCrackEn = "Instantly (common password)";
    timeToCrackUz = "Bir zumda (keng tarqalgan parol)";
    timeToCrackRu = "Мгновенно (распространённый пароль)";
  } else if (seconds < 1) {
    timeToCrackEn = "Less than 1 second";
    timeToCrackUz = "1 soniyadan kam";
    timeToCrackRu = "Менее 1 секунды";
  } else if (seconds < 60) {
    timeToCrackEn = `${Math.round(seconds)} seconds`;
    timeToCrackUz = `${Math.round(seconds)} soniya`;
    timeToCrackRu = `${Math.round(seconds)} секунд`;
  } else if (seconds < 3600) {
    timeToCrackEn = `${Math.round(seconds / 60)} minutes`;
    timeToCrackUz = `${Math.round(seconds / 60)} daqiqa`;
    timeToCrackRu = `${Math.round(seconds / 60)} минут`;
  } else if (seconds < 86400) {
    timeToCrackEn = `${Math.round(seconds / 3600)} hours`;
    timeToCrackUz = `${Math.round(seconds / 3600)} soat`;
    timeToCrackRu = `${Math.round(seconds / 3600)} часов`;
  } else if (seconds < 31536000) {
    timeToCrackEn = `${Math.round(seconds / 86400)} days`;
    timeToCrackUz = `${Math.round(seconds / 86400)} kun`;
    timeToCrackRu = `${Math.round(seconds / 86400)} дней`;
  } else if (seconds < 31536000 * 1000) {
    timeToCrackEn = `${Math.round(seconds / 31536000)} years`;
    timeToCrackUz = `${Math.round(seconds / 31536000)} yil`;
    timeToCrackRu = `${Math.round(seconds / 31536000)} лет`;
  } else {
    timeToCrackEn = "Millions of years";
    timeToCrackUz = "Millionlab yillar";
    timeToCrackRu = "Миллионы лет";
  }

  const tipsEn: string[] = [];
  const tipsUz: string[] = [];
  const tipsRu: string[] = [];

  if (isCommon) {
    tipsEn.push("This is a very common password — change it immediately");
    tipsUz.push("Bu juda keng tarqalgan parol — uni darhol o'zgartiring");
    tipsRu.push("Это очень распространённый пароль — немедленно смените его");
  }
  if (length < 12) {
    tipsEn.push("Use at least 12 characters for better protection");
    tipsUz.push("Yaxshiroq himoya uchun kamida 12 ta belgi ishlating");
    tipsRu.push("Используйте не менее 12 символов для лучшей защиты");
  }
  if (!hasUppercase) {
    tipsEn.push("Add uppercase letters (A-Z)");
    tipsUz.push("Katta harflar qo'shing (A-Z)");
    tipsRu.push("Добавьте заглавные буквы (A-Z)");
  }
  if (!hasLowercase) {
    tipsEn.push("Add lowercase letters (a-z)");
    tipsUz.push("Kichik harflar qo'shing (a-z)");
    tipsRu.push("Добавьте строчные буквы (a-z)");
  }
  if (!hasNumbers) {
    tipsEn.push("Include numbers (0-9)");
    tipsUz.push("Raqamlar qo'shing (0-9)");
    tipsRu.push("Добавьте цифры (0-9)");
  }
  if (!hasSymbols) {
    tipsEn.push("Add special characters (!, @, #, $, etc.)");
    tipsUz.push("Maxsus belgilar qo'shing (!, @, #, $, va h.k.)");
    tipsRu.push("Добавьте специальные символы (!, @, #, $, и т.д.)");
  }
  if (tipsEn.length === 0) {
    tipsEn.push("Excellent password! Enable two-factor authentication too.");
    tipsUz.push("Ajoyib parol! Ikki faktorli autentifikatsiyani ham yoqing.");
    tipsRu.push("Отличный пароль! Также включите двухфакторную аутентификацию.");
  }

  return {
    score,
    label,
    timeToCrackEn,
    timeToCrackUz,
    timeToCrackRu,
    tipsEn,
    tipsUz,
    tipsRu,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    isCommon,
    length,
  };
}

router.post("/password/check", (req, res) => {
  const parsed = CheckPasswordBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const result = analyzePassword(parsed.data.password);
  res.json(result);
});

export default router;
