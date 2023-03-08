import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${connection.connection.host}`);
	} catch (error) {
		console.log(`Logged DB Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;