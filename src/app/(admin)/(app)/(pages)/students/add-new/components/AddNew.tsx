/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import { createStudent } from "@/services/student.service";
import { getClasses } from "@/services/classe.service";

import {
  LuSave,
  LuLoader,
  LuRefreshCcw,
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

  // 🔥 LOAD CLASSES
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getClasses();
        setClasses(res.data);
      } catch {
        toast.error("Error loading classes");
      }
    };
    load();
  }, []);

  // VALIDATION
  const validate = () => {
    if (!form.firstName) return "First name is required";
    if (!form.lastName) return "Last name is required";
    if (!form.email) return "Email is required";
    if (!form.gender) return "Gender is required";
    if (!form.dateOfBirth) return "Date of birth is required";
    if (!form.parentName) return "Parent name is required";
    if (!form.contact) return "Contact is required";
    if (!form.classId) return "Class is required";

    return null;
  };

  // ENROLL STUDENT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const res = await createStudent(form);

      toast.success(res.message);

      // SHOW CREDENTIALS
      alert(`
      Student Created 🎉

      Email: ${res.credentials.email}
      Password: ${res.credentials.temporaryPassword}
      `);

      navigate("/admin/students");
    } catch (err: any) {
      toast.error(err.message || "Error creating student");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OPTIONS
  const classOptions = classes.map((c: any) => ({
    value: c.id,
    label: `${c.name} (${c.grade?.name})`,
  }));

  const genderOptions = [
    { value: "MALE", label: "MALE" },
    { value: "FEMALE", label: "FEMALE" },
    { value: "OTHER", label: "OTHER" },
  ];

  return (
    <div className="card">

      {/* HEADER */}
      <div className="card-header">
        <h2 className="card-title">🎓 Create Student</h2>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PERSONAL INFO */}
          <div>
            <h4 className="font-semibold mb-3">Personal Information</h4>

            <div className="grid lg:grid-cols-3 gap-5">

              <input
                className="form-input"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <Select
                options={genderOptions}
                placeholder="Select Gender"
                value={genderOptions.find(g => g.value === form.gender)}
                onChange={(g: any) =>
                  setForm({ ...form, gender: g?.value })
                }
              />

              <input
                type="date"
                className="form-input"
                value={form.dateOfBirth}
                onChange={(e) =>
                  setForm({ ...form, dateOfBirth: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Nationality"
                value={form.nationality}
                onChange={(e) =>
                  setForm({ ...form, nationality: e.target.value })
                }
              />
            </div>
          </div>

          {/* PARENT INFO */}
          <div>
            <h4 className="font-semibold mb-3">Parent Information</h4>

            <div className="grid lg:grid-cols-3 gap-5">
              <input
                className="form-input"
                placeholder="Parent Name"
                value={form.parentName}
                onChange={(e) =>
                  setForm({ ...form, parentName: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Contact"
                value={form.contact}
                onChange={(e) =>
                  setForm({ ...form, contact: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Address"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />
            </div>
          </div>

          {/* SCHOOL INFO */}
          <div>
            <h4 className="font-semibold mb-3">School Information</h4>

            <div className="grid lg:grid-cols-3 gap-5">

              <Select
                options={classOptions}
                placeholder="Select Class"
                value={
                  classOptions.find(c => c.value === form.classId) || null
                }
                onChange={(c: any) =>
                  setForm({ ...form, classId: c?.value })
                }
              />

              <input
                className="form-input"
                placeholder="Previous School (optional)"
                value={form.previousSchool}
                onChange={(e) =>
                  setForm({ ...form, previousSchool: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Religion (optional)"
                value={form.religion}
                onChange={(e) =>
                  setForm({ ...form, religion: e.target.value })
                }
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              className="btn border"
            >
              <LuRefreshCcw className="me-1" />
              Cancel
            </button>

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