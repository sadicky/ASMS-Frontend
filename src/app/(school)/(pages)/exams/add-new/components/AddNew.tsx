/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuSave,
  LuLoader,
  LuGraduationCap,
  LuRefreshCcw,
  LuBookOpen,
  LuSchool,
  LuCalendarRange,
  LuBadgePercent,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";
import { getCoursesByClass } from "@/services/course.service";
import { getTerms } from "@/services/term.service";

import { createExam } from "@/services/exam.service";

const CreateExam = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);

  const [classId, setClassId] = useState("");

  const [form, setForm] = useState({
    courseId: "",
    termId: "",
    maxMark: 100,
  });

  // 🔥 LOAD INITIAL DATA
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [classesData, termsData] =
          await Promise.all([
            getMyClasses(),
            getTerms(),
          ]);

        setClasses(classesData || []);
        setTerms(termsData || []);
      } catch (err: any) {
        toast.error(
          err.message || "Failed to load data"
        );
      }
    };

    loadInitialData();
  }, []);

  // 🔥 LOAD COURSES
  useEffect(() => {
    if (!classId) return;

    const loadCourses = async () => {
      try {
        const data =
          await getCoursesByClass(classId);

        setCourses(data || []);
      } catch (err: any) {
        toast.error(
          err.message || "Failed to load courses"
        );
      }
    };

    loadCourses();
  }, [classId]);

  // 🔥 OPTIONS
  const classOptions = classes.map(
    (c: any) => ({
      value: c.id,
      label: `${c.name} (${c.grade?.name || ""})`,
    })
  );

  const courseOptions = courses.map(
    (c: any) => ({
      value: c.id,
      label: `${c.subject?.name} (${c.subject?.code})`,
    })
  );

  const termOptions = terms.map(
    (t: any) => ({
      value: t.id,
      label: t.name,
    })
  );

  // 🔥 SELECTED DATA
  const selectedCourse = courses.find(
    (c: any) => c.id === form.courseId
  );

  const selectedClass = classes.find(
    (c: any) => c.id === classId
  );

  const selectedTerm = terms.find(
    (t: any) => t.id === form.termId
  );

  // 🔥 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!classId) {
      return toast.error("Class required");
    }

    if (!form.courseId) {
      return toast.error("Course required");
    }

    if (!form.termId) {
      return toast.error("Term required");
    }

    if (form.maxMark <= 0) {
      return toast.error(
        "Max mark must be greater than 0"
      );
    }

    setLoading(true);

    try {
      await createExam(form);

      toast.success(
        "Exam created successfully"
      );

      navigate("/school/exams");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create exam"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-success to-success/80 rounded-2xl p-6 shadow-lg text-white">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="size-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <LuGraduationCap className="size-8" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Create New Exam
              </h1>

              <p className="text-white/80 mt-1">
                Configure term examinations and
                prepare mark entry
              </p>
            </div>

          </div>

          <div className="hidden lg:flex items-center gap-3">

            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur text-sm">
              Academic Examination Module
            </div>

          </div>

        </div>

      </div>

      {/* FORM */}
      <div className="card border border-default-200 shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="card-header border-b bg-default-50">

          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Exam Information
          </h2>

        </div>

        {/* BODY */}
        <div className="card-body">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* CLASS */}
            <div>

              <label className="text-sm font-semibold mb-2 block">
                Select Class
              </label>

              <Select
                options={classOptions}
                placeholder="Choose class"
                value={
                  classOptions.find(
                    (o) => o.value === classId
                  ) || null
                }
                onChange={(v: any) => {
                  setClassId(v?.value || "");

                  setForm({
                    ...form,
                    courseId: "",
                  });
                }}
              />

            </div>

            {/* COURSE + TERM + MAX */}
            <div className="grid lg:grid-cols-3 gap-5">

              {/* COURSE */}
              <div>

                <label className="text-sm font-semibold mb-2 block">
                  Course
                </label>

                <Select
                  options={courseOptions}
                  placeholder="Select course"
                  value={
                    courseOptions.find(
                      (o) =>
                        o.value === form.courseId
                    ) || null
                  }
                  onChange={(v: any) =>
                    setForm({
                      ...form,
                      courseId:
                        v?.value || "",
                    })
                  }
                  isDisabled={!classId}
                />

              </div>

              {/* TERM */}
              <div>

                <label className="text-sm font-semibold mb-2 block">
                  Academic Term
                </label>

                <Select
                  options={termOptions}
                  placeholder="Select term"
                  value={
                    termOptions.find(
                      (o) =>
                        o.value === form.termId
                    ) || null
                  }
                  onChange={(v: any) =>
                    setForm({
                      ...form,
                      termId:
                        v?.value || "",
                    })
                  }
                />

              </div>

              {/* MAX MARK */}
              <div>

                <label className="text-sm font-semibold mb-2 block">
                  Maximum Mark
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min={1}
                    className="form-input ps-10"
                    placeholder="100"
                    value={form.maxMark}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        maxMark: Number(
                          e.target.value
                        ),
                      })
                    }
                  />

                  <LuBadgePercent className="absolute left-3 top-3 text-default-400" />

                </div>

              </div>

            </div>

            {/* SUMMARY */}
            {(selectedClass ||
              selectedCourse ||
              selectedTerm) && (
              <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">

                <h3 className="font-semibold text-primary mb-4">
                  Exam Summary
                </h3>

                <div className="grid lg:grid-cols-4 gap-4">

                  <div className="bg-white rounded-xl p-4 border border-default-200">

                    <div className="flex items-center gap-2 text-default-500 text-sm mb-2">
                      <LuSchool />
                      Class
                    </div>

                    <h4 className="font-semibold">
                      {selectedClass?.name ||
                        "--"}
                    </h4>

                  </div>

                  <div className="bg-white rounded-xl p-4 border border-default-200">

                    <div className="flex items-center gap-2 text-default-500 text-sm mb-2">
                      <LuBookOpen />
                      Subject
                    </div>

                    <h4 className="font-semibold">
                      {selectedCourse?.subject
                        ?.name || "--"}
                    </h4>

                  </div>

                  <div className="bg-white rounded-xl p-4 border border-default-200">

                    <div className="flex items-center gap-2 text-default-500 text-sm mb-2">
                      <LuCalendarRange />
                      Term
                    </div>

                    <h4 className="font-semibold">
                      {selectedTerm?.name ||
                        "--"}
                    </h4>

                  </div>

                  <div className="bg-white rounded-xl p-4 border border-default-200">

                    <div className="flex items-center gap-2 text-default-500 text-sm mb-2">
                      <LuGraduationCap />
                      Max Mark
                    </div>

                    <h4 className="font-semibold">
                      {form.maxMark}
                    </h4>

                  </div>

                </div>

              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">

              <button
                type="button"
                onClick={() =>
                  navigate("/school/exams")
                }
                className="btn border border-default-300"
              >
                <LuRefreshCcw className="me-2" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn bg-success text-white min-w-[180px]"
              >
                {loading ? (
                  <>
                    <LuLoader className="animate-spin me-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <LuSave className="me-2" />
                    Create Exam
                  </>
                )}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateExam;