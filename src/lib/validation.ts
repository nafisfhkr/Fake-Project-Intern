import {z} from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg","image/jpg","image/png"];

export const PrinterSchema = z.object({
    storeName: z
     .string()
     .min(3,{message: "Nama toko minimal 3 karakter"})
     .max(50,{message: "Nama toko kepanjangan (max 50)"}),

    description: z
     .string()
     .min(10,{message:"Deskripsi minimal 10 karakter"}),

    priceBlackWhite: z.coerce
     .number()
     .min(100,{message: "Harga tidak masuk akal(min Rp 100)"}),
    
    priceColor: z.coerce
    .number()
    .min(100),

    location: z.string().min(5),
    whatsapp: z.string().min(10),
});

export const ImageFileSchema = z
.any()
.refine((file) => file?.size <= MAX_FILE_SIZE, 'Ukuran gambar maksimal 10MB.')
.refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Hanya format .jpg, .jpeg, dan .png yang didukung."
);