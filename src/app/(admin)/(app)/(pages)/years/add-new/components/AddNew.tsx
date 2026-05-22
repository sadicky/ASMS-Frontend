import { useState } from "react";
import {
  createAcademicYear,
} from "@/services/year.service";

interface Props {
  onCreated?: () => void;
}

const CreateAcademic = ({
  onCreated,
}: Props) => {

  const [name, setName] =
    useState("");

  const [terms, setTerms] =
    useState([
      { name: "First Term" },
      { name: "Second Term" },
      { name: "Third Term" },
    ]);

  const [loading, setLoading] =
    useState(false);

  const handleTermChange = (
    index: number,
    value: string
  ) => {
    const updated = [...terms];

    updated[index].name = value;

    setTerms(updated);
  };

  const addTerm = () => {
    setTerms([
      ...terms,
      { name: "" },
    ]);
  };

  const removeTerm = (index: number) => {
    const updated = terms.filter(
      (_, i) => i !== index
    );

    setTerms(updated);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createAcademicYear({
        name,
        terms,
      });

      setName("");

      setTerms([
        { name: "First Term" },
        { name: "Second Term" },
        { name: "Third Term" },
      ]);

      if (onCreated) {
        onCreated();
      }

    } catch (error) {
      console.error(
        "Failed to create academic year",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-5">

      <div className="card-header">
        <h4 className="card-title">
          Create Academic Year
        </h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Academic Year */}

          <div className="mb-5">

            <label className="block mb-2 text-sm font-medium">
              Academic Year Name
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="Ex: 2025 - 2026"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          {/* TERMS */}

          <div className="mb-5">

            <div className="flex items-center justify-between mb-3">

              <h5 className="font-semibold">
                Terms
              </h5>

              <button
                type="button"
                onClick={addTerm}
                className="btn btn-sm bg-primary text-white"
              >
                Add Term
              </button>

            </div>

            <div className="space-y-3">

              {terms.map((term, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <input
                    type="text"
                    className="form-input"
                    placeholder={`Term ${
                      index + 1
                    }`}
                    value={term.name}
                    onChange={(e) =>
                      handleTermChange(
                        index,
                        e.target.value
                      )
                    }
                    required
                  />

                  {terms.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeTerm(index)
                      }
                      className="btn bg-danger text-white"
                    >
                      Remove
                    </button>
                  )}

                </div>

              ))}

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-primary text-white"
          >
            {loading
              ? "Creating..."
              : "Create Academic Year"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateAcademic;