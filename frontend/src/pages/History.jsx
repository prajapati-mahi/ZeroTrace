import {

  useEffect,

  useMemo,

  useState,

} from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import SkeletonCard from "../components/SkeletonCard";



import api from "../services/api";



const History = () => {



  const [reports, setReports] =

    useState([]);



const [filter, setFilter] =

  useState("ALL");



  const [loading, setLoading] =

    useState(true);



  useEffect(() => {

    fetchReports();

  }, []);



  const fetchReports = async () => {



    try {



      const res =

        await api.get("/history");



      setReports(

        res.data.reports || []

      );



    } catch (error) {



      console.log(error);



    } finally {



      setLoading(false);



    }



  };



  const [search, setSearch] = useState("");



const [riskFilter, setRiskFilter] =

  useState("ALL");



  const deleteReport = async (id) => {



  const confirmDelete = window.confirm(

    "Delete this report?"

  );



  if (!confirmDelete) return;



  try {



    await api.delete(`/report/${id}`);



    toast.success(

      "Report deleted successfully"

    );



    fetchReports();



  } catch (error) {



    toast.error(

      error.response?.data?.message ||

      "Delete failed"

    );



  }



};





const filteredReports =

  useMemo(() => {



    return reports.filter(

      (report) => {



        const title =

          report.title || "";



        const risk =

          report.risk || "";



        const matchesSearch =

          title

            .toLowerCase()

            .includes(

              search.toLowerCase()

            );



        const matchesFilter =

          filter === "ALL"

            ? true

            : risk === filter;



        return (

          matchesSearch &&

          matchesFilter

        );



      }

    );



  }, [

    reports,

    search,

    filter,

  ]);

  if (!stats) {

  return (

    <div className="min-h-screen bg-[#09090F] p-10">



      <div className="grid md:grid-cols-4 gap-6">



        <SkeletonCard />

        <SkeletonCard />

        <SkeletonCard />

        <SkeletonCard />



      </div>



    </div>

  );

}



  return (



    <div className="min-h-screen bg-[#09090F] text-white px-10 py-10">



      <div className="max-w-7xl mx-auto">



        <div className="flex justify-between items-center mb-10">



          <div>



            <h1 className="text-5xl font-black">



              Report History



            </h1>



            <div className="flex gap-4 mt-10 mb-10">



  <input

    type="text"

    placeholder="Search reports..."

    value={search}

    onChange={(e) =>

      setSearch(e.target.value)

    }

    className="

      flex-1

      bg-[#151523]

      border

      border-[#2a2a3e]

      rounded-xl

      px-5

      py-4

      outline-none

      focus:border-cyan-400

    "

  />



  <select

    value={filter}

    onChange={(e) =>

      setFilter(

        e.target.value

      )

    }

    className="

      bg-[#151523]

      border

      border-[#2a2a3e]

      rounded-xl

      px-5

      py-4

    "

  >



    <option value="ALL">



      All Risks



    </option>



    <option value="LOW">



      LOW



    </option>



    <option value="MEDIUM">



      MEDIUM



    </option>



    <option value="HIGH">



      HIGH



    </option>



    <option value="LOW RISK">



      LOW RISK



    </option>



    <option value="MEDIUM RISK">



      MEDIUM RISK



    </option>



    <option value="HIGH RISK">



      HIGH RISK



    </option>



  </select>



</div>



            <p className="text-gray-400 mt-3">

              <div className="flex gap-5 mt-8 mb-10">



  <input

    type="text"

    placeholder="Search Reports..."

    value={search}

    onChange={(e) =>

      setSearch(e.target.value)

    }

    className="

      bg-[#151523]

      border

      border-[#2D2D44]

      rounded-xl

      px-5

      py-3

      w-80

      outline-none

      focus:border-cyan-400

    "

  />



  <select

    value={riskFilter}

    onChange={(e) =>

      setRiskFilter(e.target.value)

    }

    className="

      bg-[#151523]

      border

      border-[#2D2D44]

      rounded-xl

      px-5

      py-3

      outline-none

      focus:border-cyan-400

    "

  >

    <option value="ALL">

      All Risk

    </option>



    <option value="LOW">

      LOW

    </option>



    <option value="MEDIUM">

      MEDIUM

    </option>



    <option value="HIGH">

      HIGH

    </option>



  </select>



</div>



              All your plagiarism reports in one place.



            </p>



          </div>



          <Link

            to="/dashboard"

            className="

            px-6

            py-3

            rounded-xl

            bg-cyan-500

            hover:bg-cyan-600

            transition

            "

          >

            Dashboard

          </Link>



        </div>



        {

          filteredReports.length === 0 ?



          (



            <div

              className="

              bg-[#151523]

              rounded-3xl

              p-20

              text-center

              border

              border-[#2D2D44]

              "

            >



              <h2 className="text-3xl font-bold">



                No Reports Found



              </h2>



              <p className="text-gray-400 mt-4">



                Start checking plagiarism to create reports.



              </p>



            </div>



          )



          :



          (



            <div className="grid lg:grid-cols-2 gap-8">



              {

                filteredReports.map((report) => (



                  <div

                    key={report._id}

                    className="

                    bg-[#151523]

                    border

                    border-[#2D2D44]

                    rounded-3xl

                    p-8

                    hover:border-cyan-400

                    transition

                    "

                  >



                    <h2 className="text-2xl font-bold">



                      {report.title}



                    </h2>



                    <p className="text-gray-400 mt-3">



                      {

                        new Date(

                          report.createdAt

                        ).toLocaleString()

                      }



                    </p>



                    <div className="flex gap-8 mt-8">



                      <div>



                        <p className="text-gray-400">



                          Similarity



                        </p>



                        <h3 className="text-3xl font-bold text-cyan-400">



                          {report.plagiarismScore}%



                        </h3>



                      </div>



                      <div>



                        <p className="text-gray-400">



                          AI Score



                        </p>



                        <h3 className="text-3xl font-bold text-purple-400">



                          {report.aiScore}%



                        </h3>



                      </div>



                    </div>



                    <div className="mt-6">



  <span

    className={`

      px-4

      py-2

      rounded-full

      font-semibold

      text-sm



      ${

        report.risk.includes("LOW")

          ? "bg-green-500/20 text-green-400"



        : report.risk.includes("MEDIUM")

          ? "bg-yellow-500/20 text-yellow-400"



        : "bg-red-500/20 text-red-400"

      }

    `}

  >

    {report.risk}

  </span>



</div>



                    <div className="mt-8 flex gap-4">



                      <Link

                        to={`/report/${report._id}`}

                        className="

                        px-6

                        py-3

                        rounded-xl

                        bg-cyan-500

                        hover:bg-cyan-600

                        transition

                        "

                      >

                        View Report

                      </Link>

                      <a

                        href={`http://localhost:5000/api/report/pdf/${report._id}`}

                        target="_blank"

                        rel="noreferrer"

                        className="

                        px-6

                        py-3

                        rounded-xl

                        border

                        border-[#2D2D44]

                        hover:border-cyan-400

                        "

                      >

                        PDF

                      </a>



                      <button

  onClick={() =>

    deleteReport(report._id)

  }

  className="

  px-6

  py-3

  rounded-xl

  bg-red-500

  hover:bg-red-600

  transition

 "
>

  Delete
</button>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
};
export default History;
 