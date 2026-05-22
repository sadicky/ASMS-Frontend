/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuSearch,
  LuUser,
  LuPlus,
  LuArrowRight,
  LuPresentation,
  LuFileText,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";

import {
  getCoursesByClass,
  type Course,
} from "@/services/course.service";

const CourseList = () => {
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const [classId, setClassId] = useState("");

  const [search, setSearch] = useState("");

  // 🔥 LOAD CLASSES
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await getMyClasses();

        setClasses(data || []);
      } catch {
        toast.error("Error loading classes");
      }
    };

    loadClasses();
  }, []);

  // 🔥 LOAD COURSES
  useEffect(() => {
    if (!classId) return;

    const loadCourses = async () => {
      setLoading(true);

      try {
        const data = await getCoursesByClass(
          classId
        );

        setCourses(data || []);
      } catch (err: any) {
        toast.error(
          err.message || "Error loading courses"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [classId]);

  // 🔥 FILTER
  const filteredCourses = courses.filter(
    (c) =>
      c.subject.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.subject.code
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // 🔥 OPTIONS
  const classOptions = classes.map((c: any) => ({
    value: c.id,
    label: `${c.name} (${c.grade?.name || ""})`,
  }));

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">
        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Courses
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Manage courses, lessons and teacher assignments
          </p>
        </div>

        <Link
          to="/school/courses/create"
          className="btn bg-primary text-white"
        >
          <LuPlus className="me-1" />
          Add Course
        </Link>
      </div>

      {/* FILTERS */}
      <div className="card-body grid md:grid-cols-2 gap-4">

        {/* CLASS */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Class
          </label>

          <Select
            options={classOptions}
            placeholder="Choose class"
            value={
              classOptions.find(
                (o) => o.value === classId
              ) || null
            }
            onChange={(selected: any) =>
              setClassId(selected?.value || "")
            }
          />
        </div>

        {/* SEARCH */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Search Subject
          </label>

          <div className="relative">
            <input
              type="text"
              className="form-input ps-10"
              placeholder="Search subject..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <LuSearch className="absolute left-3 top-3 text-default-400" />
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        {/* LOADING */}
        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin inline-block text-2xl" />
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          classId &&
          filteredCourses.length === 0 && (
            <div className="text-center py-10">
              <h3 className="font-semibold text-lg">
                No courses found
              </h3>
            </div>
          )}

        {/* DEFAULT */}
        {!classId && (
          <div className="text-center py-10 text-default-500">
            Select a class to view courses
          </div>
        )}

        {/* DATA */}
        {!loading &&
          filteredCourses.length > 0 && (
            <table className="min-w-full">

              <thead className="bg-default-100">
                <tr>
                  <th className="p-4 text-left">
                    Subject
                  </th>

                  <th className="p-4 text-left">
                    Code
                  </th>

                  <th className="p-4 text-left">
                    Assigned Teachers
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b hover:bg-default-50 transition"
                  >

                    {/* SUBJECT */}
                    <td className="p-4 font-medium">
                      {course.subject.name}
                    </td>

                    {/* CODE */}
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {course.subject.code}
                      </span>
                    </td>

                    {/* TEACHERS */}
                    <td className="p-4">
                      {course.assignments?.length ? (
                        <div className="flex flex-col gap-2">

                          {course.assignments.map(
                            (a: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                  <LuUser className="size-4" />
                                </div>

                                <span>
                                  {
                                    a.teacher
                                      ?.firstName
                                  }{" "}
                                  {
                                    a.teacher
                                      ?.lastName
                                  }
                                </span>

                                {a.isPrimary && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    Main
                                  </span>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">

                          <span className="text-default-400 text-sm">
                            No teacher assigned
                          </span>

                          <Link
                            to={`/school/teacher-assignments/create?courseId=${course.id}`}
                            className="text-primary text-sm font-medium hover:underline"
                          >
                            Assign Now
                          </Link>

                        </div>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">

                        {/* ASSIGN TEACHER */}
                        <Link
                          to={`/school/teacher-assignments/create?courseId=${course.id}`}
                          className="btn btn-sm bg-primary text-white"
                        >
                          <LuArrowRight className="me-1" />
                          Teacher
                        </Link>

                        {/* CREATE LESSON */}
                        {/* <Link
                          to={`/school/lessons/create?courseId=${course.id}`}
                          className="btn btn-sm bg-success text-white"
                        >
                          <LuPresentation className="me-1" />
                          Lesson
                        </Link> */}

                        {/* VIEW LESSONS */}
                        <Link
                          to={`/school/lessons/course/${course.id}`}
                          className="btn btn-sm border"
                        >
                          <LuFileText className="me-1" />
                          Sessions
                        </Link>

                      </div>
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

export default CourseList;