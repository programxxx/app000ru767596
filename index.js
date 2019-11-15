;(() => {
	'use strict';
	const mongoose = require('mongoose');
	mongoose.connect(process.env.DATABASE_URL, {
		useNewURLParser: true
	});
	const db = mongoose.connection;
	let dbError = false;
	db.on('error', err => {
		console.log(err);
		dbError = err;
		setTimeout(() => {
			dbError = false;
		}, 1000);
	});
	db.once('open', () => {
		console.log('Connected to mongoose OK');
	})
	require('http').createServer((req, res) => {
		if (req.url === '/favicon.ico') {res.end();return;}
		res.setHeader('Content-type', 'text/plain');
		res.write(`Heroku node.js test OK ${Math.random().toString(32).slice(2)} ${new Date().toString()}${'\r\n'}`);
		if (!dbError) {
			res.write(`Database connection OK`);
		} else {
			res.write(dbError.toString())
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
