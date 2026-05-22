/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";
import { createStudent } from "@/services/student.service";
import {
  getMyClasses,
} from "@/services/classe.service";

import {
  LuSave,
  LuLoader,
  LuRefreshCcw,
  LuGraduationCap,
} from "react-icons/lu";

const CreateStudent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    previousSchool: "",
    parentName: "",
    contact: "",
    address: "",
    religion: "",
    classId: "",
  });

  // ✅ LOAD MY SCHOOL CLASSES
  useEffect(() => {
    const loadClasses = async () => {
      try {

        const data = await getMyClasses();

        console.log("CLASSES =>", data);

        setClasses(data || []);

      } catch (err) {

        console.error(err);

        toast.error(
          "Error loading classes"
        );
      }
    };

    loadClasses();
  }, []);

  // ✅ VALIDATION
  const validate = () => {

    if (!form.firstName)
      return "First name is required";

    if (!form.lastName)
      return "Last name is required";

    if (!form.email)
      return "Email is required";

    if (!form.gender)
      return "Gender is required";

    if (!form.dateOfBirth)
      return "Date of birth is required";

    if (!form.parentName)
      return "Parent name is required";

    if (!form.contact)
      return "Contact is required";

    if (!form.classId)
      return "Class is required";

    return null;
  };

  // ✅ SUBMIT
  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {

      const res = await createStudent(form);

      toast.success(
        "Student created successfully 🎉"
      );

      // ✅ SHOW CREDENTIALS
      setTimeout(() => {

        alert(`
Student Created 🎉

Email: ${res.credentials?.email}

Password: ${res.credentials?.temporaryPassword}
        `);

      }, 500);

      navigate("/school/students");

    } catch (err: any) {

      console.error(err);

      toast.error(
        err?.message ||
        "Error creating student"
      );

    } finally {
      setLoading(false);
    }
  };

  // ✅ CLASS OPTIONS
  const classOptions = classes.map(
    (c: any) => ({
      value: c.id,
      label: `${c.name} (${c.grade?.name || "No Grade"})`,
    })
  );

  // ✅ GENDER OPTIONS
  const genderOptions = [
    { value: "MALE", label: "MALE" },
    { value: "FEMALE", label: "FEMALE" },
    { value: "OTHER", label: "OTHER" },
  ];

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">

            <LuGraduationCap className="text-primary text-xl" />

          </div>

          <div>

            <h2 className="card-title">
              Create Student
            </h2>

            <p className="text-sm text-default-500 mt-1">
              Register a new student for your school
            </p>

          </div>

        </div>

      </div>

      {/* BODY */}
      <div className="card-body">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* PERSONAL */}
          <div>

            <h4 className="font-semibold mb-4">
              Personal Information
            </h4>

            <div className="grid lg:grid-cols-3 gap-5">

              <input
                className="form-input"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstName: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastName: e.target.value,
                  })
                }
              />

              <input
                type="email"
                className="form-input"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              {/* GENDER */}
              <Select
                options={genderOptions}
                placeholder="Select Gender"
                value={
                  genderOptions.find(
                    (g) =>
                      g.value === form.gender
                  ) || null
                }
                onChange={(g: any) =>
                  setForm({
                    ...form,
                    gender: g?.value || "",
                  })
                }
              />

              {/* DOB */}
              <input
                type="date"
                className="form-input"
                value={form.dateOfBirth}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dateOfBirth:
                      e.target.value,
                  })
                }
              />

              {/* NATIONALITY */}
              <input
                className="form-input"
                placeholder="Nationality"
                value={form.nationality}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nationality:
                      e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* PARENT */}
          <div>

            <h4 className="font-semibold mb-4">
              Parent Information
            </h4>

            <div className="grid lg:grid-cols-3 gap-5">

              <input
                className="form-input"
                placeholder="Parent Name"
                value={form.parentName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    parentName:
                      e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Contact"
                value={form.contact}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact:
                      e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Address"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address:
                      e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* SCHOOL */}
          <div>

            <h4 className="font-semibold mb-4">
              School Information
            </h4>

            <div className="grid lg:grid-cols-3 gap-5">

              {/* CLASS */}
              <Select
                options={classOptions}
                placeholder="Select Class"
                value={
                  classOptions.find(
                    (c) =>
                      c.value === form.classId
                  ) || null
                }
                onChange={(c: any) =>
                  setForm({
                    ...form,
                    classId:
                      c?.value || "",
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Previous School"
                value={form.previousSchool}
                onChange={(e) =>
                  setForm({
                    ...form,
                    previousSchool:
                      e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Religion"
                value={form.religion}
                onChange={(e) =>
                  setForm({
                    ...form,
                    religion:
                      e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            {/* CANCEL */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/school/students"
                )
              }
              className="btn border"
            >
              <LuRefreshCcw className="me-1" />

              Cancel
            </button>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >

              {loading ? (
                <LuLoader className="animate-spin me-1" />
              ) : (
                <LuSave className="me-1" />
              )}

              Create Student

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateStudent;