import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongo from "./config/connect_database.js";
import taskRoutes from "./route/taskRoute.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectMongo();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
	console.error('Error:', err.message);
	res.status(500).json({
		completed: false,
		message: 'Internal server error',
		error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
	});
});

// Handle 404 routes
app.use((req, res) => {
	res.status(404).json({
		completed: false,
		message: 'Route not found'
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`Environment: ${process.env.NODE_ENV}`);
});