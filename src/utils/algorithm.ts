import { Job, JobWeightCategory, PRIORITY, Vehicle } from "../types/types"

const SENSITIVITY = 0.15

export function assignVehicles(
  jobs: Job[],
  vehicles: Vehicle[],
  priority: PRIORITY = PRIORITY.DISTANCE
) {
  const weightMean = getWeightMeanFromJobs(jobs, vehicles.length)
  //const distanceMean = getDistanceMeanFromJobs(jobs, vehicles.length)

  let newJobs = [...jobs]
  //First, sort all jobs by the relevant parameter
  //In the mix case, we sort by distance and later mark HEAVY/LIGHT jobs
  newJobs.sort((a, b) => {
    switch (priority) {
      case PRIORITY.DISTANCE:
        return -a.constraintDistanceInKm + b.constraintDistanceInKm
      case PRIORITY.WEIGHT:
        return -a.constraintPayloadWeightInKg + b.constraintPayloadWeightInKg
      case PRIORITY.MIX:
        return -a.constraintDistanceInKm + b.constraintDistanceInKm
    }
    return 0
  })

  //Iterate through all jobs
  newJobs.map((j) => {
    //Make sure vehicles match the criteria
    const elegibleVehicles = vehicles.filter((v) => {
      return (
        doesVehicleHaveLessThan3Jobs(v) &&
        isVehicleDistanceLessThan150(v, j) &&
        isVehicleFree(v, j)
      )
    })

    if (elegibleVehicles.length === 0)
      console.error("NOT ENOUGH ELEGIBLE VEHICLES. ALLOCATION FAILED")

    //Sort the vehicles to ensure least used ones are allocated first
    if (priority === PRIORITY.DISTANCE)
      elegibleVehicles.sort((a, b) => sumDistance(a) - sumDistance(b))
    if (priority === PRIORITY.WEIGHT)
      elegibleVehicles.sort((a, b) => sumWeights(a) - sumWeights(b))
    if (priority === PRIORITY.MIX) {
      const weightDifference = sumWeights(j)
      const weightThreshold = SENSITIVITY * weightMean
      if (weightDifference > weightMean + weightThreshold) {
        j.jobWeightCategory = JobWeightCategory.HEAVY
      } else if (weightThreshold < weightMean - weightThreshold) {
        j.jobWeightCategory = JobWeightCategory.LIGHT
      } else {
        j.jobWeightCategory = JobWeightCategory.NORMAL
      }

      elegibleVehicles.sort((a, b) => {
        const distanceDifference = sumDistance(a) - sumDistance(b)
        const weightDifference = sumWeights(a) - sumWeights(b)

        switch (j.jobWeightCategory) {
          case JobWeightCategory.NORMAL:
            return distanceDifference
          case JobWeightCategory.HEAVY:
            return weightDifference
          case JobWeightCategory.LIGHT:
            return weightDifference
          default:
            return distanceDifference
        }
      })
    }

    //Allocate vehicle with the lowest distance / weight so far to new job
    addJob(elegibleVehicles[0], j)

    return ""
  })

  return vehicles
}

export function doesVehicleHaveLessThan3Jobs(vehicle: Vehicle) {
  if (!vehicle.jobs) return true
  return vehicle.jobs?.length <= 2
}

export function isVehicleDistanceLessThan150(vehicle: Vehicle, job: Job) {
  const totalDistance = sumDistance(vehicle) + job.constraintDistanceInKm
  return totalDistance <= 150
}

export function isVehicleFree(vehicle: Vehicle, job: Job) {
  if (!vehicle.jobs) return true
  if (vehicle.jobs.length === 0) return true

  //Checks if currentJob and job clash
  //True if no clash. False if clash
  const freeArray = vehicle.jobs.map((currentJob) => {
    if (currentJob.endTime < job.startTime) return true
    if (currentJob.startTime > job.endTime) return true
    return false
  })

  return freeArray.reduce((a, b) => a && b, true)
}

export function sumWeights(vehicle: Vehicle) {
  if (!vehicle.jobs) return 0
  return vehicle.jobs.reduce((a, v) => {
    return a + v.constraintPayloadWeightInKg
  }, 0)
}

export function sumDistance(vehicle: Vehicle) {
  if (!vehicle.jobs) return 0
  return vehicle.jobs.reduce((a, v) => {
    return a + v.constraintDistanceInKm
  }, 0)
}

export function averageWeights(vehicle: Vehicle) {
  if (!vehicle.jobs) return 0
  return sumWeights(vehicle) / vehicle.jobs.length
}

export function averageDistance(vehicle: Vehicle) {
  if (!vehicle.jobs) return 0
  return sumDistance(vehicle) / vehicle.jobs.length
}

export function addJob(vehicle: Vehicle, job: Job) {
  if (vehicle.jobs) {
    vehicle.jobs.push(job)
  } else {
    vehicle.jobs = [job]
  }
}

export function getStandardDeviation(array: number[]) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  )
}

export function getMean(array: number[]) {
  const n = array.length
  return array.reduce((a, b) => a + b) / n
}

//Gets the mean of the total weight a Vehicle carries
export function getWeightMean(vehicles: Vehicle[]) {
  const weightArray = vehicles.map((v) => {
    return v.jobs
      ? v.jobs?.reduce((b, j) => b + j.constraintPayloadWeightInKg, 0)
      : 0
  })
  return getMean(weightArray)
}

export function getWeightMeanFromJobs(jobs: Job[], vehicleCount: number) {
  const sum = jobs.reduce((a, j) => {
    return a + j.constraintPayloadWeightInKg
  }, 0)
  return sum / vehicleCount
}

export function getDistanceMeanFromJobs(jobs: Job[], vehicleCount: number) {
  const sum = jobs.reduce((a, j) => {
    return a + j.constraintDistanceInKm
  }, 0)
  return sum / vehicleCount
}

//Gets the mean of the total distance a Vehicle travels
export function getDistanceMean(vehicles: Vehicle[]) {
  const distanceArray = vehicles.map((v) => {
    return v.jobs
      ? v.jobs?.reduce((b, j) => b + j.constraintDistanceInKm, 0)
      : 0
  })
  return getMean(distanceArray)
}

export function wipeJobs(vehicles: Vehicle[]) {
  vehicles.map((v) => {
    v.jobs = []
    return 0
  })
}
