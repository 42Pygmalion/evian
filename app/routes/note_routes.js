
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

	app.put('/notes/:id', (req, res) => {
		const details = { '_id': new ObjectID(req.params.id)};
		if (req.body.body || req.body.title) {
			if (req.body.body && req.body.title) {
				const note = { text: req.body.body, title: req.body.title };
			} else if (req.body.body) {
				const note = { text: req.body.body };
			} else {
				const note = { title: req.body.title };
			}
			db.collection('notes').update(details, note, (err, result) => {
				if (err) {
					res.send({'error':'An error has occurred'});
				} else {
					res.send(note);
				}
			})
		}
	});

 	app.delete('/notes/:id', (req, res) => {
    	const details = { '_id': new ObjectID(req.params.id)};
    	db.collection('notes').remove(details, (err, item) => {
    		if (err) {
    			res.send({'error':'An error has occurred'});
    		} else {
    			res.send('Note ' + req.params.id + ' deleted !');
    		}
    	});
  	});

 	app.get('/notes/:id', (req, res) => {
    	const details = { '_id': new ObjectID(req.params.id)};
    	db.collection('notes').findOne(details, (err, item) => {
    		if (err) {
    			res.send({'error':'An error has occurred'});
    		} else {
    			res.send(item);
    		}
    	});
  	});

	app.post('/notes', (req, res) => {
    	const note = { text: req.body.body, title: req.body.title};
		db.collection('notes').insert(note, (err, results) => {
			if (err) { 
        		res.send({ 'error': 'An error has occurred' }); 
     		} else {
     			res.send(results.ops[0]);
     		}
		});
	});
};