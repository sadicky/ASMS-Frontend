/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import toast from "react-hot-toast";

import { createStaff } from "@/services/staff.service";

import {
  LuSave,
  LuLoader,
  LuRefreshCcw,
} from "react-icons/lu";

const CreateStaff = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    contact: "",
    address: "",
    religion: "",
    roleId: "",

    qualification: "",
    specialization: "",
    experienceYear: 0,
  });

  // 🔥 STATIC ROLES (SCHOOL_ADMIN ONLY)
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "TEACHER", label: "TEACHER" },
    { value: "ADMIN", label: "ADMIN" },
    { value: "ACCOUNTANT", label: "ACCOUNTANT" },
    { value: "LIBRARIAN", label: "LIBRARIAN" },
  ];

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

  const selectedRole = roleOptions.find(
    (r) => r.value === form.roleId
  );

  // 🔥 VALIDATION
  const validate = () => {
    if (!form.firstName) return "First name required";
    if (!form.lastName) return "Last name required";
    if (!form.email) return "Email required";
    if (!form.gender) return "Gender required";
    if (!form.dateOfBirth) return "Date of birth required";
    if (!form.roleId) return "Role required";

    if (form.roleId === "TEACHER") {
      if (!form.qualification) return "Qualification required";
      if (!form.specialization) return "Specialization required";
    }

    return null;
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    setLoading(true);

    try {
      const res = await createStaff(form);

      toast.success(res.message);

      alert(`
🎉 Staff Created

Email: ${res.credentials.email}
Password: ${res.credentials.temporaryPassword}
      `);

      navigate("/school/staffs");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error creating staff"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      <div className="card-header">
        <h2>Create Staff</h2>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* BASIC INFO */}
          <div className="grid lg:grid-cols-3 gap-4">

            <input
              className="form-input"
              placeholder="First Name"
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />

            <input
              className="form-input"
              placeholder="Last Name"
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />

            <input
              className="form-input"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <Select
              options={genderOptions}
              placeholder="Gender"
              onChange={(v: any) =>
                setForm({ ...form, gender: v.value })
              }
            />

            <input
              type="date"
              className="form-input"
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            />

            <input
              className="form-input"
              placeholder="Nationality"
              onChange={(e) =>
                setForm({ ...form, nationality: e.target.value })
              }
            />

          </div>
          
         {/* ROLE + CONTACT + RELIGION */}
<div className="grid lg:grid-cols-3 gap-4">

  <Select
    options={roleOptions}
    placeholder="Role"
    onChange={(v: any) =>
      setForm({ ...form, roleId: v.value })
    }
  />

  <input
    className="form-input"
    placeholder="Contact"
    onChange={(e) =>
      setForm({ ...form, contact: e.target.value })
    }
  />

  <input
    className="form-input"
    placeholder="Religion"
    onChange={(e) =>
      setForm({ ...form, religion: e.target.value })
    }
  />

</div>

          {/* TEACHER ONLY FIELDS */}
          {form.roleId === "TEACHER" && (
            <div className="grid lg:grid-cols-3 gap-4">

              <input
                className="form-input"
                placeholder="Qualification"
                onChange={(e) =>
                  setForm({ ...form, qualification: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Specialization"
                onChange={(e) =>
                  setForm({ ...form, specialization: e.target.value })
                }
              />

              <input
                type="number"
                className="form-input"
                placeholder="Experience Years"
                onChange={(e) =>
                  setForm({
                    ...form,
                    experienceYear: Number(e.target.value),
                  })
                }
              />

            </div>
          )}


          <textarea
            className="form-input"
            placeholder="Address"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => navigate("/school/staffs")}
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
              Create Staff
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateStaff;