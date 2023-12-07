import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Swal from "sweetalert2";

export const FetchApi = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [regencies, setRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");

  useEffect(() => {
    axios
      .get("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
        )
        .then((response) => {
          setRegencies(response.data);
        })
        .catch((error) => {
          console.error("Error fetching regencies:", error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency) {
      axios
        .get(
          `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`
        )
        .then((response) => {
          setDistricts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(
          `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`
        )
        .then((response) => {
          setVillages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching villages:", error);
        });
    }
  }, [selectedDistrict]);

  const handleSubmit = () => {
    const selectedAddress = {
      province: provinces.find((p) => p.id === selectedProvince)?.name || "",
      regency: regencies.find((r) => r.id === selectedRegency)?.name || "",
      district: districts.find((d) => d.id === selectedDistrict)?.name || "",
      village: villages.find((v) => v.id === selectedVillage)?.name || "",
    };

    const addressString = `${selectedAddress.province}, ${selectedAddress.regency}, ${selectedAddress.district}, ${selectedAddress.village}`;

    Swal.fire({
      title: "Alamat yang Dipilih",
      text: addressString,
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const isSubmitDisabled =
    !selectedProvince ||
    !selectedRegency ||
    !selectedDistrict ||
    !selectedVillage;

  return (
    <div className="bg-slate-800  min-h-screen flex justify-center ">
      <div className="container w-2/4  mt-10 my-32 border border-white rounded-2xl ">
        <div className="flex items-center m-5 text-white font-bold">
          <div>
            <Link to="/">
              <p className="flex items-center text-2xl">
                <GoArrowLeft className="text-2xl" />
                
              </p>
            </Link>
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-2xl mr-16">
              SELAMAT DATANG DI FETCH API INDONESIA
            </h1>
          </div>
        </div>
        <div className="mb-4 mx-10">
          <label className="block mb-2 text-white">Provinsi:</label>
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedRegency("");
              setSelectedDistrict("");
              setSelectedVillage("");
            }}
            className="border p-2 w-full"
          >
            <option value="" className="text-white">
              Pilih Provinsi
            </option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        {selectedProvince && (
          <div className="mb-4 mx-10">
            <label className="block mb-2 text-white">Kabupaten/Kota</label>
            <select
              value={selectedRegency}
              onChange={(e) => {
                setSelectedRegency(e.target.value);
                setSelectedDistrict("");
                setSelectedVillage("");
              }}
              className="border p-2 w-full "
            >
              <option value="">Pilih Kabupaten/Kota</option>
              {regencies.map((regency) => (
                <option key={regency.id} value={regency.id}>
                  {regency.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedRegency && (
          <div className="mb-4 mx-10">
            <label className="block mb-2 text-white">Kecamatan</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedVillage("");
              }}
              className="border p-2 w-full"
            >
              <option value="">Pilih Kecamatan</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedDistrict && (
          <div className="mb-4 mx-10">
            <label className="block mb-2 text-white">Desa:</label>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Pilih Desa</option>
              {villages.map((village) => (
                <option key={village.id} value={village.id}>
                  {village.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className={`bg-black text-white py-2 px-4 rounded-md hover:bg-slate-500 mx-10 float-right ${
            isSubmitDisabled ? "opacity-0 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
