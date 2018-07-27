const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '508d3d7015384f96b7788e5773fd3fcd'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data)
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImageDetect = (db) => (req, res) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries)
		 })
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImageDetect: handleImageDetect,
	handleApiCall: handleApiCall
}
