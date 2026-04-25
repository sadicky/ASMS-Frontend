/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRegions } from "@/services/region.service";
import { getDirectoratesByRegion } from "@/services/dir.service";
import { createCluster } from "@/services/cluster.service";
import { getDistrictsByDirectorate } from "@/services/district.service";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { LuLoader, LuRefreshCcw, LuSave } from 'react-icons/lu';
import Select from "react-select";

type Region = { id: string; name: string };
type Directorate = { id: string; name: string };
type District = { id: string; name: string };


const AddCluster = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [regionId, setRegionId] = useState("");
  const [directorateId, setDirectorateId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [regions, setRegions] = useState<Region[]>([]);
  const [directorates, setDirectorates] = useState<Directorate[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [loading, setLoading] = useState(false);

  // 🔥 LOAD REGIONS
  useEffect(() => {
    getRegions({ page: 1, limit: 100 })
        .then((res) => {
        setRegions(res.data); // ✅ seulement le tableau
      })
      .catch(() => toast.error("Region chargement error"));
  }, []);

  // 🔥 LOAD DIRECTORATES 
  useEffect(() => {
    if (!regionId) {
      setDirectorates([]);
      setDistricts([]);
      setDirectorateId("");
      setDistrictId("");
      return;
    }
    getDirectoratesByRegion(regionId)
      .then(setDirectorates)
      .catch(() => toast.error("Directorates Loading Error"));
  }, [regionId]);

  // 🔥 LOAD DISTRICTS
  useEffect(() => {
    if (!directorateId) {
      setDistricts([]);
      setDistrictId("");
      return;
    }
    getDistrictsByDirectorate(directorateId)
      .then(setDistricts)
      .catch(() => toast.error("Districts Loading Error"));
  }, [directorateId]);

  // 🔥 SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !districtId) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await createCluster({ name, districtId });

      toast.success("Cluster created successfully 🚀");

      setTimeout(() => {
        navigate("/admin/clusters");
      }, 1000);

    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error creating cluster"
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

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 mb-6">
              {/* NAME */}
              <div className="col-span-1">
                <label
                  htmlFor="nameInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="enter region name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* REGION */}
              <div className="col-span-1">
                <label
                  htmlFor="regionInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  Region
                </label>
               <Select
              options={regionOptions}
              placeholder="Select Region"
              value={regionOptions.find((o) => o.value === regionId) || null}
              onChange={(selected: any) => {
                setRegionId(selected?.value || "");

                // 🔥 RESET CASCADE
                setDirectorateId("");
                setDistrictId("");

                setDirectorates([]);
                setDistricts([]);
              }}
            />
              </div>

              {/* DIRECTORATE */}
              <div className="col-span-1">
                <label
                  htmlFor="regionInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  Directorate
                </label>
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
                setDistricts([]);
              }}
              />
              </div>


              {/* DISTRICT */}
              <div className="col-span-1">
                <label
                  htmlFor="regionInput"
                  className="inline-block mb-2 text-sm text-default-800 font-medium"
                >
                  District
                </label>
                <Select
                options={districtOptions}
                placeholder="Select District"
                isDisabled={!directorateId}
                value={districtOptions.find((o) => o.value === districtId) || null}
                onChange={(selected: any) => {
                  setDistrictId(selected?.value || "");
                }}
              />
              </div>

            </div>

            <div className="flex justify-end items-center mt-5">
              <div className="flex flex-wrap items-center gap-2">
                <button type="button"
                  onClick={() => navigate("/admin/clusters")} className="bg-default-200 text-default-500 text-nowrap border-0 btn hover:bg-default-300">
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

export default AddCluster;
