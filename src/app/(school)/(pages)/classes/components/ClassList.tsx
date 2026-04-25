import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { getMyClasses } from "@/services/classe.service";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

const MyClasses = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<any>(null);

  // LOAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyClasses();
        console.log("CLASSES =>", data.data); // 🔥 DEBUG
        setClasses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🎯 FORMAT GRADES POUR react-select
  const gradeOptions = useMemo(() => {
    const map = new Map();

    classes.forEach((c) => {
      if (c.grade) {
        map.set(c.grade.id, {
          value: c.grade.id,
          label: c.grade.name,
        });
      }
    });

    return Array.from(map.values());
  }, [classes]);

  // 🔍 FILTER
  const filteredClasses = useMemo(() => {
    return classes.filter((c) => {
      const matchSearch = c.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchGrade = selectedGrade
        ? c.grade?.id === selectedGrade.value
        : true;

      return matchSearch && matchGrade;
    });
  }, [classes, search, selectedGrade]);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">📚 My Classes</h1>

        <div className="flex gap-3 flex-wrap">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          />

          {/* REACT SELECT */}
          <div className="w-56">
            <Select
              options={gradeOptions}
              value={selectedGrade}
              onChange={(val) => setSelectedGrade(val)}
              placeholder="Filter by Grade"
              isClearable
            />
          </div>
          <div className="w-36">

            <button
              className="btn btn-sm bg-primary text-white"
              onClick={() => navigate("/school/classes/create")}
            >
              <LuPlus className="size-4 me-1" />
              Add Class
            </button>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 animate-pulse">
          Loading classes...
        </div>
      )}

      {/* EMPTY */}
      {!loading && classes.length === 0 && (
        <div className="text-center text-red-500 py-10">
          ⚠️ No classes found (Check schoolId or DB)
        </div>
      )}

      {!loading && classes.length > 0 && filteredClasses.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No result for your filter
        </div>
      )}

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClasses.map((c) => (
          <div
            key={c.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border"
          >
            <h2 className="text-lg font-semibold">{c.name}</h2>

            <p className="text-sm text-gray-500 mt-2">
              Grade: {c.grade?.name || "N/A"}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {c.grade?.name}
              </span>

              <button className="text-blue-500 text-sm hover:underline">
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyClasses;