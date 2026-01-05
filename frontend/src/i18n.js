import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        admin: {
          title: "Admin Panel",
          riddleStats: "Riddle Statistics",
          userStats: "User Statistics",
          submissions: "All Submissions"
        },
        ui: {
          dark: "Dark mode",
          light: "Light mode",
          language: "Language"
        }
      }
    },
    pl: {
      translation: {
        admin: {
          title: "Panel Admina",
          riddleStats: "Statystyki Zagadek",
          userStats: "Statystyki Użytkowników",
          submissions: "Wszystkie Odpowiedzi"
        },
        ui: {
          dark: "Tryb ciemny",
          light: "Tryb jasny",
          language: "Język"
        }
      }
    }
  }
});

export default i18n;
