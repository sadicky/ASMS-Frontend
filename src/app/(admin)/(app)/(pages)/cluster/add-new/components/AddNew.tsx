import { createDirectorate } from "@/services/dir.service";
import { getRegions } from "@/services/region.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { LuRefreshCcw, LuSave } from 'react-icons/lu';

type Region = {
  id: string;
  name: string;
};

const AddDirectorate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [regionId, setRegionId] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);


  // 🔥 charger les regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await getRegions();
        setRegions(data);
      } catch {
        toast.error("Erreur chargement des régions");
      }
    };

    fetchRegions();
  }, []);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !regionId) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);

    try {
      await createDirectorate({ name, regionId });

      // 🔥 toast success
      toast.success("Directorate créé avec succès");

      // 🔥 redirection
       setTimeout(() => {
        navigate("/directorates");
      }, 1000);

    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
        "Erreur lors de la création"
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
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
            <div className="lg:col-span-4 col-span-1">
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
            
            <div className="lg:col-span-4 col-span-1">
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
                <option value="">Select a region</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end items-center mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button"
              onClick={() => navigate("/admin/directorates")} className="bg-default-200 text-default-500 text-nowrap border-0 btn hover:bg-default-300">
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

export default AddDirectorate;
