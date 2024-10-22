const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Adjust the path to your connection script
const Module = require('./models/Module'); // Adjust the path to your Module model

async function createModules() {
    const modules = [
        {
            module_number: 1,
            module_title: 'Basic 1',
            isVipExclusive: false
        },
        {
            module_number: 2,
            module_title: 'Basic 2',
            isVipExclusive: false
        },
        {
            module_number: 3,
            module_title: 'Intermediate 1',
            isVipExclusive: false
        },
        {
            module_number: 4,
            module_title: 'Intermediate 2',
            isVipExclusive: false
        },
        {
            module_number: 5,
            module_title: 'Advanced 1',
            isVipExclusive: true
        },
        {
            module_number: 6,
            module_title: 'Advanced 2',
            isVipExclusive: true
        }
    ];

    try {
        for (const moduleData of modules) {
            const module = new Module(moduleData);
            await module.save();
            console.log(`Module ${module.module_number} created: ${module.module_title}`);
        }
    } catch (err) {
        console.error('Error creating modules:', err.message);
    } finally {
        mongoose.connection.close(); // Close the connection after creating the modules
    }
}

// Connect to MongoDB and then create modules
connectDB()
    .then(() => {
        createModules();
    })
    .catch(err => {
        console.error('Failed to connect and create modules:', err);
    });