export const marks = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 70,
    label: "70",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 90,
    label: "90",
  },
  {
    value: 100,
    label: "100",
  },
];

export const bettingMarks = (length) => {
  return Array.from({ length: length }, (value, index) => ({
    value: index,
    label: index.toString(),
  }));
};

export const isOddOrEven = (number) => {
  if (typeof number !== "number") {
    return "Invalid input. Please provide a number.";
  }
  if (number % 2 === 0) {
    return 1;
  } else {
    return 0;
  }
};
