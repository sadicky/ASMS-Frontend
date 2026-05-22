/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuRefreshCcw,
  LuSave,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";
import { getSubjects } from "@/services/subject.service";
import { createCourse } from "@/services/course.service";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [form, setForm] = useState({
    classId: "",
    subjectId: "",
  });

  // 🔥 LOAD DATA
  useEffect(() => {
    const load = async () => {
      try {
        const cls = await getMyClasses();
        const subs = await getSubjects();

        setClasses(cls || []);
        setSubjects(subs || []);
      } catch {
        toast.error("Error loading data");
      }
    };

    load();
  }, []);

  // 🔥 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.classId) {
      return toast.error("Class required");
    }

    if (!form.subjectId) {
      return toast.error("Subject required");
    }

    setLoading(true);

    try {
      const res = await createCourse(form);

      toast.success(
        res.message || "Course created successfully"
      );

      navigate("/school/courses");
    } catch (err: any) {
      toast.error(
        err.message || "Error creating course"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 OPTIONS
  const classOptions = classes.map((c: any) => ({
    value: c.id,
    label: `${c.name} (${c.grade?.name || ""})`,
  }));

  const subjectOptions = subjects.map((s: any) => ({
    value: s.id,
    label: `${s.name} (${s.code})`,
  }));

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Create Course
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Assign a subject to a class
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* CLASS */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Select Class
            </label>

            <Select
              options={classOptions}
              placeholder="Choose class"
              value={
                classOptions.find(
                  (o) => o.value === form.classId
                ) || null
              }
              onChange={(selected: any) =>
                setForm({
                  ...form,
                  classId: selected?.value || "",
                })
              }
            />
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Select Subject
            </label>

            <Select
              options={subjectOptions}
              placeholder="Choose subject"
              value={
                subjectOptions.find(
                  (o) => o.value === form.subjectId
                ) || null
              }
              onChange={(selected: any) =>
                setForm({
                  ...form,
                  subjectId: selected?.value || "",
                })
              }
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() =>
                navigate("/school/courses")
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

              Create Course
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;