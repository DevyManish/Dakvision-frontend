"use client";

// import { div, div, divHeader, divTitle } from "@/components/ui/div";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function FeedbackForm() {
  return (
    <div className="container mx-auto p-6 py-8 mt-12">
      <div className="flex text-center justify-center items-center gap-4 py-3 mb-4 flex-col">
        <div className="flex gap-2 flex-col">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
            Feedback Form
          </h4>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto py-16">
        {/* Category 1 */}
        <div className="space-y-8 text-justify">
          {" "}
          {/* Changed text-center to text-justify */}
          <h2 className="text-lg font-semibold text-orange-500">
            Category 1: Experience at the Post Office
          </h2>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>
                1. Overall, how would you rate your experience at the Post
                Office?
              </Label>
              <RadioGroup className="flex gap-4 mt-2 justify-center">
                {[1, 2, 3, 4, 5].map((value) => (
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

            <div>
              <Label>
                2. Rate the support and service provided by the employees:
              </Label>
              <RadioGroup className="flex gap-4 mt-2 justify-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={value.toString()}
                      id={`q2-${value}`}
                    />
                    <Label htmlFor={`q2-${value}`}>{value}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label>
                3. Did you face any challenges or issues at the Post Office
                Branch? If yes, please specify.
              </Label>
              <Textarea
                className="mt-4"
                placeholder="Type your answer here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
