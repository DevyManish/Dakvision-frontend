'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import api from '@/lib/api'
import { useParams } from "next/navigation";
import { Sparkles } from 'lucide-react';
import Link from 'next/link'

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { formid } = useParams();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get(`http://localhost:8090/api/v1/feedback/${formid}`)
        setFeedbacks(response.data.data.data)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch feedbacks')
        setIsLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  if (isLoading) return <div className="container mx-auto py-10">Loading...</div>
  if (error) return <div className="container mx-auto py-10">Error: {error}</div>

  return (
    <main className="container mx-auto py-10 mt-16">
      <div className='flex justify-between'>
      <h1 className="text-3xl font-bold mb-6">Feedback Submissions</h1>
      <Link href={`http://localhost:3000/dashboard/743136/postoffice/feedbacks/${formid}/insights/`}>
      <Button >Insights {" "}<Sparkles /></Button>
      </Link>
      </div>
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Mobile No</TableHead>
      <TableHead>Created At</TableHead>
      {feedbacks[0]?.answers.map((_, index) => (
        <TableHead key={index}>Question {index + 1}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
  <TableBody>
    {feedbacks.map((feedback) => (
      <TableRow key={feedback.id}>
        <TableCell className="font-medium">{feedback.id}</TableCell>
        <TableCell>{feedback.email}</TableCell>
        <TableCell>{feedback.name}</TableCell>
        <TableCell>{feedback.mobileNo}</TableCell>
        <TableCell>{new Date(feedback.createdAt).toLocaleString()}</TableCell>
        {feedback.answers.map((answer, index) => (
          <TableCell key={index}>{answer.score}</TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>

    </main>
  )
}


