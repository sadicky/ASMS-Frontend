/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuCalendarDays,
  LuClock3,
  LuLoader,
  LuPlus,
  LuSearch,
  LuPencil,
  LuBookOpen,
  LuCalendarPlus,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";

import {
  getClassTimetable,
  type Timetable,
} from "@/services/timetable.service";

const TimetableList = () => {
  const [loading, setLoading] = useState(false);

  const [timetables, setTimetables] = useState<
    Timetable[]
  >([]);

  const [classes, setClasses] = useState<any[]>(
    []
  );

  const [classId, setClassId] = useState("");

  const [search, setSearch] = useState("");

  // 🔥 LOAD CLASSES
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await getMyClasses();

        setClasses(data || []);
      } catch {
        toast.error("Error loading classes");
      }
    };

    loadClasses();
  }, []);

  // 🔥 LOAD TIMETABLE
  useEffect(() => {
    if (!classId) return;

    const loadTimetable = async () => {
      setLoading(true);

      try {
        const data =
          await getClassTimetable(classId);

        setTimetables(data || []);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ||
            "Error loading timetable"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();
  }, [classId]);

  // 🔥 FILTER
  const filteredTimetables =
    timetables.filter((item) => {
      const keyword =
        search.toLowerCase();

      return (
        item.course?.subject?.name
          ?.toLowerCase()
          .includes(keyword) ||
        item.course?.subject?.code
          ?.toLowerCase()
          .includes(keyword) ||
        item.day
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  // 🔥 CLASS OPTIONS
  const classOptions = classes.map(
    (c: any) => ({
      value: c.id,
      label: `${c.name} (${
        c.grade?.name || ""
      })`,
    })
  );

  // 🔥 FORMAT TIME
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h2 className="card-title flex items-center gap-2">
            <LuCalendarDays />
            Timetable Management
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Manage timetable and teacher schedules
          </p>
        </div>

        <Link
          to="/school/timetables/create"
          className="btn bg-primary text-white"
        >
          <LuPlus className="me-1" />
          Create Timetable
        </Link>

      </div>

      {/* FILTERS */}
      <div className="card-body grid lg:grid-cols-2 gap-4">

        {/* CLASS */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Class
          </label>

          <Select
            options={classOptions}
            placeholder="Choose class"
            value={
              classOptions.find(
                (o) => o.value === classId
              ) || null
            }
            onChange={(selected: any) =>
              setClassId(
                selected?.value || ""
              )
            }
          />
        </div>

        {/* SEARCH */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Search
          </label>

          <div className="relative">
            <input
              type="text"
              className="form-input ps-10"
              placeholder="Search subject/day..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <LuSearch className="absolute left-3 top-3 text-default-400" />
          </div>
        </div>

      </div>

      {/* CONTENT */}
      <div className="overflow-x-auto">

        {/* LOADING */}
        {loading && (
          <div className="p-10 text-center">
            <LuLoader className="animate-spin inline-block text-3xl" />
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          classId &&
          filteredTimetables.length ===
            0 && (
            <div className="text-center py-16">

              <div className="size-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                <LuBookOpen className="size-8 text-primary" />
              </div>

              <h3 className="text-lg font-semibold">
                No timetable found
              </h3>

              <p className="text-default-500 mt-1">
                No schedules available for
                this class
              </p>

            </div>
          )}

        {/* DEFAULT */}
        {!classId && (
          <div className="text-center py-16 text-default-500">
            Select a class to view timetable
          </div>
        )}

        {/* TABLE */}
        {!loading &&
          filteredTimetables.length >
            0 && (
            <table className="min-w-full">

              <thead className="bg-default-100">
                <tr>

                  <th className="p-4 text-left">
                    Subject
                  </th>

                  <th className="p-4 text-left">
                    Day
                  </th>

                  <th className="p-4 text-left">
                    Period
                  </th>

                  <th className="p-4 text-left">
                    Time
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredTimetables.map(
                  (item) => {
                   
                    return (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-default-50 transition"
                      >

                        {/* SUBJECT */}
                        <td className="p-4">
                          <div className="font-semibold">
                            {
                              item.course
                                .subject
                                .name
                            }
                          </div>

                          <div className="text-xs text-default-500 mt-1">
                            {
                              item.course
                                .subject
                                .code
                            }
                          </div>
                        </td>

                        {/* DAY */}
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {item.day}
                          </span>
                        </td>

                        {/* PERIOD */}
                        <td className="p-4">
                          Period {item.period}
                        </td>

                        {/* TIME */}
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm">
                            <LuClock3 className="text-default-500" />

                            <span>
                              {formatTime(
                                item.startTime
                              )}{" "}
                              -{" "}
                              {formatTime(
                                item.endTime
                              )}
                            </span>
                          </div>
                        </td>

                        {/* ACTIONS */}
                        <td className="p-4">

                          <div className="flex flex-wrap gap-2">

                            {/* EDIT */}
                            <Link
                              to={`/school/timetable/edit/${item.id}`}
                              className="btn btn-sm border"
                            >
                              <LuPencil className="me-1" />
                              Edit
                            </Link>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}
              </tbody>

            </table>
          )}
      </div>
    </div>
  );
};

export default TimetableList;