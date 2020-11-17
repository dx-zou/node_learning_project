const _ = require('lodash');
const path = require('path');
const fs = require('fs');
function buildUri(scheme, domain, path) {
	return `${scheme}://${domain}/${path}`;
}

// 柯里化
const buildUriCurry = _.curry(buildUri);
const myGithubPath = buildUriCurry('https', 'github.com');
// const profilePath = myGithubPath('semlinker/semlinker');
// const awesomeTsPath = myGithubPath('semlinker/awesome-typescript');

// console.log(profilePath);
// console.log(awesomeTsPath);

// 偏函数

// const parFun = _.partial(buildUri, 'https', 'github.com')

// const profilePath = parFun('semlinker/semlinker');
// const awesomeTsPath = parFun('semlinker/awesome-typescript');

// console.log(profilePath);
// console.log(awesomeTsPath);
// console.log(
// 	path.basename('F:my-github\\node-projects\\node_learning_project\\app.js')
// );
// console.log(
// 	path.dirname('F:my-github\\node-projects\\node_learning_project\\app.js')
// );
// console.log(
// 	path.parse('F:my-github\\node-projects\\node_learning_project\\app.js')
// );
// console.log(
// 	path.extname('F:my-github\\node-projects\\node_learning_project\\app.js')
// );
// console.log(
// 	path.normalize('F:my-github\\node-projects\\node_learning_project\\app.js')
// );

const f1 = path.resolve(__dirname, './token.js');
const f2 = path.resolve(__dirname, './test.js');

const readStream = fs.createReadStream(f1);
const writeStream = fs.createWriteStream(f2);

readStream.pipe(writeStream);
readStream.on('data', chunk => {
	console.log(chunk);
	console.log(chunk instanceof Buffer);
});
readStream.on('end', () => {
	console.log('done');
});
