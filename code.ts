function add(numbers: string): number {
  if (!numbers) {
      return 0;
  }

  let delimiter = ',';
  if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      delimiter = numbers.substring(2, delimiterEndIndex);
      numbers = numbers.substring(delimiterEndIndex + 1);
  }

  // Replace new lines with the delimiter and split the string
  const numberArray = numbers.replace(/\n/g, delimiter).split(delimiter).map(num => parseInt(num, 10));

  // Filter out any NaN values that may result from parsing non-numeric strings
  const filteredNumbers = numberArray.filter(num => !isNaN(num));

  return filteredNumbers.reduce((sum, num) => sum + num, 0);
}

// Test cases
console.log(add("")); // Output: 0
console.log(add("1")); // Output: 1
console.log(add("1,5")); // Output: 6
console.log(add("1\n2")); // Output: 3
console.log(add("1\n2,3")); // Output: 6
console.log(add("1,2,3")); // Output: 6
console.log(add("1\n2\n3\n4,5")); // Output: 15
console.log(add("//;\n1;2")); // Output: 3
console.log(add("//|\n1|2|3")); // Output: 6
console.log(add("//sep\n2sep3")); // Output: 5