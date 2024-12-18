'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { calculateTotalTime } from "./queue"



export function PersonCard({ id, person }) {
  const totalTime = calculateTotalTime(person)

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Entry Time: {person.entry_time} seconds</p>
        <p>Exit Time (Last Seen): {person.last_seen} seconds</p>
        <p>Total Time in Queue: {totalTime} seconds</p>
        <p>Anomalies: {person.anomalies?.length}</p>
        {person.anomalies?.length > 0 && (
          <ScrollArea className="h-[100px] w-full mt-2">
            <ul className="list-disc pl-4">
              {person.anomalies?.map((anomaly, index) => (
                <li key={index}>{anomaly}</li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}