/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuCalendarDays,
  LuClock3,
  LuLoader,
  LuSave,
  LuRefreshCcw,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";
import {
  getCoursesByClass,
} from "@/services/course.service";

import {
  createTimetable,
} from "@/services/timetable.service";

const days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const CreateTimetable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [classes, setClasses] =
    useState<any[]>([]);

  const [courses, setCourses] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    classId: "",
    courseId: "",
    day: "",
    period: 1,
    startTime: "",
    endTime: "",
  });

  // 🔥 LOAD CLASSES
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyClasses();
        setClasses(data || []);
      } catch {
        toast.error(
          "Error loading classes"
        );
      }
    };

    load();
  }, []);

  // 🔥 LOAD COURSES
  useEffect(() => {
    if (!form.classId) return;

    const loadCourses = async () => {
      try {
        const data =
          await getCoursesByClass(
            form.classId
          );

        setCourses(data || []);
      } catch {
        toast.error(
          "Error loading courses"
        );
      }
    };

    loadCourses();
  }, [form.classId]);

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

  const dayOptions = days.map((d) => ({
    value: d,
    label: d,
  }));

  const validate = () => {
    if (!form.classId)
      return "Class required";

    if (!form.courseId)
      return "Course required";

    if (!form.day)
      return "Day required";

    if (!form.startTime)
      return "Start time required";

    if (!form.endTime)
      return "End time required";

    return null;
  };

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    const error = validate();

    if (error)
      return toast.error(error);

    setLoading(true);

    try {
      await createTimetable(form);

      toast.success(
        "Timetable created successfully"
      );

      navigate("/school/timetables");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Error creating timetable"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuCalendarDays />
            Create Timetable
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Schedule courses for classes
          </p>
        </div>
      </div>

      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* CLASS + COURSE */}
          <div className="grid lg:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm font-medium">
                Class
              </label>

              <Select
                options={classOptions}
                placeholder="Select class"
                onChange={(v: any) =>
                  setForm({
                    ...form,
                    classId:
                      v?.value || "",
                    courseId: "",
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Course
              </label>

              <Select
                options={courseOptions}
                placeholder="Select course"
                onChange={(v: any) =>
                  setForm({
                    ...form,
                    courseId:
                      v?.value || "",
                  })
                }
              />
            </div>

          </div>

          {/* DAY + PERIOD */}
          <div className="grid lg:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm font-medium">
                Day
              </label>

              <Select
                options={dayOptions}
                placeholder="Select day"
                onChange={(v: any) =>
                  setForm({
                    ...form,
                    day:
                      v?.value || "",
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Period
              </label>

              <input
                type="number"
                min={1}
                className="form-input"
                value={form.period}
                onChange={(e) =>
                  setForm({
                    ...form,
                    period: Number(
                      e.target.value
                    ),
                  })
                }
              />
            </div>

          </div>

          {/* TIME */}
          <div className="grid lg:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm font-medium">
                Start Time
              </label>

              <div className="relative">
                <input
                  type="time"
                  className="form-input ps-10"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      startTime:
                        e.target.value,
                    })
                  }
                />

                <LuClock3 className="absolute left-3 top-3 text-default-400" />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                End Time
              </label>

              <div className="relative">
                <input
                  type="time"
                  className="form-input ps-10"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      endTime:
                        e.target.value,
                    })
                  }
                />

                <LuClock3 className="absolute left-3 top-3 text-default-400" />
              </div>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              className="btn border"
              onClick={() =>
                navigate(
                  "/school/timetables"
                )
              }
            >
              <LuRefreshCcw className="me-1" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >
              {loading ? (
                <LuLoader className="animate-spin me-1" />
              ) : (
                <LuSave className="me-1" />
              )}

              Create Timetable
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateTimetable;