import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Package,
  CreditCard,
  Banknote,
  Stamp,
  Truck,
  Smartphone,
  Shield
} from "lucide-react"
import Header from "@/components/header";

export default function Component() {
  return (
    <>
    <Header />
    <div className="container mx-auto px-4 mt-20 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Postal Services</h1>

      <Tabs defaultValue="counter" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="counter">Counter Services</TabsTrigger>
          <TabsTrigger value="webapp">Web App Services</TabsTrigger>
        </TabsList>

        <TabsContent value="counter">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mail Services</CardTitle>
                <CardDescription>Postage and mailing options</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Selling postage stamps and stationery</li>
                  <li>Booking registered, insured, and Speed Post items</li>
                  <li>Handling other mail items</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Services</CardTitle>
                <CardDescription>Money orders and savings</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Booking money orders</li>
                  <li>Post Office Savings transactions</li>
                  <li>Postal Life Insurance (PLI) transactions</li>
                  <li>Rural Postal Life Insurance (RPLI) transactions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="webapp">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Digital Postage</CardTitle>
                <CardDescription>Online postage solutions</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start space-y-4">
                <div className="flex items-center space-x-2">
                  <Stamp className="h-5 w-5" />
                  <span>Purchase digital stamps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Buy printable postage</span>
                </div>
                <Button>Buy Postage</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mail Booking & Tracking</CardTitle>
                <CardDescription>Manage your shipments</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start space-y-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Schedule pickups</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Book mail items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Track delivery status</span>
                </div>
                <Button>Manage Mail</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Electronic Money Transfer</CardTitle>
                <CardDescription>Send and receive money orders</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start space-y-4">
                <div className="flex items-center space-x-2">
                  <Banknote className="h-5 w-5" />
                  <span>Send money orders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Receive money orders</span>
                </div>
                <Button>Transfer Money</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings & Insurance</CardTitle>
                <CardDescription>Manage your postal finances</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Access savings accounts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Banknote className="h-5 w-5" />
                  <span>Pay insurance premiums</span>
                </div>
                <Button>Manage Accounts</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </>
  )
}
