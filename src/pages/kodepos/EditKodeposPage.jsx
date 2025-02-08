import { useEffect, useState } from "react";
import axios from "axios";
import { ZIP_CODE_URL } from "../../config/generalHelper";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function EditKodeposPage() {
  const navigate = useNavigate()
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  const fetchKodepos = async () => {
    const response = await axios.get(`${ZIP_CODE_URL}/api/search?zipcode=${zipcode}`);
    if (response.data && response.data.results.length > 0) {
      return response.data.results[0];
    }
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ["postalcode", zipcode],
    queryFn: fetchKodepos,
    enabled: !!zipcode, 
    staleTime: 1000 * 60 * 5,
  });

  const handleSave = () => {
    console.log("Data disimpan:", { zipcode, address });
    const toastId = toast.loading('Loading...');
    setTimeout(() => {
      toast.dismiss(toastId);
      toast.success('Kodepos berhasil diperbarui!');
      navigate("/kodepos")
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      setAddress(`${data.address1 + ' '}, ${data.address2 + ' '}, ${data.address3}`);
    }
  }, [data]);

  return (
    <div>
      <div className="max-w-lg mx-auto mt-44 p-6 bg-white shadow-[0px_4px_57px_rgba(0,0,0,0.07)]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✏️ Edit Kode Pos</h2>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Zipcode</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="w-full p-3 border border-gray focus:border-secondary focus:outline-secondary"
            placeholder="Masukkan kode pos"
          />
        </div>
        <div className="mb-8">
          <label className="block font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Alamat akan otomatis terisi..."
          ></textarea>
          {error && <p className="text-red-500">Gagal mengambil alamat.</p>}
        </div>
        <div className="w-full flex gap-4">
          <button
            onClick={() => setZipcode(zipcode)}
            className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-primary py-3 transition cursor-pointer"
            disabled={isFetching}
          >
            {isFetching ? "Mengisi..." : "Auto Fill"}
          </button>
          <button
            onClick={handleSave}
            disabled={isFetching}
            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-3 transition cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
