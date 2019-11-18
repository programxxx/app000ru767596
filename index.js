;(() => {
	'use strict';
	if (process.env.NODE_ENV !== 'production') {
		console.log('dotenv:', require('dotenv'));
		require('dotenv').config();
	}
	console.log(`Node mode "${process.env.NODE_ENV}"`);
	const mongoose = require('mongoose');
	mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	const db = mongoose.connection;
	let dbError = false;
	db.on('error', err => {
		console.log(err);
		dbError = err;
		setTimeout(() => {
			dbError = false;
		}, 10000);
	});
	db.once('open', () => {
		console.log('Connected to mongoose OK');
	})
	require('http').createServer((req, res) => {
		if (req.url === '/favicon.ico') {res.end();return;}
		res.setHeader('Content-type', 'text/html; charset=utf-8');
		const start = new Date().getTime();
		let sum = 0;
		for (let i = 0; i < 1000000; i++) {
			sum += Math.random();
		}
		const elapsed = new Date().getTime() - start;
		res.write(`<h1>${sum} ${elapsed}</h1>`);
		if (!dbError) {
			res.write(`Database connection OK`);
		} else {
			res.write(dbError.toString());
		}
		res.end();
	}).listen(process.env.PORT || 3000, err => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('server OK ' + new Date().toString());
	});
})();