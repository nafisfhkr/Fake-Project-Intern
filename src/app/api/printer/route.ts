import { NextRequest,NextResponse } from "next/server";
import { PrinterSchema,ImageFileSchema } from "@/lib/validation";
import { uploadImage } from "@/lib/cloudinary";
import { createPrinter } from "@/services/printerService";

export async function POST(req:NextRequest) {
 try{
    const formData = await req.formData();
    
    const file = formData.get("image") as File;
    const storeName = formData.get("storeName") as string;
    const description = formData.get("description") as string;
    const priceBlackWhite = Number(formData.get("priceBlackWhite"));
    const priceColor = Number(formData.get("priceColor"));
    const location = formData.get("location") as string;
    const whatsapp = formData.get("whatsapp") as string;


    const validationFields = PrinterSchema.safeParse({
        storeName,
        description,
        priceBlackWhite,
        priceColor,
        location,
        whatsapp,
    });

    if (!validationFields.success) {
        return NextResponse.json(
            {error: "Data tidak valid", details: validationFields.error.flatten()},
            {status:400}
        );
    }

    const uploadResult: any = await uploadImage(file, "titipprint-dev");


    const newPrinterData = {
        ...validationFields.data,
        imageUrl: uploadResult.secure_url,
        imageId : uploadResult.public_id,
        ownerEmail: "user-test@gmail.com",
        isOpen:true,
    };

    const savedPrinter = await createPrinter(newPrinterData);

    return NextResponse.json(
        {message: "Berhasil upload!", data: savedPrinter},
        {status:201}
    );

    } catch (error) {
        console.error("API_Error:", error);
        return NextResponse.json(
            {error : "Terjadi Kesalahan server"},
            {status: 500}
        );
    }
 }   