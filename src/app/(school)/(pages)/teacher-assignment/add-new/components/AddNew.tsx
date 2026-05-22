// 🔥 CREATE TEACHER ASSIGNMENT COMPONENT
// AUTO LOAD courseId FROM URL

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuLoader,
  LuRefreshCcw,
  LuSave,
  LuUserCheck,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";
import { getCoursesByClass } from "@/services/course.service";
import { getMyStaffs } from "@/services/staff.service";

import { assignTeacher } from "@/services/teacher-assignment.service";

const CreateTeacherAssignment = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // 🔥 GET courseId FROM URL
  const courseIdFromUrl =
    searchParams.get("courseId") || "";

  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  const [selectedClass, setSelectedClass] =
    useState("");

  const [form, setForm] = useState({
    teacherId: "",
    courseId: courseIdFromUrl,
    isPrimary: false,
  });

  // 🔥 LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const classRes = await getMyClasses();
        const teacherRes = await getMyStaffs();

        setClasses(classRes || []);
        setTeachers(teacherRes || []);

        // 🔥 FIND COURSE INSIDE CLASSES
        for (const c of classRes || []) {
          const res = await getCoursesByClass(c.id);

          const found = res.find(
            (x: any) => x.id === courseIdFromUrl
          );

          if (found) {
            setSelectedClass(c.id);
            setCourses(res);
            break;
          }
        }
      } catch (err: any) {
        toast.error(
          err.message || "Error loading data"
        );
      }
    };

    loadData();
  }, [courseIdFromUrl]);

  // 🔥 LOAD COURSES WHEN CLASS CHANGES
  useEffect(() => {
    if (!selectedClass) return;

    const loadCourses = async () => {
      try {
        const res = await getCoursesByClass(
          selectedClass
        );

        setCourses(res || []);
      } catch (err: any) {
        toast.error(
          err.message || "Error loading courses"
        );
      }
    };

    loadCourses();
  }, [selectedClass]);

  // 🔥 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.teacherId || !form.courseId) {
      toast.error(
        "Please fill all required fields"
      );
      return;
    }

    try {
      setLoading(true);

      await assignTeacher(form);

      toast.success(
        "Teacher assigned successfully 🎉"
      );

      navigate("/school/courses");
    } catch (err: any) {
      toast.error(
        err.message || "Error assigning teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 OPTIONS
  const classOptions = classes.map((c: any) => ({
    value: c.id,
    label: `${c.name} (${c.grade?.name})`,
  }));

  const courseOptions = courses.map((c: any) => ({
    value: c.id,
    label: `${c.subject?.name} - ${c.class?.name}`,
  }));

  const teacherOptions = teachers.map((t: any) => ({
    value: t.id,
    label: `${t.firstName} ${t.lastName}`,
  }));

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <div className="flex items-center gap-2">
          <LuUserCheck className="text-primary text-xl" />

          <div>
            <h2 className="card-title">
              Assign Teacher
            </h2>

            <p className="text-sm text-default-500 mt-1">
              Link a teacher to a course
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid lg:grid-cols-2 gap-5">

            {/* CLASS */}
            <div>
              <label className="form-label">
                Select Class
              </label>

              <Select
                options={classOptions}
                placeholder="Choose class"
                value={
                  classOptions.find(
                    (o) =>
                      o.value === selectedClass
                  ) || null
                }
                onChange={(val: any) => {
                  setSelectedClass(
                    val?.value || ""
                  );

                  setCourses([]);

                  setForm({
                    ...form,
                    courseId: "",
                  });
                }}
              />
            </div>

            {/* COURSE */}
            <div>
              <label className="form-label">
                Select Course
              </label>

              <Select
                options={courseOptions}
                placeholder="Choose course"
                isDisabled={!selectedClass}
                value={
                  courseOptions.find(
                    (o) =>
                      o.value === form.courseId
                  ) || null
                }
                onChange={(val: any) =>
                  setForm({
                    ...form,
                    courseId:
                      val?.value || "",
                  })
                }
              />
            </div>

            {/* TEACHER */}
            <div>
              <label className="form-label">
                Select Teacher
              </label>

              <Select
                options={teacherOptions}
                placeholder="Choose teacher"
                value={
                  teacherOptions.find(
                    (o) =>
                      o.value === form.teacherId
                  ) || null
                }
                onChange={(val: any) =>
                  setForm({
                    ...form,
                    teacherId:
                      val?.value || "",
                  })
                }
              />
            </div>

            {/* PRIMARY */}
            <div className="flex items-end">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isPrimary}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isPrimary:
                        e.target.checked,
                    })
                  }
                  className="size-4"
                />

                <span className="font-medium">
                  Set as Primary Teacher
                </span>
              </label>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() =>
                navigate("/school/courses")
              }
              className="btn border"
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

              Assign Teacher
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTeacherAssignment;