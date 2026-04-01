import { Link, useNavigate } from 'react-router';
import {
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuEye,
  LuLoader,
  LuPlus,
  LuSearch,
  LuSlidersHorizontal,
  LuSquarePen,
  LuTrash2,
} from 'react-icons/lu';
import { useEffect, useState } from "react";
import { getSchools } from "@/services/school.service";
import { toast } from "react-hot-toast";

const SchoolListTabel = () => {

  const navigate = useNavigate();

  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<any>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  // ✅ CORRECT useEffect
  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);

      try {
        const res = await getSchools({
          page,
          limit,
          search
        });

        setSchools(res.data);
        setMeta(res.meta);

      } catch (err: any) {
        toast.error("Error loading School");
        setError(
          err.response?.data?.message ||
          "Error loading School"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [page, search]);

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <h6 className="card-title">Schools List</h6>
        <button
          onClick={() => navigate("/admin/schools/add-new")}
          className="btn btn-sm bg-primary text-white"
        >
          <LuPlus className="size-4 me-1" />
          Add School
        </button>
      </div>

      {/* SEARCH */}
      <div className="card-header">
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="form-input form-input-sm ps-9"
              placeholder="Search schools..."
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
              <LuSearch className="size-3.5 text-default-500" />
            </div>
          </div>

          <button className="btn btn-sm bg-default-100">
            <LuSlidersHorizontal />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col">

        {loading && (
          <div className="p-4 text-center">
            <LuLoader className="animate-spin inline" /> Loading...
          </div>
        )}

        {error && <p className="text-red-500 p-4">{error}</p>}

        <div className="overflow-x-auto">
            
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-default-200">
            <thead className="bg-default-150">
              <tr className="text-sm font-normal text-default-700 whitespace-nowrap">
                <th className="px-3.5 py-3 text-start">Name</th>
                <th className="px-3.5 py-3 text-start">Type</th>
                <th className="px-3.5 py-3 text-start">Category</th>
                <th className="px-3.5 py-3 text-start">Cluster</th>
                <th className="px-3.5 py-3 text-start">License</th>
                <th className="px-3.5 py-3 text-start">Status</th>
                <th className="px-3.5 py-3 text-start">Action</th>
              </tr>
            </thead>

            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="text-default-800 font-normal text-sm whitespace-nowrap">
                  <td className="px-3.5 py-3">{school.name}</td>
                  <td className="px-3.5 py-3">{school.type}</td>
                  <td className="px-3.5 py-3">{school.category}</td>
                  <td className="px-3.5 py-3">{school.cluster?.name}</td>

                  <td className="px-3.5 py-3">
                    {school.licenses?.length > 0
                      ? <span className="text-green-600">Active</span>
                      : <span className="text-red-500">No License</span>
                    }
                  </td>

                  <td className="px-3.5 py-3">
                    {school.accredited
                      ? <span className="text-green-600">Accredited</span>
                      : <span className="text-yellow-500">Pending</span>
                    }
                  </td>

                  <td className="px-3.5 py-3">
                    <div className="hs-dropdown">
                      <button className="btn size-7.5 bg-default-200">
                        <LuEllipsis />
                      </button>

                      <div className="hs-dropdown-menu">
                        <Link to={`/admin/schools/${school.id}`}>
                          <LuEye /> View
                        </Link>
                        <Link to="#">
                          <LuSquarePen /> Edit
                        </Link>
                        <Link to="#">
                          <LuTrash2 /> Delete
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        </div>
          {!loading && schools.length === 0 && (
            <p className="p-4 text-center">No Schools Found</p>
          )}
        </div>

        {/* PAGINATION */}
        <div className="card-footer">

          <p className="text-sm">
            Showing{" "}
            <b>{meta.page ? (meta.page - 1) * limit + 1 : 0}</b> to{" "}
            <b>{meta.page ? Math.min(meta.page * limit, meta.total || 0) : 0}</b>{" "}
            of <b>{meta.total || 0}</b>
          </p>

          <div className="flex gap-2">

            <button
              disabled={meta.page <= 1}
              onClick={() => setPage(meta.page - 1)}
              className="btn btn-sm border"
            >
              <LuChevronLeft /> Prev
            </button>

            {Array.from({ length: meta.lastPage || 1 }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`btn ${meta.page === p ? "bg-primary text-white" : "border"}`}
              >
                {p}
              </button>
            ))}

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
    </div>
  );
};

export default SchoolListTabel;