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

import { getStudentById } from "@/services/student.service";
import toast from "react-hot-toast";

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
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getStudentById(id!);
        setStudent(data);
      } catch (err: any) {
        toast.error(err.message || "Error loading student");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!student) return <p className="p-6">No data</p>;

  const enrollment = student.enrollments?.[0];

  // 📊 MOCK DATA (ready for backend later)
  const performanceData = {
    labels: ["Math", "English", "Science", "History", "ICT"],
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
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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
      <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-sm text-gray-500">
            {enrollment?.class?.name} • {enrollment?.class?.grade?.name}
          </p>
        </div>

        <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded">
          {student.status}
        </span>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Attendance</p>
          <h3 className="text-2xl font-bold">92%</h3>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Average Marks</p>
          <h3 className="text-2xl font-bold">80%</h3>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Fees Status</p>
          <h3 className="text-lg font-semibold text-green-600">Paid</h3>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Discipline</p>
          <h3 className="text-lg font-semibold text-blue-600">Good</h3>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* PERFORMANCE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Performance</h3>
          <Line data={performanceData} />
        </div>

        {/* ATTENDANCE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Weekly Attendance</h3>
          <Bar data={attendanceData} />
        </div>

      </div>

      {/* DETAILS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Student Info</h3>

        <div className="grid md:grid-cols-3 gap-4 text-sm">

          <div>
            <p className="text-gray-500">Gender</p>
            <p>{student.gender}</p>
          </div>

          <div>
            <p className="text-gray-500">DOB</p>
            <p>{new Date(student.dateOfBirth).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-gray-500">Nationality</p>
            <p>{student.nationality}</p>
          </div>

          <div>
            <p className="text-gray-500">Parent</p>
            <p>{student.parentName}</p>
          </div>

          <div>
            <p className="text-gray-500">Contact</p>
            <p>{student.contact}</p>
          </div>

          <div>
            <p className="text-gray-500">Address</p>
            <p>{student.address}</p>
          </div>

        </div>
      </div>

      {/* FUTURE MODULES (READY) */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-4 bg-white rounded-xl shadow">
          <h4 className="font-semibold">📘 Exams</h4>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h4 className="font-semibold">💰 Fees</h4>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h4 className="font-semibold">📅 Timetable</h4>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;