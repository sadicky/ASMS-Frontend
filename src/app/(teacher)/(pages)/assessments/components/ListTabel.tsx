// src/pages/school/assessments/AssessmentList.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuClipboardList,
  LuLoader,
  LuPlus,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";
import { getCoursesByClass } from "@/services/course.service";

import {
  getAcademicYears,
} from "@/services/year.service";

import {
  getTermsByAcademicYear,
} from "@/services/term.service";

import {
  getCourseAssessments,
  type Assessment,
} from "@/services/assessment.service";

const AssessmentList = () => {

  const [loading, setLoading] =
    useState(false);

  const [classes, setClasses] =
    useState<any[]>([]);

  const [courses, setCourses] =
    useState<any[]>([]);

  const [terms, setTerms] =
    useState<any[]>([]);

  const [activeAcademicYear, setActiveAcademicYear] =
    useState<any>(null);

  const [assessments, setAssessments] =
    useState<Assessment[]>([]);

  const [classId, setClassId] =
    useState("");

  const [courseId, setCourseId] =
    useState("");

  const [termId, setTermId] =
    useState("");

  useEffect(() => {

    const load = async () => {

      try {

        const data =
          await getMyClasses();

        setClasses(data || []);

      } catch {

        toast.error(
          "Failed loading classes"
        );

      }
    };

    load();

  }, []);


  useEffect(() => {

    if (!classId) return;

    const loadCourses = async () => {

      try {

        const data =
          await getCoursesByClass(
            classId
          );

        setCourses(data || []);

      } catch {

        toast.error(
          "Failed loading courses"
        );

      }
    };

    loadCourses();

  }, [classId]);

  useEffect(() => {

    const loadTerms = async () => {

      try {

        // 🔥 GET ALL YEARS
        const academicRes =
          await getAcademicYears({
            page: 1,
            limit: 50,
          });

        const years =
          academicRes.data || [];

        // 🔥 FIND ACTIVE YEAR
        const activeYear =
          years.find(
            (year: any) => year.active
          );

        if (!activeYear) {

          toast.error(
            "No active academic year found"
          );

          return;
        }

        setActiveAcademicYear(
          activeYear
        );

        // 🔥 LOAD TERMS
        const termRes =
          await getTermsByAcademicYear(
            activeYear.id
          );

        setTerms(termRes.data || []);

      } catch {

        toast.error(
          "Failed loading terms"
        );

      }
    };

    loadTerms();

  }, []);

  /* =========================================
     LOAD ASSESSMENTS
  ========================================= */

  useEffect(() => {

    if (!courseId || !termId)
      return;

    const loadAssessments =
      async () => {

        setLoading(true);

        try {

          const data =
            await getCourseAssessments(
              courseId,
              termId
            );

          setAssessments(
            data || []
          );

        } catch {

          toast.error(
            "Failed loading assessments"
          );

        } finally {

          setLoading(false);

        }
      };

    loadAssessments();

  }, [courseId, termId]);

  return (
    <div className="card">

      {/* HEADER */}

      <div className="card-header flex justify-between items-center">

        <div>

          <h2 className="card-title flex items-center gap-2">
            <LuClipboardList />
            Assessments
          </h2>

          <p className="text-sm text-default-500 mt-1">

            {activeAcademicYear
              ? `Academic Year: ${activeAcademicYear.name}`
              : "Manage continuous assessments"}

          </p>

        </div>

        <Link
          to="/teacher/assessments/create"
          className="btn bg-primary text-white"
        >
          <LuPlus className="me-1" />
          Add Assessment
        </Link>

      </div>

      {/* FILTERS */}

      <div className="card-body grid md:grid-cols-3 gap-4">

        {/* CLASS */}

        <Select
          placeholder="Select Class"
          options={classes.map(
            (c: any) => ({
              value: c.id,
              label: `${c.name} (${c.grade?.name})`,
            })
          )}
          onChange={(v: any) =>
            setClassId(v?.value || "")
          }
        />

        {/* COURSE */}

        <Select
          placeholder="Select Course"
          options={courses.map(
            (c: any) => ({
              value: c.id,
              label:
                c.subject?.name,
            })
          )}
          onChange={(v: any) =>
            setCourseId(v?.value || "")
          }
        />

        {/* TERM */}

        <Select
          placeholder="Select Term"
          options={terms.map(
            (t: any) => ({
              value: t.id,
              label: t.name,
            })
          )}
          onChange={(v: any) =>
            setTermId(v?.value || "")
          }
        />

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        {loading && (

          <div className="p-10 text-center">

            <LuLoader className="animate-spin inline-block text-2xl" />

          </div>

        )}

        {!loading &&
          assessments.length > 0 && (

            <table className="min-w-full">

              <thead className="bg-default-100">

                <tr>

                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    Max Mark
                  </th>

                  <th className="p-4 text-left">
                    Weight
                  </th>

                  <th className="p-4 text-left">
                    Marks
                  </th>

                </tr>

              </thead>

              <tbody>

                {assessments.map(
                  (a) => (

                    <tr
                      key={a.id}
                      className="border-b hover:bg-default-50"
                    >

                      <td className="p-4 font-medium">
                        {a.title}
                      </td>

                      <td className="p-4">

                        <span className="badge badge-primary">
                          {a.type}
                        </span>

                      </td>

                      <td className="p-4">
                        {a.maxMark}
                      </td>

                      <td className="p-4">
                        {a.weight}%
                      </td>

                      <td className="p-4">

                        <Link
                          to={`/teacher/assessments/${a.id}/marks`}
                          className="btn btn-sm bg-primary text-white"
                        >
                          <LuBookOpen className="me-1" />
                          Record Marks
                        </Link>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        {!loading &&
          assessments.length === 0 && (

            <div className="p-10 text-center text-default-500">

              No assessments found

            </div>

          )}

      </div>

    </div>
  );
};

export default AssessmentList;