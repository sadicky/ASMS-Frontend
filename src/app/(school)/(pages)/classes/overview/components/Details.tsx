import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassById } from "@/services/classe.service";

import {
  LuArrowLeft,
  LuUsers,
  LuSchool,
  LuBookOpen,
  LuPlus,
  LuTrash2,
  LuSquarePen,
} from "react-icons/lu";

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getClassById(id!);
        setClassData(res);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!classData) {
    return <div className="p-4">Class not found</div>;
  }

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <button
          onClick={() => navigate(-1)}
          className="btn border"
        >
          <LuArrowLeft className="me-1" />
          Back
        </button>

        <div className="flex gap-2">
          <button className="btn border">
            <LuSquarePen className="me-1" />
            Edit
          </button>

          <button className="btn bg-primary text-white">
            <LuPlus className="me-1" />
            Add Students
          </button>
        </div>
      </div>

      {/* CLASS INFO CARD */}
      <div className="card p-5">

        <h2 className="text-xl font-bold mb-3">
          {classData.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

          <div className="flex items-center gap-2">
            <LuBookOpen />
            <span>Grade: {classData.grade?.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <LuSchool />
            <span>School: {classData.school?.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <LuUsers />
            <span>
              Students: {classData._count?.students || 0}
            </span>
          </div>

        </div>
      </div>

      {/* STUDENTS LIST */}
      <div className="card">

        <div className="card-header">
          <h3 className="card-title">Students</h3>
        </div>

        <div className="overflow-x-auto">

          {classData.students?.length === 0 ? (
            <p className="p-4 text-center">No students yet</p>
          ) : (
            <table className="min-w-full">
              <thead className="bg-default-150">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {classData.students?.map((student: any) => (
                  <tr key={student.id} className="border-b">

                    <td className="p-3">
                      {student.firstName} {student.lastName}
                    </td>

                    <td className="p-3 flex gap-2">

                      <button className="btn btn-sm border">
                        View
                      </button>

                      <button className="btn btn-sm border text-danger">
                        <LuTrash2 />
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>

    </div>
  );
};

export default ClassDetail;