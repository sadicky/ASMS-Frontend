/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

import { getAllStudents } from "@/services/student.service";
import { AllSchools } from "@/services/school.service";

import {
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuLoader,
  LuEye,
} from "react-icons/lu";
import { Link } from "react-router-dom";

const StudentListSuperAdmin = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔎 FILTERS
  const [search, setSearch] = useState("");
  const [schoolId, setSchoolId] = useState("");

  // 📄 PAGINATION (backend)
  const [meta, setMeta] = useState<any>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  // 🏫 SCHOOLS
  const [schools, setSchools] = useState<any[]>([]);

  // =========================
  // 🔥 LOAD SCHOOLS
  // =========================
// LOAD SCHOOLS
useEffect(() => {
  const loadSchools = async () => {
    try {
      const res = await AllSchools();

      if (Array.isArray(res)) {
        setSchools(res);
      } else if (Array.isArray(res.data)) {
        setSchools(res.data);
      } else {
        setSchools([]);
      }

    } catch {
      toast.error("Error loading schools");
    }
  };

  loadSchools();
}, []);


  // =========================
  // 🔥 LOAD STUDENTS (BACKEND)
  // =========================
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const res = await getAllStudents({
          page,
          limit,
          search,
          schoolId,
        });

        setStudents(res.data);
        setMeta(res.meta);
        
      } catch {
        toast.error("Error loading students");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, search, schoolId]);

  // =========================
  // 🔹 OPTIONS
  // =========================
const schoolOptions = (Array.isArray(schools) ? schools : []).map((s: any) => ({
  value: s.id,
  label: s.name,
}));

console.log(students)
  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <h2 className="card-title"> All Students (Super Admin)</h2>
      </div>

      {/* FILTERS */}
      <div className="card-header flex gap-3 flex-wrap">

        {/* SEARCH */}
        <div className="relative">
          <input
            type="text"
            className="form-input ps-9"
            placeholder="Search student..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <LuSearch className="absolute top-3 left-3 size-4 text-gray-400" />
        </div>

        {/* SCHOOL FILTER */}
        <div className="w-64">
         <Select
          options={schoolOptions}
          placeholder="Filter by school"
          isClearable
          value={
            schoolOptions.find((o) => o.value === schoolId) || null
          }
          onChange={(s: any) => {
            setPage(1);
            setSchoolId(s?.value || "");
          }}
        />
        </div>

      </div>

      {/* TABLE */}
      <div className="card-body">

        {loading ? (
          <div className="text-center py-10">
            <LuLoader className="animate-spin mx-auto size-6" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">

              <thead className="bg-default-100">
                <tr>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">School</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Grade</th>
                  <th className="p-3 text-left">Parent</th>
                  <th className="p-3 text-left">Contact</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => {
                  const enrollment = s.enrollments?.[0];

                  return (
                    <tr
                      key={s.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">
                        <Link
                          className="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded"
                          to={`/admin/students/${s.id}`}
                        >
                          <LuEye className="size-3" />
                          {s.firstName} {s.lastName}
                        </Link>
                      </td>

                      <td className="p-3">
                        {s.user?.school?.name || "-"}
                      </td>

                      <td className="p-3">
                        {enrollment?.class?.name || "-"}
                      </td>

                      <td className="p-3">
                        {enrollment?.class?.grade?.name || "-"}
                      </td>

                      <td className="p-3">{s.parentName}</td>
                      <td className="p-3">{s.contact}</td>

                      <td className="p-3">
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>

            {/* EMPTY */}
            {!students.length && (
              <p className="text-center py-6 text-gray-500">
                No students found
              </p>
            )}
          </div>
        )}

      </div>

      {/* PAGINATION */}
      <div className="card-footer flex justify-between items-center">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <b>{(meta.page - 1) * meta.limit + 1}</b> to{" "}
          <b>{Math.min(meta.page * meta.limit, meta.total)}</b> of{" "}
          <b>{meta.total}</b>
        </p>

        <div className="flex gap-2">

          <button
            disabled={meta.page <= 1}
            onClick={() => setPage(meta.page - 1)}
            className="btn border btn-sm"
          >
            <LuChevronLeft /> Prev
          </button>

          {Array.from(
            { length: meta.lastPage || 1 },
            (_, i) => i + 1
          ).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`btn btn-sm ${meta.page === p ? "bg-primary text-white" : "border"
                }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={meta.page >= meta.lastPage}
            onClick={() => setPage(page + 1)}
            className="btn border btn-sm"
          >
            Next <LuChevronRight />
          </button>

        </div>

      </div>

    </div>
  );
};

export default StudentListSuperAdmin;