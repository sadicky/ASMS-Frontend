import { Link } from "react-router";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/getUser";
import { getSchoolById } from "@/services/school.service";

const Welcome = () => {

  const user = getUser();
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      try {
        if (!user?.schoolId) {
          console.warn("No schoolId found for user");
          setLoading(false);
          return;
        }

        const data = await getSchoolById(user.schoolId);
        setSchool(data);

      } catch (error) {
        console.error("Failed to load school", error);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [user]);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 mb-6 gap-5">

      {/* LEFT SECTION */}
      <div className="lg:col-span-2">
        <h5 className="mb-2 text-xl font-semibold text-default-800">
          Welcome {user?.email || "User"} 🎉
        </h5>

        <p className="text-default-600">
          Role:{" "}
          <span className="font-semibold text-default-900">
            {user?.role || "Unknown"}
          </span>
        </p>

        <p className="mt-2 text-default-600">
          You are managing{" "}
          <span className="underline text-default-900 font-medium">
            {loading ? "Loading..." : school?.name || "your school"}
          </span>.
        </p>

        <Link to="#" className="text-danger mt-2 inline-block">
          Learn More
        </Link>
      </div>

      {/* RIGHT STATS CARD */}
      <div className="lg:col-start-4">
        <div className="card shadow-sm border border-default-200">
          <div className="card-body">

            <div className="grid grid-cols-3 text-center">

              <div className="px-2 border-e border-default-200">
                <h6 className="font-bold text-default-800">
                  {school?._count?.users || 0}
                </h6>
                <p className="text-xs text-default-500">Users</p>
              </div>

              <div className="px-2 border-e border-default-200">
                <h6 className="font-bold text-default-800">
                  {school?._count?.students || 0}
                </h6>
                <p className="text-xs text-default-500">Students</p>
              </div>

              <div className="px-2">
                <h6 className="font-bold text-default-800">
                  {school?._count?.classes || 0}
                </h6>
                <p className="text-xs text-default-500">Classes</p>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Welcome;