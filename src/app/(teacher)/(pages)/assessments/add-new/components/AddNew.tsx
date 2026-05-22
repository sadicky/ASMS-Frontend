// src/pages/school/assessments/CreateAssessment.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import {
  LuBookOpen,
  LuLoader,
  LuSave,
} from "react-icons/lu";

import { getMyClasses } from "@/services/classe.service";
import { getCoursesByClass } from "@/services/course.service";

import {
  getAcademicYears,
} from "@/services/year.service";

import {
  getTermsByAcademicYear,
} from "@/services/term.service";

import {
  createAssessment,
} from "@/services/assessment.service";

const assessmentTypes = [
  { value: "QUIZ", label: "Quiz" },
  { value: "HOMEWORK", label: "Home Assignment" },
  { value: "PROJECT", label: "Project" },
  { value: "CLASSWORK", label: "Class Work" },
];

const CreateAssessment = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [classes, setClasses] =
    useState<any[]>([]);

  const [courses, setCourses] =
    useState<any[]>([]);

  const [terms, setTerms] =
    useState<any[]>([]);

  const [activeAcademicYear, setActiveAcademicYear] =
    useState<any>(null);

  const [selectedClass, setSelectedClass] =
    useState("");

  const [form, setForm] = useState({
    type: "",
    title: "",
    maxMark: 100,
    weight: 10,
    courseId: "",
    termId: "",
  });

  /* =========================================
     LOAD CLASSES
  ========================================= */

  useEffect(() => {

    const load = async () => {

      try {

        const data =
          await getMyClasses();

        setClasses(data || []);

      } catch {

        toast.error(
          "Failed loading classes"
        );

      }
    };

    load();

  }, []);

  /* =========================================
     LOAD COURSES
  ========================================= */

  useEffect(() => {

    if (!selectedClass)
      return;

    const loadCourses = async () => {

      try {

        const data =
          await getCoursesByClass(
            selectedClass
          );

        setCourses(data || []);

      } catch {

        toast.error(
          "Failed loading courses"
        );

      }
    };

    loadCourses();

  }, [selectedClass]);

  /* =========================================
     LOAD TERMS FROM ACTIVE YEAR
  ========================================= */

  useEffect(() => {

    const loadTerms = async () => {

      try {

        // 🔥 GET ALL YEARS
        const academicRes =
          await getAcademicYears({
            page: 1,
            limit: 50,
          });

        const years =
          academicRes.data || [];

        // 🔥 FIND ACTIVE YEAR
        const activeYear =
          years.find(
            (year: any) => year.active
          );

        if (!activeYear) {

          toast.error(
            "No active academic year found"
          );

          return;
        }

        setActiveAcademicYear(
          activeYear
        );

        // 🔥 LOAD TERMS
        const termRes =
          await getTermsByAcademicYear(
            activeYear.id
          );

        setTerms(
          termRes.data || []
        );

      } catch {

        toast.error(
          "Failed loading terms"
        );

      }
    };

    loadTerms();

  }, []);

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    if (
      !form.title ||
      !form.type ||
      !form.courseId ||
      !form.termId
    ) {

      return toast.error(
        "Please fill all required fields"
      );
    }

    setLoading(true);

    try {

      const res =
        await createAssessment(
          form
        );

      toast.success(
        res.message ||
        "Assessment created"
      );

      navigate(
        "/teacher/assessments"
      );

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ||
        "Error creating assessment"
      );

    } finally {

      setLoading(false);

    }
  };

  /* =========================================
     OPTIONS
  ========================================= */

  const classOptions =
    classes.map((c: any) => ({
      value: c.id,
      label: `${c.name} (${c.grade?.name})`,
    }));

  const courseOptions =
    courses.map((c: any) => ({
      value: c.id,
      label: `${c.subject?.name} (${c.subject?.code})`,
    }));

  const termOptions =
    terms.map((t: any) => ({
      value: t.id,
      label: t.name,
    }));

  return (
    <div className="card">

      {/* HEADER */}

      <div className="card-header">

        <div>

          <h2 className="card-title flex items-center gap-2">
            <LuBookOpen />
            Create Assessment
          </h2>

          <p className="text-sm text-default-500 mt-1">

            {activeAcademicYear
              ? `Academic Year: ${activeAcademicYear.name}`
              : "Create continuous assessment"}

          </p>

        </div>

      </div>

      {/* BODY */}

      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid md:grid-cols-2 gap-4">

            {/* CLASS */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Class
              </label>

              <Select
                placeholder="Select Class"
                options={classOptions}
                onChange={(v: any) =>
                  setSelectedClass(
                    v?.value || ""
                  )
                }
              />

            </div>

            {/* COURSE */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Course
              </label>

              <Select
                placeholder="Select Course"
                options={courseOptions}
                onChange={(v: any) =>
                  setForm({
                    ...form,
                    courseId:
                      v?.value || "",
                  })
                }
              />

            </div>

            {/* TYPE */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Assessment Type
              </label>

              <Select
                placeholder="Select Type"
                options={assessmentTypes}
                onChange={(v: any) =>
                  setForm({
                    ...form,
                    type:
                      v?.value || "",
                  })
                }
              />

            </div>

            {/* TERM */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Term
              </label>

              <Select
                placeholder="Select Term"
                options={termOptions}
                onChange={(v: any) =>
                  setForm({
                    ...form,
                    termId:
                      v?.value || "",
                  })
                }
              />

            </div>

            {/* TITLE */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Title
              </label>

              <input
                className="form-input"
                placeholder="Ex: Mathematics Quiz 1"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title:
                      e.target.value,
                  })
                }
              />

            </div>

            {/* MAX MARK */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Max Mark
              </label>

              <input
                type="number"
                className="form-input"
                value={form.maxMark}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxMark: Number(
                      e.target.value
                    ),
                  })
                }
              />

            </div>

            {/* WEIGHT */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Weight (%)
              </label>

              <input
                type="number"
                className="form-input"
                value={form.weight}
                onChange={(e) =>
                  setForm({
                    ...form,
                    weight: Number(
                      e.target.value
                    ),
                  })
                }
              />

            </div>

          </div>

          {/* BUTTON */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >

              {loading ? (
                <LuLoader className="animate-spin me-2" />
              ) : (
                <LuSave className="me-2" />
              )}

              Create Assessment

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateAssessment;