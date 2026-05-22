import { useEffect, useState } from "react";
import {
  getAcademicYears,
} from "@/services/year.service";

import {
  getTermsByAcademicYear,
} from "@/services/term.service";

const ListTerms = () => {

  const [terms, setTerms] =
    useState<any[]>([]);

  const [academicYear, setAcademicYear] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* ===============================
     FETCH ACTIVE ACADEMIC YEAR
  =============================== */

  const fetchTerms = async () => {

    try {

      setLoading(true);

      // 🔥 récupérer academic years
      const academicRes =
        await getAcademicYears({
          page: 1,
          limit: 50,
        });

      const years =
        academicRes.data || [];

      // 🔥 récupérer l'année active
      const activeYear =
        years.find(
          (year: any) => year.active
        );

      if (!activeYear) {
        console.warn(
          "No active academic year found"
        );

        setLoading(false);
        return;
      }

      setAcademicYear(activeYear);
     
      // 🔥 récupérer les terms
      const termRes =
        await getTermsByAcademicYear(
          activeYear.id
        );

      setTerms(termRes.data || []);

    } catch (error) {

      console.error(
        "Failed to load terms",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  /* ===============================
     UI
  =============================== */

  return (
    <div className="card">

      {/* HEADER */}

      <div className="card-header flex items-center justify-between">

        <div>

          <h4 className="card-title">
            Academic Terms
          </h4>

          <p className="text-sm text-default-500 mt-1">

            {academicYear
              ? `Active Year: ${academicYear.name}`
              : "No active academic year"}

          </p>

        </div>

      </div>

      {/* BODY */}

      <div className="card-body">

        {loading ? (

          <div className="py-10 text-center">
            Loading terms...
          </div>

        ) : terms.length === 0 ? (

          <div className="py-10 text-center text-default-500">
            No terms found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="table-auto w-full">

              <thead>

                <tr className="border-b border-default-200">

                  <th className="text-left py-3 px-4">
                    Term
                  </th>

                  <th className="text-left py-3 px-4">
                    Academic Year
                  </th>

                  <th className="text-left py-3 px-4">
                    Assessments
                  </th>

                  <th className="text-left py-3 px-4">
                    Exams
                  </th>

                </tr>

              </thead>

              <tbody>

                {terms.map((term) => (

                  <tr
                    key={term.id}
                    className="border-b border-default-100 hover:bg-default-50 transition"
                  >

                    <td className="py-4 px-4 font-medium">
                      {term.name}
                    </td>

                    <td className="py-4 px-4">
                      {term.academicYear?.name}
                    </td>

                    <td className="py-4 px-4">
                      {term.assessments?.length || 0}
                    </td>

                    <td className="py-4 px-4">
                      {term.exams?.length || 0}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default ListTerms;