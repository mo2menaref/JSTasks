import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/taskModels.js';

dotenv.config();

// Connect to MongoDB
const testDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Test 1: Create a new task
        console.log('\n🔍 Test 1: Creating a new task...');
        const newTask = new Task({
            title: 'Test Task from Script',
            description: 'This task was created manually using a test script'
        });
        const savedTask = await newTask.save();
        console.log('✅ Task created:', savedTask);

        // Test 2: Get all tasks
        console.log('\n🔍 Test 2: Getting all tasks...');
        const allTasks = await Task.find();
        console.log(`✅ Found ${allTasks.length} tasks:`, allTasks);

        // Test 3: Update the task
        console.log('\n🔍 Test 3: Updating the task...');
        const updatedTask = await Task.findByIdAndUpdate(
            savedTask._id,
            { completed: true },
            { new: true }
        );
        console.log('✅ Task updated:', updatedTask);

        // Test 4: Delete the task
        console.log('\n🔍 Test 4: Deleting the task...');
        await Task.findByIdAndDelete(savedTask._id);
        console.log('✅ Task deleted successfully');

        // Final count
        const finalCount = await Task.countDocuments();
        console.log(`\n📊 Final task count: ${finalCount}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Disconnected from MongoDB');
        process.exit(0);
    }
};

testDatabase();