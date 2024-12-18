'use client';

export function Summary({ data }) {
  if (!data || !data.person_details) {
    return <div>No data available</div>;
  }

  const { person_details, total_persons } = data;

  const totalAnomalies = Object.values(person_details).reduce(
    (sum, person) => sum + (person.anomalies?.length || 0),
    0
  );

  const averageAnomalies =
    total_persons > 0 ? totalAnomalies / total_persons : 0;

  return (
    <div>
      <h2>Total Persons: {total_persons}</h2>
      <h3>Total Anomalies: {totalAnomalies}</h3>
      <h3>Average Anomalies per Person: {averageAnomalies.toFixed(2)}</h3>
      {/* <ul>
        {Object.entries(person_details).map(([id, person]) => (
          <li key={id}>
            <strong>{id}</strong> - Anomalies: {person.anomalies?.length || 0}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
