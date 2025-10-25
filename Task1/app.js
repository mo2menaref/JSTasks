import express from "express";
import taskRoutes from "./route/taskRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});