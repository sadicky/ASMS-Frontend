/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuClock3,
  LuLoader,
  LuUser,
} from "react-icons/lu";

import { getLessonSessionsByCourse } from "@/services/lesson.service";
import { getMyCourses } from "@/services/course.service"; // 👈 IMPORTANT

const LessonSessionTimeline = () => {
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [courseId, setCourseId] = useState("");

  const [sessions, setSessions] = useState<any[]>([]);

  /* =========================
     LOAD TEACHER COURSES
  ========================= */
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getMyCourses(); // courses assignés au teacher
        setCourses(data || []);
      } catch {
        toast.error("Failed loading courses");
      }
    };

    loadCourses();
  }, []);

  /* =========================
     LOAD SESSIONS
  ========================= */
  useEffect(() => {
    if (!courseId) {
      setSessions([]);
      return;
    }

    const load = async () => {
      setLoading(true);

      try {
        const res = await getLessonSessionsByCourse(courseId);
        setSessions(Array.isArray(res) ? res : []);
      } catch (err: any) {
        toast.error(
          err.response?.data?.message ||
            "Failed loading sessions"
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId]);

  const courseOptions = courses.map((c: any) => ({
    value: c.id,
    label: `${c.subject?.name} (${c.subject?.code})`,
  }));

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "-";

  const formatTime = (date?: string) =>
    date ? new Date(date).toLocaleTimeString() : "-";

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">

        <h2 className="card-title flex items-center gap-2">
          <LuBookOpen />
          Lesson Sessions
        </h2>

        <p className="text-sm text-default-500 mt-1">
          Select a course to view your teaching sessions
        </p>

      </div>

      {/* FILTER */}
      <div className="card-body">

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            Select Course
          </label>

          <Select
            options={courseOptions}
            placeholder="Choose a course..."
            onChange={(v: any) =>
              setCourseId(v?.value || "")
            }
            isClearable
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-12 text-center">
            <LuLoader className="animate-spin inline-block text-3xl text-primary" />
          </div>
        )}

        {/* EMPTY COURSE */}
        {!courseId && (
          <div className="py-10 text-center text-default-500">
            Please select a course to view sessions
          </div>
        )}

        {/* EMPTY SESSIONS */}
        {!loading && courseId && sessions.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-default-500">
              No sessions found for this course
            </p>
          </div>
        )}

        {/* TIMELINE */}
        {!loading && sessions.length > 0 && (
          <div className="relative">

            <div className="absolute top-0 left-6 w-[2px] h-full bg-default-200" />

            <div className="space-y-6">

              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="relative flex gap-4"
                >

                  <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow">
                    <LuBookOpen className="text-lg" />
                  </div>

                  <div className="flex-1 bg-white border rounded-2xl p-5 shadow-sm">

                    <div className="flex justify-between">

                      <h3 className="font-semibold">
                        {session.topic}
                      </h3>

                      <span className="text-xs text-gray-500">
                        {formatDate(session.sessionDate)}
                      </span>

                    </div>

                    {session.content && (
                      <p className="mt-3 text-sm text-gray-600 whitespace-pre-line">
                        {session.content}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">

                      <span className="flex items-center gap-1">
                        <LuClock3 />
                        {formatTime(session.createdAt)}
                      </span>
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default LessonSessionTimeline;