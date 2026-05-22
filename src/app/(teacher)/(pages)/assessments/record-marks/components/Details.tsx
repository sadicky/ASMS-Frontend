// src/pages/teacher/assessments/RecordMarks.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuSave,
  LuSearch,
  LuUsers,
  LuAward,
} from "react-icons/lu";

import {
  getCourseAssessments,
  recordMarks,
} from "@/services/assessment.service";

import { getMyStudents } from "@/services/student.service";
// import { getMyStudents } from "@/services/student.service";

const RecordMarks = () => {
  const { assessmentId } = useParams();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [assessment, setAssessment] = useState<any>(null);

  const [students, setStudents] = useState<any[]>([]);

  const [marks, setMarks] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  /* =========================================
     LOAD ASSESSMENT + EXISTING MARKS
  ========================================= */

  useEffect(() => {
    if (!assessmentId) return;

    const loadAssessment = async () => {
      setLoading(true);

      try {
        /*
          🔥 IMPORTANT

          Tu dois avoir un endpoint/service:
          getAssessmentById(assessmentId)

          ou bien retourner assessment depuis list.
        */

        const res: any = await getCourseAssessments(
          "", // not needed here
          "" // not needed here
        );

        const found = res.find(
          (a: any) => a.id === assessmentId
        );

        if (!found) {
          toast.error("Assessment not found");
          return;
        }

        setAssessment(found);

        const classId =
          found.course?.classId;

        if (!classId) return;

        const studentsRes =
          await getMyStudents(classId);

        setStudents(studentsRes || []);

        /*
          🔥 MAP EXISTING MARKS
        */

        const existingMarks =
          studentsRes.map((student: any) => {
            const existing =
              found.grades?.find(
                (g: any) =>
                  g.studentId === student.id
              );

            return {
              studentId: student.id,
              studentName: `${student.firstName} ${student.lastName}`,
              markObtained:
                existing?.markObtained || 0,
            };
          });

        setMarks(existingMarks);
      } catch {
        toast.error("Failed loading marks");
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [assessmentId]);

  /* =========================================
     UPDATE MARK
  ========================================= */

  const handleMarkChange = (
    studentId: string,
    value: number
  ) => {
    setMarks((prev) =>
      prev.map((m) =>
        m.studentId === studentId
          ? {
              ...m,
              markObtained: value,
            }
          : m
      )
    );
  };

  /* =========================================
     SAVE MARKS
  ========================================= */

  const handleSave = async () => {
    if (!assessmentId) return;

    setSaving(true);

    try {
      await recordMarks(
        assessmentId,
        {
          marks: marks.map((m) => ({
            studentId: m.studentId,
            markObtained: Number(
              m.markObtained
            ),
          })),
        }
      );

      toast.success(
        "Marks recorded successfully"
      );
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed recording marks"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     FILTERED STUDENTS
  ========================================= */

  const filteredMarks = useMemo(() => {
    return marks.filter((m) =>
      m.studentName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [marks, search]);

  /* =========================================
     STATS
  ========================================= */

  const average = useMemo(() => {
    if (!marks.length) return 0;

    const total = marks.reduce(
      (acc, curr) =>
        acc + Number(curr.markObtained || 0),
      0
    );

    return (
      total / marks.length
    ).toFixed(1);
  }, [marks]);

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">

        <div>

          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Record Marks
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Record and manage student marks
          </p>

        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn bg-primary text-white"
        >
          <LuSave className="me-1" />

          {saving
            ? "Saving..."
            : "Save Marks"}
        </button>

      </div>

      {/* ASSESSMENT INFO */}
      {assessment && (
        <div className="grid md:grid-cols-3 gap-4 px-6 py-4">

          <div className="bg-primary/10 rounded-xl p-4">

            <p className="text-xs text-default-500">
              Assessment
            </p>

            <h3 className="font-semibold text-lg mt-1">
              {assessment.title}
            </h3>

          </div>

          <div className="bg-success/10 rounded-xl p-4">

            <p className="text-xs text-default-500">
              Max Mark
            </p>

            <h3 className="font-semibold text-lg mt-1">
              {assessment.maxMark}
            </h3>

          </div>

          <div className="bg-warning/10 rounded-xl p-4">

            <p className="text-xs text-default-500">
              Average Score
            </p>

            <h3 className="font-semibold text-lg mt-1 flex items-center gap-2">
              <LuAward />
              {average}
            </h3>

          </div>

        </div>
      )}

      {/* SEARCH */}
      <div className="px-6 pb-5">

        <div className="relative">

          <input
            type="text"
            className="form-input ps-10"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <LuSearch className="absolute left-3 top-3 text-default-400" />

        </div>

      </div>

      {/* CONTENT */}
      <div className="overflow-x-auto">

        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin inline-block text-3xl" />
          </div>
        )}

        {!loading &&
          filteredMarks.length === 0 && (
            <div className="p-10 text-center text-default-500">

              <LuUsers className="mx-auto text-4xl mb-3 opacity-50" />

              No students found

            </div>
          )}

        {!loading &&
          filteredMarks.length > 0 && (
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
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredMarks.map((mark) => {

                  const percent =
                    assessment?.maxMark > 0
                      ? (
                          (mark.markObtained /
                            assessment.maxMark) *
                          100
                        ).toFixed(0)
                      : 0;

                  return (
                    <tr
                      key={mark.studentId}
                      className="border-b hover:bg-default-50"
                    >

                      <td className="p-4 font-medium">
                        {mark.studentName}
                      </td>

                      <td className="p-4 w-60">

                        <input
                          type="number"
                          min={0}
                          max={
                            assessment?.maxMark || 100
                          }
                          value={
                            mark.markObtained
                          }
                          onChange={(e) =>
                            handleMarkChange(
                              mark.studentId,
                              Number(
                                e.target.value
                              )
                            )
                          }
                          className="form-input"
                        />

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            Number(percent) >= 50
                              ? "bg-success/10 text-success"
                              : "bg-danger/10 text-danger"
                          }`}
                        >
                          {percent}%
                        </span>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>
          )}

      </div>

    </div>
  );
};

export default RecordMarks;