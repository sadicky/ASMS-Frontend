/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuSearch,
  LuLoader,
  LuEye,
  LuChevronLeft,
  LuChevronRight,
  LuUsers,
} from "react-icons/lu";

import {
  getMyStudents,
  type Student,
} from "@/services/student.service";

import { getMyClasses } from "@/services/classe.service";

const StudentList = () => {
  const navigate = useNavigate();

  // ✅ STATES
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const [meta, setMeta] = useState<any>({
    page: 1,
    total: 0,
    lastPage: 1,
  });

  const [loading, setLoading] =
    useState(false);

  // ✅ FILTERS
  const [search, setSearch] =
    useState("");

  const [classId, setClassId] =
    useState("");

  // ✅ PAGINATION
  const [page, setPage] = useState(1);

  const limit = 10;

  // ✅ LOAD CLASSES
  useEffect(() => {

    const loadClasses = async () => {

      try {

        const data =
          await getMyClasses();

        console.log(
          "MY CLASSES =>",
          data
        );

        setClasses(data || []);

      } catch (err) {

        console.error(err);

        toast.error(
          "Error loading classes"
        );
      }
    };

    loadClasses();

  }, []);

  // ✅ LOAD STUDENTS
  useEffect(() => {

    const loadStudents = async () => {

      setLoading(true);

      try {

        const res =
          await getMyStudents({
            page,
            limit,
            search,
            ...(classId
              ? { classId }
              : {}),
          });

        console.log(
          "STUDENTS =>",
          res
        );

        setStudents(
          res.data || []
        );

        setMeta(
          res.meta || {}
        );

      } catch (err: any) {

        console.error(err);

        toast.error(
          err?.message ||
          "Error loading students"
        );

      } finally {

        setLoading(false);
      }
    };

    loadStudents();

  }, [page, search, classId]);

  // ✅ CLASS OPTIONS
  const classOptions = [
    {
      value: "",
      label: "All Classes",
    },

    ...classes.map((c: any) => ({
      value: c.id,

      label: `${c.name} (${c.grade?.name || "No Grade"})`,
    })),
  ];

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">

            <LuUsers className="text-primary text-xl" />

          </div>

          <div>

            <h2 className="card-title text-lg font-semibold">
              Students
            </h2>

            <p className="text-sm text-default-500">
              Manage students in your school
            </p>

          </div>

        </div>

      </div>

      {/* FILTERS */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* SEARCH */}
        <div className="relative">

          <input
            type="text"
            className="form-input ps-9"
            placeholder="Search student..."
            value={search}
            onChange={(e) => {

              setPage(1);

              setSearch(
                e.target.value
              );
            }}
          />

          <LuSearch className="absolute left-3 top-3 size-4 text-gray-400" />

        </div>

        {/* CLASS */}
        <Select
          options={classOptions}
          placeholder="Filter by class"
          value={
            classOptions.find(
              (o) =>
                o.value === classId
            ) || null
          }
          onChange={(val: any) => {

            setPage(1);

            setClassId(
              val?.value || ""
            );
          }}
        />

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        {/* LOADING */}
        {loading && (

          <div className="p-10 text-center">

            <LuLoader className="animate-spin inline-block text-2xl text-primary" />

          </div>

        )}

        {/* EMPTY */}
        {!loading &&
          students.length === 0 && (

            <div className="p-10 text-center text-default-500">

              No students found

            </div>

          )}

        {/* TABLE */}
        {!loading &&
          students.length > 0 && (

            <table className="min-w-full">

              <thead className="bg-default-100 text-left">

                <tr>

                  <th className="p-4">
                    Student
                  </th>

                  <th>
                    Class
                  </th>

                  <th>
                    Grade
                  </th>

                  <th>
                    Gender
                  </th>

                  <th>
                    Parent
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.map((s) => {

                  const enrollment =
                    s.enrollments?.[0];

                  return (

                    <tr
                      key={s.id}
                      className="border-b hover:bg-default-50 transition"
                    >

                      {/* NAME */}
                      <td className="p-4">

                        <div>

                          <p className="font-medium">
                            {s.firstName}{" "}
                            {s.lastName}
                          </p>

                          <p className="text-sm text-default-500">
                            {s.email}
                          </p>

                        </div>

                      </td>

                      {/* CLASS */}
                      <td>

                        {enrollment?.class?.name ||
                          "-"}

                      </td>

                      {/* GRADE */}
                      <td>

                        {enrollment?.class
                          ?.grade?.name || "-"}

                      </td>

                      {/* GENDER */}
                      <td>
                        {s.gender}
                      </td>

                      {/* PARENT */}
                      <td>
                        {s.parentName ||
                          "-"}
                      </td>

                      {/* CONTACT */}
                      <td>
                        {s.contact ||
                          "-"}
                      </td>

                      {/* ACTION */}
                      <td>

                        <button
                          onClick={() =>
                            navigate(
                              `/school/students/${s.id}`
                            )
                          }
                          className="btn btn-sm bg-primary text-white"
                        >

                          <LuEye />

                        </button>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          )}

      </div>

      {/* PAGINATION */}
      <div className="card-footer flex justify-between items-center">

        <p className="text-sm text-default-500">

          Showing{" "}

          <b>
            {(meta.page - 1) *
              limit +
              1 || 0}
          </b>

          {" "}to{" "}

          <b>
            {Math.min(
              meta.page *
                limit || 0,
              meta.total || 0
            )}
          </b>

          {" "}of{" "}

          <b>
            {meta.total || 0}
          </b>

        </p>

        {/* BUTTONS */}
        <div className="flex gap-2">

          {/* PREV */}
          <button
            disabled={
              meta.page <= 1
            }
            onClick={() =>
              setPage(
                meta.page - 1
              )
            }
            className="btn btn-sm border"
          >

            <LuChevronLeft />

            Prev

          </button>

          {/* NEXT */}
          <button
            disabled={
              meta.page >=
              meta.lastPage
            }
            onClick={() =>
              setPage(
                meta.page + 1
              )
            }
            className="btn btn-sm border"
          >

            Next

            <LuChevronRight />

          </button>

        </div>

      </div>

    </div>
  );
};

export default StudentList;