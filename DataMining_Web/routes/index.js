var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Show the graphs */
router.get('/charts', async (req, res) => {
  try {
    const db = await connectToDB();
    const data = await db.collection('traffic').find().toArray();

    // Send raw JSON data to the template
    res.render('charts', { data: data });
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
