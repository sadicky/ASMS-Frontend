/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { getAllClasses } from "@/services/classe.service";
import { getGrades } from "@/services/grade.service";
import { getSchools } from "@/services/school.service";

import {
  LuChevronLeft,
  LuChevronRight,
  LuLoader,
  LuSearch,
  LuPlus,
} from "react-icons/lu";

const ClassList = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [grades, setGrades] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);

  const [schoolId, setSchoolId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({});
  const limit = 10;

  // =========================
  // 🔥 LOAD FILTER DATA
  // =========================
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const gradesRes = await getGrades();
        const schoolsRes = await getSchools();

        setGrades(Array.isArray(gradesRes?.data) ? gradesRes.data : gradesRes || []);
        setSchools(Array.isArray(schoolsRes?.data) ? schoolsRes.data : schoolsRes || []);
      } catch {
        setGrades([]);
        setSchools([]);
      }
    };

    loadFilters();
  }, []);

  // =========================
  // 🔥 LOAD CLASSES
  // =========================
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        const res = await getAllClasses({
          page,
          limit,
          search,
          schoolId,
          gradeId,
        });

        setClasses(res?.data || []);
        setMeta(res?.meta || {});
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page, search, schoolId, gradeId]);

  // =========================
  // 🔹 OPTIONS (react-select)
  // =========================
  const schoolOptions = [
    { value: "", label: "All Schools" },
    ...schools.map((s: any) => ({
      value: s.id,
      label: s.name,
    })),
  ];

  const gradeOptions = [
    { value: "", label: "All Grades" },
    ...grades.map((g: any) => ({
      value: g.id,
      label: g.name,
    })),
  ];

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">
        <h2 className="card-title">Classes</h2>

        <button
          onClick={() => navigate("/admin/classes/create")}
          className="btn btn-sm bg-primary text-white"
        >
          <LuPlus className="size-4 me-1" />
          Add Class
        </button>
      </div>

      {/* FILTERS */}
      <div className="card-header grid grid-cols-1 md:grid-cols-4 gap-3">

        {/* SEARCH */}
        <div className="relative">
          <LuSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            className="form-input ps-9"
            placeholder="Search class..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* SCHOOL SELECT */}
        <Select
          options={schoolOptions}
          placeholder="Filter by school"
          isClearable
          onChange={(val: any) => {
            setPage(1);
            setSchoolId(val?.value || "");
          }}
        />

        {/* GRADE SELECT */}
        <Select
          options={gradeOptions}
          placeholder="Filter by grade"
          isClearable
          onChange={(val: any) => {
            setPage(1);
            setGradeId(val?.value || "");
          }}
        />

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        {loading && (
          <div className="p-6 text-center">
            <LuLoader className="animate-spin inline text-xl" />
          </div>
        )}

        {!loading && classes.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No classes found
          </p>
        )}

        {!loading && classes.length > 0 && (
          <table className="min-w-full text-sm">
            <thead className="bg-default-150 text-left">
              <tr>
                <th className="p-3">Class</th>
                <th className="p-3">Grade</th>
                <th className="p-3">School</th>
                <th className="p-3">Students</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((c: any) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{c.name}</td>

                  <td className="p-3">{c.grade?.name || "-"}</td>

                  <td className="p-3">{c.school?.name || "-"}</td>

                  {/* ✅ FIX COUNT */}
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {c._count?.enrollments || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="card-footer flex justify-between items-center">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <b>{((meta.page || 1) - 1) * limit + 1}</b> to{" "}
          <b>{Math.min((meta.page || 1) * limit, meta.total || 0)}</b> of{" "}
          <b>{meta.total || 0}</b>
        </p>

        <div className="flex gap-2">

          <button
            className="btn btn-sm border"
            disabled={(meta.page || 1) <= 1}
            onClick={() => setPage((meta.page || 1) - 1)}
          >
            <LuChevronLeft /> Prev
          </button>

          <button
            className="btn btn-sm border"
            disabled={(meta.page || 1) >= (meta.lastPage || 1)}
            onClick={() => setPage((meta.page || 1) + 1)}
          >
            Next <LuChevronRight />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ClassList;