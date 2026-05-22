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
  LuGraduationCap,
  LuCalendar,
  LuMail,
  LuUsers,
} from "react-icons/lu";

import {
  getStudentById,
} from "@/services/student.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const StudentDashboard = () => {

  const { id } = useParams();

  const [student, setStudent] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  // ✅ LOAD STUDENT
  useEffect(() => {

    const loadStudent = async () => {

      setLoading(true);

      try {

        const data =
          await getStudentById(id!);

        console.log(
          "STUDENT =>",
          data
        );

        setStudent(data);

      } catch (err: any) {

        console.error(err);

        toast.error(
          err?.message ||
          "Error loading student"
        );

      } finally {

        setLoading(false);
      }
    };

    loadStudent();

  }, [id]);

  // ✅ LOADING
  if (loading) {
    return (
      <div className="p-10 text-center">

        <LuLoader className="animate-spin inline-block text-3xl text-primary" />

      </div>
    );
  }

  // ✅ EMPTY
  if (!student) {
    return (
      <div className="p-10 text-center text-default-500">
        No student found
      </div>
    );
  }

  const enrollment =
    student.enrollments?.[0];

  // ✅ MOCK CHARTS
  const performanceData = {
    labels: [
      "Math",
      "English",
      "Science",
      "History",
      "ICT",
    ],

    datasets: [
      {
        label: "Marks (%)",

        data: [75, 82, 68, 90, 85],

        borderWidth: 2,

        tension: 0.4,
      },
    ],
  };

  const attendanceData = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
    ],

    datasets: [
      {
        label: "Attendance",

        data: [1, 1, 0, 1, 1],
      },
    ],
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div className="flex items-center gap-4">

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">

              <LuUser className="text-primary text-4xl" />

            </div>

            {/* INFO */}
            <div>

              <h2 className="text-2xl font-bold">

                {student.firstName}{" "}
                {student.lastName}

              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-default-500 text-sm">

                <span className="flex items-center gap-1">

                  <LuGraduationCap />

                  {enrollment?.class?.name ||
                    "-"}

                </span>

                <span>
                  •
                </span>

                <span>
                  {enrollment?.class?.grade
                    ?.name || "-"}
                </span>

              </div>

            </div>

          </div>

          {/* STATUS */}
          <span className="px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium h-fit">

            {student.status ||
              "ACTIVE"}

          </span>

        </div>

      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-5">

        {/* ATTENDANCE */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <p className="text-sm text-default-500">
            Attendance
          </p>

          <h3 className="text-3xl font-bold mt-2">
            92%
          </h3>

        </div>

        {/* MARKS */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <p className="text-sm text-default-500">
            Average Marks
          </p>

          <h3 className="text-3xl font-bold mt-2">
            80%
          </h3>

        </div>

        {/* FEES */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <p className="text-sm text-default-500">
            Fees Status
          </p>

          <h3 className="text-lg font-semibold text-success mt-2">
            Paid
          </h3>

        </div>

        {/* DISCIPLINE */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <p className="text-sm text-default-500">
            Discipline
          </p>

          <h3 className="text-lg font-semibold text-primary mt-2">
            Good
          </h3>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* PERFORMANCE */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h3 className="font-semibold text-lg mb-5">
            Performance
          </h3>

          <Line data={performanceData} />

        </div>

        {/* ATTENDANCE */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h3 className="font-semibold text-lg mb-5">
            Weekly Attendance
          </h3>

          <Bar data={attendanceData} />

        </div>

      </div>

      {/* STUDENT INFO */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h3 className="font-semibold text-lg mb-6">
          Student Information
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm">

          {/* GENDER */}
          <div className="space-y-1">

            <p className="text-default-500 flex items-center gap-2">

              <LuUser />

              Gender

            </p>

            <p className="font-medium">
              {student.gender || "-"}
            </p>

          </div>

          {/* DOB */}
          <div className="space-y-1">

            <p className="text-default-500 flex items-center gap-2">

              <LuCalendar />

              Date of Birth

            </p>

            <p className="font-medium">

              {student.dateOfBirth
                ? new Date(
                    student.dateOfBirth
                  ).toLocaleDateString()
                : "-"}

            </p>

          </div>

          {/* NATIONALITY */}
          <div className="space-y-1">

            <p className="text-default-500">
              Nationality
            </p>

            <p className="font-medium">
              {student.nationality ||
                "-"}
            </p>

          </div>

          {/* EMAIL */}
          <div className="space-y-1">

            <p className="text-default-500 flex items-center gap-2">

              <LuMail />

              Email

            </p>

            <p className="font-medium">
              {student.email || "-"}
            </p>

          </div>

          {/* PARENT */}
          <div className="space-y-1">

            <p className="text-default-500 flex items-center gap-2">

              <LuUsers />

              Parent

            </p>

            <p className="font-medium">
              {student.parentName ||
                "-"}
            </p>

          </div>

          {/* CONTACT */}
          <div className="space-y-1">

            <p className="text-default-500 flex items-center gap-2">

              <LuPhone />

              Contact

            </p>

            <p className="font-medium">
              {student.contact || "-"}
            </p>

          </div>

          {/* ADDRESS */}
          <div className="space-y-1">

            <p className="text-default-500 flex items-center gap-2">

              <LuMapPin />

              Address

            </p>

            <p className="font-medium">
              {student.address || "-"}
            </p>

          </div>

          {/* RELIGION */}
          <div className="space-y-1">

            <p className="text-default-500">
              Religion
            </p>

            <p className="font-medium">
              {student.religion ||
                "-"}
            </p>

          </div>

          {/* PREVIOUS SCHOOL */}
          <div className="space-y-1">

            <p className="text-default-500">
              Previous School
            </p>

            <p className="font-medium">
              {student.previousSchool ||
                "-"}
            </p>

          </div>

        </div>

      </div>

      {/* FUTURE MODULES */}
      <div className="grid md:grid-cols-3 gap-5">

        {/* EXAMS */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <h4 className="font-semibold text-lg">
            📘 Exams
          </h4>

          <p className="text-sm text-default-500 mt-2">
            Coming soon...
          </p>

        </div>

        {/* FEES */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <h4 className="font-semibold text-lg">
            💰 Fees
          </h4>

          <p className="text-sm text-default-500 mt-2">
            Coming soon...
          </p>

        </div>

        {/* TIMETABLE */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <h4 className="font-semibold text-lg">
            📅 Timetable
          </h4>

          <p className="text-sm text-default-500 mt-2">
            Coming soon...
          </p>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;