import React, { useState, useEffect, Key } from "react";
import { IFormData } from "../types/form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Link, useQueryParams } from "raviger";

const Home = () => {
  const [{ search }, setQueryParams] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [localForms, setLocalForms] = useState([]);

  useEffect(() => {
    const localForms = localStorage.getItem("formDatas");
    if (localForms) {
      setLocalForms(JSON.parse(localForms));
    }
  }, []);

  // search useEffect
  useEffect(() => {
    let timeout = setTimeout(() => {
      setQueryParams({ search: searchString });
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  const handleDelete = (id: string) => {
    const updatedLocalForms = localForms.filter(
      (f: IFormData) => f.id.toString() !== id
    );
    setLocalForms(updatedLocalForms);
    localStorage.setItem("formDatas", JSON.stringify(updatedLocalForms));
  };
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-search"
          >
            Search
          </label>
          <input
            className="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
            id="grid-search"
            name="search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            type="search"
            placeholder="Search"
          />
        </div>
      </div>
      {localForms.length > 0 &&
        localForms
          .filter((f: IFormData) =>
            f.title.toLowerCase().includes(search?.trim().toLowerCase() || "")
          )
          .map((f: IFormData) => (
            <div className="flex" key={f.id as Key}>
              <div className="bg-slate-100 flex w-full justify-between items-center p-4 rounded-xl mt-4">
                <div className="flex justify-start items-center gap-2">
                  <div>
                    <p className="text-gray-700 text-lg font-medium tracking-wider">
                      <span className="">{f.title}</span>
                    </p>
                  </div>
                </div>
                <div className="flex columns-2 space-x-2">
                  <Link
                    href={`/preview/${f.id}`}
                    className="w-full bg-blue-400 font-medium px-2 py-1 rounded-md text-white tracking-wide"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <Link
                    href={`/form/${f.id}`}
                    className="w-full bg-teal-400 font-medium px-2 py-1 rounded-md text-white tracking-wide"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    onClick={() => handleDelete(f.id.toString())}
                    className="w-full bg-rose-500 font-medium px-2 py-1 rounded-md text-white tracking-wide"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      <div className="my-4">
        <Link
          href={`/form/${Number(new Date())}`}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded"
        >
          New Form
        </Link>
      </div>
    </>
  );
};

export default Home;
