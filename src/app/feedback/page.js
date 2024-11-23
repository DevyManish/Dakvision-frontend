"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function Page() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name,
      email,
      mobileNo: contact,
      branchName,
      branchCode,
      feedbackCategory,
      message,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setIsDialogOpen(true);  
      } else {
        alert("There was an error submitting your feedback.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your feedback.");
    }
  };
  

  return (
    <div className="w-full py-20 lg:py-30">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex text-center justify-center items-center gap-4 flex-col">
            <div className="flex gap-2 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                Complaint Service
              </h4>
            </div>
            <div>
              <Button className="gap-4" variant="outline">
                Any questions? Reach out <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
            {/* Form */}
            <div className="border rounded-lg px-6 md:px-8 py-6 mx-auto my-8 md:w-1/3 text-left">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-orange-400"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-orange-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="contact-no"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Contact Number
                  </label>
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-orange-400"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="branch-name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Branch Name
                  </label>
                  <input
                    type="text"
                    id="branch-name"
                    name="branch-name"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-orange-400"
                    required
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="branch-no"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Branch Code
                  </label>
                  <input
                    type="number"
                    id="branch-no"
                    name="branch-no"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-orange-400"
                    required
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Complaint Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-orange-400"
                    required
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="counter">Counter Services</option>
                    <option value="mail">Mail/Parcel Services</option>
                    <option value="finance">Financial Services</option>
                    <option value="digital">Digital Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Complaint Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-orange-400"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-4 mt-2">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full py-2 justify-start text-left font-normal border-gray-400 p-2 rounded-lg"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <Badge variant="outline">FAQ</Badge>
            {/* accordion */}
            <div className=" w-full px-12 md:max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {Array.from({ length: 8 }).map((_, index) => (
                  <AccordionItem key={index} value={"index-" + index}>
                    <AccordionTrigger>
                      How can I file a complaint?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can file a complaint by filling out the online
                      complaint form available on our website or app. Provide
                      your personal details, service reference (e.g., parcel
                      tracking number), and a description of the issue.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogTitle>Complaint Successfully Created</DialogTitle>
                <DialogDescription>
                  Your complaint has been submitted successfully!
                </DialogDescription>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
