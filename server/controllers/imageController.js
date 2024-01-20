const mongoose = require('mongoose');

const Image = require('../models/image');

const getImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const uploadImage = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body.name);
        const image = new Image({
            name: req.body.name,
            image: req.file.filename
        });
        await image.save();
        res.status(201).json(image);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getImages,
    uploadImage
};