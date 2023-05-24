const mongoose = require("mongoose");

export const url =
  "mongodb+srv://tzvigreenfield:tzviGR112@cluster0.1jv4znb.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

    
export const connectMongo = async () => mongoose.connect(url);
export const disconnectMongo = async () => mongoose.connection.close();


 