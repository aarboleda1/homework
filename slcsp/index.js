const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
var Promise = require("bluebird");

var files = ['slcsp.csv', 'zips.csv', 'plans.csv'];
const slcspFile = 'slcsp.csv';
const zipFile = 'zips.csv';
const plansFile = 'plans.csv';

const cb = () => {
	console.log('yooo!')
}

// function readAsync(file, callback) {
//     fs.readFile(file, 'utf8', callback);
// }

// async.map(files, readAsync, function(err, results) {
//     // results = ['file 1 content', 'file 2 content', ...]

// 		async.eachSeries(results, (line, cb) => {
// 			console.log(line.length);
// 			cb();
// 		})
// });

// const zipParser = parse({delimiter: ','}, (err, data) => {
// 	async.eachSeries(data, (zipLine, cb)	 => {
// 		console.log(zipLine, 'IS THE LINE')
// 	})
// });

// const plansParser = Promise.promisify(parse({delimiter: ','}, (err, data) => {
// }));

const readZipFile = (zipCode) => {
	return new Promise((resolve, reject) => {
		fs.readFile('zips.csv', 'utf8', (err, data) => {
			console.log(zipCode, 'IS THE ZIP');
			data = data.split(/\n/).map(lineStr =>  lineStr.split(",")); // Convert to one string per line
			data.forEach((line) => {
				console.log(line[0], 'IS THE LINE INSIDE THE LOOP')
				if (line[0] === zipCode) {
					let state = line[1];
					let rate_area = line[4];
					resolve([state, rate_area]);
				}
			})
		})
	})
};

const parser = parse({delimiter: ','}, (err, data) => {
	async.eachSeries(data, (zipCodeAndRate, callb) => {
		// for each line
		let zipCode = zipCodeAndRate[0];
		readZipFile(zipCode).then((res) => {
			callb();
		});
	});
});

// // const parseZips = parse({delimiter: ','}, (err, data) => {
// // 	async.eachSeries(data, (line, cb) => {
// // 		// console.log(line[1] = 'y');
// // 		line[1] = 'y'
// // 		console.log(line)
// // 		cb();
// // 	})
// // })

fs.createReadStream(slcspFile).pipe(parser);
// fs.createReadStream(zipFile).pipe(parser);