"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function Page() {
  const [showCounters, setShowCounters] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [accNo, setAccNo] = useState("");
  const [branchName, setBranchName] = useState("");
  const [pincode, setPinCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Success dialog
  const [isFail, setIsFail] = useState(false); // Failure dialog

  let ticketNum;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      fullName: name,
      email,
      phoneNumber: phoneNo,
      serviceCategory,
      accountNumber: accNo,
      pinCode: pincode,
      branchName,
    };
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/bookTicket/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json(); // assuming the ticketId is in the response data
        setIsSuccess(true);
        ticketNum = data.ticketId;
      } else {
        setIsFail(true); // Show failure dialog if the response is not ok
      }
    } catch (error) {
      console.error("Error:", error);
      setIsFail(true); // Show failure dialog if there is an error
    }
  };

  let pos = 10;
  let counterNo = 2;
  let estTime = 5;

  return (
    <div className="px-20">
      {/* ticket */}
      <div>
        <div className="py-4 md:py-14 mt-16">
          <h2 className="text-xl md:px-24 md:text-4xl font-bold tracking-tighter lg:max-w-xl font-regular text-left">
            Virtual Queue Booking
          </h2>
        </div>
        {ticket && (
          <div className="flex flex-col px-4 md:px-24 py-4 mb-6">
            <div className="flex justify-end w-full mb-2 space-x-2">
              <Badge className="bg-orange-400">
                <Clock size={20} />
                <p className="pl-3 py-2">
                  Estimated Time: <span>{estTime} mins</span>
                </p>
              </Badge>
            </div>

            <div className="flex flex-col px-4 py-4 w-full rounded-2xl border-orange-500 border-2">
              <div className="flex flex-col md:flex-row justify-between md:items-center px-4 py-2 w-full">
                <div className="flex items-center mb-2 md:mb-0">
                  <Image src="/logo.png" alt="Logo" width={50} height={50} />
                  <p className="text-lg md:text-2xl mt-1 font-semibold tracking-tighter text-left">
                    Ticket #{ticketNum}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm md:text-xl font-semibold tracking-tighter text-left">
                    Branch Name:
                    <span className="ml-2 font-normal">{branchName}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between px-4 py-2 w-full">
                <div className="flex mb-2 md:mb-0">
                  <p className="text-sm md:text-xl font-semibold tracking-tighter text-left">
                    Name:
                    <span className="ml-2 font-normal">{name}</span>
                  </p>
                </div>

                <div className="flex">
                  <p className="text-sm md:text-xl font-semibold tracking-tighter text-left">
                    Account Number:
                    <span className="ml-2 font-normal">{accNo}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between px-4 py-2 w-full">
                <div className="flex mb-2 md:mb-0">
                  <p className="text-sm md:text-xl font-semibold tracking-tighter text-left">
                    Your Position:
                    <span className="ml-2 font-normal">{pos}</span>
                  </p>
                </div>

                <div className="flex">
                  <p className="text-sm md:text-xl font-semibold tracking-tighter text-left">
                    Counter Number:
                    <span className="ml-2 font-normal">{counterNo}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container mx-auto p-4 md:px-24 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Phone Number</Label>
                <Input
                  id="phnNo"
                  type="tel"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Category</Label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  className="border px-2 py-[5px] w-full rounded-lg focus:outline-none focus:border-orange-400"
                  required
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="counter">Counter Services</option>
                  <option value="mail">Mail/Parcel Services</option>
                  <option value="finance">Financial Services</option>
                  <option value="digital">Digital Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accNo">Account Number</Label>
                <Input
                  id="accNo"
                  required
                  value={accNo}
                  onChange={(e) => setAccNo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pinCode">Pin Code</Label>
                <Input
                  id="pinCode"
                  required
                  value={pincode}
                  maxlength="6"
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name</Label>
                <Input
                  id="branchName"
                  required
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center py-3 mx-auto items-center w-full">
              <Button type="submit" className="w-1/2 py-2">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* status */}
      <div>
        <div className="py-4 md:py-14 mt-16">
          <h2 className="text-xl md:px-24 md:text-4xl font-bold tracking-tighter lg:max-w-xl font-regular text-left">
            Queue Status
          </h2>
        </div>
        <div className="container mx-auto p-4 md:px-24 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pinCode">Pin Code</Label>
                <Input id="pinCode" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name</Label>
                <Input id="branchName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" required />
              </div>
            </div>
            <div className="flex justify-center py-3 mx-auto items-center w-full">
              <Button type="submit" className="w-1/2 py-2">
                Submit
              </Button>
            </div>
          </form>

          {showCounters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((counter) => (
                <Card key={counter}>
                  <CardHeader>
                    <CardTitle>Counter {counter}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="font-semibold">Status</div>
                      <div className="flex space-x-2">
                        <Badge
                          variant="success"
                          className="bg-yellow-400 items-center"
                        >
                          Current Queue: {Math.floor(Math.random() * 40) + 20}
                        </Badge>
                        <Badge
                          variant="warning"
                          className="bg-green-400 items-center"
                        >
                          Your Position: {Math.floor(Math.random() * 20) + 1}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {/* Dialogs for success and failure */}
          <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
            <DialogContent>
              <DialogTitle>Ticket Successfully Booked</DialogTitle>
              <DialogDescription>
                Your Queue Ticket has been booked successfully!
              </DialogDescription>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          <Dialog open={isFail} onOpenChange={setIsFail}>
            <DialogContent>
              <DialogTitle>Ticket Booking Failed</DialogTitle>
              <DialogDescription>
                There was an issue booking your queue ticket.
              </DialogDescription>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
