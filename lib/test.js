const buff = Buffer.from('feng');
// console.log(buff);
// console.log(buff.toJSON());

// const b2 = Buffer.allocUnsafe(30);
// console.log(b2);

const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname, './test.txt'), 'utf8', (err, data) => {
	// console.log(err);
	// console.log(data);
});

// const chokidar = require('chokidar');

// chokidar
// 	.watch(path.join(__dirname, './test.txt'), {})
// 	.on('all', (event, path) => {
// 		console.log(event);
// 		console.log(path);
// 	});

// https://dxfeeng.top/vue/transition

const reader = fs.createReadStream(path.join(__dirname, './test.txt'));

// reader.on('data', chunk => {
// 	console.log(chunk.toString());
// });

// reader.on('end', () => {
// 	console.log('read done');
// });

const writer = fs.createWriteStream(path.join(__dirname, './test2.txt'));
// console.log(path.join(__dirname, './test2.txt'));
// reader.pipe(writer);

// console.log(path.parse(path.join(__dirname, './test2.txt')));

const EventEmitter = require('events');

class CustomEmitter extends EventEmitter {}

const myEmitter = new CustomEmitter();

const fn1 = (a, b) => {
	// console.log(a + b);
};
const fn2 = (a, b) => {
	// console.log(a + b);
};

myEmitter.on('hello', fn1);
myEmitter.once('hi', fn2);

myEmitter.emit('hello', 100, 200);
// myEmitter.emit('hi', 100, 200);

myEmitter.removeListener('hi', fn2);
myEmitter.removeAllListeners('hello');

myEmitter.emit('hi', 100, 200);

const util = require('util');

const stat = util.promisify(fs.stat);
stat(path.join(__dirname, './test.js')).then(res => {
	console.log(res);
});
