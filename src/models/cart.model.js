import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {type:String, required:true},
    quantity: {type: Number}
},{ _id: false });

const cartSchema = new mongoose.Schema({
    cartNumber: { type: Number, required: true, unique: true },
    products: [productSchema]
});

export default mongoose.model('Cart', cartSchema);