const fs = require('fs');
const path = require('path');
// const b1 = Buffer.alloc(6);
// console.log(b1);
// let b2 = Buffer.allocUnsafe(6);
// console.log(b2);
console.log(process.cwd());
console.log(process.platform);
const cpus = require('os').cpus();
console.log(cpus);
fs.writeFileSync(path.join(__dirname, './data.js'), cpus, 'utf8');