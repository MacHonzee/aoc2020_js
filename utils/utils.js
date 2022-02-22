// TODO rename to IterationUtils in some future version
class Utils {
  nTimes(n, cb) {
    for (let i = 0; i < n; i++) {
      cb(i);
    }
  }

  rangeTimes(from, to, cb) {
    for (let i = from; i <= to; i++) {
      cb(i);
    }
  }

  arraySum(array, unitCb) {
    return array.reduce((sum, item) => {
      if (unitCb) return sum + unitCb(item);
      return sum + item;
    }, 0);
  }

  arrayProduct(array, unitCb) {
    return array.reduce((sum, item) => {
      if (unitCb) return sum * unitCb(item);
      return sum * item;
    }, 1);
  }
}

module.exports = new Utils();
