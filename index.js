// Bring in the express server and create application
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');

// Use the express Router object
let router = express.Router();

// Create GET to return a list of all pies
router.get('/', function (req, res, next) {
  pieRepo.get(
    data => {
      res.status(200).json({
        status: 200,
        statusText: 'OK',
        message: 'All pies retrieved.',
        data: data,
      });
    },
    err => {
      next(err);
    }
  );

  router.get('/search', (req, res, next) => {
    let searchObject = {
      id: req.query.id,
      name: req.query.name,
    };
    pieRepo.search(
      searchObject,
      data => {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: 'All pies retrieved',
          data: data,
        });
      },
      err => {
        next(err);
      }
    );
  });

  router.get('/:id', (req, res, next) => {
    pieRepo.getById(
      req.params.id,
      data => {
        if (data) {
          res.status(200).json({
            status: 200,
            statusText: 'OK',
            message: 'Single pie retrieved',
            data: data,
          });
        } else {
          res.status(404).json({
            status: 400,
            statusText: 'Not found',
            message: `The pie ${req.params.id} could not be found`,
            error: {
              code: 'NOT_FOUND',
              message: `The pie ${req.params.id} could not be found`,
            },
          });
        }
      },
      err => {
        next(err);
      }
    );
  });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server  to install on port 5000
let server = app.listen(3000, () => {
  console.log('Node server is running on http://localhost:3000');
});
