/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getActiveLicense,
  createLicense,
  updateLicense,
  type License,
} from "@/services/licence.service";

import { LuLoader, LuRefreshCcw, LuSave } from 'react-icons/lu';

const AddLicense=() =>{
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const schoolId = params.get("schoolId");

  const [loading, setLoading] = useState(true);
  const [license, setLicense] = useState<any>(null);

    const [form, setForm] = useState({
    licenseKey: "",
    plan: "BASIC",
    issuedAt: "",
    expiresAt: "",
    status: "ACTIVE",
  });

// 🔥 GENERATE LICENSE KEY AUTO
const generateKey = (count: number = 1) => {
  const year = new Date().getFullYear();
  const sequence = String(count).padStart(4, "0");
  const random = Math.random()
    .toString(36)
    .substring(2, 5)
    .toUpperCase();

  return `LIC-${year}-${sequence}-${random}`;
};
  //  Remaining days
  const getRemainingDays = (expiresAt: string) => {
    const today = new Date();
    const end = new Date(expiresAt);

    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };


  // ✅ CHECK ACTIVE LICENSE
  useEffect(() => {
    if (!schoolId) return;

      getActiveLicense(schoolId)
      .then((res) => setLicense(res))
      .finally(() => setLoading(false));
  }, [schoolId]);

    // ✅ AUTO INIT FORM
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    setForm((prev) => ({
      ...prev,
      licenseKey: generateKey(),
      issuedAt: today.toISOString().split("T")[0],
      expiresAt: nextMonth.toISOString().split("T")[0],
    }));
  }, []);



  // ✅ SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!schoolId) {
      toast.error("School not found");
      return;
    }

      try {
      setLoading(true);
      await createLicense({
        ...form,
        schoolId,
      });

      toast.success("License created successfully 🚀");

      navigate(`/admin/school/${schoolId}`);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error creating license"
      );
    } finally {
      setLoading(false);
    }
  };

  

   // 🔄 RENEW
  const handleRenew = async () => {
     try {
     const nextMonth = new Date();
      nextMonth.setMonth(new Date().getMonth() + 1);

      const updated = await updateLicense(license.id, {
        expiresAt: nextMonth.toISOString(),
        status: "ACTIVE",
      });

      setLicense(updated);

      toast.success("License renewed 🚀");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du renouvellement");
    }
  };
    if (loading) return <p>Loading...</p>;

  // 🔥 IF LICENSE EXISTS
   if (license)  {
    const remainingDays = getRemainingDays(license.expiresAt);
    return (
      <div className="card">
        <div className="card-body">

          {/* <h2 className="text-lg text-green-500 font-semibold mb-4"> */}
        <p className="py-1 px-4 mb-4 external-event fc-event font-medium bg-success/10
         text-success rounded" data-class="!text-danger">Licence Actived ✔</p>
             {/* <h2 className="text-xl font-semibold">Licence Active ✔</h2> */}
          {/* </h2> */}

          {/* ALERT */}
          {remainingDays <= 5 && remainingDays > 0 && (
            <p className="text-red-600 text-sm">
              ⚠️ License expires soon!
            </p>
          )}
           {remainingDays <= 0 && (
            <p className="text-red-700 font-semibold">
              ❌ License expired
            </p>
          )}

          <div className="space-y-2 text-sm mt-3">
              <p>
                {/* <b>School:</b>{" "} */}
                <span className="text-primary font-semibold text-2xl pointer"
                 onClick={() => navigate(`/admin/school/${license.school.id}`)}>
                  {license.school?.name || "N/A"}
                </span>
              </p>

            <p><b>Key:</b> {license.licenseKey}</p>
            <p><b>Plan:</b> {license.plan}</p>

            <p>
              <b>Status:</b>{" "}
              <span className="text-green-600">
                {license.status}
              </span>
            </p>
             <p>
              <b>Start:</b>{" "}
              {new Date(license.issuedAt).toLocaleDateString()}
            </p>

            <p>
              <b>End:</b>{" "}
              {new Date(license.expiresAt).toLocaleDateString()}
            </p>

            {/* ⏰ DAYS */}
            <p>
              <b>Remaining:</b>{" "}
              <span
                className={
                  remainingDays <= 5
                    ? "text-red-600"
                    : "text-green-600"
                }
               >
                {remainingDays > 0
                  ? `${remainingDays} days`
                  : "Expired"}
              </span>
            </p>

          </div>

          {/* ACTIONS */}
          <div className="mt-5 flex gap-2">
            <button
              onClick={handleRenew}
              className="btn bg-green-500 text-white"
            >
              Renew 30 Days
            </button>
            <button
              onClick={() =>
                navigate(`/admin/licenses/edit/${license.id}`)
              }
              className="btn bg-blue-500 text-white"
            >
              Edit
            </button>

            <button
              onClick={() =>
                navigate(`/admin/school/${schoolId}`)
              }
              className="btn bg-gray-200"
            >
              Back
            </button>

          </div>
  </div>
      </div>
    );
  }

  // ❌ CREATE FORM
  return (
    <>
      <div className="card">
        <div className="card-body">
           <h2 className="text-lg font-semibold mb-4">
          Create License
        </h2>
        <p className="py-1 px-4 mb-4 external-event fc-event font-medium bg-danger/10
         text-danger rounded" data-class="!text-danger">Licence No Active ❌</p>
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 mb-6">
              {/* LICENCE */}
              <div className="col-span-1">
                <label
                  htmlFor="nameInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  Licence Key
                </label>
                <input
                className="form-input w-full"
                value={form.licenseKey}
                required
                readOnly
                />
              </div>

              {/* PLAN */}
              <div className="col-span-1">
                <label
                  htmlFor="planInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  PLAN
                </label>
                <select
                  className="form-input"
                  value={form.plan}
                  onChange={(e) =>
                    setForm({ ...form, plan: e.target.value })
              }
                >
                  <option value="">Select PLAN</option>
                  <option value="BASIC">BASIC</option>
                  <option value="STANDARD">STANDARD</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>
              </div>

              {/* DATES */}
              <div className="col-span-1">
                <label
                  htmlFor="startInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  Start Date
                </label>
                <input
                type="date"
                className="form-input"
                value={form.issuedAt}
                onChange={(e) =>
                  setForm({ ...form, issuedAt: e.target.value })
                }
                required
                />
              </div>


              {/* END DATE */}
              <div className="col-span-1">
                <label
                  htmlFor="EndInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  End Date
                </label>
                <input
                type="date"
                className="form-input"
                value={form.expiresAt}
                onChange={(e) =>
                  setForm({ ...form, expiresAt: e.target.value })
                }
                required
                />
              </div>
              
            </div>

            <div className="flex justify-end items-center mt-5">
              <div className="flex flex-wrap items-center gap-2">
                <button type="button"
                  onClick={() => navigate("/admin/school/list")} className="bg-default-200 text-default-500 text-nowrap border-0 btn hover:bg-default-300">
                  {' '}
                  <LuRefreshCcw className="size-4 me-1" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white border-0 btn text-nowrap bg-primary">
                  {' '}
                  <LuSave className="size-4 me-1" />
                  {loading ? <LuLoader className="animate-spin" /> : "Create"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddLicense;

function setLicense(updated: License) {
  throw new Error("Function not implemented.");
}
