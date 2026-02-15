import mongoose,{Schema,model ,models} from "mongoose";

const PrinterSchema = new Schema(
    {
        storeName: {
            type: String,
            required:[true,"Nama tempat wajib diisi"],
            minlength:[3,"Nama tempat minimal 3 karakter"],
        },
        description:{
            type: String,
            required: true,
        },
        priceBlackWhite:{
            type: Number,
            required: true,
        },
        priceColor:{
            type:Number,
            required:true,
        },
        location:{
            type :String,
            required :true,
        }, 
        whatsapp:   {
            type:String,
            required:true,
        },
        isOpen:{
            type:Boolean,
            default:true,
        },
        imageUrl:{
            type:String,
            required:true,
        },
        ownerEmail:{
            type: String,
            required:true
        }

    },
    {timestamps:true}
);

const Printer = models.Printer || model("Printer",PrinterSchema);

export default Printer;