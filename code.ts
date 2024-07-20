function add(numbers: string): number {
  if (!numbers) {
      return 0;
  }

  let delimiters = [','];
  if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      const delimiterPart = numbers.substring(2, delimiterEndIndex);
      numbers = numbers.substring(delimiterEndIndex + 1);

      // Extract delimiters enclosed in square brackets
      const delimiterMatches = delimiterPart.match(/\[(.*?)\]/g);
      if (delimiterMatches) {
          delimiters = delimiterMatches.map(del => del.slice(1, -1));
      } else {
          delimiters = [delimiterPart];
      }
  }

  // Create a regex to replace all delimiters with commas
  const delimiterRegex = new RegExp(delimiters.map(del => escapeRegExp(del)).join('|'), 'g');
  numbers = numbers.replace(/\n/g, ',').replace(delimiterRegex, ',');

  const numberArray = numbers.split(',').map(num => parseInt(num, 10));

  // Filter out any NaN values that may result from parsing non-numeric strings
  const filteredNumbers = numberArray.filter(num => !isNaN(num));

  // Check for negative numbers
  const negativeNumbers = filteredNumbers.filter(num => num < 0);
  if (negativeNumbers.length > 0) {
      throw new Error(`negative numbers not allowed: ${negativeNumbers.join(', ')}`);
  }

  // Filter out numbers greater than 1000
  const validNumbers = filteredNumbers.filter(num => num <= 1000);

  return validNumbers.reduce((sum, num) => sum + num, 0);
}

// Utility function to escape special characters in delimiter strings
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
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
console.log(add("2,1001")); // Output: 2
console.log(add("//[*][%]\n1*2%3")); // Output: 6
console.log(add("//[***]\n1***2***3")); // Output: 6
console.log(add("//[***][%%%]\n1***2%%%3")); // Output: 6
try {
  console.log(add("1,-2,3")); // Throws error: negative numbers not allowed: -2
} catch (e) {
  console.error(e.message);
}
try {
  console.log(add("1,-2,-3,4")); // Throws error: negative numbers not allowed: -2, -3
} catch (e) {
  console.error(e.message);
}
