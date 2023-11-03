import mongoose from "mongoose";

export const init = async ()=>{
    try {
        const URL= 'mongodb+srv://joaquinpuente:maypa1912@cluster0.pp8gbxz.mongodb.net/ecommerce';
        await mongoose.connect(URL);
        console.log('Database connected 😎');
    } catch (error) {
        console.log('Error to connect to database', error.message);
    }
}