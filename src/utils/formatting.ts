import { Job } from "../types/types"

export function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.substring(1)
}

export function formatNumber(number: number) {
  return Math.round(number * 10) / 10
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function formatHTMLForRouteDashboard(job: Job) {
  return `<div style={{padding: 1rem}}>
    ${formatName(job.id)}
  </div>`
}
