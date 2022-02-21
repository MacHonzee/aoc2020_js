class NumUtils {
  decimalToBinary(num) {
    return num.toString(2);
  }

  binaryToDecimal(binary) {
    return parseInt(binary, 2);
  }
}

module.exports = new NumUtils();
