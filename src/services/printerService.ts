import connectDB from "@/lib/mongodb";
import Printer from "@/models/Printer";

export async function getPrinters(){
    try{
        await connectDB();

        const printers = await Printer.find({isOpen: true}).lean();

        return printers;
    } catch (error){
        console.error("Gagal mengambil data printer :",error);
        return [];
    }
}

export async function seedDummyData() {
    await connectDB();

    const count = await Printer.countDocuments();
    if (count > 0 ) return;


    await Printer.create({
        storeName : "Test Print Mahasiswa",
        description: "Printer Cannon IP2770,tinta ori",
        priceBlackWhite : 500,
        priceColor: 1000,
        location :"Jalan Teknik kimia No.12",
        whatsapp : "80812345678",
        imageUrl : "https://via.placeholder.com/300",
        ownerEmail : "test@example.com"
    });
    console.log("Data Dummy Berhasil Dibuat");

}

export async function createPrinter(data:any) {
    try{
      await connectDB();

      const newPrinter = await Printer.create(data);

      return JSON.parse(JSON.stringify(newPrinter));
    }catch(error){
        console.error("Service Error (createPrinter):",error);
        throw new Error("Gagal menyimpan data ke database.");
    }
}

export async function deletePrinter(id:string) {
    try{
        await connectDB();
        const result = await Printer.findByIdAndDelete(id);
        return result;
    } catch(error){
        throw new Error("Gagal menghapus data");
    } 
}
