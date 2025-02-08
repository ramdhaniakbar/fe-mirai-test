import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ZIP_CODE_URL } from "../../config/generalHelper"
import { useState } from "react"
import { Link } from "react-router"
import { Edit } from "lucide-react"

const KodeposPage = () => {
  const [zipcode, setZipcode] = useState("")

  const fetchKodepos = async (zipcode) => {
    const { data } = await axios.get(
      `${ZIP_CODE_URL}/api/search?zipcode=${zipcode}`
    )
    return data
  }

  const { data, error } = useQuery({
    queryKey: ["zipcode", zipcode],
    queryFn: () => fetchKodepos(zipcode),
    enabled: !!zipcode,
  })

  console.log("data ", data)

  return (
    <div className="pt-44 px-[160px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Page untuk mencari, menyimpan dan menghapus kodepos
      </h1>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Cari Kodepos
        </label>
        <input
          type="text"
          name="zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          className="w-1/2 p-3 border border-gray focus:border-secondary focus:outline-secondary"
          placeholder="Masukkan kodepos..."
        />
      </div>

      <div className="mt-20">
        {error && <p className="text-red-500">Error fetching data</p>}
        {data?.results?.length > 0 ? (
          <div className="mt-2 p-3 bg-gray-100 rounded">
            <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-[0px_4px_57px_rgba(0,0,0,0.07)]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📍 Daftar Kode Pos
              </h2>
              {data?.results.map((item, index) => (
                <div key={index} className="flex flex-col border-b border-gray-300 pb-4 mb-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Alamat:</span>{" "}
                    {item.address1 + " "}, {item.address2 + " "},{" "}
                    {item.address3}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Katakana:</span>{" "}
                    {item.kana1 + " "}, {item.kana2 + " "}, {item.kana3}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Kode Prefektur:</span>{" "}
                    {item.prefcode}
                  </p>
                  <div className="flex justify-between">
                  <p className="text-blue-600 font-semibold">
                    📮 {item.zipcode}
                  </p>
                  <Link
                    to={`/kodepos/edit`}
                    className="w-fit bg-yellow-400 hover:bg-yellow-600 text-primary p-2 rounded-md transition"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-secondary rounded-full text-white px-3 py-2 text-center">
            Tidak ada data
          </div>
        )}
      </div>
    </div>
  )
}

export default KodeposPage
