const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

const sample = (array) => array.at(Math.floor(Math.random() * array.length));

async function main() {
    console.log('Connecting to database...');
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('Database connected.');


    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor((Math.random() * 1000));
        const camp = new Campground({
            location: `${cities.at(random1000).city}, ${cities.at(random1000).state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
        });
        await camp.save();
    }

    mongoose.connection.close();
    console.log('Connection closed. Bye!')
}

