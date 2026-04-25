import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllLicenses } from "@/services/licence.service";

import {
    LuSquarePen,
    LuEye,
    LuLoader,
    LuPlus,
} from "react-icons/lu";

const AllLicenses = () => {
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
                    <h6 className="card-title">Licenses List</h6>
                    <button className="btn btn-sm bg-primary text-white"
                      onClick={() => navigate("/admin/licences/create")}>
                      <LuPlus className="size-4 me-1" />
                      Add License
                    </button>
                  </div>
            <div className="card-body">
                {/* ERROR */}
                {error && <p className="py-1 px-4 mb-4 external-event fc-event font-medium bg-danger/10 text-danger rounded" data-class="!text-danger">{error}</p>}


                {/* HEADER */}
                <h2 className="text-lg font-semibold mb-4">
                    All Licenses
                </h2>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-default-200">
                                <thead className="bg-default-150">
                                    <tr className="text-sm font-normal text-default-700 whitespace-nowrap">
                                        <th className="px-3.5 py-3 text-start">School</th>
                                        <th className="px-3.5 py-3 text-start">School</th>
                                        <th className="px-3.5 py-3 text-start">Plan</th>
                                        <th className="px-3.5 py-3 text-start">Status</th>
                                        <th className="px-3.5 py-3 text-start">Key</th>
                                        <th className="px-3.5 py-3 text-start">Start</th>
                                        <th className="px-3.5 py-3 text-start">End</th>
                                        <th className="px-3.5 py-3 text-start">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {licenses.map(l => (
                                        <tr
                                            key={l.id} className={l.isActive ? "bg-blue-50 border-b" : "border-b"}
                                        >
                                            <td className="py-3 px-3.5">{l.school.name}</td>

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

                                            {/* ACTIONS */}
                                            <td className="flex gap-2">

                                                {/* VIEW SCHOOL */}
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/school/${l.school.id}`)
                                                    }
                                                    className="btn size-8 bg-gray-100"
                                                >
                                                    <LuEye />
                                                </button>

                                                {/* EDIT LICENSE */}
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/licenses/edit/${l.id}`)
                                                    }
                                                    className="btn size-8 bg-blue-100"
                                                >
                                                    <LuSquarePen />
                                                </button>

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


                {/* EMPTY */}
                {licenses.length === 0 && (
                    <p className="text-center py-5 text-gray-500">
                        No licenses found
                    </p>
                )}

            </div>
        </div>
    );
};

export default AllLicenses;