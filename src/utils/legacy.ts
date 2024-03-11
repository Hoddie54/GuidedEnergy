//Old code that I tried but won't use is here

import { Job, Vehicle } from "../types/types"
import { isVehicleFree, sumWeights } from "./algorithm"

//Perform all swaps
// vehicles.map((v1) => {
//   return v1.jobs?.map((j1, i1) => {
//     return vehicles.map((v2) => {
//       if (v1.id === v2.id) return ""
//       return v2.jobs?.map((j2, i2) => {
//         // console.log(areRoutesSwappable(v1, i1, v2, i2))
//         if (areRoutesSwappable(v1, i1, v2, i2)) {
//           const deviation = findChangeInRangeAfterSwap(
//             v1,
//             i1,
//             v2,
//             i2,
//             weightMean
//           )
//           // console.log(deviation, v1.id, j1, v2.id, j2)
//           if (deviation > 0) {
//             // console.log(deviation, v1.id, j1, v2.id, j2)
//             // performSwap(v1, i1, v2, i2)
//           }
//         }
//       })
//     })
//   })
// })

//Helper function for performing pairwise swaps on routes
export function areRoutesSwappable(
  vehicle1: Vehicle,
  route1: number,
  vehicle2: Vehicle,
  route2: number
) {
  const v1 = JSON.parse(JSON.stringify(vehicle1))
  const v2 = JSON.parse(JSON.stringify(vehicle2))

  const r1 = v1.jobs ? v1.jobs[route1] : null
  const r2 = v2.jobs ? v2.jobs[route2] : null

  v1.jobs?.splice(route1, 1)
  v2.jobs?.splice(route2, 1)

  if (!r1 || !r2) return false

  return isVehicleFree(v1, r2) && isVehicleFree(v2, r1)
}

//After a swap is performed there will be some change in the S.D.
//This function calculates whether a swap will increase or decrease the S.D.
//If the value returned is positive, the swap is worth doing
//Otherwise, the swap should not occur
export function findChangeInRangeAfterSwap(
  vehicle1: Vehicle,
  route1: number,
  vehicle2: Vehicle,
  route2: number,
  mean: number
) {
  let v1 = JSON.parse(JSON.stringify(vehicle1))
  let v2 = JSON.parse(JSON.stringify(vehicle2))

  const n1 = v1.jobs.length
  const n2 = v2.jobs.length

  if (n1 === 1 && n2 === 1) return 0

  const originalMeanDistanceV1 = sumWeights(v1)
  const originalMeanDistanceV2 = sumWeights(v2)
  const originalDeviation =
    Math.pow(mean - originalMeanDistanceV1, 2) +
    Math.pow(mean - originalMeanDistanceV2, 2)

  const r1 = v1.jobs ? v1.jobs[route1] : null
  const r2 = v2.jobs ? v2.jobs[route2] : null

  if (!r1 || !r2) return 0

  v1 = JSON.parse(JSON.stringify(v1))
  v2 = JSON.parse(JSON.stringify(v2))

  v1.jobs?.splice(route1, 1)
  v2.jobs?.splice(route2, 1)
  v1.jobs?.push(r2)
  v2.jobs?.push(r1)

  v1 = JSON.parse(JSON.stringify(v1))
  v2 = JSON.parse(JSON.stringify(v2))

  const newMeanDistanceV1 = sumWeights(v1)
  const newMeanDistanceV2 = sumWeights(v2)
  const newDeviation =
    Math.pow(mean - newMeanDistanceV1, 2) +
    Math.pow(mean - newMeanDistanceV2, 2)

  console.log(originalDeviation, newDeviation, originalDeviation - newDeviation)

  return originalDeviation - newDeviation
}

export function performSwap(
  vehicle1: Vehicle,
  route1: number,
  vehicle2: Vehicle,
  route2: number
) {
  const r1 = vehicle1.jobs ? vehicle1.jobs[route1] : null
  const r2 = vehicle2.jobs ? vehicle2.jobs[route2] : null
  if (!r1 || !r2) return 0
  vehicle1.jobs?.splice(route1, 1)
  vehicle2.jobs?.splice(route2, 1)
  vehicle1.jobs?.push(r2)
  vehicle2.jobs?.push(r1)
}

//TODO - OLD
//Asigns vehicles in simple order
export function asignVehicles(jobs: Job[], vehicles: Vehicle[]) {
  jobs.map((j, i) => {
    const v = vehicles[i % vehicles.length]
    if (v.jobs) {
      v.jobs.push(j)
    } else {
      v.jobs = [j]
    }
    return ""
  })
  return vehicles
}
