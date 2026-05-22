import { createStream } from "@/services/stream.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  LuRefreshCcw,
  LuSave,
  LuBookOpen,
  LuLoader,
} from "react-icons/lu";

const AddStream = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.name.trim()) {
      toast.error("Stream name is required");
      return;
    }

    setLoading(true);

    try {

      await createStream(form);

      // ✅ SUCCESS
      toast.success(
        `Stream "${form.name}" created successfully 🚀`
      );

      // ✅ RESET FORM
      setForm({
        name: "",
        description: "",
      });

      // ✅ REDIRECT
      setTimeout(() => {
        navigate("/school/streams");
      }, 1500);

    } catch (err: any) {

      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Error creating stream"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <LuBookOpen className="text-primary text-xl" />
          </div>

          <div>
            <h4 className="card-title">
              Add New Stream
            </h4>

            <p className="text-sm text-default-500 mt-1">
              Create a new academic stream
            </p>
          </div>

        </div>

      </div>

      {/* BODY */}
      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">

            {/* NAME */}
            <div className="lg:col-span-2">

              <label className="inline-block mb-2 text-sm font-medium text-default-700">
                Stream Name
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Example: Sciences, Commercial..."
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

            </div>

            {/* DESCRIPTION */}
            <div className="lg:col-span-2">

              <label className="inline-block mb-2 text-sm font-medium text-default-700">
                Description
              </label>

              <textarea
                rows={5}
                className="form-input resize-none"
                placeholder="Optional stream description..."
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end items-center mt-6">

            <div className="flex flex-wrap items-center gap-2">

              {/* CANCEL */}
              <button
                type="button"
                onClick={() =>
                  navigate("/school/streams")
                }
                className="bg-default-200 text-default-600 border-0 btn hover:bg-default-300"
              >
                <LuRefreshCcw className="size-4 me-1" />

                Cancel
              </button>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="text-white border-0 btn bg-primary"
              >

                {loading ? (
                  <LuLoader className="size-4 me-1 animate-spin" />
                ) : (
                  <LuSave className="size-4 me-1" />
                )}

                {loading
                  ? "Creating..."
                  : "Create Stream"}

              </button>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddStream;