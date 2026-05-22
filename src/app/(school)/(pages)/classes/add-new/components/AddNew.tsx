/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import { createClass } from "@/services/classe.service";
import { getGrades } from "@/services/grade.service";
import { getStreams } from "@/services/stream.service";

import {
  LuSave,
  LuLoader,
  LuRefreshCcw,
  LuBookOpen,
} from "react-icons/lu";

const CreateClass = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [grades, setGrades] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    gradeId: "",
    streamId: "",
  });

  // ✅ LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const gradesData = await getGrades();
        const streamsData = await getStreams();

        // ✅ SAFE NORMALIZATION
        setGrades(
          Array.isArray(gradesData)
            ? gradesData
            : gradesData?.data || []
        );

        setStreams(
          Array.isArray(streamsData)
            ? streamsData
            : streamsData?.data || []
        );

      } catch (err) {
        console.error(err);
        toast.error("Error loading data");
      }
    };

    loadData();
  }, []);

  // ✅ SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.gradeId || !form.streamId) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      // ✅ schoolId injecté automatiquement côté backend
      await createClass(form);

      toast.success("Class created successfully 🚀");

      navigate("/school/classes");

    } catch (err: any) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Error creating class"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ GRADE OPTIONS
  const gradeOptions = grades.map((g: any) => ({
    value: g.id,
    label: g.name,
  }));

  // ✅ STREAM OPTIONS
  const streamOptions = streams.map((s: any) => ({
    value: s.id,
    label: s.name,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      {/* HEADER */}
      <div className="border-b px-6 py-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
          <LuBookOpen className="text-blue-600 text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Create New Class
          </h2>

          <p className="text-sm text-gray-500">
            Add a new class for your school
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* CLASS NAME */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Class Name
            </label>

            <input
              type="text"
              placeholder="Example: 6ème A"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* GRADE + STREAM */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* GRADE */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Grade
              </label>

              <Select
                options={gradeOptions}
                placeholder="Choose grade..."
                value={
                  gradeOptions.find(
                    (o) => o.value === form.gradeId
                  ) || null
                }
                onChange={(selected: any) =>
                  setForm({
                    ...form,
                    gradeId: selected?.value || "",
                  })
                }
                isClearable
              />
            </div>

            {/* STREAM */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Stream
              </label>

              <Select
                options={streamOptions}
                placeholder="Choose stream..."
                value={
                  streamOptions.find(
                    (o) => o.value === form.streamId
                  ) || null
                }
                onChange={(selected: any) =>
                  setForm({
                    ...form,
                    streamId: selected?.value || "",
                  })
                }
                isClearable
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => navigate("/school/classes")}
              className="px-5 py-3 rounded-xl border hover:bg-gray-50 transition flex items-center"
            >
              <LuRefreshCcw className="me-2" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition flex items-center"
            >
              {loading ? (
                <LuLoader className="animate-spin me-2" />
              ) : (
                <LuSave className="me-2" />
              )}

              Create Class
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateClass;