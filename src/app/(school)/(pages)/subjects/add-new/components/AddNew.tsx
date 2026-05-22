/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuRefreshCcw,
  LuSave,
} from "react-icons/lu";

import { createSubject } from "@/services/subject.service";

const CreateSubject = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  // 🔥 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name) {
      return toast.error("Subject name required");
    }

    if (!form.code) {
      return toast.error("Subject code required");
    }

    setLoading(true);

    try {
      const res = await createSubject(form);

      toast.success(
        res.message || "Subject created successfully"
      );

      navigate("/school/subjects");
    } catch (err: any) {
      toast.error(
        err.message || "Error creating subject"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Create Subject
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Add a new subject for your school
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Subject Name
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="Example: Mathematics"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* CODE */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Subject Code
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="Example: MATH101"
              value={form.code}
              onChange={(e) =>
                setForm({
                  ...form,
                  code: e.target.value.toUpperCase(),
                })
              }
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() =>
                navigate("/school/subjects")
              }
              className="btn border"
            >
              <LuRefreshCcw className="me-1" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >
              {loading ? (
                <LuLoader className="animate-spin me-1" />
              ) : (
                <LuSave className="me-1" />
              )}

              Create Subject
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubject;