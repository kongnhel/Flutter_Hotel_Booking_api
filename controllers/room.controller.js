// controllers/room.controller.js
const { db } = require("../firebase");
const roomsCollection = db.collection("rooms");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: "dlykpbl7s",
  api_key: "521329916477217",
  api_secret: "fb3-o3JWfbQxoayJZjPgyX3RZJc",
});

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const snapshot = await roomsCollection.get();
    const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error getting rooms", error });
  }
};

// Get single room
exports.getRoomById = async (req, res) => {
  try {
    const doc = await roomsCollection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Room not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: "Error getting room", error });
  }
};

// Create room
exports.createRoom = async (req, res) => {
  try {
    const { image, ...roomData } = req.body;

    // Check if image provided
    let imageUrl = "";
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "assets/images",
      });
      imageUrl = uploadRes.secure_url;
    }

    const docRef = await roomsCollection.add({
      ...roomData,
      image: imageUrl,
    });
    res.status(201).json({ message: "Room created", id: docRef.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error });
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    await roomsCollection.doc(req.params.id).update(req.body);
    res.json({ message: "Room updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    await roomsCollection.doc(req.params.id).delete();
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error });
  }
};
