const printDigits = (num) => {
    while (num > 0) {
        console.log(num % 10);
        num = Math.floor(num / 10);
    }
}
console.log(printDigits(12345))