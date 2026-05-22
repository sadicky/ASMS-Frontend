/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuCalendar,
  LuClock,
  LuLoader,
  LuPlus,
} from "react-icons/lu";

import { getLessonSessionsByCourse } from "@/services/lesson.service";

const TeacherCourseSessions = () => {
  const { courseId } = useParams();

  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD SESSIONS
  ========================== */
  useEffect(() => {
    if (!courseId) return;

    const load = async () => {
      setLoading(true);

      try {
        const data = await getLessonSessionsByCourse(courseId);
        setSessions(data || []);
      } catch {
        toast.error("Failed to load lesson sessions");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId]);

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">

        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            My Lesson Sessions
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Track your teaching sessions for this course
          </p>
        </div>

        {/* CREATE SESSION */}
        <Link
          to={`/teacher/lessons/course/${courseId}/create`}
          className="btn bg-primary text-white"
        >
          <LuPlus className="me-1" />
          New Session
        </Link>

      </div>

      {/* BODY */}
      <div className="card-body">

        {/* LOADING */}
        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin inline-block text-2xl" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && sessions.length === 0 && (
          <div className="text-center py-10 text-default-500">
            No lesson sessions recorded yet.
          </div>
        )}

        {/* LIST */}
        <div className="space-y-4">

          {sessions.map((session) => (
            <div
              key={session.id}
              className="border border-default-200 rounded-xl p-5 hover:shadow-md transition bg-white"
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-lg text-default-900">
                    {session.topic}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-default-500 mt-1">

                    <span className="flex items-center gap-1">
                      <LuCalendar />
                      {new Date(session.sessionDate).toLocaleDateString()}
                    </span>

                    <span className="flex items-center gap-1">
                      <LuClock />
                      {new Date(session.createdAt).toLocaleTimeString()}
                    </span>

                  </div>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  Session
                </span>

              </div>

              {/* CONTENT */}
              {session.content && (
                <p className="mt-4 text-default-600 leading-6">
                  {session.content}
                </p>
              )}

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default TeacherCourseSessions;