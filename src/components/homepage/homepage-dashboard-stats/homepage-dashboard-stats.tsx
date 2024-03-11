import { Vehicle } from "../../../types/types"
import { getMean, getStandardDeviation } from "../../../utils/algorithm"
import { formatNumber } from "../../../utils/formatting"

export type HomepageDashboardStatsProps = {
  vehicles: Vehicle[]
}

export default function HomepageDashboardStats({
  vehicles,
}: HomepageDashboardStatsProps) {
  // const totalDistance = vehicles.reduce((a, v) => {
  //   return (
  //     a +
  //     (v.jobs ? v.jobs?.reduce((b, j) => b + j.constraintDistanceInKm, 0) : 0)
  //   )
  // }, 0)

  const distanceArray = vehicles.map((v) => {
    return v.jobs
      ? v.jobs?.reduce((b, j) => b + j.constraintDistanceInKm, 0)
      : 0
  })
  const distanceMean = formatNumber(getMean(distanceArray))
  const distanceSD = formatNumber(getStandardDeviation(distanceArray))

  const weightArray = vehicles.map((v) => {
    return v.jobs
      ? v.jobs?.reduce((b, j) => b + j.constraintPayloadWeightInKg, 0)
      : 0
  })

  const weightMean = formatNumber(getMean(weightArray))
  const weightSD = formatNumber(getStandardDeviation(weightArray))

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* <!-- Card --> */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Mean Distance
              </p>
              {/* <div className="hs-tooltip">
                <div className="hs-tooltip-toggle">
                  <svg
                    className="flex-shrink-0 size-4 text-gray-500"
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-slate-700"
                    role="tooltip"
                  >
                    Mean distance that a vehicle travels (km)
                  </span>
                </div>
              </div> */}
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {distanceMean}
              </h3>
            </div>
          </div>
        </div>
        {/* <!-- End Card -->
    
        <!-- Card --> */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Distance S.D.
              </p>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {distanceSD}
              </h3>
            </div>
          </div>
        </div>
        {/* <!-- End Card -->
    
        <!-- Card --> */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Weight Mean
              </p>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {weightMean}
              </h3>
            </div>
          </div>
        </div>
        {/* <!-- End Card -->
    
        <!-- Card --> */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Weight S.D.
              </p>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                {weightSD}
              </h3>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  )
}
