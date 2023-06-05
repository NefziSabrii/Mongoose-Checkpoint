require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');



    
    const arrayOfPeople = [
      { name: 'Mary', age: 30, favoriteFoods: ['Sushi', 'Pasta'] },
      { name: 'rivaldo', age: 35, favoriteFoods: ['Hamburger', 'Burritos'] },
      { name: 'Mary', age: 30, favoriteFoods: ['Burritos', 'Pasta'] },
      { name: 'ronaldo', age: 20, favoriteFoods: ['Burritos', 'sandwich'] },
      { name: 'vinisus', age: 15, favoriteFoods: ['chicken', 'Burritos'] },
      { name: 'vasquez', age: 19, favoriteFoods: ['milk', 'chicken'] }
    ];

    const createdPeople = await Person.create(arrayOfPeople);
    console.log('People created successfully:', createdPeople);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToDatabase();


// Find all the people having a given name
const findPeopleByName = async (name) => {
  const people = await Person.find({ name });
  console.log('People with name', name, ':', people);
};

findPeopleByName('maldini');

// Find just one person which has a certain food in the person's favorites
const findOnePersonByFood = async (food) => {
  const person = await Person.findOne({ favoriteFoods: food });
  console.log('Person with favorite food', food, ':', person);
};

findOnePersonByFood('Pizza');

// Find a person by _id and update the favoriteFoods array
const updateFavoriteFoods = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (person) {
      person.favoriteFoods.push('Hamburger');
      await person.save();
      console.log('Updated person:', person);
    } else {
      console.log('Person not found');
    }
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

const personId = '647a1a0161083d50d32a5727'; // Replace with the actual _id of the person
updateFavoriteFoods(personId);

// Find a person by name and update the age
const updatePersonAge = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

const personName = 'maldini'; // Replace with the actual name of the person
updatePersonAge(personName);

// Delete one person by _id
const deletePersonById = async (personId) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(personId);
    console.log('Deleted person:', deletedPerson);
  } catch (err){
          console.error('Error deleting person:', err);
        }
      };
    
      deletePersonById(personId);
    
      // Delete all the people whose name is "Mary"
      const deletePeopleByName = async (name) => {
        try {
          const result = await Person.deleteMany({ name });
          console.log('Deleted people:', result);
        } catch (err) {
          console.error('Error deleting people:', err);
        }
      };
    
      deletePeopleByName('Mary');
    
      // Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age.
      const findBurritoLovers = async () => {
        try {
          const burritoLovers = await Person.find({ favoriteFoods: 'burritos' })
            .sort('name')
            .limit(2)
            .select('-age')
            .exec();
    
          console.log('Burrito lovers:', burritoLovers);
        } catch (err) {
          console.error('Error finding burrito lovers:', err);
        }
      };
    
      findBurritoLovers();
    