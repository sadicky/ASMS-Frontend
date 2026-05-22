/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuSave,
} from "react-icons/lu";

import { createLessonSession } from "@/services/lesson.service";

const CreateLessonSession = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    topic: "",
    content: "",
    sessionDate: "",
  });

  /* =========================
     HANDLE CHANGE
  ========================== */
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     SUBMIT
  ========================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseId) {
      return toast.error("Course not found");
    }

    if (!form.topic || !form.sessionDate) {
      return toast.error("Topic and date are required");
    }

    setLoading(true);

    try {
      await createLessonSession({
        courseId,
        topic: form.topic,
        content: form.content,
        sessionDate: form.sessionDate,
      });

      toast.success("Lesson session created");

      navigate(`/teacher/lessons/course/${courseId}`);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create session"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">

        <h2 className="card-title flex items-center gap-2">
          <LuBookOpen />
          Create Lesson Session
        </h2>

      </div>

      {/* BODY */}
      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TOPIC */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Topic
            </label>

            <input
              name="topic"
              type="text"
              className="form-input"
              placeholder="e.g. Introduction to Fractions"
              value={form.topic}
              onChange={handleChange}
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Session Date
            </label>

            <input
              name="sessionDate"
              type="datetime-local"
              className="form-input"
              value={form.sessionDate}
              onChange={handleChange}
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Content (optional)
            </label>

            <textarea
              name="content"
              className="form-input min-h-[120px]"
              placeholder="What was taught during this session..."
              value={form.content}
              onChange={handleChange}
            />
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >

              {loading ? (
                <LuLoader className="animate-spin me-2" />
              ) : (
                <LuSave className="me-2" />
              )}

              Save Session

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateLessonSession;