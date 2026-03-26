import { createRegion } from "@/services/region.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuRefreshCcw, LuSave } from 'react-icons/lu';
import { TbCircleFilled } from "react-icons/tb";

const AddRegion = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("name required");
      return;
    }
     setLoading(true);
    setError("");

    try {
      await createRegion(name);

      // 🔥 afficher message succès
      setSuccess(`Region "${name}" created successfully !`);

      // 🔥 redirection après 1 seconde
      setTimeout(() => {
        navigate("/admin/regions");
      }, 3000);

    } catch (err: any) {
      setError(
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
           {/* ❌ Error */}
          {error && (
          <div className="py-1 px-4 mb-4 external-event fc-event font-medium bg-danger/10 text-danger rounded" data-class="!text-danger">
            <span><TbCircleFilled className="inline-block me-2" /> {error}.</span></div>
        )}

         {/* ✅ Success */}
        {success && (
          <div className="py-1 px-4 mb-4 external-event fc-event font-medium bg-success/10 text-success rounded" data-class="!text-success">
             <span><TbCircleFilled className="inline-block me-2" /> {success}.</span></div>
        )}
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
          </div>

          <div className="flex justify-end items-center mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button"
              onClick={() => navigate("/admin/regions")} className="bg-default-200 text-default-500 text-nowrap border-0 btn hover:bg-default-300">
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

export default AddRegion;
