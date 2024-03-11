export type Data = {
  vehicles: Vehicle[]
  jobs: Job[]
}

export type Vehicle = {
  id: string
  jobs?: Job[]
}

export type Job = {
  id: string
  constraintDistanceInKm: number
  constraintPayloadWeightInKg: number
  startTime: Date
  endTime: Date
  jobWeightCategory?: JobWeightCategory
}

export enum JobWeightCategory {
  NORMAL,
  HEAVY,
  LIGHT,
}

export enum PRIORITY {
  DISTANCE,
  WEIGHT,
  MIX,
}
