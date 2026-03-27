import { getDistricts } from "@/services/district.service";
import { Link } from 'react-router';
import { useNavigate } from "react-router-dom";
import {
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
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

type District = {
  id: number;
  name: string;
  directorate: {
    name: string;
    region: {
      name: string;
    };
  };
  _count: {
    clusters: number;
  };
};

const DistrictListTabel = () => {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getDistricts();

        console.log("DISTRICTS:", data);

        setDistricts(data); // ✅ ici c’est direct
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          "Erreur lors du chargement"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">All Districts</h6>
        <button onClick={() => navigate("/admin/districts/create")} className="btn btn-sm bg-primary text-white">
          <LuPlus className="size-4 me-1" />
          Add District
        </button>
      </div>

      <div className="card-header">
        <div className="md:flex items-center md:space-y-0 space-y-4 gap-3">
          <div className="relative">
            <input
              type="email"
              className="form-input form-input-sm ps-9"
              placeholder="Search for name,email"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
              <LuSearch className="size-3.5 flex items-center text-default-500 fill-default-100" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center flex-wrap">

          <button
            type="button"
            className="btn btn-sm size-7.5 bg-default-100 text-default-500 hover:bg-default-1500  hover:text-white"
          >
            <LuSlidersHorizontal className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">

        {/* LOADING */}
        {loading && <span className="p-4 text-danger font-medium text-center"><LuLoader className="animate-spin" /> Loading...</span>}

        {/* ERROR */}
        {error && <p className="py-1 px-4 mb-4 external-event fc-event font-medium bg-danger/10 text-danger rounded" data-class="!text-danger">{error}</p>}


        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">


              <table className="min-w-full divide-y divide-default-200">
                <thead className="bg-default-150">
                  <tr className="text-sm font-normal text-default-700 whitespace-nowrap">
                    <th className="px-3.5 py-3 text-start">District</th>
                    <th className="px-3.5 py-3 text-start">Directorate</th>
                    <th className="px-3.5 py-3 text-start">Region</th>
                    <th className="px-3.5 py-3 text-start">Clusters</th>
                    <th className="px-3.5 py-3 text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {districts.map(dis => (
                    <tr
                      key={dis.id}
                      className="text-default-800 font-normal text-sm whitespace-nowrap"
                    >
                      <td className="py-3 px-3.5">{dis.name}</td>
                      <td className="py-3 px-3.5">{dis.directorate?.name}</td>
                      <td className="py-3 px-3.5">{dis.directorate?.region?.name}</td>
                      <td className="py-3 px-3.5">

                        {dis._count?.clusters !== 0 && (
                          <span className="py-0.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium bg-success/10 text-success rounded">
                            <LuCircleCheck className="size-3" />
                            {dis._count?.clusters}
                          </span>
                        )}
                        {dis._count?.clusters === 0 && (
                          <span className="py-0.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium bg-default-200 text-default-600 rounded">
                            <LuLoader className="size-3" />
                            None
                          </span>
                        )}
                      </td>
                      <td className="px-3.5 py-3">
                        <div className="hs-dropdown relative inline-flex">
                          <button
                            type="button"
                            className="hs-dropdown-toggle btn size-7.5 bg-default-200 hover:bg-default-600 text-default-500"
                          >
                            <LuEllipsis className="size-4" />
                          </button>
                          <div className="hs-dropdown-menu" role="menu">
                            <Link
                              to="#"
                              className="flex items-center gap-1.5 py-1.5 px-3 text-default-500 hover:bg-default-150 rounded"
                            >
                              <LuEye className="size-3" /> Overview
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center gap-1.5 py-1.5 px-3 text-default-500 hover:bg-default-150 rounded"
                            >
                              <LuSquarePen className="size-3" /> Edit
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center gap-1.5 py-1.5 px-3 text-default-500 hover:bg-default-150 rounded"
                            >
                              <LuTrash2 className="size-3" /> Delete
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

          {/* EMPTY */}
          {!loading && districts.length === 0 && (
            <p className="p-4 text-center">Aucun district trouvé</p>
          )}
        </div>
        <div className="card-footer">
          <p className="text-default-500 text-sm">
            Showing <b>{districts.length}</b> of <b>{districts.length}</b> Results
          </p>
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <button
              type="button"
              className="btn btn-sm border bg-transparent border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"
            >
              <LuChevronLeft className="size-4 me-1" /> Prev
            </button>

            <button
              type="button"
              className="btn size-7.5 bg-transparent border border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"
            >
              1
            </button>

            <button type="button" className="btn size-7.5 bg-primary text-white">
              2
            </button>

            <button
              type="button"
              className="btn size-7.5 bg-transparent border border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"
            >
              3
            </button>

            <button
              type="button"
              className="btn btn-sm border bg-transparent border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"
            >
              Next
              <LuChevronRight className="size-4 ms-1" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DistrictListTabel;
