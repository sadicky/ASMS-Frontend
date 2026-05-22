/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  LuClipboardCheck,
  LuLoader,
  LuPlus,
  LuSearch,
} from "react-icons/lu";

import {
  getSessionAttendance,
} from "@/services/attendance.service";

const AttendanceList = () => {
  const [searchParams] = useSearchParams();

  const sessionId =
    searchParams.get("sessionId") || "";

  const [loading, setLoading] =
    useState(false);

  const [attendance, setAttendance] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  // 🔥 LOAD ATTENDANCE
  useEffect(() => {
    if (!sessionId) return;

    const loadAttendance = async () => {
      setLoading(true);

      try {
        const data =
          await getSessionAttendance(
            sessionId
          );

        setAttendance(data || []);
      } catch {
        toast.error(
          "Error loading attendance"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, [sessionId]);

  // 🔥 FILTER
  const filteredAttendance =
    attendance.filter((a: any) => {
      const keyword =
        search.toLowerCase();

      return (
        a.student?.firstName
          ?.toLowerCase()
          .includes(keyword) ||
        a.student?.lastName
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center">

        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuClipboardCheck />
            Attendance List
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Manage lesson attendance
          </p>
        </div>

        <Link
          to={`/school/attendances/create?sessionId=${sessionId}`}
          className="btn bg-primary text-white"
        >
          <LuPlus className="me-1" />
          Mark Attendance
        </Link>

      </div>

      {/* SEARCH */}
      <div className="card-body">

        <div className="relative max-w-md">
          <input
            type="text"
            className="form-input ps-10"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <LuSearch className="absolute left-3 top-3 text-default-400" />
        </div>

      </div>

      {/* CONTENT */}
      <div className="overflow-x-auto">

        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin inline-block text-3xl" />
          </div>
        )}

        {!loading &&
          filteredAttendance.length ===
            0 && (
            <div className="text-center py-16">
              No attendance found
            </div>
          )}

        {!loading &&
          filteredAttendance.length >
            0 && (
            <table className="min-w-full">

              <thead className="bg-default-100">
                <tr>

                  <th className="p-4 text-left">
                    Student
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Remarks
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredAttendance.map(
                  (item: any) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-default-50"
                    >

                      {/* STUDENT */}
                      <td className="p-4 font-medium">
                        {
                          item.student
                            ?.firstName
                        }{" "}
                        {
                          item.student
                            ?.lastName
                        }
                      </td>

                      {/* STATUS */}
                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.status ===
                          "PRESENT"
                            ? "bg-success/10 text-success"
                            : item.status ===
                              "ABSENT"
                            ? "bg-danger/10 text-danger"
                            : item.status ===
                              "LATE"
                            ? "bg-warning/10 text-warning"
                            : "bg-info/10 text-info"
                        }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      {/* REMARK */}
                      <td className="p-4 text-sm text-default-500">
                        {item.remarks ||
                          "-"}
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>
          )}
      </div>
    </div>
  );
};

export default AttendanceList;