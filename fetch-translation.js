const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const SHEET_URL = 'https://sheet.best/api/sheets/YOUR_SHEET_ID'; // <-- Deine SheetBest API URL

async function fetchAndWrite() {
  const res = await fetch(SHEET_URL);
  const data = await res.json();

  const languages = ['de', 'en', 'es'];
  const translations = {
    de: {},
    en: {},
    es: {},
  };

  data.forEach((row) => {
    languages.forEach((lang) => {
      // Erstelle verschachtelte Objekte wie "countdown.days"
      const keys = row.key.split('.');
      let current = translations[lang];

      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          current[k] = row[lang];
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      });
    });
  });

  // Schreibe die JSON-Dateien
  languages.forEach((lang) => {
    const filePath = path.join(__dirname, '..', 'src', 'locales', lang, 'translation.json');
    fs.writeFileSync(filePath, JSON.stringify(translations[lang], null, 2), 'utf8');
    console.log(`✅ ${lang} geschrieben → ${filePath}`);
  });
}

fetchAndWrite().catch((err) => {
  console.error('❌ Fehler beim Laden oder Schreiben:', err);
});
