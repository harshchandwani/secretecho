import mongoose from "mongoose"
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    //in typescipt, void means, any type of data, not like C++
    if (connection.isConnected) {
        console.log("Already Connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connection.isConnected = db.connections[0].readyState

        console.log("Db Connected Successfully");
    }
    catch (error) {
        console.log("Database Connection failed", error);
        process.exit(1);
    }
}
export default dbConnect;