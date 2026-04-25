import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";

import { createStaff } from "@/services/staff.service";
import { getMyClasses } from "@/services/classe.service";

const AddStaff = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);

  // ================= FORM STATE =================
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    contact: "",
    address: "",
    religion: "",
    email: "",
    role: "TEACHER",
    classId: "",
  });

  // ================= LOAD CLASSES =================
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyClasses();
        setClasses(Array.isArray(res) ? res : res?.data || []);
      } catch {
        toast.error("Error loading classes");
      }
    };
    load();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStaff(form);

      toast.success("user created successfully");
      navigate("/school/staffs");
    } catch (err: any) {
      toast.error(err?.message || "Error creating staff");
    } finally {
      setLoading(false);
    }
  };

  // ================= OPTIONS =================
  const classOptions = classes.map((c: any) => ({
    value: c.id,
    label: `${c.name} (${c.grade?.name || "-"})`,
  }));

  const roleOptions = [
    { value: "TEACHER", label: "Teacher" },
    { value: "ACCOUNTANT", label: "Accountant" },
    { value: "LIBRARIAN", label: "Librarian" },
    { value: "STAFF", label: "Staff" },

  ];
   const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

  return (
    <div className="card max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="card-header">
        <h2 className="card-title">Add New Staff</h2>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          className="form-input"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
        />

        <input
          className="form-input"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          required
        />
        
        <Select
          options={genderOptions}
          placeholder="Select Gender"
          value={genderOptions.find((g) => g.value === form.gender) || null}
          onChange={(val: any) =>
            setForm({ ...    form, gender: val.value })
          }
        />

        <input
          type="date"
          className="form-input"
          value={form.dateOfBirth}
          onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Nationality"
          value={form.nationality}
          onChange={(e) => setForm({ ...form, nationality: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Religion"
          value={form.religion}
          onChange={(e) => setForm({ ...form, religion: e.target.value })}
        />

        {/* EMAIL (USER CREATION) */}
        <input
          className="form-input md:col-span-2"
          placeholder="Email (login account)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* ROLE */}
        <Select
          options={roleOptions}
          placeholder="Select role"
          value={roleOptions.find((r) => r.value === form.role)}
          onChange={(val: any) =>
            setForm({ ...form, role: val.value })
          }
        />

        {/* CLASS */}
        <Select
          options={classOptions}
          placeholder="Assign class (optional)"
          isClearable
          onChange={(val: any) =>
            setForm({ ...form, classId: val?.value || "" })
          }
        />

        {/* BUTTON */}
        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={loading}
            className="btn bg-primary text-white"
          >
            {loading ? "Creating..." : "Create Staff"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddStaff;