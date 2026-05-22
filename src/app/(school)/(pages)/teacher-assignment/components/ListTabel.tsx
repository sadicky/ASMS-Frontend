/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuPlus,
  LuUserCheck,
} from "react-icons/lu";

import {
  assignTeacher,
  getAssignmentsByCourse,
} from "@/services/teacher-assignment.service";

import { getCoursesByClass } from "@/services/course.service";
import { getMyClasses } from "@/services/classe.service";
import { getTeachers } from "@/services/user.service";

const TeacherAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [form, setForm] = useState({
    teacherId: "",
    courseId: "",
    isPrimary: false,
  });

  // 🔥 LOAD CLASSES + TEACHERS
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const classRes = await getMyClasses();
        const teacherRes = await getTeachers();

        setClasses(classRes || []);
        setTeachers(teacherRes || []);
      } catch (err: any) {
        toast.error(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔥 LOAD COURSES
  useEffect(() => {
    if (!selectedClass) return;

    const loadCourses = async () => {
      try {
        const res = await getCoursesByClass(selectedClass);

        setCourses(res || []);
      } catch (err: any) {
        toast.error(err.message || "Error loading courses");
      }
    };

    loadCourses();
  }, [selectedClass]);

  // 🔥 LOAD ASSIGNMENTS
  useEffect(() => {
    if (!selectedCourse) return;

    const loadAssignments = async () => {
      try {
        const res = await getAssignmentsByCourse(selectedCourse);

        setAssignments(res || []);
      } catch (err: any) {
        toast.error(err.message || "Error loading assignments");
      }
    };

    loadAssignments();
  }, [selectedCourse]);

  // 🔥 ASSIGN TEACHER
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.teacherId || !form.courseId) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setAssignLoading(true);

      await assignTeacher(form);

      toast.success("Teacher assigned successfully");

      // reload assignments
      const res = await getAssignmentsByCourse(form.courseId);
      setAssignments(res || []);

      // reset form
      setForm({
        teacherId: "",
        courseId: "",
        isPrimary: false,
      });
    } catch (err: any) {
      toast.error(err.message || "Error assigning teacher");
    } finally {
      setAssignLoading(false);
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
    <div className="space-y-6">

      {/* HEADER */}
      <div className="card">
        <div className="card-body flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <LuUserCheck className="text-primary" />
              Teacher Assignments
            </h2>

            <p className="text-default-500 mt-1">
              Assign teachers to courses
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="card">
        <div className="card-body">

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-4 gap-5"
          >

            {/* CLASS */}
            <div>
              <label className="form-label">
                Class
              </label>

              <Select
                options={classOptions}
                placeholder="Select class"
                value={
                  classOptions.find(
                    (o) => o.value === selectedClass
                  ) || null
                }
                onChange={(val: any) => {
                  setSelectedClass(val?.value || "");
                  setSelectedCourse("");

                  setCourses([]);
                  setAssignments([]);

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
                Course
              </label>

              <Select
                options={courseOptions}
                placeholder="Select course"
                value={
                  courseOptions.find(
                    (o) => o.value === form.courseId
                  ) || null
                }
                onChange={(val: any) => {
                  setSelectedCourse(val?.value || "");

                  setForm({
                    ...form,
                    courseId: val?.value || "",
                  });
                }}
                isDisabled={!selectedClass}
              />
            </div>

            {/* TEACHER */}
            <div>
              <label className="form-label">
                Teacher
              </label>

              <Select
                options={teacherOptions}
                placeholder="Select teacher"
                value={
                  teacherOptions.find(
                    (o) => o.value === form.teacherId
                  ) || null
                }
                onChange={(val: any) =>
                  setForm({
                    ...form,
                    teacherId: val?.value || "",
                  })
                }
              />
            </div>

            {/* PRIMARY */}
            <div className="flex items-end">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isPrimary}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isPrimary: e.target.checked,
                    })
                  }
                />

                <span>Primary Teacher</span>
              </label>
            </div>

            {/* BUTTON */}
            <div className="lg:col-span-4 flex justify-end">
              <button
                type="submit"
                disabled={assignLoading}
                className="btn bg-primary text-white"
              >
                {assignLoading ? (
                  <LuLoader className="animate-spin me-1" />
                ) : (
                  <LuPlus className="me-1" />
                )}

                Assign Teacher
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* ASSIGNMENTS */}
      <div className="card">

        <div className="card-header">
          <h3 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Assigned Teachers
          </h3>
        </div>

        <div className="overflow-x-auto">

          {loading && (
            <div className="p-6 text-center">
              <LuLoader className="animate-spin inline-block text-xl" />
            </div>
          )}

          {!loading && assignments.length === 0 && (
            <div className="p-6 text-center text-default-500">
              No teacher assignments found
            </div>
          )}

          {!loading && assignments.length > 0 && (
            <table className="min-w-full">

              <thead className="bg-default-100">
                <tr>
                  <th className="p-4 text-left">Teacher</th>
                  <th className="p-4 text-left">Course</th>
                  <th className="p-4 text-left">Class</th>
                  <th className="p-4 text-left">Primary</th>
                </tr>
              </thead>

              <tbody>
                {assignments.map((a: any) => (
                  <tr
                    key={a.id}
                    className="border-b hover:bg-default-50"
                  >
                    <td className="p-4 font-medium">
                      {a.teacher?.firstName}{" "}
                      {a.teacher?.lastName}
                    </td>

                    <td className="p-4">
                      {a.course?.subject?.name}
                    </td>

                    <td className="p-4">
                      {a.course?.class?.name}
                    </td>

                    <td className="p-4">
                      {a.isPrimary ? (
                        <span className="badge bg-success/10 text-success">
                          YES
                        </span>
                      ) : (
                        <span className="badge bg-default-200 text-default-600">
                          NO
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignment;