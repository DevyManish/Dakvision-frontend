"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { Plus, Minus, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function FeedbackForm() {
  const { toast } = useToast();
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [feedbackLink, setFeedbackLink] = useState("");

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      questions: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append("");
  };

  const handleRemoveQuestion = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post(
        "/feedback/create",
        {
          title: data.title,
          questions: data.questions.map((q) => ({ questionText: q })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast({
        title: "Feedback created successfully!",
      });

      setQrCode(response.data.data.qrCode);
      setFeedbackLink(response.data.data.link);
      setShowPopover(true);
      reset(); 
    } catch (error) {
      console.error("Error creating feedback:", error);
      toast({
        title: "Failed to create feedback",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-16 gap-6 p-6">
      {/* <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1> */}
      <Card className="w-full max-w-2xl mx-auto mt-16 py-4 mb-10">
        <CardHeader>
          <CardTitle>Create Feedback Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="Enter feedback title"
                  {...field}
                />
              )}
            />
          </div>

          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor={`question-${index}`}>
                  Question {index + 1}
                </Label>
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Controller
                control={control}
                name={`questions[${index}]`}
                render={({ field }) => (
                  <Input
                    id={`question-${index}`}
                    placeholder={`Enter question ${index + 1}`}
                    {...field}
                  />
                )}
              />
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleAddQuestion}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading || isSubmitting || !isDirty}
              >
                {isLoading || isSubmitting ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4" /> Creating...
                  </>
                ) : (
                  "Create Feedback"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p className="text-center">Feedback created successfully!</p>
            </PopoverContent>
          </Popover>

          {/* Display QR code and feedback link */}
          {qrCode && (
            <div className="flex flex-col items-center space-y-4">
              <img src={qrCode} alt="Feedback QR Code" className="w-48 h-48" />
              <Button asChild>
                <a
                  href={feedbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Link className="mr-2 h-4 w-4" />
                  Share link
                </a>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
