"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from 'lucide-react'

export default function QueueTicketsPage() {
  const [tickets, setTickets] = useState([])    
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/bookTicket/view/743135")
        setTickets(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch tickets. Please try again later.")
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const handleAccept = (ticketId) => {
    setTickets(tickets.filter(ticket => ticket.ticketId !== ticketId))
    // In a real application, you would handle the accepted ticket here
    console.log(`Ticket ${ticketId} accepted`)
  }

  const handleDecline = (ticketId) => {
    setTickets(tickets.filter(ticket => ticket.ticketId !== ticketId))
    // In a real application, you would handle the declined ticket here
    console.log(`Ticket ${ticketId} declined`)
  }

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto py-10 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto mt-16 px-5 md:px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">Queue Tickets Management</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.ticketId}>
                <TableCell>{ticket.ticketId}</TableCell>
                <TableCell>{ticket.fullName}</TableCell>
                <TableCell>
                  <Badge variant="outline">{ticket.serviceCategory}</Badge>
                </TableCell>
                <TableCell>{ticket.branchName}</TableCell>
                <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAccept(ticket.ticketId)}
                    className="mr-2"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDecline(ticket.ticketId)}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

