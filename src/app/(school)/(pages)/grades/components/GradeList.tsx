/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGrades } from "@/services/grade.service";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import {
    LuChevronLeft,
    LuChevronRight,
    LuCircleCheck,
    LuEllipsis,
    LuEye,
    LuLoader,
    LuPlus,
    LuSearch,
    LuSquarePen,
    LuTrash2,
} from "react-icons/lu";
import { useEffect, useState } from "react";

const GradeListTabel = () => {
    const navigate = useNavigate();

    const [grades, setGrades] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [meta, setMeta] = useState<any>({
        page: 1,
        total: 0,
        lastPage: 1,
    });

    const [page, setPage] = useState(1);
    const limit = 10;

    // 🔥 FETCH DATA
    const fetchGrades = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await getGrades({
                page,
                limit,
                search,
            });

            setGrades(res.data || []);
            setMeta(res.meta || {});
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Error loading grades"
            );
        } finally {
            setLoading(false);
        }
    };

    // 🔥 EFFECT
    useEffect(() => {
        fetchGrades();
    }, [page, search]);

    return (
        <div className="card">
            {/* HEADER */}
            <div className="card-header flex justify-between items-center">
                <h6 className="card-title">Grades List</h6>

                <button
                    className="btn btn-sm bg-primary text-white"
                    onClick={() => navigate("/admin/grades/create")}
                >
                    <LuPlus className="size-4 me-1" />
                    Add Grade
                </button>
            </div>

            {/* SEARCH */}
            <div className="card-header">
                <div className="relative max-w-xs">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                        className="form-input form-input-sm ps-9"
                        placeholder="Search grade..."
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                        <LuSearch className="size-3.5 text-default-500" />
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="flex flex-col">

                {/* LOADING */}
                {loading && (
                    <div className="p-4 flex justify-center items-center gap-2">
                        <LuLoader className="animate-spin" />
                        Loading...
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <p className="p-3 text-danger bg-danger/10 rounded text-center">
                        {error}
                    </p>
                )}

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-default-200">
                        <thead className="bg-default-150">
                            <tr>
                                <th className="px-3.5 py-3 text-start">Name</th>
                                <th className="px-3.5 py-3 text-start">Classes</th>
                                <th className="px-3.5 py-3 text-start">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {grades.map((grade) => (
                                <tr key={grade.id} className="text-sm">
                                    <td className="px-3.5 py-3 font-medium">
                                        {grade.name}
                                    </td>

                                    {/* 🔥 COUNT */}
                                    <td className="px-3.5 py-3">
                                        {grade._count?.classes !== 0 && (
                                            <span className="py-0.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium bg-success/10 text-success rounded">
                                                <LuCircleCheck className="size-3" />
                                                {grade._count?.classes}
                                            </span>
                                        )}
                                        {grade._count?.classes === 0 && (
                                            <span className="py-0.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium bg-default-200 text-default-600 rounded">
                                                <LuLoader className="size-3" />
                                                None
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-3.5 py-3">
                                        <div className="hs-dropdown relative inline-flex">
                                            <button className="btn size-7.5 bg-default-200">
                                                <LuEllipsis />
                                            </button>

                                            <div className="hs-dropdown-menu">
                                                <Link className="menu-item" to="#">
                                                    <LuEye /> View
                                                </Link>

                                                <Link className="menu-item" to="#">
                                                    <LuSquarePen /> Edit
                                                </Link>

                                                <Link className="menu-item" to="#">
                                                    <LuTrash2 /> Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* EMPTY */}
                    {!loading && grades.length === 0 && (
                        <p className="p-4 text-center">No grades found</p>
                    )}
                </div>

                {/* PAGINATION */}
                <div className="card-footer flex justify-between items-center">

                    {/* INFO */}
                    <p className="text-sm text-default-500">
                        Showing{" "}
                        <b>{(meta.page - 1) * limit + 1}</b> to{" "}
                        <b>{Math.min(meta.page * limit, meta.total)}</b> of{" "}
                        <b>{meta.total}</b>
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-2">

                        {/* PREV */}
                        <button
                            disabled={meta.page <= 1}
                            onClick={() => setPage(meta.page - 1)}
                            className="btn btn-sm border"
                        >
                            <LuChevronLeft /> Prev
                        </button>

                        {/* PAGES */}
                        {Array.from({ length: meta.lastPage || 1 }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`btn size-7.5 ${meta.page === p ? "bg-primary text-white" : "border"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        {/* NEXT */}
                        <button
                            disabled={meta.page >= meta.lastPage}
                            onClick={() => setPage(meta.page + 1)}
                            className="btn btn-sm border"
                        >
                            Next <LuChevronRight />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradeListTabel;