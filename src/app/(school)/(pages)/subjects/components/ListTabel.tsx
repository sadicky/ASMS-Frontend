/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuPlus,
  LuSearch,
  LuTrash2,
  LuSquarePen,
} from "react-icons/lu";

import {
  getSubjects,
  deleteSubject,
  type Subject,
} from "@/services/subject.service";

const SubjectList = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filtered, setFiltered] = useState<Subject[]>([]);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // 🔥 LOAD SUBJECTS
  const loadSubjects = async () => {
    setLoading(true);

    try {
      const data = await getSubjects();

      setSubjects(data);
      setFiltered(data);
    } catch (err: any) {
      toast.error(err.message || "Error loading subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // 🔍 FILTER
  useEffect(() => {
    const q = search.toLowerCase();

    const result = subjects.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );

    setFiltered(result);
  }, [search, subjects]);

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this subject ?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteSubject(id);

      toast.success(res.message);

      loadSubjects();
    } catch (err: any) {
      toast.error(err.message || "Error deleting subject");
    }
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">
        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Subjects
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Manage all school subjects
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/school/subjects/create")
          }
          className="btn bg-primary text-white"
        >
          <LuPlus className="me-1" />
          Add Subject
        </button>
      </div>

      {/* FILTER */}
      <div className="card-header">
        <div className="relative max-w-md">
          <input
            type="text"
            className="form-input ps-10"
            placeholder="Search subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <LuSearch className="absolute left-3 top-3 text-default-400" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="card-body">

        {/* LOADING */}
        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin inline-block text-2xl" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-10">
            <h3 className="font-semibold text-lg">
              No subjects found
            </h3>

            <p className="text-default-500 text-sm">
              Start by creating a new subject
            </p>
          </div>
        )}

        {/* TABLE */}
        {!loading && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full">

              <thead className="bg-default-100">
                <tr>
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4 text-left">Code</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-b hover:bg-default-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {subject.name}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {subject.code}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">

                        <button
                          className="btn btn-sm border"
                        >
                          <LuSquarePen />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(subject.id)
                          }
                          className="btn btn-sm bg-danger text-white"
                        >
                          <LuTrash2 />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectList;