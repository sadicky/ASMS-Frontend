import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  LuEllipsis,
  LuSquarePen,
  LuTrash2,
  LuSchool,
  LuMapPin,
  LuUsers,
  LuBookOpen,
  LuCreditCard,
  LuShieldCheck,
  LuLoader,
} from "react-icons/lu";

import { getSchoolById } from "@/services/school.service";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getSchoolById(id)
      .then((res) => setSchool(res))
      .catch(() => toast.error("Failed to load school"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p><LuLoader className="animate-spin inline" /> Loading...</p>;
  if (!school) return <p>No school found</p>;

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-primary/10 text-primary">
          School Details
        </span>

        {/* ACTION MENU */}
        <div className="hs-dropdown relative inline-flex">
          <button className="hs-dropdown-toggle btn size-7.5 bg-default-200">
            <LuEllipsis />
          </button>

          <div className="hs-dropdown-menu">
            <Link
              to={`/admin/school/edit/${school.id}`}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
            >
              <LuSquarePen /> Edit
            </Link>

            <button
              onClick={() => alert("Delete logic")}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
            >
              <LuTrash2 /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h5 className="mt-3 mb-1 text-xl font-semibold flex items-center gap-2">
        <LuSchool /> {school.name}
      </h5>

      {/* META */}
      <ul className="flex flex-wrap text-sm gap-4 mb-5 text-gray-500">
        <li>
          Category: <strong>{school.category || "-"}</strong>
        </li>
        <li>
          Type: <strong>{school.type || "-"}</strong>
        </li>
        <li>
          Created:{" "}
          <strong>
            {new Date(school.createdAt).toLocaleDateString()}
          </strong>
        </li>
      </ul>

      {/* STATUS */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`px-3 py-1 rounded text-sm ${
            school.accredited
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {school.accredited ? "Accredited" : "Not Accredited"}
        </div>

        <div
          className={`px-3 py-1 rounded text-sm ${
            school.licenses?.[0]?.isActive
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {school.licenses?.[0]?.isActive
            ? "License Active"
            : "No License"}
        </div>
      </div>

      {/* LOCATION */}
      <div className="mb-5">
        <h6 className="mb-2 font-semibold flex items-center gap-2">
          <LuMapPin /> Location
        </h6>

        <p className="text-sm text-gray-600">
          {school.cluster?.district?.directorate?.region?.name} →
          {school.cluster?.district?.directorate?.name} →
          {school.cluster?.district?.name} →
          {school.cluster?.name}
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid lg:grid-cols-4 gap-3 my-5">
        
        <button
          onClick={() =>
            navigate(`/admin/licenses/create?schoolId=${school.id}`)
          }
          className="p-4 border rounded hover:bg-gray-50"
        >
          <LuCreditCard className="mb-2" />
          License
        </button>

        <button
          onClick={() =>
            navigate(`/admin/users/create?schoolId=${school.id}`)
          }
          className="p-4 border rounded hover:bg-gray-50"
        >
          <LuShieldCheck className="mb-2" />
          Admin
        </button>

        <button
          onClick={() =>
            navigate(`/admin/teachers?schoolId=${school.id}`)
          }
          className="p-4 border rounded hover:bg-gray-50"
        >
          <LuUsers className="mb-2" />
          Teachers
        </button>

        <button
          onClick={() =>
            navigate(`/admin/students?schoolId=${school.id}`)
          }
          className="p-4 border rounded hover:bg-gray-50"
        >
          <LuBookOpen className="mb-2" />
          Students
        </button>

      </div>

      {/* LICENSE DETAILS */}
      <div className="mt-5">
        <h6 className="mb-3 font-semibold">License Details</h6>

        {school.licenses?.length ? (
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <th className="text-left py-2 text-gray-500">Plan</th>
                <td>{school.licenses[0].plan}</td>
              </tr>
              <tr>
                <th className="text-left py-2 text-gray-500">Start</th>
                <td>
                  {new Date(
                    school.licenses[0].startDate
                  ).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <th className="text-left py-2 text-gray-500">End</th>
                <td>
                  {new Date(
                    school.licenses[0].endDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">No license assigned</p>
        )}
      </div>
    </>
  );
};

export default Details;