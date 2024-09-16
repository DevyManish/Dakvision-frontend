"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Info,
  Mail,
  Package,
  Banknote,
  Shield,
  CreditCard,
  Landmark,
  Check,
  X,
  MapPinIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";

// Mock data for services
const serviceCategories = [
  {
    title: "Mail Services",
    icon: <Mail className="w-5 h-5" />,
    services: [
      {
        name: "Speed Post",
        description: "Fast and reliable delivery of letters and parcels.",
      },
      {
        name: "Registered Post",
        description: "Secure mailing with proof of delivery.",
      },
      {
        name: "Postal Orders",
        description: "Send money through the post office.",
      },
    ],
  },
  {
    title: "Parcel Services",
    icon: <Package className="w-5 h-5" />,
    services: [
      {
        name: "Domestic Parcels",
        description: "Send packages within the country.",
      },
      {
        name: "International Parcels",
        description: "Send packages to other countries.",
      },
    ],
  },
  {
    title: "Financial Services",
    icon: <Banknote className="w-5 h-5" />,
    services: [
      {
        name: "Savings Account",
        description: "Open and manage postal savings accounts.",
      },
      {
        name: "Public Provident Fund (PPF)",
        description: "Long-term savings scheme with tax benefits.",
      },
    ],
  },
  {
    title: "Insurance Services",
    icon: <Shield className="w-5 h-5" />,
    services: [
      {
        name: "Postal Life Insurance",
        description: "Life insurance policies offered by the post office.",
      },
      {
        name: "Rural Postal Life Insurance",
        description: "Insurance schemes for rural areas.",
      },
    ],
  },
  {
    title: "Payment Services",
    icon: <CreditCard className="w-5 h-5" />,
    services: [
      {
        name: "Bill Payments",
        description: "Pay utility bills and other services.",
      },
      { name: "Money Orders", description: "Send money domestically." },
    ],
  },
  {
    title: "Citizen-Centric Services",
    icon: <Landmark className="w-5 h-5" />,
    services: [
      {
        name: "Aadhaar Card Updates",
        description: "Update your Aadhaar card information.",
      },
      {
        name: "Passport Services",
        description: "Apply for or renew your passport.",
      },
    ],
  },
];

// Mock data for post offices
const postOffices = [
  {
    name: "Central Post Office",
    services: [
      "Mail Services",
      "Parcel Services",
      "Financial Services",
      "Insurance Services",
      "Payment Services",
      "Citizen-Centric Services",
    ],
  },
  {
    name: "North City Post Office",
    services: ["Mail Services", "Parcel Services", "Payment Services"],
  },
  {
    name: "South Town Post Office",
    services: [
      "Mail Services",
      "Financial Services",
      "Citizen-Centric Services",
    ],
  },
];

export default function Page() {
  const [selectedPostOffice, setSelectedPostOffice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = serviceCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.services.some((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const availableServices =
    postOffices.find((po) => po.name === selectedPostOffice)?.services || [];

  const handleUseCurrentLocation = () => {
    // In a real application, you would use the Geolocation API here
    console.log("Using current location");
  };

  return (
    <>
    <Header/>
    <div className="mt-20"></div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Post Office Services</h1>

        {/* Service Directory Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Available Services</h2>
          <p className="mb-4">
            Explore our comprehensive list of services offered at your local
            post office.
          </p>

          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredServices.map((category, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg">
                  <span className="mr-2" aria-hidden="true">
                    {category.icon}
                  </span>
                  {category.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-4">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="mb-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">
                          {service.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Service Availability Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Check Service Availability
          </h2>
          <p className="mb-4">
            Find out which services are available at your nearest post office.
          </p>

          <div className="mb-4">
            <Select onValueChange={setSelectedPostOffice}>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Select a post office" />
              </SelectTrigger>
              <SelectContent>
                {postOffices.map((po, index) => (
                  <SelectItem key={index} value={po.name}>
                    {po.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPostOffice && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedPostOffice}</CardTitle>
                <CardDescription>
                  Available services at this location:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {serviceCategories.map((category, index) => (
                    <li
                      key={index}
                      className={`flex items-center ${
                        availableServices.includes(category.title)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="mr-2" aria-hidden="true">
                        {availableServices.includes(category.title) ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <X className="w-5 h-5" />
                        )}
                      </span>
                      <span>{category.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Additional Features */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" /> Find Nearest Post Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      className="flex-grow"
                    />
                    <Button>Search</Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleUseCurrentLocation}
                    className="flex items-center justify-center"
                  >
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    Use my current location
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2" /> Service Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>All services are currently operating normally.</p>
                <Button className="mt-2">Check for Updates</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
