export const generateNumberSequence = (min, max) => {
  // Input validation
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value");
  }
  
  // Generate sequence
  return Array.from(
    { length: max - min + 1 }, 
    (_, index) => min + index
  );
};

export const getNumberText = (number, divisor1 = 3, divisor2 = 5) => {
  const isDivisibleBy1 = number % divisor1 === 0;
  const isDivisibleBy2 = number % divisor2 === 0;
  
  if (isDivisibleBy1 && isDivisibleBy2) {
    return "RobotICT";
  } else if (isDivisibleBy1) {
    return "Robot";
  } else if (isDivisibleBy2) {
    return "ICT";
  } else {
    return number.toString();
  }
};
