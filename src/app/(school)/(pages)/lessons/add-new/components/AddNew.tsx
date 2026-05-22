import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { createLessonSession } from "@/services/lesson.service";

import { LuSave, LuLoader, LuArrowLeft } from "react-icons/lu";

const CreateLessonSession = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const courseId = params.get("courseId");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    topic: "",
    content: "",
    sessionDate: "",
    durationMinutes: 60,
    objectives: "",
    resources: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!courseId) return toast.error("Course not found");

    if (!form.topic || !form.content || !form.sessionDate) {
      return toast.error("Topic, content and date are required");
    }

    setLoading(true);

    try {
      await createLessonSession({
        courseId,
        topic: form.topic,
        content: form.content,
        sessionDate: form.sessionDate,
      });

      toast.success("Lesson session created successfully 🎉");

      navigate(-1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error creating session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">📘 Create Lesson Session</h2>

        <button
          onClick={() => navigate(-1)}
          className="btn border flex items-center gap-2"
        >
          <LuArrowLeft />
          Back
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5"
      >

        {/* TOPIC */}
        <div>
          <label className="text-sm font-medium">Topic</label>
          <input
            className="form-input mt-1"
            placeholder="e.g. Algebra introduction"
            value={form.topic}
            onChange={(e) =>
              setForm({ ...form, topic: e.target.value })
            }
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="text-sm font-medium">Content</label>
          <textarea
            className="form-input mt-1 h-28"
            placeholder="Explain what will be taught..."
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />
        </div>

        {/* ROW 1 */}
        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">Session Date</label>
            <input
              type="date"
              className="form-input mt-1"
              value={form.sessionDate}
              onChange={(e) =>
                setForm({ ...form, sessionDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Duration (minutes)</label>
            <input
              type="number"
              className="form-input mt-1"
              value={form.durationMinutes}
              onChange={(e) =>
                setForm({
                  ...form,
                  durationMinutes: Number(e.target.value),
                })
              }
            />
          </div>

        </div>

        {/* OBJECTIVES */}
        <div>
          <label className="text-sm font-medium">Objectives</label>
          <input
            className="form-input mt-1"
            placeholder="What students should learn..."
            value={form.objectives}
            onChange={(e) =>
              setForm({ ...form, objectives: e.target.value })
            }
          />
        </div>

        {/* RESOURCES */}
        <div>
          <label className="text-sm font-medium">Resources (optional)</label>
          <input
            className="form-input mt-1"
            placeholder="Links, PDFs, videos..."
            value={form.resources}
            onChange={(e) =>
              setForm({ ...form, resources: e.target.value })
            }
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn bg-primary text-white flex items-center gap-2"
          >
            {loading ? (
              <LuLoader className="animate-spin" />
            ) : (
              <LuSave />
            )}
            Save Lesson
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateLessonSession;