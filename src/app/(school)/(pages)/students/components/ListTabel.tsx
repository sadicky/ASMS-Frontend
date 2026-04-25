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
} from "react-icons/lu";

import { getMyStudents, type Student } from "@/services/student.service";
import { getMyClasses } from "@/services/classe.service";

const StudentList = () => {
  const navigate = useNavigate();

  // 🔥 STATES
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});

  const [loading, setLoading] = useState(false);

  // 🔍 FILTERS
  const [search, setSearch] = useState("");
  const [classId, setClassId] = useState("");

  // 📄 PAGINATION
  const [page, setPage] = useState(1);
  const limit = 10;

  // 🔥 LOAD CLASSES
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await getMyClasses();
        setClasses(res || []);        
        console.log("CLASSES:", res);
      } catch {
        toast.error("Error loading classes");
      }
    };

    loadClasses();
  }, []);

  // 🔥 LOAD STUDENTS (BACKEND FILTERED)
  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);

      try {
        const res = await getMyStudents({
          page,
          limit,
          search,
          classId,
          ...(classId ? { classId } : {}), 
        });

        console.log("STUDENTS:", res);

        setStudents(res.data || []);
        setMeta(res.meta || {});
      } catch (err: any) {
        toast.error(err.message || "Error loading students");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [page, search, classId]);

  // 🔥 OPTIONS

  const classOptions = [
    { value: "", label: "All Classes" },
    ...classes.map((c) => ({
      value: c.id,
      label: `${c.name} (${c.grade?.name || ""})`,
    })),
  ];

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">
        <h2 className="card-title text-lg font-semibold">Students</h2>
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
              setSearch(e.target.value);
            }}
          />
          <LuSearch className="absolute left-3 top-3 size-4 text-gray-400" />
        </div>

        {/* CLASS */}
        <Select
          options={classOptions}
          placeholder="Filter by class"
          value={classOptions.find((o) => o.value === classId) || null}
          onChange={(val: any) => {
            setPage(1);
            setClassId(val?.value || "");
          }}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        {/* LOADING */}
        {loading && (
          <div className="p-6 text-center">
            <LuLoader className="animate-spin inline-block text-xl" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && students.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No students found
          </p>
        )}

        {/* DATA */}
        {!loading && students.length > 0 && (
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th>Class</th>
                <th>Grade</th>
                <th>Gender</th>
                <th>Parent</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => {
                const enrollment = s.enrollments?.[0];

                return (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">
                      {s.firstName} {s.lastName}
                    </td>

                    <td>{enrollment?.class?.name || "-"}</td>
                    <td>{enrollment?.class?.grade?.name || "-"}</td>

                    <td>{s.gender}</td>
                    <td>{s.parentName}</td>
                    <td>{s.contact}</td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(`/admin/students/${s.id}`)
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

        <p className="text-sm text-gray-500">
          Showing{" "}
          <b>{(meta.page - 1) * limit + 1 || 0}</b> to{" "}
          <b>{Math.min(meta.page * limit || 0, meta.total || 0)}</b> of{" "}
          <b>{meta.total || 0}</b>
        </p>

        <div className="flex gap-2">

          <button
            disabled={meta.page <= 1}
            onClick={() => setPage(meta.page - 1)}
            className="btn btn-sm border"
          >
            <LuChevronLeft /> Prev
          </button>

          <button
            disabled={meta.page >= meta.lastPage}
            onClick={() => setPage(meta.page + 1)}
            className="btn btn-sm border"
          >
            Next <LuChevronRight />
          </button>

        </div>
      </div>
    </div>
  );
};

export default StudentList;