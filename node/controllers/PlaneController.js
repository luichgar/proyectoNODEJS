const Plane = require('../models/Plane');
const BoardingGate = require('../models/BoardingGate');

exports.getPlanes = async (req,res) => {
    try {
        const planes = await Plane.findAll();
        res.json(planes);
    } catch (error) {
        console.error('There was an error getting the planes',error);
        res.status(500).json({message: 'There was an error getting the planes'})
    }
}

exports.postPlane = async (req,res) => {

    try {
        const {registration_number, airline, passenger_capacity, plane_status} = req.body;
        const newPlane = await Plane.create({
            registration_number,
            airline,
            passenger_capacity, 
            plane_status
        });

        res.status(201).json(newPlane);
    } catch (error) {
        console.error('There was an error creating the plane',error);
        res.status(500).json({message: 'There was an error creating the plane'})
    }

}

exports.updatePlane = async (req,res) => {
    
    try {
        const {id} = req.params;

       const [updateData] = await Plane.update(req.body, {
            where: {id}
        });

        if(updateData === 1){
            res.status(200).json({mensaje: 'Plane updated'})
        } else{
            res.status(500).json({error: "Plane not found"})
        }

    } catch (error) {
        console.error('There was an error updating the plane',error);
        res.status(500).json({error: 'There was an error updating the plane'})
    }
}

exports.getPlane = async (req,res) => {
    
    try {
        const {id} = req.params;

        const plane = await Plane.findByPk(id);
        if(plane === null){
            res.status(500).json({message: "Plane not found"});
        }else{
            res.status(200).json(plane);
        }

    } catch (error) {
        console.error('There was an error finding the plane',error);
        res.status(500).json({error: 'There was an error finding the plane'});
    }
}

exports.removePlane = async (req, res) =>{
    try {
        const {id} = req.params;
        const plane = await Plane.findByPk(id);
        if(plane.out_of_service == 0){
            plane.out_of_service = 1;
            
            await plane.save();
            res.status(200).json({mensaje: 'The plane was removed'})
        } else {
            res.json({message: 'The plane was already removed'})
        }
    } catch (error) {
        console.error('There was an error finding the plane to remove',error);
        res.status(500).json({error: 'There was an error finding the plane remove'});
    }
};


