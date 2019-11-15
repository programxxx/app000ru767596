;(() => {
	'use strict';
	require('http').createServer((req, res) => {
		if (req.url = '/favicon.ico') {res.end();return;}
		res.setHeader('Content-type', 'text/plain');
		res.write(Math.random().toString(32).slice(2));
		res.end();
	}).listen(process.env.PORT || 3000, err => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('server OK ' + new Date().toString());
	});
})();
