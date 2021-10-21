import { getCommonMessage } from './utils/index';
// const { getCommonMessage } = require('./utils/index');

// const message = getCommonMessage();
// console.log(message);

getCommonMessage();

console.log('This is Core Workspace');

class Person {
  name: any;

  constructor(name: any) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setName(name = '') {
    this.name = name;
  }
}

enum TYPES_MAP {
  'Name' = 'type',
}

export default Person;
