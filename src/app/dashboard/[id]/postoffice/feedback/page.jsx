"use client";

import { useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

export default function FeedbackForm() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  const [feedbackLink, setFeedbackLink] = useState("");

  const handleCreateFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(
        "/feedback/create",

        {
          title,
          questions: [
            { questionText: question1 },
            { questionText: question2 },
            { questionText: question3 },
          ],
        },
        {
          headers: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        }
      );

      toast({
        title: "Feedback created successfully!",
      });

      setQrCode(response.data.data.qrCode);
      setFeedbackLink(response.data.data.link);
      // setFeedbackId(data[0].data.id)
      // set
      // setShowPopover(true)
    } catch (error) {
      console.error("Error creating feedback:", error);
      alert("Failed to create feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewFeedback = () => {
    // Implement the logic to view feedback here

    alert(`Viewing feedback with ID: ${feedbackId}`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-16 py-4 mb-10">
      <CardHeader>
        <CardTitle>Create Feedback Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter feedback title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="question1">Question 1</Label>
          <Input
            id="question1"
            value={question1}
            onChange={(e) => setQuestion1(e.target.value)}
            placeholder="Enter first question"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="question2">Question 2</Label>
          <Input
            id="question2"
            value={question2}
            onChange={(e) => setQuestion2(e.target.value)}
            placeholder="Enter second question"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="question3">Question 3</Label>
          <Input
            id="question3"
            value={question3}
            onChange={(e) => setQuestion3(e.target.value)}
            placeholder="Enter third question"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <Popover open={showPopover} onOpenChange={setShowPopover}>
          <PopoverTrigger asChild>
            <Button onClick={handleCreateFeedback} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Feedback"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <p className="text-center">Feedback created successfully!</p>
          </PopoverContent>
        </Popover>
        {qrCode && (
          <div className="flex flex-col items-center space-y-4">
            <img src={qrCode} alt="Feedback QR Code" className="w-48 h-48" />
            <a href={feedbackLink} target="_blank">
              <Button>Share link</Button>
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
