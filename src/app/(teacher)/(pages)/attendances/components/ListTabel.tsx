/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuUsers,
  LuLoader,
} from "react-icons/lu";

import { getLessonSessionsByCourse } from "@/services/lesson.service";
import { getMyCourses } from "@/services/course.service";
import { getSessionAttendance } from "@/services/attendance.service";
import { Link } from "react-router-dom";

const AttendanceList = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);

  const [courseId, setCourseId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD COURSES (TEACHER)
  ========================= */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyCourses();
        setCourses(res || []);
      } catch {
        toast.error("Failed loading courses");
      }
    };

    load();
  }, []);

  /* =========================
     LOAD SESSIONS BY COURSE
  ========================= */
  useEffect(() => {
    if (!courseId) {
      setSessions([]);
      setSessionId("");
      return;
    }

    const load = async () => {
      try {
        const res = await getLessonSessionsByCourse(courseId);
        setSessions(res || []);
      } catch {
        toast.error("Failed loading sessions");
      }
    };

    load();
  }, [courseId]);

  /* =========================
     LOAD ATTENDANCE
  ========================= */
  useEffect(() => {
    if (!sessionId) {
      setAttendance([]);
      return;
    }

    const load = async () => {
      setLoading(true);

      try {
        const res = await getSessionAttendance(sessionId);
        setAttendance(res || []);
      } catch {
        toast.error("Failed loading attendance");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [sessionId]);

  const courseOptions = courses.map((c: any) => ({
    value: c.id,
    label: c.subject?.name,
  }));

  const sessionOptions = sessions.map((s: any) => ({
    value: s.id,
    label: `${s.topic} - ${new Date(
      s.sessionDate
    ).toLocaleDateString()}`,
  }));

  const getBadge = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-700";
      case "ABSENT":
        return "bg-red-100 text-red-700";
      case "LATE":
        return "bg-yellow-100 text-yellow-700";
      case "EXCUSED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="card">

      {/* HEADER */}
    <div className="card-header flex justify-between items-center">

  <div>
    <h2 className="card-title flex items-center gap-2">
      <LuUsers />
      Attendance Management
    </h2>

    <p className="text-sm text-gray-500">
      Track student presence per session
    </p>
  </div>

  {/* 🔥 NEW BUTTON */}
  <Link
    to="/teacher/attendances/create"
    className="btn bg-primary text-white"
  >
    + Add Attendance
  </Link>

</div>

      {/* FILTERS */}
      <div className="card-body grid md:grid-cols-2 gap-4">

        {/* COURSE */}
        <div>
          <label className="text-sm font-medium">
            Course
          </label>

          <Select
            options={courseOptions}
            onChange={(v: any) =>
              setCourseId(v?.value || "")
            }
            isClearable
          />
        </div>

        {/* SESSION */}
        <div>
          <label className="text-sm font-medium">
            Session
          </label>

          <Select
            options={sessionOptions}
            onChange={(v: any) =>
              setSessionId(v?.value || "")
            }
            isDisabled={!courseId}
            isClearable
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="overflow-x-auto">

        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin text-3xl inline-block" />
          </div>
        )}

        {!loading && !sessionId && (
          <div className="p-10 text-center text-gray-500">
            Select a session to view attendance
          </div>
        )}

        {!loading && attendance.length > 0 && (
          <table className="min-w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a: any) => (
                <tr key={a.id} className="border-b">

                  <td className="p-3 font-medium">
                    {a.student?.firstName}{" "}
                    {a.student?.lastName}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getBadge(
                        a.status
                      )}`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="p-3 text-sm text-gray-500">
                    {a.remarks || "-"}
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

export default AttendanceList;