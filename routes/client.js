const router = require('express').Router();
let Client = require('../models/client-model');

//get all clients
router.route('/').get((req, res) => {
	Client.find()
	.then(clients => res.json(clients))
	.catch(err => res.status(400).json('Error: ' + err));
})

//add client
router.route('/add').post((req, res) => {
	const name = req.body.name;
	const number = req.body.number;
	const city = req.body.city;
	const max = req.body.max
	const min = req.body.min
	const avg = req.body.avg
	const condition = req.body.condition

	const newClient = new Client({
		name,
		number,
		city,
		max,
		min,
		avg,
		condition
	});

	newClient.save()
	.then(() => res.json('Client Added!'))
	.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').delete((req, res) => {
	Client.findByIdAndDelete(req.params.id)
	.then(client => res.json(client))
	.catch(err => res.status(400).json('Error: ' + err))
})



module.exports = router