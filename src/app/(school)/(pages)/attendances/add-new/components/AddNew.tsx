/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuLoader,
  LuSave,
  LuRefreshCcw,
} from "react-icons/lu";

import { getStudentsBySession } from "@/services/student.service";

import {
  createAttendance,
} from "@/services/attendance.service";

const statusOptions = [
  {
    value: "PRESENT",
    label: "Present",
  },
  {
    value: "ABSENT",
    label: "Absent",
  },
  {
    value: "LATE",
    label: "Late",
  },
  {
    value: "EXCUSED",
    label: "Excused",
  },
];

const CreateAttendance = () => {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const sessionId =
    searchParams.get("sessionId") || "";

  const [loading, setLoading] =
    useState(false);

  const [students, setStudents] =
    useState<any[]>([]);

  const [records, setRecords] =
    useState<any[]>([]);

  // 🔥 LOAD STUDENTS
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data =
          await getStudentsBySession(
            sessionId
          );

        setStudents(data || []);

        setRecords(
          data.map((s: any) => ({
            studentId: s.id,
            status: "PRESENT",
            remarks: "",
          }))
        );
      } catch {
        toast.error(
          "Error loading students"
        );
      }
    };

    if (sessionId) {
      loadStudents();
    }
  }, [sessionId]);

  // 🔥 UPDATE STATUS
  const updateRecord = (
    studentId: string,
    field: string,
    value: any
  ) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.studentId === studentId
          ? {
              ...r,
              [field]: value,
            }
          : r
      )
    );
  };

  // 🔥 SUBMIT
  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createAttendance({
        lessonSessionId: sessionId,
        records,
      });

      toast.success(
        "Attendance marked successfully"
      );

      navigate(
        `/school/attendances?sessionId=${sessionId}`
      );
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Error marking attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <h2 className="card-title">
          Mark Attendance
        </h2>
      </div>

      {/* BODY */}
      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="space-y-4">

            {students.map((student) => {
              const record =
                records.find(
                  (r) =>
                    r.studentId ===
                    student.id
                );

              return (
                <div
                  key={student.id}
                  className="border rounded-xl p-4 bg-white"
                >

                  <div className="grid lg:grid-cols-3 gap-4">

                    {/* STUDENT */}
                    <div>
                      <label className="block text-sm text-default-500 mb-1">
                        Student
                      </label>

                      <div className="font-semibold">
                        {student.firstName}{" "}
                        {student.lastName}
                      </div>
                    </div>

                    {/* STATUS */}
                    <div>
                      <label className="block text-sm text-default-500 mb-1">
                        Status
                      </label>

                      <Select
                        options={
                          statusOptions
                        }
                        value={statusOptions.find(
                          (s) =>
                            s.value ===
                            record?.status
                        )}
                        onChange={(
                          selected: any
                        ) =>
                          updateRecord(
                            student.id,
                            "status",
                            selected.value
                          )
                        }
                      />
                    </div>

                    {/* REMARK */}
                    <div>
                      <label className="block text-sm text-default-500 mb-1">
                        Remarks
                      </label>

                      <input
                        type="text"
                        className="form-input"
                        placeholder="Remarks..."
                        value={
                          record?.remarks
                        }
                        onChange={(e) =>
                          updateRecord(
                            student.id,
                            "remarks",
                            e.target.value
                          )
                        }
                      />
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              className="btn border"
            >
              <LuRefreshCcw className="me-1" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >

              {loading ? (
                <LuLoader className="animate-spin me-1" />
              ) : (
                <LuSave className="me-1" />
              )}

              Save Attendance

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateAttendance;