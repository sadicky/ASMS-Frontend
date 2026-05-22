/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuTrophy,
  LuMedal,
  LuBadgePercent,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";
import { getCoursesByClass } from "@/services/course.service";
import { getTerms } from "@/services/term.service";

import {
  getClassReport,
  type ClassGradebook,
} from "@/services/gradebook.service";

const GradebookList = () => {
  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);

  const [reports, setReports] = useState<ClassGradebook[]>([]);

  const [classId, setClassId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [termId, setTermId] = useState("");

  // 🔥 LOAD DATA
  useEffect(() => {
    const load = async () => {
      try {
        const [classData, termData] =
          await Promise.all([
            getMyClasses(),
            getTerms(),
          ]);

        setClasses(classData || []);
        setTerms(termData || []);
      } catch {
        toast.error("Error loading data");
      }
    };

    load();
  }, []);

  // 🔥 LOAD COURSES
  useEffect(() => {
    if (!classId) return;

    const loadCourses = async () => {
      try {
        const data =
          await getCoursesByClass(classId);

        setCourses(data || []);
      } catch {
        toast.error("Error loading courses");
      }
    };

    loadCourses();
  }, [classId]);

  // 🔥 LOAD REPORT
  const loadReport = async () => {
    if (!classId)
      return toast.error("Class required");

    if (!courseId)
      return toast.error("Course required");

    if (!termId)
      return toast.error("Term required");

    setLoading(true);

    try {
      const data = await getClassReport(
        classId,
        courseId,
        termId
      );

      setReports(data || []);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Error loading report"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 OPTIONS
  const classOptions = classes.map(
    (c: any) => ({
      value: c.id,
      label: `${c.name} (${c.grade?.name})`,
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

      {/* HEADER */}
      <div className="card">

        <div className="card-header flex items-center justify-between">
          <div>
            <h2 className="card-title flex items-center gap-2">
              <LuBookOpen />
              Gradebook Report
            </h2>

            <p className="text-sm text-default-500 mt-1">
              View class academic performance
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="card-body grid lg:grid-cols-4 gap-4">

          {/* CLASS */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Class
            </label>

            <Select
              options={classOptions}
              placeholder="Select class"
              onChange={(v: any) =>
                setClassId(v?.value)
              }
            />
          </div>

          {/* COURSE */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Course
            </label>

            <Select
              options={courseOptions}
              placeholder="Select course"
              onChange={(v: any) =>
                setCourseId(v?.value)
              }
            />
          </div>

          {/* TERM */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Term
            </label>

            <Select
              options={termOptions}
              placeholder="Select term"
              onChange={(v: any) =>
                setTermId(v?.value)
              }
            />
          </div>

          {/* ACTION */}
          <div className="flex items-end">
            <button
              onClick={loadReport}
              className="btn bg-primary text-white w-full"
            >
              <LuBookOpen className="me-2" />
              Generate Report
            </button>
          </div>

        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="card p-10 text-center">
          <LuLoader className="animate-spin inline-block text-3xl" />
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        reports.length === 0 && (
          <div className="card p-10 text-center text-default-500">
            No report available
          </div>
        )}

      {/* REPORT TABLE */}
      {!loading &&
        reports.length > 0 && (
          <div className="card overflow-hidden">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-default-100">
                  <tr>

                    <th className="p-4 text-left">
                      Rank
                    </th>

                    <th className="p-4 text-left">
                      Student
                    </th>

                    <th className="p-4 text-left">
                      CA Score
                    </th>

                    <th className="p-4 text-left">
                      Exam Score
                    </th>

                    <th className="p-4 text-left">
                      Final Total
                    </th>

                    <th className="p-4 text-left">
                      Grade
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {reports.map(
                    (report, index) => (
                      <tr
                        key={report.studentId}
                        className="border-b hover:bg-default-50 transition"
                      >

                        {/* RANK */}
                        <td className="p-4">

                          <div className="flex items-center gap-2">

                            <div
                              className={`
                              size-8 rounded-full flex items-center justify-center text-sm font-bold
                              ${
                                index === 0
                                  ? "bg-yellow-100 text-yellow-700"
                                  : index === 1
                                  ? "bg-gray-100 text-gray-700"
                                  : index === 2
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-primary/10 text-primary"
                              }
                            `}
                            >
                              {index + 1}
                            </div>

                            {index === 0 && (
                              <LuTrophy className="text-yellow-500" />
                            )}

                            {index === 1 && (
                              <LuMedal className="text-gray-500" />
                            )}

                          </div>

                        </td>

                        {/* STUDENT */}
                        <td className="p-4 font-medium">
                          {
                            report.studentName
                          }
                        </td>

                        {/* CA */}
                        <td className="p-4">
                          <span className="badge badge-info">
                            {report.caScore.toFixed(
                              2
                            )}
                          </span>
                        </td>

                        {/* EXAM */}
                        <td className="p-4">
                          <span className="badge badge-warning">
                            {report.examScore.toFixed(
                              2
                            )}
                          </span>
                        </td>

                        {/* TOTAL */}
                        <td className="p-4">

                          <div className="flex items-center gap-2 font-semibold">

                            <LuBadgePercent />

                            {report.finalTotal.toFixed(
                              2
                            )}
                            %

                          </div>

                        </td>

                        {/* GRADE */}
                        <td className="p-4">

                          <span
                            className={`
                            px-3 py-1 rounded-full text-xs font-bold
                            ${
                              report.grade === "A1"
                                ? "bg-green-100 text-green-700"
                                : report.grade === "B2" ||
                                  report.grade === "B3"
                                ? "bg-blue-100 text-blue-700"
                                : report.grade === "C4" ||
                                  report.grade === "C5" ||
                                  report.grade === "C6"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                          >
                            {report.grade}
                          </span>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

    </div>
  );
};

export default GradebookList;