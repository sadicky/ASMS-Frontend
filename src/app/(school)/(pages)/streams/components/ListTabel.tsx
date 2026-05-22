/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  LuLayers3,
  LuLoader,
  LuPlus,
  LuSchool,
  LuTrash2,
  LuPencil,
} from "react-icons/lu";

import {
  getStreams,
  deleteStream,
} from "@/services/stream.service";

const StreamList = () => {
  const [loading, setLoading] =
    useState(false);

  const [streams, setStreams] =
    useState<any[]>([]);

  // 🔥 LOAD STREAMS
  const loadStreams = async () => {
    setLoading(true);

    try {
      const data = await getStreams();

      setStreams(data.data || []);
    } catch {
      toast.error(
        "Error loading streams"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStreams();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this stream?"
      );

    if (!confirmDelete) return;

    try {
      await deleteStream(id);

      toast.success(
        "Stream deleted successfully"
      );

      loadStreams();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Error deleting stream"
      );
    }
  };

  return (
    <div className="card border-0 shadow-sm">

      {/* HEADER */}
      <div className="card-header flex justify-between items-center border-b bg-default-50">

        <div className="flex items-center gap-3">

          <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <LuLayers3 className="size-5" />
          </div>

          <div>
            <h2 className="card-title">
              Streams
            </h2>

            <p className="text-sm text-default-500">
              Manage school streams
            </p>
          </div>

        </div>

        <Link
          to="/school/streams/create"
          className="btn bg-primary text-white"
        >
          <LuPlus className="me-1" />
          Add Stream
        </Link>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="p-10 text-center">
          <LuLoader className="animate-spin inline-block text-3xl" />
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        streams.length === 0 && (
          <div className="py-16 text-center">

            <div className="size-20 rounded-full bg-default-100 flex items-center justify-center mx-auto mb-4">
              <LuLayers3 className="size-9 text-default-400" />
            </div>

            <h3 className="font-semibold text-lg">
              No Streams Found
            </h3>

            <p className="text-default-500 mt-2">
              Create your first stream
            </p>

          </div>
        )}

      {/* DATA */}
      {!loading &&
        streams.length > 0 && (
          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-default-100">

                <tr>
                  <th className="p-4 text-left">
                    Stream
                  </th>

                  <th className="p-4 text-left">
                    Description
                  </th>

                  <th className="p-4 text-left">
                    Classes
                  </th>

                  <th className="p-4 text-right">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {streams.map(
                  (stream: any) => (
                    <tr
                      key={stream.id}
                      className="border-b hover:bg-default-50 transition"
                    >

                      {/* NAME */}
                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div>
                            <h4 className="font-semibold">
                              {stream.name}
                            </h4>

                            <p className="text-xs text-default-500">
                              Created Stream
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* DESC */}
                      <td className="p-4 text-default-600">
                        {stream.description ||
                          "No description"}
                      </td>

                      {/* COUNT */}
                      <td className="p-4">

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">

                          <LuSchool className="size-4" />

                          {
                            stream._count
                              ?.classes
                          }{" "}
                          Classes

                        </div>

                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">

                        <div className="flex justify-end gap-2">

                          <Link
                            to={`/school/streams/edit/${stream.id}`}
                            className="btn btn-sm border"
                          >
                            <LuPencil className="size-4" />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                stream.id
                              )
                            }
                            className="btn btn-sm border text-danger"
                          >
                            <LuTrash2 className="size-4" />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

    </div>
  );
};

export default StreamList;