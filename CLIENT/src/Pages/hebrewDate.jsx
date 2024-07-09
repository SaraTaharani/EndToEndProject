export function renderHebrewDate(date) {
  const hebrewMonths = [
    'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול',
    'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א', 'אדר ב'
  ];

  const hebrewYear = date.getFullYear() + 5000; // Adjust for Hebrew year calculation
  const hebrewMonth = hebrewMonths[date.getMonth()];
  const hebrewDay = date.getDate();

  // Convert day number to Hebrew letters if needed
  const hebrewDayFormatted = convertNumberToHebrewLetters(hebrewDay);

  return `${hebrewDayFormatted} ${hebrewMonth} ${hebrewYear}`;
}

// Function to convert day number to Hebrew letters
function convertNumberToHebrewLetters(dayNumber) {
  const hebrewNumbers = [
    'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
    'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט',
    'כ', 'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט', 'ל'
  ];

  if (dayNumber <= 10) {
    return hebrewNumbers[dayNumber - 1];
  } else if (dayNumber === 15) {
    return 'טו';
  } else if (dayNumber === 16) {
    return 'טז';
  } else {
    const tens = Math.floor(dayNumber / 10);
    const units = dayNumber % 10;
    return `${hebrewNumbers[tens - 1]}${hebrewNumbers[units - 1]}`;
  }
  
}
