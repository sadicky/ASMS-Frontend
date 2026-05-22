/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuUsers,
  LuLoader,
  LuSave,
} from "react-icons/lu";

import { RiBarChart2Line } from "react-icons/ri";

import { getMyCourses } from "@/services/course.service";
import { getLessonSessionsByCourse } from "@/services/lesson.service";
import {
  markAttendance,
  getSessionAttendance,
} from "@/services/attendance.service";

type StudentAttendance = {
  studentId: string;
  name: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
};

const CreateAttendance = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [students, setStudents] = useState<StudentAttendance[]>([]);

  const [courseId, setCourseId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyCourses();
        setCourses(res || []);
      } catch {
        toast.error("Error loading courses");
      }
    };

    load();
  }, []);

  
  useEffect(() => {
    if (!courseId) {
      setSessions([]);
      setSessionId("");
      setStudents([]);
      return;
    }

    const load = async () => {
      try {
        const res = await getLessonSessionsByCourse(courseId);
        setSessions(res || []);
      } catch {
        toast.error("Error loading sessions");
      }
    };

    load();
  }, [courseId]);

  /* =========================
     LOAD ATTENDANCE
  ========================= */
  useEffect(() => {
    if (!sessionId) {
      setStudents([]);
      return;
    }

    const load = async () => {
      setLoading(true);

      try {
        const res = await getSessionAttendance(sessionId);

        const formatted: StudentAttendance[] =
          (res || []).map((a: any) => ({
            studentId: a.studentId,
            name: `${a.student.firstName} ${a.student.lastName}`,
            status: a.status || "PRESENT",
          }));

        setStudents(formatted);
      } catch {
        toast.error("Error loading attendance");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [sessionId]);

  /* =========================
     TOGGLE STATUS (PRESENT / ABSENT)
  ========================= */
  const toggleStatus = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.studentId === studentId
          ? {
              ...s,
              status:
                s.status === "PRESENT"
                  ? "ABSENT"
                  : "PRESENT",
            }
          : s
      )
    );
  };

  /* =========================
     SUBMIT BULK ATTENDANCE
  ========================= */
  const handleSubmit = async () => {
    if (!sessionId) {
      toast.error("Select a session first");
      return;
    }

    if (students.length === 0) {
      toast.error("No students to mark");
      return;
    }

    setSaving(true);

    try {
      await markAttendance({
        lessonSessionId: sessionId,
        records: students.map((s) => ({
          studentId: s.studentId,
          status: s.status,
        })),
      });

      toast.success("Attendance saved successfully");
    } catch {
      toast.error("Failed saving attendance");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     STATS
  ========================= */
  const total = students.length;

  const present = students.filter(
    (s) => s.status === "PRESENT"
  ).length;

  const absent = students.filter(
    (s) => s.status === "ABSENT"
  ).length;

  const percent =
    total > 0 ? Math.round((present / total) * 100) : 0;

  /* =========================
     OPTIONS
  ========================= */
  const courseOptions = courses.map((c: any) => ({
    value: c.id,
    label: c.subject?.name,
  }));

  const sessionOptions = sessions.map((s: any) => ({
    value: s.id,
    label: s.topic,
  }));

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">

        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuUsers />
            Create Attendance
          </h2>

          <p className="text-sm text-gray-500">
            Mark student presence for your lesson session
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving || !sessionId}
          className="btn bg-primary text-white"
        >
          <LuSave />
          {saving ? "Saving..." : "Save Attendance"}
        </button>

      </div>

      {/* FILTERS */}
      <div className="card-body grid md:grid-cols-2 gap-4">

        <Select
          options={courseOptions}
          onChange={(v: any) => setCourseId(v?.value || "")}
          placeholder="Select course"
          isClearable
        />

        <Select
          options={sessionOptions}
          onChange={(v: any) => setSessionId(v?.value || "")}
          placeholder="Select session"
          isDisabled={!courseId}
          isClearable
        />

      </div>

      {/* STATS */}
      {students.length > 0 && (
        <div className="grid grid-cols-3 gap-4 px-6 pb-4">

          <div className="p-3 bg-green-100 rounded">
            Present: {present}
          </div>

          <div className="p-3 bg-red-100 rounded">
            Absent: {absent}
          </div>

          <div className="p-3 bg-blue-100 rounded flex items-center gap-2">
            <RiBarChart2Line />
            {percent}% Presence
          </div>

        </div>
      )}

      {/* CONTENT */}
      <div className="overflow-x-auto">

        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin text-3xl inline-block" />
          </div>
        )}

        {!loading && sessionId && students.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No students found for this session
          </div>
        )}

        {!sessionId && (
          <div className="p-10 text-center text-gray-500">
            Select a session to mark attendance
          </div>
        )}

        {!loading && students.length > 0 && (
          <table className="min-w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Present</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.studentId} className="border-b">

                  <td className="p-3 font-medium">
                    {s.name}
                  </td>

                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={s.status === "PRESENT"}
                      onChange={() =>
                        toggleStatus(s.studentId)
                      }
                    />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
};

export default CreateAttendance;