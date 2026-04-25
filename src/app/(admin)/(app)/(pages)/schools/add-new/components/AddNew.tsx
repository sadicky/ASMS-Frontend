/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRegions } from "@/services/region.service";
import { getDirectorates } from "@/services/dir.service";
import { getDistricts } from "@/services/district.service";
import { getClusters } from "@/services/cluster.service";
import { createSchool } from "@/services/school.service";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { LuLoader, LuRefreshCcw, LuSave } from "react-icons/lu";

import Select from 'react-select'

const AddSchool = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 🔹 Data lists
  const [regions, setRegions] = useState<any[]>([]);
  const [directorates, setDirectorates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [clusters, setClusters] = useState<any[]>([]);

  // 🔹 Selected IDs
  const [regionId, setRegionId] = useState("");
  const [directorateId, setDirectorateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [clusterId, setClusterId] = useState("");

  // 🔹 Form
  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    accredited: false,
  });

  // ✅ LOAD REGIONS
  useEffect(() => {
    getRegions({})
      .then((res) => setRegions(res.data || res))
      .catch(() => toast.error("Failed to load regions"));
  }, []);

  // ✅ LOAD DIRECTORATES
  useEffect(() => {
    if (!regionId) return;

    getDirectorates({ regionId })
      .then((res) => setDirectorates(res.data))
      .catch(() => toast.error("Failed to load directorates"));
  }, [regionId]);

  // ✅ LOAD DISTRICTS
  useEffect(() => {
    if (!directorateId) return;

    getDistricts({ directorateId })
      .then((res) => setDistricts(res.data))
      .catch(() => toast.error("Failed to load districts"));
  }, [directorateId]);

  // ✅ LOAD CLUSTERS
  useEffect(() => {
    if (!districtId) return;

    getClusters({ districtId })
      .then((res) => setClusters(res.data))
      .catch(() => toast.error("Failed to load clusters"));
  }, [districtId]);

  // 🔥 RESET CASCADE (ULTRA IMPORTANT)
  useEffect(() => {
    setDirectorateId("");
    setDistrictId("");
    setClusterId("");
    setDirectorates([]);
    setDistricts([]);
    setClusters([]);
  }, [regionId]);

  useEffect(() => {
    setDistrictId("");
    setClusterId("");
    setDistricts([]);
    setClusters([]);
  }, [directorateId]);

  useEffect(() => {
    setClusterId("");
    setClusters([]);
  }, [districtId]);

  // ✅ SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createSchool({
        ...form,
        clusterId,
      });

      toast.success("School created successfully 🚀");

      // 🔥 REDIRECTION VERS LICENCE
      navigate(`/admin/licenses/create?schoolId=${res.id}`);
      
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error creating school"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OPTIONS
  const regionOptions = regions.map((r) => ({
    value: r.id,
    label: r.name,
  }));

  const directorateOptions = directorates.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  const districtOptions = districts.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  const clusterOptions = clusters.map((c) => ({
    value: c.id,
    label: c.name,
  }));

const categoryOptions = [
  { value: "Secondary", label: "Secondary" },
  { value: "Primary", label: "Primary" },
];

const TypeOptions = [
  { value: "PUBLIC", label: "PUBLIC" },
  { value: "PRIVATE", label: "PRIVATE" },
  { value: "COMMUNITY", label: "COMMUNITY" },
];

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          
          {/* NAME + CATEGORY */}
          <div className="grid lg:grid-cols-3 gap-5 mb-6">
            <input
              placeholder="School Name"
              className="form-input"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
             <Select
                options={categoryOptions}
                placeholder="Select Category"
                value={
                  categoryOptions.find(
                    (opt) => opt.value === form.category
                  ) || null
                }
                onChange={(selected: any) =>
                  setForm({
                    ...form,
                    category: selected?.value || "",
                  })
                }
              />
                        
             <Select
                options={TypeOptions}
                placeholder="Select Type"
                value={
                  TypeOptions.find(
                    (opt) => opt.value === form.type
                  ) || null
                }
                onChange={(selected: any) =>
                  setForm({
                    ...form,
                    type: selected?.value || "",
                  })
                }
              />
          </div>

          {/* CASCADE SELECT */}
          <div className="grid lg:grid-cols-4 gap-5 mb-6">
            
            {/* <select
              className="form-input"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select> */}
              <Select
              options={regionOptions}
              placeholder="Select Region"
              value={regionOptions.find((o) => o.value === regionId) || null}
              onChange={(selected: any) => {
                setRegionId(selected?.value || "");

                // 🔥 RESET CASCADE
                setDirectorateId("");
                setDistrictId("");
                setClusterId("");

                setDirectorates([]);
                setDistricts([]);
                setClusters([]);
              }}
            />

            {/* <select
              className="form-input"
              value={directorateId}
              onChange={(e) => setDirectorateId(e.target.value)}
              disabled={!regionId}
            >
              <option value="">Select Directorate</option>
              {directorates.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select> */}
              <Select
              options={directorateOptions}
              placeholder="Select Directorate"
              isDisabled={!regionId}
              value={
                directorateOptions.find((o) => o.value === directorateId) || null
              }
              onChange={(selected: any) => {
                setDirectorateId(selected?.value || "");

                // 🔥 RESET
                setDistrictId("");
                setClusterId("");

                setDistricts([]);
                setClusters([]);
              }}
              />

            {/* <select
              className="form-input"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              disabled={!directorateId}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select> */}

                <Select
                options={districtOptions}
                placeholder="Select District"
                isDisabled={!directorateId}
                value={districtOptions.find((o) => o.value === districtId) || null}
                onChange={(selected: any) => {
                  setDistrictId(selected?.value || "");

                  // 🔥 RESET
                  setClusterId("");
                  setClusters([]);
                }}
              />

            {/* <select
              className="form-input"
              value={clusterId}
              onChange={(e) => setClusterId(e.target.value)}
              disabled={!districtId}
            >
              <option value="">Select Cluster</option>
              {clusters.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select> */}
              <Select
                options={clusterOptions}
                placeholder="Select Cluster"
                isDisabled={!districtId}
                value={clusterOptions.find((o) => o.value === clusterId) || null}
                onChange={(selected: any) => {
                  setClusterId(selected?.value || "");
                }}
              />

          </div>

          {/* CHECKBOX */}
          <div className="mb-6">
            <label>
              <input
                type="checkbox"
                className="form-checkbox"
                checked={form.accredited}
                onChange={(e) =>
                  setForm({
                    ...form,
                    accredited: e.target.checked,
                  })
                }
              />
              Accredited &nbsp; &nbsp; &nbsp; 
              {/* (if checked, the school will be marked as accredited) */}
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/admin/school/list")}
              className="btn bg-gray-200"
            >
              <LuRefreshCcw /> Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white"
            >
              {loading ? <LuLoader className="animate-spin" /> : <LuSave />}
              Create
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSchool;