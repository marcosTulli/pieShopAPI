// Bring in the express server and create application
let express = require('express');
let app = express();

// Use the express Router object
let router = express.Router();

// Create GET to return a list of all pies
router.get('/', function (req, res, next) { 
    res.send("Apple");
})

// COnfigure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server  to install on port 5000
let  server = app.listen(5000, () => {
    console.log("Node  server is running on http://localhost:5000")
})






