export const graphList = (data) => {
  const arr = [
    { name: 0, count: 0 },
    { name: 1, count: 0 },
    { name: 2, count: 0 },
    { name: 3, count: 0 },
    { name: 4, count: 0 },
    { name: 5, count: 0 },
    { name: 6, count: 0 },
    { name: 7, count: 0 },
    { name: 8, count: 0 },
    { name: 9, count: 0 },
    { name: 10, count: 0 },
    { name: 11, count: 0 },
  ];

  if (data.length == 0) return [];
  data.forEach((item) => {
    const date = new Date(item.date);
    arr.map((month) => {
      if (month.name === date.getMonth()) {
        month.count = month.count + item.amount;
      }
    });
  });
  return arr;
};
