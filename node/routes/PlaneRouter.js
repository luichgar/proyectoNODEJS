const express = require('express');
const {getPlanes, postPlane, updatePlane, getPlane, removePlane} = require('../controllers/PlaneController');
const planeRouter = express.Router(); 

planeRouter.get('/planes', getPlanes);
planeRouter.get('/planes/:id', getPlane);
planeRouter.post('/planes', postPlane);
planeRouter.put('/planes/:id', updatePlane);
planeRouter.put('/planes/remove/:id', removePlane);

module.exports = planeRouter;