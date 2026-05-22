import api from "@/lib/api";

export interface AttendanceRecord {
  studentId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  remarks?: string;
}

export interface MarkAttendanceDto {
  lessonSessionId: string;
  records: AttendanceRecord[];
}

// 🔥 Mark bulk attendance
export const markAttendance = async (data: MarkAttendanceDto) => {
  const res = await api.post("/attendance/create", data);
  return res.data;
};

// 🔥 Get session attendance
export const getSessionAttendance = async (sessionId: string) => {
  const res = await api.get(`/attendance/session/${sessionId}`);
  return res.data;
};