import "./homepage-vehicle-rota.scss"
import { Vehicle } from "../../../types/types"
import { formatName, formatNumber } from "../../../utils/formatting"
import { averageWeights, sumDistance } from "../../../utils/algorithm"

export type HomepageVehicleRotaProps = {
  vehicle: Vehicle
}

export default function HomepageVehicleRota({
  vehicle,
}: HomepageVehicleRotaProps) {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto homepage-vehicle-rota-container">
      {/* <!-- Card --> */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              {/* <!-- Header --> */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {formatName(vehicle.id)}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Overview of routes
                  </p>
                </div>

                <div>
                  {/* <div className="inline-flex gap-x-2">
                    <a
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      View all
                    </a>

                    <a
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      Create
                    </a>
                  </div> */}
                </div>
              </div>
              {/* <!-- End Header -->
 
           <!-- Table --> */}
              {vehicle.jobs && (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start border-s border-gray-200 dark:border-gray-700"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Name
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Distance (km)
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Weight (kg)
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Start
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          End
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {vehicle.jobs.map((j, i) => {
                      return (
                        <tr key={i}>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2 flex items-center gap-x-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatName(j.id)}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2 flex items-center gap-x-3">
                              <span className="text-sm text-gray-800 dark:text-gray-200">
                                {j.constraintDistanceInKm}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2 flex items-center gap-x-3">
                              <span className="text-sm text-gray-800 dark:text-gray-200">
                                {j.constraintPayloadWeightInKg}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2 flex items-center gap-x-3">
                              <span className="text-sm text-gray-800 dark:text-gray-200">
                                {j.startTime.toLocaleTimeString()}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2 flex items-center gap-x-3">
                              <span className="text-sm text-gray-800 dark:text-gray-200">
                                {j.endTime.toLocaleTimeString()}
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
              {/* <!-- End Table -->
 
           <!-- Footer --> */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {vehicle.jobs && vehicle.jobs.length}
                    </span>{" "}
                    result(s)
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total distance:{" "}
                      <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">
                        {formatNumber(sumDistance(vehicle))}
                      </span>
                      Average weight:{" "}
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {formatNumber(averageWeights(vehicle))}
                      </span>
                    </p>
                  </div>
                  {/* <div className="inline-flex gap-x-2">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      Prev
                    </button>

                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Next
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div> */}
                </div>
              </div>
              {/* <!-- End Footer --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    //   {/* <!-- End Card --> */}
  )
}
