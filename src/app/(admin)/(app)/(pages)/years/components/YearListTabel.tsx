import { useEffect, useState } from "react";
import {
  getAcademicYears,
  activateAcademicYear,
} from "@/services/year.service";
import { Link } from "react-router";
import { LuPlus } from "react-icons/lu";

const ListAcademics = () => {

  const [academicYears, setAcademicYears] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [search, setSearch] =
    useState<string>("");

  const [page, setPage] =
    useState<number>(1);

  const [meta, setMeta] =
    useState<any>(null);

  const limit = 10;

  /* =================================
     FETCH DATA
  ================================= */

  const fetchAcademicYears = async () => {
    try {
      setLoading(true);

      const res = await getAcademicYears({
        page,
        limit,
        search,
      });

      setAcademicYears(res.data || []);
      setMeta(res.meta);
 
    } catch (error) {
      console.error(
        "Failed to load academic years",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcademicYears();
  }, [page, search]);

  /* =================================
     ACTIVATE YEAR
  ================================= */

  const handleActivate = async (
    id: string
  ) => {
    try {
      await activateAcademicYear(id);

      fetchAcademicYears();

    } catch (error) {
      console.error(
        "Failed to activate year",
        error
      );
    }
  };

  return (
    <div className="card">

      {/* HEADER */}

      <div className="card-header flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h4 className="card-title">
            Academic Years
          </h4>

          <p className="text-sm text-default-500 mt-1">
            Manage academic years and terms
          </p>
        </div>

        <div className="flex gap-2">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search..."
            className="form-input w-32"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* ADD BUTTON */}

          <Link
            to="/admin/years/create"
            className="btn bg-primary text-white"
          >
          <LuPlus className="size-4 me-1" />Add
          </Link>
          
                
        </div>

      </div>

      {/* BODY */}

      <div className="card-body">

        {loading ? (

          <div className="py-10 text-center">
            Loading...
          </div>

        ) : academicYears.length === 0 ? (

          <div className="py-10 text-center text-default-500">
            No academic years found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="table-auto w-full">

              <thead>

                <tr className="border-b border-default-200">

                  <th className="text-left py-3 px-4">
                    Academic Year
                  </th>

                  <th className="text-left py-3 px-4">
                    Terms
                  </th>

                  <th className="text-left py-3 px-4">
                    Status
                  </th>

                  <th className="text-left py-3 px-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {academicYears.map((year) => (

                  <tr
                    key={year.id}
                    className="border-b border-default-100 hover:bg-default-50 transition"
                  >

                    {/* NAME */}

                    <td className="py-4 px-4">

                      <div className="font-medium text-default-900">
                        {year.name}
                      </div>

                    </td>

                    {/* TERMS */}

                    <td className="py-4 px-4">

                      <div className="flex flex-wrap gap-2">

                        {year.terms?.map(
                          (term: any) => (

                            <span
                              key={term.id}
                              className="px-2 py-1 rounded bg-primary/10 text-primary text-xs"
                            >
                              {term.name}
                            </span>

                          )
                        )}

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="py-4 px-4">

                      {year.active ? (

                        <span className="px-2 py-1 rounded bg-success/10 text-success text-xs font-medium">
                          Active
                        </span>

                      ) : (

                        <span className="px-2 py-1 rounded bg-warning/10 text-warning text-xs font-medium">
                          Inactive
                        </span>

                      )}

                    </td>

                    {/* ACTIONS */}

                    <td className="py-4 px-4">

                      <div className="flex gap-2">

                        {!year.active && (

                          <button
                            onClick={() =>
                              handleActivate(year.id)
                            }
                            className="btn btn-sm bg-primary text-white"
                          >
                            Activate
                          </button>

                        )}

                        <Link
                          to={`/admin/academic-years/${year.id}`}
                          className="btn btn-sm border border-default-200"
                        >
                          View
                        </Link>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* PAGINATION */}

      {meta && (
        <div className="card-footer flex items-center justify-between border-t border-default-200">

          <div className="text-sm text-default-500">

            Showing page{" "}
            <span className="font-medium">
              {meta.page}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {meta.totalPages}
            </span>

          </div>

          <div className="flex gap-2">

            {/* PREVIOUS */}

            <button
              disabled={!meta.hasPrevPage}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
              className="btn border border-default-200 disabled:opacity-50"
            >
              Previous
            </button>

            {/* NEXT */}

            <button
              disabled={!meta.hasNextPage}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
              className="btn border border-default-200 disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ListAcademics;