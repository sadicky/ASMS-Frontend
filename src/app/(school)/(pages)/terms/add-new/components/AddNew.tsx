/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuCalendar,
  LuLoader,
  LuSave,
} from "react-icons/lu";

import { createTerm } from "@/services/term.service";
import { getYears } from "@/services/year.service";

const CreateTerm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [academicYears, setAcademicYears] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    academicYearId: "",
  });

  // LOAD ACADEMIC YEARS
  useEffect(() => {
    const loadYears = async () => {
      try {
        const data = await getYears();

        setAcademicYears(data.data || []);
      } catch {
        toast.error(
          "Failed to load academic years"
        );
      }
    };

    loadYears();
  }, []);

  // SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.academicYearId
    ) {
      return toast.error(
        "Please fill all required fields"
      );
    }

    setLoading(true);

    try {
      const res = await createTerm(form);

      toast.success(
        res.message || "Term created"
      );

      navigate("/school/terms");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Error creating term"
      );
    } finally {
      setLoading(false);
    }
  };

  const academicYearOptions =
    academicYears.map((y: any) => ({
      value: y.id,
      label: y.name,
    }));

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <LuCalendar />
          Create Term
        </h2>

        <p className="text-sm text-default-500 mt-1">
          Create academic terms for school
          sessions
        </p>
      </div>

      {/* BODY */}
      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid md:grid-cols-2 gap-4">

            {/* TERM NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Term Name
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Ex: First Term"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* ACADEMIC YEAR */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Academic Year
              </label>

              <Select
                options={academicYearOptions}
                placeholder="Select academic year"
                onChange={(v: any) =>
                  setForm({
                    ...form,
                    academicYearId:
                      v?.value || "",
                  })
                }
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >
              {loading ? (
                <LuLoader className="animate-spin me-2" />
              ) : (
                <LuSave className="me-2" />
              )}

              Create Term
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateTerm;