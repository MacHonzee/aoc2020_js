class StringUtils {
  setCharAt(string, char, i) {
    return string.substr(0, i) + char + string.substr(i + 1);
  }
}

module.exports = new StringUtils();
