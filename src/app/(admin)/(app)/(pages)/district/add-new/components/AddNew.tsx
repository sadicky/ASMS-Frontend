import { getRegions } from "@/services/region.service";
import { getDirectoratesByRegion } from "@/services/dir.service";
import { createDistrict } from "@/services/district.service";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { LuRefreshCcw, LuSave } from 'react-icons/lu';

type Region = {
  id: string;
  name: string;
};

type Directorate = {
  id: string;
  name: string;
};


const AddDistrict = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [regionId, setRegionId] = useState("");
  const [directorateId, setDirectorateId] = useState("");

  const [regions, setRegions] = useState<Region[]>([]);
  const [directorates, setDirectorates] = useState<Directorate[]>([]);
  // const [directorates, setDirectorates] = useState<Directorate[]>([]);useState<any[]>([]);

  const [loading, setLoading] = useState(false);

   // 🔥 charger regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await getRegions({ page: 1, limit: 100 });
        setRegions(data);
      } catch {
        toast.error("Error chargement regions");
      }
    };

    fetchRegions();
  }, []);

  // 🔥 charger directorates selon region
  useEffect(() => {
    if (!regionId) {
      setDirectorates([]);
      setDirectorateId("");
      return;
    }

    const fetchDirectorates = async () => {
      try {
        const data = await getDirectoratesByRegion(regionId);
        setDirectorates(data);
        // console.log("DIRECTORATES API:", data);
      } catch {
        toast.error("Error chargement directorates");
      }
    };

    fetchDirectorates();
  }, [regionId]);

  // 🔥 submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !directorateId) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);

    try {
      await createDistrict({ name, directorateId });

      toast.success("District created with success 🔥");

      setTimeout(() => {
        navigate("/admin/districts");
      }, 1000);
       } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
        "creation failed, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-6">
             {/* NAME */}
            <div className="col-span-1">
              <label
                htmlFor="nameInput"
                className="inline-block mb-2 text-sm text-default-800 font-medium"
              >
                Name
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="enter region name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
              </div>

               {/* REGION */}
              <div className="col-span-1">
              <label
                htmlFor="regionInput"
                className="inline-block mb-2 text-sm text-default-800 font-medium"
              >
                Region
              </label>
              <select
                className="form-input"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              </div>

                {/* DIRECTORATE */}
              <div className="col-span-1">
              <label
                htmlFor="regionInput"
                className="inline-block mb-2 text-sm text-default-800 font-medium"
              >
                Directorate
              </label>
              <select
                className="form-input"
              value={directorateId}
              onChange={(e) => setDirectorateId(e.target.value)}
              disabled={!regionId}
              >
                <option value="">Select Directorate</option>
                {directorates?.map((directorate) => (
                  <option key={directorate.id} value={directorate.id}>
                    {directorate.name}
                  </option>
                ))}
              </select>
              </div>

          </div>

          <div className="flex justify-end items-center mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button"
              onClick={() => navigate("/admin/districts")} className="bg-default-200 text-default-500 text-nowrap border-0 btn hover:bg-default-300">
                {' '}
                <LuRefreshCcw className="size-4 me-1" />
                Cancel
              </button>
              <button 
              type="submit"
              disabled={loading}
              className="text-white border-0 btn text-nowrap bg-primary">
                {' '}
                <LuSave className="size-4 me-1" />
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDistrict;
