import { Data, Job } from "../types/types"
import { assignVehicles } from "./algorithm"

//Reads input_file.json data and sets the dtate
export function readFileAndSetState(
  file: any,
  setState: React.Dispatch<React.SetStateAction<Data | null>>
) {
  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      //@ts-ignore
      let d = JSON.parse(event.target.result)

      setState(d)
    } catch (e) {
      console.error("ERROR WHILST PARSING JSON FILE")
      console.error(e)
    }
  }
  reader.readAsText(file)
}
