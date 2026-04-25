/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  LuLoader,
  LuUser,
  LuSchool,
  LuBookOpen,
  LuPhone,
  LuMapPin,
  LuBadgeCheck,
} from "react-icons/lu";

import { getStudentById, type Student } from "@/services/student.service";

const StudentDetail = () => {
  const { id } = useParams();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err: any) {
        toast.error(err?.message || "Failed to load student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <LuLoader className="animate-spin size-6 text-primary" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6 text-red-500">
        Student not found
      </div>
    );
  }

  const enrollment = student.enrollments?.[0];

  const parentActions = [
  {
    label: "Call Parent",
    icon: "phone",
    action: () => window.location.href = `tel:${student.contact}`
  },
  {
    label: "WhatsApp",
    icon: "whatsapp",
    action: () =>
      window.open(`https://wa.me/${student.contact}`)
  },
  {
    label: "Send SMS",
    icon: "sms",
    action: () => sendSMS(student.contact)
  },
];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="card p-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-default-900">
            {student.firstName} {student.lastName}
          </h2>

          <p className="text-sm text-default-500 mt-1">
            ID: {student.id}
          </p>

          {/* SCHOOL BADGE */}
          <div className="flex items-center gap-2 mt-3">
            <LuSchool className="size-4 text-primary" />
            <span className="text-sm font-medium text-default-700">
              {student.user?.school?.name || "No School Assigned"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
              student.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <LuBadgeCheck className="size-3" />
            {student.status}
          </span>

          <span className="text-xs text-default-500">
            Created:{" "}
            {new Date(student.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* PERSONAL */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2 text-default-800">
            <LuUser className="text-primary" />
            Personal Info
          </h3>

          <div className="space-y-1 text-sm text-default-600">
            <p><b>Gender:</b> {student.gender}</p>
            <p>
              <b>DOB:</b>{" "}
              {new Date(student.dateOfBirth).toLocaleDateString()}
            </p>
            <p><b>Nationality:</b> {student.nationality}</p>
            <p><b>Religion:</b> {student.religion || "-"}</p>
          </div>
        </div>

        {/* ACADEMIC */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2 text-default-800">
            <LuSchool className="text-primary" />
            Academic Info
          </h3>

          <div className="space-y-1 text-sm text-default-600">
            <p><b>School:</b> {student.user?.school?.name}</p>
            <p><b>Class:</b> {enrollment?.class?.name || "-"}</p>
            <p><b>Grade:</b> {enrollment?.class?.grade?.name || "-"}</p>
            <p>
              <b>Academic Year:</b>{" "}
              {enrollment?.academicYear?.name || "-"}
            </p>
          </div>
        </div>

        {/* CONTACT */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2 text-default-800">
            <LuPhone className="text-primary" />
            Parent Info
          </h3>

          <div className="space-y-1 text-sm text-default-600">
            <p><b>Parent:</b> {student.parentName}</p>
            <p><b>Contact:</b> {student.contact}</p>
            <p className="flex items-center gap-2">
              <LuMapPin className="size-4" />
              {student.address}
            </p>
          </div>
        </div>
      </div>

      {/* ENROLLMENT HISTORY */}
      <div className="card p-5">
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <LuBookOpen className="text-primary" />
          Enrollment History
        </h3>

        {student.enrollments?.length ? (
          <div className="space-y-3">
            {student.enrollments.map((e: any) => (
              <div
                key={e.id}
                className="flex justify-between items-center border rounded-lg p-3 hover:bg-default-50 transition"
              >
                <div>
                  <p className="font-semibold text-default-800">
                    {e.class?.name}
                  </p>
                  <p className="text-xs text-default-500">
                    Grade: {e.class?.grade?.name}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                  {e.academicYear?.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-default-500">
            No enrollment history
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <button className="btn border">Edit</button>
        <button className="btn bg-warning text-white">
          Change Class
        </button>
        <button className="btn bg-danger text-white">
          Suspend
        </button>
      </div>
    </div>
  );
};

export default StudentDetail;

function sendSMS(contact: string) {
  throw new Error("Function not implemented.");
}
