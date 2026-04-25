import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuRefreshCcw, LuSave } from 'react-icons/lu';
import { TbCircleFilled } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { createGrade } from "@/services/grade.service";

const AddGrade = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("name required");
      return;
    }
     setLoading(true);

    try {
      await createGrade({ name });
      toast.success("Grade created 🔥");
      setName("");
    } catch (err: any) {
      toast.error(err.message);
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
                Grade Name
              </label>
              <input
                  className="form-input"
                  placeholder="Grade name (ex: 1ère année)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end items-center mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button"
              onClick={() => navigate("/admin/grades")} className="bg-default-200 text-default-500 text-nowrap border-0 btn hover:bg-default-300">
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

export default AddGrade;
