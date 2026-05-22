import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getLessonSessionsByCourse } from "@/services/lesson.service";

const LessonSessionList = () => {
  const { courseId } = useParams();

  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getLessonSessionsByCourse(courseId!);
        setSessions(data);
        console.log(data)
      } catch {
        toast.error("Error loading sessions");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId]);

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">📘 Lesson Sessions</h2>

      {loading && <p>Loading...</p>}

      {!loading && sessions.length === 0 && (
        <p className="text-gray-500">No sessions yet</p>
      )}

      <div className="space-y-3">

        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded-xl shadow border-l-4 border-primary"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{s.topic}</h3>
              <span className="text-xs text-gray-500">
                {new Date(s.sessionDate).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              {s.content}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default LessonSessionList;