import { getYears } from "@/services/year.service";
import { Link, useNavigate } from 'react-router';
import {
    LuChevronLeft,
    LuChevronRight,
    LuCircleCheck,
    LuEllipsis,
    LuEye,
    LuLoader,
    LuPlus,
    LuSearch,
    LuSlidersHorizontal,
    LuSquarePen,
    LuTrash2,
} from 'react-icons/lu';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Year = {
    id: string;
    name: string;
};

const YearListTabel = () => {
    const navigate = useNavigate();
    const [years, setYears] = useState<Year[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10; // nombre d'années par page


    useEffect(() => {
        const fetchYears = async () => {
            setLoading(true);
            try {
                const res = await getYears();
                setYears(res.data || []);
            } catch (err: any) {
                console.error(err);
                toast.error("Error loading school years");
                setError(err.response?.data?.message || "Failed to load years");
            } finally {
                setLoading(false);
            }
        };

        fetchYears();
    }, []);


    // Filter & paginate
    const filteredYears = years.filter((year) =>
        year.name.toLowerCase().includes(search.toLowerCase())
    );

    const lastPage = Math.ceil(filteredYears.length / limit);
    const paginatedYears = filteredYears.slice((page - 1) * limit, page * limit);

    return (
        <div className="card">
            <div className="card-header">
                <h6 className="card-title">List</h6>
                <button onClick={() => navigate("/admin/years/create")} className="btn btn-sm bg-primary text-white">
                    <LuPlus className="size-4 me-1" />
                    Add School Year
                </button>
            </div>

            <div className="card-header">
                <div className="md:flex items-center md:space-y-0 space-y-4 gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setPage(1);
                                setSearch(e.target.value);
                            }}
                            className="form-input form-input-sm ps-9"
                            placeholder="Search for School Year"
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                            <LuSearch className="size-3.5 flex items-center text-default-500 fill-default-100" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-center flex-wrap">

                    <button
                        type="button"
                        className="btn btn-sm size-7.5 bg-default-100 text-default-500 hover:bg-default-1500  hover:text-white"
                    >
                        <LuSlidersHorizontal className="size-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col">

                {loading && <span className="p-4 text-danger font-medium text-center"><LuLoader className="animate-spin" /> Loading...</span>}

                {error && <p className="text-red-500">{error}</p>}

                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-default-200">
                                <thead className="bg-default-150">
                                    <tr className="text-sm font-normal text-default-700 whitespace-nowrap">
                                        <th className="px-3.5 py-3 text-start">School Year</th>
                                        <th className="px-3.5 py-3 text-start">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {years.map((year) => (
                                        <tr
                                            key={year.id}
                                            className="text-default-800 font-normal text-sm whitespace-nowrap"
                                        >
                                            <td className="py-3 px-3.5  text-primary">{year.name}</td>
                                            <td className="px-3.5 py-3">
                                                <div className="hs-dropdown relative inline-flex">
                                                    <button
                                                        type="button"
                                                        className="hs-dropdown-toggle btn size-7.5 bg-default-200 hover:bg-default-600 text-default-500"
                                                    >
                                                        <LuEllipsis className="size-4" />
                                                    </button>
                                                    <div className="hs-dropdown-menu" role="menu">
                                                        <Link
                                                            to="#"
                                                            className="flex items-center gap-1.5 py-1.5 px-3 text-default-500 hover:bg-default-150 rounded"
                                                        >
                                                            <LuEye className="size-3" /> Overview
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="flex items-center gap-1.5 py-1.5 px-3 text-default-500 hover:bg-default-150 rounded"
                                                        >
                                                            <LuSquarePen className="size-3" /> Edit
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="flex items-center gap-1.5 py-1.5 px-3 text-default-500 hover:bg-default-150 rounded"
                                                        >
                                                            <LuTrash2 className="size-3" /> Delete
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </div>
                    </div>
                    {/* EMPTY */}
                    {!loading && paginatedYears.length === 0 && (
                        <p className="p-4 text-center">No DATA</p>
                    )}
                </div>

                <div className="card-footer">
                    {/* INFO */}
                    <p className="text-default-500 text-sm">
                        Showing{" "}
                        <b>{filteredYears.length === 0 ? 0 : (page - 1) * limit + 1}</b> to{" "}
                        <b>{Math.min(page * limit, filteredYears.length)}</b> of{" "}
                        <b>{filteredYears.length}</b> Results
                    </p>
                    {/* PAGINATION */}
                    <nav className="flex items-center gap-2" aria-label="Pagination">
                        {/* PREV */}
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            type="button"
                            className="btn btn-sm border bg-transparent border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"
                        >
                            <LuChevronLeft className="size-4 me-1" /> Prev
                        </button>

                        {/* PAGES */}
                        {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`btn size-7.5 ${page === p ? "bg-primary text-white" : "border"}`}
                            >
                                {p}
                            </button>
                        ))}

                        {/* NEXT */}
                        <button
                            disabled={page === lastPage || lastPage === 0}
                            onClick={() => setPage(page + 1)}
                            type="button"
                            className="btn btn-sm border bg-transparent border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"
                        >
                            Next <LuChevronRight className="size-4 ms-1" />
                        </button>
                    </nav>
                </div>

            </div>
        </div>
    );
};

export default YearListTabel;
