/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getGrades } from "@/services/grade.service";
import { getSchools } from "@/services/school.service";
import { createClass } from "@/services/classe.service";

import toast from "react-hot-toast";
import Select from "react-select";

import {
  LuSave,
  LuLoader,
  LuRefreshCcw,
} from "react-icons/lu";

const CreateClass = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [grades, setGrades] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    gradeId: "",
    schoolId: ""
  });

  // 🔥 LOAD GRADES + SCHOOLS
  useEffect(() => {
    const load = async () => {
      try {
        const g = await getGrades();
        const s = await getSchools();

        setGrades(g.data || []);
        setSchools(s.data || []);
      } catch {
        toast.error("Error loading data");
      }
    };

    load();
  }, []);


  // 🔥 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.gradeId || !form.schoolId) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await createClass(form);

      toast.success("Class created successfully 🚀");
      navigate("/admin/classes");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error creating class"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OPTIONS
  const gradeOptions = grades.map((g: any) => ({
    value: g.id,
    label: g.name,
  }));

  const schoolOptions = schools.map((s: any) => ({
    value: s.id,
    label: s.name,
  }));


  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <h2 className="card-title">Create New Class</h2>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>

          {/* 🔥 ONE LINE */}
          <div className="flex flex-col md:flex-row gap-3 items-end">

            {/* CLASS NAME */}
            <div className="w-full md:w-1/3">
              <input
                type="text"
                className="form-input"
                placeholder="Class Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            {/* GRADE */}
            <div className="w-full md:w-1/3">
              <Select
                options={gradeOptions}
                placeholder="Grade"
                value={
                  gradeOptions.find((o) => o.value === form.gradeId) || null
                }
                onChange={(selected: any) =>
                  setForm({
                    ...form,
                    gradeId: selected?.value || ""
                  })
                }
              />
            </div>

            {/* SCHOOL */}
            <div className="w-full md:w-1/3">
              <Select
                options={schoolOptions}
                placeholder="School"
                value={
                  schoolOptions.find((o) => o.value === form.schoolId) || null
                }
                onChange={(selected: any) =>
                  setForm({
                    ...form,
                    schoolId: selected?.value || "",
                  })
                }
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-5">

            <button
              type="button"
              onClick={() => navigate("/admin/classes")}
              className="btn border"
            >
              <LuRefreshCcw className="me-1" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white flex items-center"
            >
              {loading ? (
                <LuLoader className="animate-spin me-1" />
              ) : (
                <LuSave className="me-1" />
              )}
              Create
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateClass;