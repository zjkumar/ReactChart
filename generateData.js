const fs = require('fs');
const { format, addDays } = require('date-fns');

const generateData = () => {
  const data = [];
  const startDate = new Date('2023-01-01T00:00:00Z');

  for (let i = 0; i < 100; i++) {
    const date = format(addDays(startDate, i), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const value = Math.floor(Math.random() * 100);
    data.push({ timestamp: date, value });
  }

  fs.writeFileSync('src/data/data.json', JSON.stringify(data, null, 2));
};

generateData();
