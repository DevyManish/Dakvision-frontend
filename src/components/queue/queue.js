
export const calculateTotalTime = (person) => {
  return person.last_seen - person.entry_time
}

export const getAnomalyTypes = (anomalies) => {
  return anomalies?.map(anomaly =>
    anomaly.startsWith("Waiting too long") ? "Waiting too long" : "Abnormal size"
  )
}