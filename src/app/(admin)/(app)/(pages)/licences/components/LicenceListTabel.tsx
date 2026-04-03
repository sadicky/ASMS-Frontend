import { getRegions } from "@/services/region.service";
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
  LuSquarePen,
  LuTrash2,
} from 'react-icons/lu';
import { useEffect, useState } from "react";
import { getAllLicenses } from "@/services/licence.service";
import { toast } from "react-hot-toast";


const LicenceListTabel = () => {
  const navigate = useNavigate();

    const [licenses, setLicenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllLicenses()
            .then(setLicenses)
            .catch(() => toast.error("Failed to load licenses"))
            .finally(() => setLoading(false));
    }, []);

 if (loading) return <p><LuLoader className="animate-spin inline" /> Loading...</p>;


  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">Regions List</h6>
        <button className="btn btn-sm bg-primary text-white"
          onClick={() => navigate("/admin/regions/create")}>
          <LuPlus className="size-4 me-1" />
          Add Region
        </button>
      </div>

      <div className="card-header">
        <div className="md:flex items-center md:space-y-0 space-y-4 gap-3">
          <div className="relative">
            <input
              type="text"
              className="form-input form-input-sm ps-9"
              placeholder="Search for region"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
              <LuSearch className="size-3.5 flex items-center text-default-500 fill-default-100" />
            </div>
          </div>
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
                                        <th className="px-3.5 py-3 text-start">School</th>
                                        <th className="px-3.5 py-3 text-start">Plan</th>
                                        <th className="px-3.5 py-3 text-start">Status</th>
                                        <th className="px-3.5 py-3 text-start">Key</th>
                                        <th className="px-3.5 py-3 text-start">Start</th>
                                        <th className="px-3.5 py-3 text-start">End</th>
                  </tr>
                </thead>
                
                                <tbody>
                                    {licenses.map(l => (
                                        <tr
                                            key={l.id} className={l.isActive ? "bg-blue-50 border-b" : "border-b"}
                                        >
                                            {/* SCHOOL */}
                                            <td className="font-medium">
                                                <span
                                                    onClick={() =>
                                                        navigate(`/admin/school/${l.school.id}`)
                                                    }
                                                    className="cursor-pointer text-primary hover:underline"
                                                >
                                                    {l.school?.name}
                                                </span>
                                            </td>

                                            {/* PLAN */}
                                            <td>{l.plan}</td>

                                            {/* STATUS */}
                                            <td>
                                                <span
                                                    className={`px-2 py-1 rounded text-xs ${l.status === "ACTIVE"
                                                            ? "bg-green-100 text-green-600"
                                                            : l.status === "EXPIRED"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-yellow-100 text-yellow-600"
                                                        }`}
                                                >
                                                    {l.status}
                                                </span>
                                            </td>

                                            {/* KEY */}
                                            <td className="text-xs">{l.licenseKey}</td>

                                            {/* DATES */}
                                            <td>
                                                {new Date(l.issuedAt).toLocaleDateString()}
                                            </td>

                                            <td>
                                                {new Date(l.expiresAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
              </table>
            </div>
          </div>
          {/* EMPTY */}
          {!loading && licenses.length === 0 && (
            <p className="p-4 text-center">No Data</p>
          )}
        </div>

      
      </div>
    </div>
  );
};

export default LicenceListTabel;
