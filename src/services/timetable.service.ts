import api from "@/lib/api";

export interface Timetable {
  id: string;

  day: string;
  period: number;

  startTime: string;
  endTime: string;

  class: {
    id: string;
    name: string;
    grade?: {
      name: string;
    };
  };

  course: {
    id: string;

    subject: {
      name: string;
      code: string;
    };

    assignments?: {
      teacher?: {
        firstName: string;
        lastName: string;
      };
    }[];
  };
}

export interface CreateTimetableDto {
  classId: string;
  courseId: string;

  day: string;
  period: number;

  startTime: string;
  endTime: string;
}

// 🔥 CREATE
export const createTimetable = async (
  payload: CreateTimetableDto
) => {
  const { data } = await api.post(
    "/timetable/create",
    payload
  );

  return data;
};

// 🔥 GET CLASS TIMETABLE
export const getClassTimetable = async (
  classId: string
): Promise<Timetable[]> => {
  const { data } = await api.get(
    `/timetable/class/${classId}`
  );

  return data;
};

// 🔥 UPDATE
export const updateTimetable = async (
  id: string,
  payload: Partial<CreateTimetableDto>
) => {
  const { data } = await api.patch(
    `/timetable/edit/${id}`,
    payload
  );

  return data;
};

// 🔥 TEACHER TIMETABLE
export const getMyTeacherTimetable =
  async (): Promise<Timetable[]> => {
    const { data } = await api.get(
      "/timetable/teacher/me"
    );

    return data;
  };