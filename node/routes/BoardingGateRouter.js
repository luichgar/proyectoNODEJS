const express = require('express');
const boardingGateRouter = express.Router(); 
const { 
        getBoardingGates, 
        getBoardingGate,
        postBoardingGate,
        updateBoardingGate, 
        assignPlaneToBoardingGate,
        clearBoardingGate
        } = require('../controllers/BoardingGateController');

boardingGateRouter.get('/boarding-gates',getBoardingGates);
boardingGateRouter.get('/boarding-gates/:id',getBoardingGate);
boardingGateRouter.post('/boarding-gates',postBoardingGate);
boardingGateRouter.put('/boarding-gates/:id',updateBoardingGate);
boardingGateRouter.put('/boarding-gates/assign/:boardingGateId&:planeId', assignPlaneToBoardingGate);
boardingGateRouter.put('/boarding-gates/clear/:boardingGateId', clearBoardingGate);


module.exports = boardingGateRouter;