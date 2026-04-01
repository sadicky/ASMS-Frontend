import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboard.service";
import { toast } from "react-hot-toast";
import { LuMap, LuBuilding2, LuMapPin, LuShare2, LuSchool } from "react-icons/lu";

const PageDetails = () => {
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 🔥 Transformer en tableau
  const cards = [
    {
      id: "regions",
      label: "Regions",
      value: stats?.regions || 0,
      icon: LuMap,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "directorates",
      label: "Directorates",
      value: stats?.directorates || 0,
      icon: LuBuilding2,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "districts",
      label: "Districts",
      value: stats?.districts || 0,
      icon: LuMapPin,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: "clusters",
      label: "Clusters",
      value: stats?.clusters || 0,
      icon: LuShare2,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "schools",
      label: "Schools",
      value: stats?.schools || 0,
      icon: LuSchool,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-5">
      {cards.map(({ id, label, value, icon: Icon, bgColor, iconColor }) => (
        <div className="card" key={id}>
          <div className="card-body text-center">
            <div
              className={`flex items-center justify-center mx-auto rounded-full size-14 ${bgColor}`}
            >
              <Icon className={`size-6 ${iconColor}`} />
            </div>

            <h5 className="mt-4 mb-2 text-default-800 font-semibold text-xl">
              {loading ? "..." : value}
            </h5>

            <p className="text-sm text-default-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageDetails;