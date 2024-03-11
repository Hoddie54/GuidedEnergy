import { useState } from "react"
import { Data, PRIORITY } from "../../../types/types"
import NavLeft from "../../nav/nav-left"
import NavTop from "../../nav/nav-top"
import HomepageDashboard from "../homepage-dashboard/homepage-dashboard"
import HomepageVehicleRota from "../homepage-vehicle-rota/homepage-vehicle-rota"
import "./homepage-data.scss"

export type HomepageDataProps = {
  data: Data
  priority: PRIORITY
  setPriority: React.Dispatch<React.SetStateAction<PRIORITY>>
}

export default function HomepageData({
  data,
  priority,
  setPriority,
}: HomepageDataProps) {
  const [selectedVehicle, setSelectedVehicle] = useState(-1)

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-900">
        <NavTop />

        {/* <!-- ========== MAIN CONTENT ========== --> */}
        {/* <!-- Sidebar Toggle --> */}
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center py-4"></div>
        </div>

        <NavLeft
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          vehicles={data.vehicles}
        />

        {/* <!-- Content --> */}
        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72 h-100">
          {selectedVehicle === -1 && (
            <HomepageDashboard
              vehicles={data.vehicles}
              priority={priority}
              setPriority={setPriority}
            />
          )}
          {selectedVehicle !== -1 && (
            <HomepageVehicleRota vehicle={data.vehicles[selectedVehicle]} />
          )}
        </div>
        {/* <!-- End Content -->
  <!-- ========== END MAIN CONTENT ========== --> */}
      </div>
    </>
  )
}
