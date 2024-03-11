import "./homepage-dashboard.scss"
import { PRIORITY, Vehicle } from "../../../types/types"
import { Chart } from "react-google-charts"
import { formatName } from "../../../utils/formatting"
import HomepageDashboardStats from "../homepage-dashboard-stats/homepage-dashboard-stats"
import HomepageDashboardMenu from "../homepage-dashboard-menu/homepage-dashboard-menu"

export type HomepageDashboardProps = {
  vehicles: Vehicle[]
  priority: PRIORITY
  setPriority: React.Dispatch<React.SetStateAction<PRIORITY>>
}

export default function HomepageDashboard({
  vehicles,
  priority,
  setPriority,
}: HomepageDashboardProps) {
  let data = [
    [
      {
        type: "string",
        id: "Position",
      },
      { type: "string", id: "Name" },
      //   { type: "string", role: "tooltip" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
  ]

  const rawData = vehicles
    .filter((v) => v.jobs !== null)
    .map((v) => {
      //We've already checked it isn't null
      //@ts-ignore
      return v.jobs.map((j) => {
        return [formatName(v.id), formatName(j.id), j.startTime, j.endTime]
      })
    })
    .flat(1)

  // The types are different for this data array
  //@ts-ignore
  data.push(...rawData)

  return (
    <div className="homepage-dashboard-container">
      <HomepageDashboardMenu priority={priority} setPriority={setPriority} />
      <HomepageDashboardStats vehicles={vehicles} />
      <Chart
        data={data}
        chartType="Timeline"
        width={"100%"}
        height={"500px"}
        options={{ allowHtml: true }}
      />
    </div>
  )
}
