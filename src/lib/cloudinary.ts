import { v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloudinary_name :process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file:File,folder: string) {
    

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<{ secure_url: string; public_id: string}>((resolve,reject ) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
            folder: folder, 
            resource_type: "auto",
        
             format: "webp",  
             quality: "60",
            },

            (error,result)=>{
                if (error){
                    console.error("Claudinary Upload Error:", error);
                    reject(error);
                } else {
                    resolve(result as any);
                }
            }
        );

        uploadStream.end(buffer);
    });
}

export async function deleteImage(publicId:string) {
    try {
        return await cloudinary.uploader.destroy(publicId);
    } catch(error){
        console.error("Cloudinary Delete Error:",error);
        throw error;
    }
    
}