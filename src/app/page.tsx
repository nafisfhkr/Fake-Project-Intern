import { getPrinters,seedDummyData} from "@/services/printerService";

export default async function Home() {


  const printers = await getPrinters();

  return (
    <main className="min-h-screen p-10 bg-gary-100">
<h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Titip Print - Status Koneksi
      </h1>

     
      <div className="mb-6 text-center">
        {printers.length > 0 ? (
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
             TERHUBUNG KE MONGODB (Ada {printers.length} data)
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full">
             Belum ada data / Gagal Konek
          </span>
        )}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {printers.map((printer: any) => (
          <div key={printer._id} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold">{printer.storeName}</h2>
            <p className="text-gray-600">{printer.description}</p>
            <div className="mt-4 text-sm font-semibold text-blue-500">
              Hitam Putih: Rp {printer.priceBlackWhite}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
