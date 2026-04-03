import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getLicensesBySchool } from "@/services/licence.service";

import {
  LuSquarePen,
  LuRefreshCcw,
  LuBan,
  LuLoader,
} from "react-icons/lu";

const LicenseList = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const schoolId = params.get("schoolId");

  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schoolId) return;

    getLicensesBySchool(schoolId)
      .then(setLicenses)
      .catch(() => toast.error("Failed to load licenses"))
      .finally(() => setLoading(false));
  }, [schoolId]);

  if (loading) return <p><LuLoader className="animate-spin inline" /> Loading...</p>;

  return (
    <div className="card">
      <div className="card-body">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Licenses</h2>

          <button
            onClick={() =>
              navigate(`/admin/licenses/create?schoolId=${schoolId}`)
            }
            className="btn bg-primary text-white"
          >
            + Add License
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Plan</th>
                <th>Key</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {licenses.map((l) => (
                <tr key={l.id} className="border-b">

                  <td className="py-2 font-medium">{l.plan}</td>

                  <td>{l.licenseKey}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        l.status === "ACTIVE"
                          ? "bg-green-100 text-green-600"
                          : l.status === "EXPIRED"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>

                  <td>
                    {new Date(l.issuedAt).toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(l.expiresAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-2">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        navigate(`/admin/licenses/edit/${l.id}`)
                      }
                      className="btn size-8 bg-blue-100"
                    >
                      <LuSquarePen />
                    </button>

                    {/* RENEW */}
                    <button
                      onClick={() =>
                        navigate(`/admin/licenses/create?schoolId=${schoolId}`)
                      }
                      className="btn size-8 bg-green-100"
                    >
                      <LuRefreshCcw />
                    </button>

                    {/* SUSPEND */}
                    <button
                      onClick={() => handleSuspend(l.id)}
                      className="btn size-8 bg-red-100"
                    >
                      <LuBan />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );

  // 🔥 SUSPEND LICENSE
  async function handleSuspend(id: string) {
    try {
      // appel API update
      await fetch(`/licenses/school/edit/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "SUSPENDED" }),
      });

      toast.success("License suspended");

      // refresh
      setLicenses((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "SUSPENDED" } : l
        )
      );
    } catch {
      toast.error("Error");
    }
  }
};

export default LicenseList;