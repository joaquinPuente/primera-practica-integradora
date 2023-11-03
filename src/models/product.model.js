import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
	title:{type:String,required:true},
	description:{type:String,required:true},
	price:{type:Number,required:true},
	thumbnail:{type:String, required:true, unique:true},
	code:{type:String, required:true, unique:true},
	stock:{type:Number,required:true}
},{timestamps:true});

export default mongoose.model('products', productSchema);