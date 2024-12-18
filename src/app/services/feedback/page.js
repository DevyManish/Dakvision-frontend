"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useParams } from "next/navigation";

export default function FeedbackResponseForm() {
  const { formid } = useParams();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [ratings, setRatings] = useState({});
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleRatingChange = (questionId, rating) => {
    setRatings((prev) => ({ ...prev, [questionId]: parseInt(rating) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !mobile) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(ratings).length !== questions.length) {
      toast({
        title: "Error",
        description: "Please rate all questions",
        variant: "destructive",
      });
      return;
    }

    const answers = Object.entries(ratings).map(([questionId, score]) => ({
      questionId,
      score,
    }));

    const formData = {
      name,
      email,
      mobileNo: mobile,
      answers,
    };

    console.log("Submitting form data:", formData);

    try {
      const response = await api.post(`/feedback/${formid}/submit`, formData);
      console.log("API Response:", response.data);

      toast({
        title: "Success",
        description: "Your feedback has been submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchFeedbackForm = async () => {
      try {
        const response = await api.get(`/feedback/${formid}/questions`);
        const formData = response.data.data;

        console.log("Form Data:", formData);
        setTitle(formData.title);
        setQuestions(formData.questions);
      } catch (error) {
        console.error("Error fetching feedback form:", error);
        toast({
          title: "Error",
          description: "Failed to fetch feedback form. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchFeedbackForm();
  }, [formid, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto mt-16 mb-10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label>{question.questionText}</Label>
                <RadioGroup
                  onValueChange={(value) =>
                    handleRatingChange(question.id, value)
                  }
                  className="flex gap-4 mt-2 justify-center"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={value.toString()}
                        id={`q1-${value}`}
                      />
                      <Label htmlFor={`q1-${value}`}>{value}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
