const Room = require("../models/RoomModel");
const asyncHandler = require("express-async-handler");


const createNewRoom = asyncHandler(async (req, res) => {

    const { roomNumber, roomCapacity, roomLocation, roomOccupancy, roomStatus } = req.body;

    !roomNumber || !roomCapacity || !roomLocation && (() => { res.status(400); throw new Error("please fill all the require fields"); })();

    const roomExists = await Room.findOne({ roomNumber });

    roomExists && (() => { res.status(400); throw new Error("room number already exist") })();


    const room = await Room.create({
        roomNumber, roomCapacity, roomLocation, roomOccupancy, roomStatus
    })


    if (room) {
        const { _id, roomNumber, roomCapacity, roomLocation, roomOccupancy, roomStatus } = room;

        res.status(201).json({
            _id, roomNumber, roomCapacity, roomLocation, roomOccupancy, roomStatus 
        })
    } else {
        res.status(400);
        throw new Error("Invalid Data")
    }


})


const getAllRoom = asyncHandler(async (req, res) => {
    const rooms = await Room.find().sort("-createdAt")
    if (!rooms) {
        res.status(500);
        throw new Error("something went wrong")
    }

    res.status(200).json(rooms)
})

const updateRoom = asyncHandler(async (req, res) => {

    const { roomId } = req.params;

    const room = await Room.findById(roomId);


    if (!room) {
        res.status(404).json({ error: "room not found" })
    }
    if (room) {

        if (req.body?.roomNumber) room.roomNumber = req.body.roomNumber;
        if (req.body?.roomCapacity) room.roomCapacity = req.body.roomCapacity;
        if (req.body?.roomLocation) room.roomLocation = req.body.roomLocation;
        if (req.body?.roomOccupancy) room.roomOccupancy = req.body.roomOccupancy;
        if (req.body?.roomStatus) room.roomStatus = req.body.roomStatus;


        const result = await room.save()

        res.status(200).json(result)

    }

})


const deleteRoom = asyncHandler(async (req, res) => {

    const { roomId } = req.params

    const room = Room.findById(roomId);
    if (!room) {
        res.status(404);
        throw new Error("room not found in database");

    }

    await room.deleteOne();
    res.status(200).json({
        message: "room deleted successfully!"
    })
}
)



const getRoom = asyncHandler(async (req, res) => {

    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (room) {
        const { _id, roomNumber, roomCapacity, roomLocation, roomOccupancy, roomStatus } = room;

        res.status(200).json({ _id, roomNumber, roomCapacity, roomLocation, roomOccupancy,  roomStatus })
    } else {
        res.status(404).json({ message: "Room not found" })
    }
}
)




module.exports = { createNewRoom, getAllRoom, updateRoom, deleteRoom, getRoom }