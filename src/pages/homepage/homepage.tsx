import { useEffect, useState } from "react"
import HomepageData from "../../components/homepage/homepage-data/homepage-data"
import HomepageWelcome from "../../components/homepage/homepage-welcome/homepage-welcome"
import { Data, Job, PRIORITY } from "../../types/types"
import { assignVehicles } from "../../utils/algorithm"
import "./homepage.scss"

export default function Homepage() {
  const [rawData, setRawData] = useState<Data | null>(null)
  const [priority, setPriority] = useState<PRIORITY>(PRIORITY.DISTANCE)
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    if (rawData) {
      //Creates deep copy
      const d: Data = JSON.parse(JSON.stringify(rawData))

      //Changes type of times into Dates
      d.jobs = d.jobs.map((j: Job) => {
        j.startTime = new Date(j.startTime)
        j.endTime = new Date(j.endTime)
        return j
      })

      if (d && d.jobs && d.vehicles) {
        assignVehicles(d.jobs, d.vehicles, priority)
      }
      setData(d)
    }
  }, [setData, rawData, priority])

  if (!rawData || !data) {
    return <HomepageWelcome setData={setRawData} />
  } else {
    return (
      <>
        <HomepageData
          data={data}
          priority={priority}
          setPriority={setPriority}
        />
      </>
    )
  }
}
