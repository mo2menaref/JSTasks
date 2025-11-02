import mongoose from "mongoose";

const connectMongo = async () => {
	try {
		mongoose.connection.on("connected", () => {
			console.log("Database Connected Successfully");
		});
		await mongoose.connect(process.env.MONGO_DB_URI);
	} catch (err) {
		console.log(err.message);
	}
};

export default connectMongo;