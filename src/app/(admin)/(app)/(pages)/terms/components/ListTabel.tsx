import { useEffect, useState } from "react";
import { getTermsByAcademicYear } from "@/services/term.service";

interface Props {
  academicYearId: string;
}

const ListTerms = ({ academicYearId }: Props) => {

  const [terms, setTerms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTerms();
  }, [academicYearId]);

  const fetchTerms = async () => {
    try {
      setLoading(true);

      const res = await getTermsByAcademicYear(
        academicYearId
      );

      setTerms(res.data || []);

    } catch (error) {
      console.error("Failed to load terms", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          Loading terms...
        </div>
      </div>
    );
  }

  return (
    <div className="card">

      <div className="card-header">
        <h4 className="card-title">
          Terms List
        </h4>
      </div>

      <div className="card-body">

        {terms.length === 0 ? (
          <p className="text-default-500">
            No terms found
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="table-auto w-full border-collapse">

              <thead>
                <tr className="border-b border-default-200">
                  <th className="text-left py-3 px-4">
                    Name
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
                    className="border-b border-default-100"
                  >
                    <td className="py-3 px-4">
                      {term.name}
                    </td>

                    <td className="py-3 px-4">
                      {term.academicYear?.name}
                    </td>

                    <td className="py-3 px-4">
                      {term.assessments?.length || 0}
                    </td>

                    <td className="py-3 px-4">
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