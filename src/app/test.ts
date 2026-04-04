// Bug 1: Wrong calculation - should be subtraction but does addition
function calculateDiscount(price: number, discountPercent: number): number {
  return price + (price * discountPercent / 100); // Should be minus (-)
}

// Bug 2: Off-by-one error in loo
function sumArray(arr: number[]): number {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) { // Should be i < arr.length
    sum += arr[i];
  }
  return sum;
}

// Bug 3: Wrong operator - using == instead of ===
function validateUser(age: number): boolean {
  return age == "18"; // Coercion bug, should use === and proper type
}

// Bug 4: Division by zero not handled
function calculateAverage(numbers: number[]): number {
  let sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length; // No check if array is empty
}

// Bug 5: Logic error - condition always false
function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".") && email.length < 5; // Too short constraint is wrong
}

// Test these buggy functions
console.log(calculateDiscount(100, 10)); // Expected: 90, Actual: 110
console.log(sumArray([1, 2, 3, 4, 5])); // Expected: 15, will crash with undefined
console.log(validateUser(18)); // Type coercion issue
console.log(calculateAverage([])); // Returns NaN
console.log(isValidEmail("test@example.com")); // Returns false when should be true