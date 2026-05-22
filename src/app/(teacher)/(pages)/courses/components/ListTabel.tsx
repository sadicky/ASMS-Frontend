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
  LuCalendarDays,
  LuClipboardList,
  LuFileText,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";

import {
  getCoursesByClass,
  type Course,
} from "@/services/course.service";

const TeacherCourses = () => {

  const [loading, setLoading] =
    useState(false);

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [classes, setClasses] =
    useState<any[]>([]);

  const [classId, setClassId] =
    useState("");

  const [search, setSearch] =
    useState("");

  /* =========================================
     LOAD CLASSES
  ========================================= */

  useEffect(() => {

    const loadClasses = async () => {

      try {

        const data =
          await getMyClasses();

        setClasses(data || []);

      } catch {

        toast.error(
          "Error loading classes"
        );

      }
    };

    loadClasses();

  }, []);

  /* =========================================
     LOAD COURSES
  ========================================= */

  useEffect(() => {

    if (!classId) return;

    const loadCourses = async () => {

      setLoading(true);

      try {

        const data =
          await getCoursesByClass(
            classId
          );

        setCourses(data || []);

      } catch (err: any) {

        toast.error(
          err.message ||
          "Error loading courses"
        );

      } finally {

        setLoading(false);

      }
    };

    loadCourses();

  }, [classId]);

  /* =========================================
     FILTER
  ========================================= */

  const filteredCourses =
    courses.filter(
      (course) =>
        course.subject.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        course.subject.code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  /* =========================================
     OPTIONS
  ========================================= */

  const classOptions =
    classes.map((c: any) => ({
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
            My Courses
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Manage lessons, assessments and course sessions
          </p>

        </div>

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
                (o) =>
                  o.value === classId
              ) || null
            }
            onChange={(selected: any) =>
              setClassId(
                selected?.value || ""
              )
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
                setSearch(
                  e.target.value
                )
              }
            />

            <LuSearch className="absolute left-3 top-3 text-default-400" />

          </div>

        </div>

      </div>

      {/* CONTENT */}

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

            Select a class to view your assigned courses

          </div>

        )}

        {/* DATA */}

        {!loading &&
          filteredCourses.length > 0 && (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">

              {filteredCourses.map(
                (course) => (

                  <div
                    key={course.id}
                    className="border border-default-200 rounded-2xl p-5 hover:shadow-lg transition bg-white"
                  >

                    {/* TOP */}

                    <div className="flex justify-between items-start">

                      <div>

                        <h3 className="font-semibold text-lg text-default-900">
                          {
                            course.subject
                              .name
                          }
                        </h3>

                        <p className="text-sm text-default-500 mt-1">
                          {
                            course.subject
                              .code
                          }
                        </p>

                      </div>

                      <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">

                        <LuBookOpen className="size-5" />

                      </div>

                    </div>

                    {/* TEACHER */}

                    <div className="mt-5 flex items-center gap-3">

                      <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">

                        <LuUser className="size-4" />

                      </div>

                      <div>

                        <p className="text-xs text-default-500">
                          Assigned Teacher
                        </p>

                        <p className="text-sm font-medium">
                          {
                            course
                              .assignments?.[0]
                              ?.teacher
                              ?.firstName
                          }{" "}
                          {
                            course
                              .assignments?.[0]
                              ?.teacher
                              ?.lastName
                          }
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-6 space-y-2">

                      {/* SESSIONS */}

                      <Link
                        to={`/teacher/lessons/course/${course.id}`}
                        className="btn w-full border border-default-200"
                      >
                        <LuCalendarDays className="me-2" />
                        Lesson Sessions
                      </Link>

                      {/* MARKS */}

                      <Link
                        to={`/teacher/marks/course/${course.id}`}
                        className="btn w-full border bg-primary text-white"
                      >
                        <LuFileText className="me-2" />
                        Student Marks
                      </Link>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

      </div>

    </div>
  );
};

export default TeacherCourses;