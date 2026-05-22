/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

import toast from "react-hot-toast";

import {
  LuLoader,
  LuUser,
  LuPhone,
  LuMapPin,
  LuCalendar,
  LuFlag,
  LuSchool,
} from "react-icons/lu";

import { getMyStaffs } from "@/services/staff.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const StaffDashboard = () => {

  const { id } = useParams();

  const [staff, setStaff] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  // ✅ LOAD STAFF
  useEffect(() => {

    const loadStaff = async () => {

      setLoading(true);

      try {

        const data =
          await getMyStaffs();

        console.log(
          "STAFF =>",
          data
        );

        setStaff(data);

      } catch (err: any) {

        console.error(err);

        toast.error(
          err?.message ||
          "Error loading staff"
        );

      } finally {

        setLoading(false);
      }
    };

    loadStaff();

  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="p-10 text-center">
        <LuLoader className="animate-spin text-3xl text-primary inline-block" />
      </div>
    );
  }

  // EMPTY
  if (!staff) {
    return (
      <div className="p-10 text-center text-default-500">
        No staff found
      </div>
    );
  }

  // MOCK PERFORMANCE (teaching activity)
  const activityData = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
    ],

    datasets: [
      {
        label: "Lessons Conducted",
        data: [2, 3, 1, 4, 3],
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const workloadData = {
    labels: [
      "Classes",
      "Assignments",
      "Sessions",
      "Meetings",
    ],

    datasets: [
      {
        label: "Workload",
        data: [5, 12, 8, 3],
      },
    ],
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-4">

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">

              <LuUser className="text-primary text-4xl" />

            </div>

            {/* INFO */}
            <div>

              <h2 className="text-2xl font-bold">

                {staff.firstName}{" "}
                {staff.lastName}

              </h2>

              <p className="text-sm text-default-500 mt-1 flex items-center gap-2">

                <LuSchool />

                Staff Member

              </p>

            </div>

          </div>

          {/* STATUS */}
          <span className="px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">

            {staff.status || "ACTIVE"}

          </span>

        </div>

      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="p-5 bg-white rounded-2xl shadow-sm border">
          <p className="text-sm text-default-500">
            Attendance
          </p>
          <h3 className="text-2xl font-bold mt-2">
            95%
          </h3>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm border">
          <p className="text-sm text-default-500">
            Lessons
          </p>
          <h3 className="text-2xl font-bold mt-2">
            18
          </h3>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm border">
          <p className="text-sm text-default-500">
            Classes
          </p>
          <h3 className="text-2xl font-bold mt-2">
            {staff.teacherAssignments?.length || 0}
          </h3>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm border">
          <p className="text-sm text-default-500">
            Status
          </p>
          <h3 className="text-lg font-semibold text-primary mt-2">
            Active
          </h3>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-semibold mb-4">
            Teaching Activity
          </h3>
          <Line data={activityData} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-semibold mb-4">
            Workload Overview
          </h3>
          <Bar data={workloadData} />
        </div>

      </div>

      {/* DETAILS */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h3 className="font-semibold mb-4">
          Staff Information
        </h3>

        <div className="grid md:grid-cols-3 gap-5 text-sm">

          <div>
            <p className="text-default-500 flex items-center gap-2">
              <LuUser /> Gender
            </p>
            <p className="font-medium">
              {staff.gender}
            </p>
          </div>

          <div>
            <p className="text-default-500 flex items-center gap-2">
              <LuCalendar /> Date of Birth
            </p>
            <p className="font-medium">
              {new Date(
                staff.dateOfBirth
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-default-500 flex items-center gap-2">
              <LuFlag /> Nationality
            </p>
            <p className="font-medium">
              {staff.nationality}
            </p>
          </div>

          <div>
            <p className="text-default-500 flex items-center gap-2">
              <LuPhone /> Contact
            </p>
            <p className="font-medium">
              {staff.contact}
            </p>
          </div>

          <div>
            <p className="text-default-500 flex items-center gap-2">
              <LuMapPin /> Address
            </p>
            <p className="font-medium">
              {staff.address}
            </p>
          </div>

          <div>
            <p className="text-default-500">
              Religion
            </p>
            <p className="font-medium">
              {staff.religion || "-"}
            </p>
          </div>

          <div>
            <p className="text-default-500">
              Date Joined
            </p>
            <p className="font-medium">
              {new Date(
                staff.dateJoined
              ).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>

      {/* FUTURE MODULES */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="p-5 bg-white rounded-2xl shadow-sm border">
          <h4 className="font-semibold">
            📚 Teacher Profile
          </h4>
          <p className="text-sm text-default-500">
            Coming soon...
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm border">
          <h4 className="font-semibold">
            🧑‍🏫 Assignments
          </h4>
          <p className="text-sm text-default-500">
            {staff.teacherAssignments?.length || 0} assigned
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm border">
          <h4 className="font-semibold">
            🎓 Lesson Sessions
          </h4>
          <p className="text-sm text-default-500">
            {staff.lessonSessions?.length || 0} sessions
          </p>
        </div>

      </div>

    </div>
  );
};

export default StaffDashboard;