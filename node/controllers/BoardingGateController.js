const BoardingGate = require('../models/BoardingGate');
const Plane = require('../models/Plane');

exports.getBoardingGates = async (req,res) => {
    try {
        const boardingGates = await BoardingGate.findAll({
            include: [Plane]
        });
        res.status(200).json(boardingGates);
    } catch (error) {
        console.error('There was an error getting the boarding gates',error);
        res.status(500).json({mensaje: 'There was an error getting the boarding gates'})
    }
}

exports.getBoardingGate = async (req,res) => {
    
    try {
        const {id} = req.params;

        const boardingGate = await BoardingGate.findByPk(id);
        if(boardingGate === null){
            res.status(500).json({message: 'Boarding gate not found'});
        }else{
            res.status(200).json(boardingGate);
        }

    } catch (error) {
        console.error('There was an error finding the boarding gate',error);
        res.status(500).json({error: 'There was an error finding the boarding gate'})
    }
}

exports.updateBoardingGate = async (req,res) => {
    
    try {
        const {id} = req.params;

       const [updateData] = await BoardingGate.update(req.body, {
            where: {id}
        });

        if(updateData === 1){
            res.json({message: 'Boarding gate updated'})
        } else{
            res.status(500).json({error: 'Boarding gate not found'})
        }

    } catch (error) {
        console.error('There was an error updating the boarding gate',error);
        res.status(500).json({error: 'There was an error updating the boarding gate'})
    }
}



exports.postBoardingGate = async (req,res) => {
    
    try {
        const {code_name,availability} = req.body;
        const newBoardingGate = await BoardingGate.create({code_name, availability});
        res.status(201).json(newBoardingGate);
    } catch (error) {
        console.error('There was an error creating the boarding gate',error);
        res.status(500).json({mensaje: 'There was an error creating the boarding gate'})
    }
}

exports.assignPlaneToBoardingGate = async (req,res) => {
        //boardingGateId and planeId is taken from url
        const {boardingGateId, planeId} = req.params;
    try{
        
        const boardingGate = await BoardingGate.findByPk(boardingGateId);
        const plane = await Plane.findByPk(planeId);
        
        if(boardingGate.availability == 1 ){
            if(plane.plane_status == 'ready'){
            //Change assigned plane and availability of the boardingGate
            boardingGate.planeId = planeId;
            boardingGate.availability = false;

            //Change availability of the Plane
            plane.plane_status = 'boarding';

            //Save both entries on the database
            await boardingGate.save();
            await plane.save();
            res.status(200).json({message: 'The plane was assigned the the boarding gate'})
            } else{
                res.json({message: 'The plane is not available'})
            }
          
        }else{
            res.status(500).json({mensaje: "The boarding gate is already occupied"})
        }
       
    } catch(error){
    console.error('There was an error assinging a plane to this boarding gate', error);
    res.status(500).json({ error: 'There was an error assinging a plane to this boarding gate' });
    }
}

exports.clearBoardingGate = async(req, res) => {
    const {boardingGateId} = req.params;
    try{
        const boardingGate = await BoardingGate.findByPk(boardingGateId);
        
        if(boardingGate.availability == 0){
            const plane = await Plane.findByPk(boardingGate.planeId)
            boardingGate.availability = true;
            boardingGate.planeId = null;
            plane.plane_status = 'ready';

            await boardingGate.save();
            await plane.save();
            res.status(200).json({message: 'The boarding gate was cleared'})
        } else{
            res.json({message: 'The boarding gate is already available'})
        }
    }catch(error){
        console.error('There was an error clearing this boarding gate', error);
        res.status(500).json({ error: 'There was an error clearing this boarding gate' });
    }
}