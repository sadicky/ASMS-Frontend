/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router';
import {
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuEye,
  LuHeart,
  LuLoader,
  LuPlus,
  LuSearch,
  // LuSlidersHorizontal,
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
          onClick={() => navigate("/admin/school/create")}
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

           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {schools.map((school, index) => (
                  <div key={index} className="card">
                    <div className="card-body">
                      <div className="flex justify-between gap-5 items-center mb-4">
                        <div className="hs-dropdown relative inline-flex">
                          <button
                            type="button"
                            className="hs-dropdown-toggle btn size-7.5 bg-default-200 hover:bg-default-600 text-default-500 hover:text-white"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                            hs-dropdown-placement="bottom-end"
                          >
                            <LuEllipsis className="size-4" />
                          </button>
                          <div className="hs-dropdown-menu" role="menu">
                            <Link
                              className="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded"
                               to={`/admin/school/${school.id}`}
                            >
                              <LuEye className="size-3" />
                              Overview
                            </Link>
                            <Link
                              className="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded"
                              to="#"
                            >
                              <LuSquarePen className="size-3" />
                              Edit
                            </Link>
                            <Link
                              className="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded"
                              to="#"
                            >
                              <LuTrash2 className="size-3" />
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
          
                      <div className="flex items-center justify-center mx-auto rounded-full size-16 bg-default-100 outline outline-default-100 outline-offset-4">
                        {/* <IconifyIcon icon={seller.iconifyIcon} width="40" height="40" /> */}
                      </div>
          
                      <div className="mt-4 mb-6 text-center">
                        <h6 className="text-base text-default-800 font-semibold">
                           <Link
                              to={`/admin/school/${school.id}`}
                              className="flex items-center gap-2 text-primary hover:text-blue-700 hover:underline transition"
                            >
                              {school.name}
                            </Link>
                          </h6>
                        <p className="text-default-500 text-sm">{school.type}</p>
                      </div>
          
                      <div className="grid grid-cols-2">
                        <div className="text-center p-2 text-sm">
                          <h6 className="mb-1 text-default-800 font-semibold">Licence</h6>
                          <p className="text-default-500">  {school.licenses?.length > 0
                      ? <span className="text-green-600">Active</span>
                      : <span className="text-red-500">No License</span>
                    }</p>
                        </div>
          
                        <div className="text-center p-2 border-e border-s border-dashed border-default-200 text-sm">
                          <h6 className="mb-1 text-default-800 font-semibold"> Accreditation
                       </h6>
                          <p className="text-default-500">
                                 {school.accredited
                      ? <span className="text-green-600">Accredited</span>
                      : <span className="text-yellow-500">Pending</span>
                    }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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