import { getClusters } from "@/services/cluster.service";
import { Link, useNavigate } from 'react-router';
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

type Cluster = {
  id: number;
  name: string;
  district: {
    name: string;
    directorate: {
      name: string;
      region: {
        name: string;
      };
    };
  };
  _count: {
    schools: number;
  };
};

const ClusterListTabel = () => {
  const navigate = useNavigate();
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [regionId, setRegionId] = useState("");
  const [directorateId, setDirectorateId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [meta, setMeta] = useState<any>({});
  const [page, setPage] = useState(1);
  const limit = 10;


  useEffect(() => {
    const fetchClusters = async () => {
      setLoading(true);

      try {
        const res = await getClusters({
          page,
          limit,
          search,
          regionId,
          directorateId,
          districtId,
        });

        // console.log("CLUSTERS:", res);
        setClusters(res.data); // ✅ tableau
        setMeta(res.meta);     // ✅ pagination

      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          "Error loading clusters"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();

  }, [page, search, regionId, directorateId, districtId]);

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">List</h6>
        <button onClick={() => navigate("/admin/clusters/create")} className="btn btn-sm bg-primary text-white">
          <LuPlus className="size-4 me-1" />
          Add Cluster
        </button>
      </div>

      <div className="card-header">
        <div className="md:flex items-center md:space-y-0 space-y-4 gap-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setPage(1); // reset pagination
                setSearch(e.target.value);
              }}
              className="form-input form-input-sm ps-9"
              placeholder="Search for Clusters, Districts, Directorates and Regions"
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

        {loading && <span className="p-4 text-danger font-medium text-center"><LuLoader className="animate-spin" /> Loading...</span>}

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">


              <table className="min-w-full divide-y divide-default-200">
                <thead className="bg-default-150">
                  <tr className="text-sm font-normal text-default-700 whitespace-nowrap">
                    <th className="px-3.5 py-3 text-start">Cluster</th>
                    <th className="px-3.5 py-3 text-start">District</th>
                    <th className="px-3.5 py-3 text-start">Directorate</th>
                    <th className="px-3.5 py-3 text-start">Region</th>
                    <th className="px-3.5 py-3 text-start">Schools</th>
                    <th className="px-3.5 py-3 text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clusters.map(cl => (
                    <tr
                      key={cl.id}
                      className="text-default-800 font-normal text-sm whitespace-nowrap"
                    >
                      <td className="py-3 px-3.5  text-primary">{cl.name}</td>
                      <td className="py-3 px-3.5">{cl.district?.name}</td>
                      <td className="py-3 px-3.5">{cl.district?.directorate?.name}</td>
                      <td className="py-3 px-3.5">{cl.district?.directorate?.region?.name}</td>
                      <td className="py-3 px-3.5">
                        {cl._count?.schools !== 0 && (
                          <span className="py-0.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium bg-success/10 text-success rounded">
                            <LuCircleCheck className="size-3" />
                            {cl._count?.schools}
                          </span>
                        )}
                        {cl._count?.schools === 0 && (
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
          {!loading && clusters.length === 0 && (
            <p className="p-4 text-center">No DATA</p>
          )}
        </div>

        <div className="card-footer">
          {/* INFO */}
          <p className="text-default-500 text-sm">
            Showing{" "}
            <b>
              {(meta.page - 1) * limit + 1}
            </b>{" "}
            to{" "}
            <b>
              {Math.min(meta.page * limit, meta.total || 0)}
            </b>{" "}
            of <b>{meta.total || 0}</b> Results
          </p>
          {/* PAGINATION */}
          <nav className="flex items-center gap-2" aria-label="Pagination">
            {/* PREV */}
            <button
              disabled={meta.page === 1}
              onClick={() => setPage(meta.page - 1)}
              type="button"
              className="btn btn-sm border bg-transparent border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"
            >
              <LuChevronLeft className="size-4 me-1" /> Prev
            </button>

            {/* <button
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
            </button> */}
            {/* PAGES */}
            {Array.from({ length: meta.lastPage || 1 }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`btn size-7.5 ${meta.page === p
                    ? "bg-primary text-white"
                    : "border"
                  }`}
              >
                {p}
              </button>
            ))}
            {/* NEXT */}
            <button
              disabled={meta.page === meta.lastPage}
              onClick={() => setPage(meta.page + 1)}
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

export default ClusterListTabel;
