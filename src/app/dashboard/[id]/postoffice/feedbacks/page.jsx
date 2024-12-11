'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import api from '@/lib/api'

export default function FeedbackManagementPage() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get('http://localhost:8090/api/v1/feedback/all?branchCode=743136')

          // Transform the data to match our desired structure
          const transformedData = response.data.data.feedbacks.map((item) => ({
            id: item.id,
            title: `Feedback from ${item.name}`,
            qrcode: 'N/A', // QR code is not provided in the API response
            createdAt: new Date(item.createdAt).toLocaleString(),
            userId: item.email,
            branchCode: '743136', // Using the branch code from the API URL
          }))
          setFeedbacks(transformedData)
      } catch (error) {At
        console.error('Error fetching feedbacks:', error)
      }
    }

    fetchFeedbacks()
  }, [])

  return (
    <div className="container mx-auto py-10 mt-16">
      <h1 className="text-2xl font-bold mb-5">Feedback Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>QR Code</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Branch Code</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.id}</TableCell>
              <TableCell>{feedback.title}</TableCell>
              <TableCell>{feedback.qrcode}</TableCell>
              <TableCell>{feedback.createdAt}</TableCell>
              <TableCell>{feedback.branchCode}</TableCell>
              <TableCell>
                <Button asChild>
                  <Link href={`http://localhost:3000/dashboard/743136/postoffice/feedbacks/${feedback.id}`}>
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

