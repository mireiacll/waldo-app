require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('./models/Character');

const characters = [
  // Replace x and y with the percentages you found from your image
  { name: 'Waldo', x: 61.7, y: 36.4, tolerance: 5 },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Character.deleteMany({});
    await Character.insertMany(characters);
    console.log('✅ Characters seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });