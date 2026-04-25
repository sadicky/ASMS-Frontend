import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuSearch,
  LuLoader,
  LuEye,
  LuPlus,
} from "react-icons/lu";

import { getMyStaffs } from "@/services/staff.service";
import { getMyClasses } from "@/services/classe.service";

const StaffList = () => {
  const navigate = useNavigate();

  const [staffs, setStaffs] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [classId, setClassId] = useState("");

  // ================= LOAD CLASSES =================
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyClasses();
        setClasses(Array.isArray(res) ? res : []);
      } catch {
        toast.error("Error loading classes");
      }
    };
    load();
  }, []);

  // ================= LOAD STAFF =================
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const res = await getMyStaffs();

        setStaffs(res);
        setFiltered(res);
      } catch (err: any) {
        toast.error(err?.message || "Error loading staff");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ================= FILTER =================
  useEffect(() => {
    let data = [...staffs];

    if (search) {
      data = data.filter((s) =>
        `${s.firstName} ${s.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (classId) {
      data = data.filter((s) =>
        s.teacherProfile?.classId === classId ||
        s.teacherAssignments?.some((a: any) => a.classId === classId)
      );
    }

    setFiltered(data);
  }, [search, classId, staffs]);

  // ================= CLASS OPTIONS =================
  const classOptions = [
    { value: "", label: "All Classes" },
    ...classes.map((c: any) => ({
      value: c.id,
      label: `${c.name} (${c.grade?.name || "-"})`,
    })),
  ];

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <h2 className="card-title">Staff Management</h2>
        <button onClick={() => navigate("/school/staff/create")} className="btn btn-sm bg-primary text-white">
          <LuPlus className="size-4 me-1" />
          Add User
        </button>
      </div>

      {/* FILTERS */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* SEARCH */}
        <div className="relative">
          <input
            className="form-input ps-9"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <LuSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* CLASS */}
        <Select
          options={classOptions}
          placeholder="Filter by class"
          value={classOptions.find((o) => o.value === classId) || null}
          onChange={(val: any) => setClassId(val?.value || "")}
          isClearable
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        {loading && (
          <div className="p-6 text-center">
            <LuLoader className="animate-spin inline-block text-xl" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No staff found
          </p>
        )}

        {!loading && filtered.length > 0 && (
          <table className="min-w-full text-sm">

            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Classes</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => {

                const roles =
                  s.user?.roles?.map((r: any) => r.role?.name).join(", ") ||
                  "STAFF";

                const assignedClasses =
                  s.teacherAssignments?.map((a: any) => a.class?.name).join(", ") ||
                  s.teacherProfile?.class?.name ||
                  "-";

                return (
                  <tr key={s.id} className="border-b hover:bg-gray-50">

                    <td className="p-3 font-medium">
                      {s.firstName} {s.lastName}
                    </td>

                    <td>{s.user?.email}</td>

                    <td>{roles}</td>

                    <td>{assignedClasses}</td>

                    <td>
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                        {s.status}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => navigate(`/school/staffs/${s.id}`)}
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
    </div>
  );
};

export default StaffList;