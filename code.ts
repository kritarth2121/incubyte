class StringCalculator {
    add(numbers: string): number {
        if (!numbers) {
            return 0;
        }

        const numArray = numbers.split(',').map(num => parseInt(num, 10));
        return numArray.reduce((sum, current) => sum + current, 0);
    }
}

// Example usage
const calculator = new StringCalculator();
console.log(calculator.add(""));         // Output: 0
console.log(calculator.add("1"));        // Output: 1
console.log(calculator.add("1,5"));      // Output: 6