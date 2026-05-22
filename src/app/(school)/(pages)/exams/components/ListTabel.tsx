/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuGraduationCap,
  LuLoader,
  LuBookOpen,
  LuPlus,
  LuSearch,
  LuClipboardCheck,
} from "react-icons/lu";

import { getTerms } from "@/services/term.service";
import { getMyClasses } from "@/services/classe.service";
import { getCoursesByClass } from "@/services/course.service";

import {
  getExamResults,
} from "@/services/exam.service";

const ExamList = () => {
  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);

  const [results, setResults] = useState<any>(null);

  const [classId, setClassId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [termId, setTermId] = useState("");
  const [examId, setExamId] = useState("");

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

  // 🔥 LOAD COURSES BY CLASS
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

  // 🔥 LOAD EXAM RESULTS
  const handleLoadResults = async () => {
    if (!examId) {
      return toast.error("Exam ID required");
    }

    setLoading(true);

    try {
      const data =
        await getExamResults(examId);

      setResults(data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load exam results"
      );
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="space-y-6">

      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-primary/90 to-primary p-6 rounded-2xl shadow-lg text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center">
              <LuGraduationCap className="size-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Exam Results
              </h1>

              <p className="text-white/80 text-sm">
                Manage exams, marks and student
                performance
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">

          <Link
            to="/school/exams/create"
            className="btn bg-white text-primary hover:bg-white/90 border-0"
          >
            <LuPlus className="me-2" />
            Create Exam
          </Link>

          {examId && (
            <Link
              to={`/school/exams/${examId}/marks`}
              className="btn bg-dark text-white border-0"
            >
              <LuClipboardCheck className="me-2" />
              Record Marks
            </Link>
          )}

        </div>

      </div>

      {/* FILTER CARD */}
      <div className="card border border-default-200 shadow-sm">

        <div className="card-header">
          <h3 className="card-title">
            Filter Exam Results
          </h3>
        </div>

        <div className="card-body grid lg:grid-cols-4 gap-4">

          {/* CLASS */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Class
            </label>

            <Select
              options={classOptions}
              placeholder="Select class"
              value={
                classOptions.find(
                  (o) => o.value === classId
                ) || null
              }
              onChange={(v: any) => {
                setClassId(v?.value || "");
                setCourseId("");
                setResults(null);
              }}
            />
          </div>

          {/* COURSE */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Course
            </label>

            <Select
              options={courseOptions}
              placeholder="Select course"
              value={
                courseOptions.find(
                  (o) => o.value === courseId
                ) || null
              }
              onChange={(v: any) => {
                setCourseId(v?.value || "");
                setResults(null);
              }}
              isDisabled={!classId}
            />
          </div>

          {/* TERM */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Term
            </label>

            <Select
              options={termOptions}
              placeholder="Select term"
              value={
                termOptions.find(
                  (o) => o.value === termId
                ) || null
              }
              onChange={(v: any) => {
                setTermId(v?.value || "");
                setResults(null);
              }}
            />
          </div>

          {/* EXAM ID */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Exam ID
            </label>

            <div className="relative">
              <input
                type="text"
                className="form-input ps-10"
                placeholder="Paste exam ID"
                value={examId}
                onChange={(e) =>
                  setExamId(e.target.value)
                }
              />

              <LuSearch className="absolute left-3 top-3 text-default-400" />
            </div>
          </div>

        </div>

        {/* ACTION */}
        <div className="px-6 pb-6 flex justify-end">

          <button
            onClick={handleLoadResults}
            disabled={loading || !examId}
            className="btn bg-primary text-white"
          >
            {loading ? (
              <LuLoader className="animate-spin me-2" />
            ) : (
              <LuBookOpen className="me-2" />
            )}

            Load Results
          </button>

        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="card">
          <div className="p-16 text-center">
            <LuLoader className="animate-spin inline-block text-4xl text-primary" />

            <p className="mt-4 text-default-500">
              Loading exam results...
            </p>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {!loading && results && (
        <div className="card overflow-hidden border border-default-200 shadow-sm">

          {/* HEADER */}
          <div className="p-5 border-b bg-default-50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h3 className="font-bold text-lg">
                Exam Results Overview
              </h3>

              <p className="text-sm text-default-500 mt-1">
                Total Students:{" "}
                {results.grades?.length || 0}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">

              <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold">
                Max Mark: {results.maxMark}
              </div>

              <div className="px-4 py-2 rounded-xl bg-success/10 text-success text-sm font-semibold">
                Course Results
              </div>

            </div>

          </div>

          {/* TABLE */}
          {results.grades?.length > 0 ? (
            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-default-100">
                  <tr>
                    <th className="p-4 text-left">
                      Student
                    </th>

                    <th className="p-4 text-left">
                      Mark
                    </th>

                    <th className="p-4 text-left">
                      Percentage
                    </th>

                    <th className="p-4 text-left">
                      Grade
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {results.grades.map(
                    (g: any) => {
                      const percentage =
                        (
                          (g.markObtained /
                            results.maxMark) *
                          100
                        ).toFixed(1);

                      return (
                        <tr
                          key={g.id}
                          className="border-b hover:bg-default-50 transition"
                        >

                          {/* STUDENT */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">

                              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                                {g.student?.firstName?.charAt(
                                  0
                                )}
                              </div>

                              <div>
                                <h4 className="font-medium">
                                  {
                                    g.student
                                      ?.firstName
                                  }{" "}
                                  {
                                    g.student
                                      ?.lastName
                                  }
                                </h4>

                                <p className="text-xs text-default-400">
                                  Student
                                </p>
                              </div>

                            </div>
                          </td>

                          {/* MARK */}
                          <td className="p-4 font-semibold">
                            {g.markObtained} /{" "}
                            {results.maxMark}
                          </td>

                          {/* PERCENTAGE */}
                          <td className="p-4">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              {percentage}%
                            </span>
                          </td>

                          {/* GRADE */}
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                Number(
                                  percentage
                                ) >= 75
                                  ? "bg-success/10 text-success"
                                  : Number(
                                        percentage
                                      ) >= 50
                                    ? "bg-warning/10 text-warning"
                                    : "bg-danger/10 text-danger"
                              }`}
                            >
                              {Number(percentage) >= 75
                                ? "Excellent"
                                : Number(
                                      percentage
                                    ) >= 50
                                  ? "Pass"
                                  : "Fail"}
                            </span>
                          </td>

                        </tr>
                      );
                    }
                  )}
                </tbody>

              </table>

            </div>
          ) : (
            <div className="text-center py-14">

              <div className="size-16 rounded-full bg-default-100 mx-auto flex items-center justify-center mb-4">
                <LuGraduationCap className="size-7 text-default-400" />
              </div>

              <h3 className="text-lg font-semibold">
                No marks recorded
              </h3>

              <p className="text-default-500 mt-2">
                No exam marks have been entered yet
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default ExamList;