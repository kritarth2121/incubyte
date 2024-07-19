function add(numbers: string): number {
  if (!numbers) {
      return 0;
  }

  const numberArray = numbers.split(',').map(num => parseInt(num, 10));
  return numberArray.reduce((sum, num) => sum + num, 0);
}

// Test cases
console.log(add("")); // Output: 0
console.log(add("1")); // Output: 1
console.log(add("1,5")); // Output: 6
