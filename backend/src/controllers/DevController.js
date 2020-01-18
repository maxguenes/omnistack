const Dev = require('../models/Dev');
const { splitStringAsArray } = require('../utils/Utils');
const axios = require('axios');

const search = async (req, res) => {

    const {
        techs,
        latitude,
        longitude
    } = req.query;

    const techsArray = splitStringAsArray(techs);

    const devs = await Dev.find({
        techs: {
            $in: techsArray
        },
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: 10000
            }
        }
    })

    res.json(devs);
}

const index = async (req, res) => {
    const devs = await Dev.find();

    return res.json(devs);
}

const store = async (req, res) => {

    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {


        const response = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = response.data;

        techsArray = splitStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

    }

    return res.json(dev);
}

module.exports = { index, store, search }