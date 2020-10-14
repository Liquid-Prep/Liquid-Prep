export class Enum {
  private eObj = {};
  constructor(private enumArray = []) {
    enumArray.forEach((el, idx) => {
      this.eObj[el] = idx;
    });
  }

  getEnum(key) {
    return this.eObj[key];  
  }

  getKey(value) {
    let key;
    Object.keys(this.eObj).map((el, idx) => {
      if(idx === value) {
        key = el;
      }
    });
    return key;
  }
}