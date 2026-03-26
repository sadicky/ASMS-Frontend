import { getClusters } from "@/services/cluster.service";
import { Link } from 'react-router';
import {
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuEye,
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
 const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClusters = async () => {
      setLoading(true);

      try {
        const data = await getClusters();

        console.log("CLUSTERS:", data);

        setClusters(data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          "Erreur lors du chargement des clusters"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">List</h6>
        <button className="btn btn-sm bg-primary text-white">
          <LuPlus className="size-4 me-1" />
          Add Cluster
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
        
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">


              <table className="min-w-full divide-y divide-default-200">
                <thead className="bg-default-150">
                  <tr className="text-sm font-normal text-default-700 whitespace-nowrap">
                    <th className="px-3.5 py-3 text-start">ID</th>
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
                      <td className="px-3.5 py-3 text-primary">{cl.id}</td>
                    <td className="py-3 px-3.5">{cl.name}</td>
                    <td className="py-3 px-3.5">{cl.district?.name}</td>
                    <td className="py-3 px-3.5">{cl.district?.directorate?.name}</td>
                    <td className="py-3 px-3.5">{cl.district?.directorate?.region?.name}</td>
                    <td className="py-3 px-3.5">{cl._count?.schools}</td>
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
          <p className="text-default-500 text-sm">
            Showing <b>10</b> of <b>58</b> Results
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

export default ClusterListTabel;
