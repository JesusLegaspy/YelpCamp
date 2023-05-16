const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function main() {
    console.log('Connecting to database...');
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('Database connected.');


    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor((Math.random() * 1000));
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user ID
            author: '64513655402d5539c988e13c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quidem atque, itaque nobis placeat accusamus laboriosam quia, aspernatur voluptates facilis eos et? A nobis delectus non, nihil explicabo id ',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmu0hftt5/image/upload/v1683231576/YelpCamp/y1wgsrp9enalzrwvkcre.jpg',
                    filename: 'YelpCamp/y1wgsrp9enalzrwvkcre',
                },
                {
                    url: 'https://res.cloudinary.com/dmu0hftt5/image/upload/v1683231576/YelpCamp/n5dxwzh5ksz7pbpcsav3.jpg',
                    filename: 'YelpCamp/n5dxwzh5ksz7pbpcsav3',
                },
                {
                    url: 'https://res.cloudinary.com/dmu0hftt5/image/upload/v1683231577/YelpCamp/endrsrghuvkkzoru64os.jpg',
                    filename: 'YelpCamp/endrsrghuvkkzoru64os',
                },
                {
                    url: 'https://res.cloudinary.com/dmu0hftt5/image/upload/v1683231577/YelpCamp/lweabidyeiqx86rmrxx5.jpg',
                    filename: 'YelpCamp/lweabidyeiqx86rmrxx5',
                }
            ],
        });
        await camp.save();
    }

    mongoose.connection.close();
    console.log('Connection closed. Bye!')
}

