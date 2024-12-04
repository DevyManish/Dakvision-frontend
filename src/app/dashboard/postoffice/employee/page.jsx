"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Users, UserCheck, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function EmployeeDashboard() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/employee/view/743135`
      );
      setEmployees(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employees. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddEmployee = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmployee = {
      empId: employees.length + 1,
      fullName: formData.get("name"),
      email: formData.get("email"),
      position: formData.get("position"),
      dept: formData.get("department"),
      po: formData.get("po"),
      joinDate: new Date(formData.get("joinDate")).toISOString(),
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/employee/create`,
        newEmployee
      );
      fetchEmployees(); // Refresh the employee list
      // event.currentTarget.reset()
      toast({
        title: `${newEmployee.fullName} is added as an employee`,
      });
    } catch (err) {
      setError("Failed to add employee. Please try again.");
      toast({
        title: "Failed to add employee",
        variant: "destructive",
      });
    }
  };

  const handleEditEmployee = async (event) => {
    event.preventDefault();
    if (!editingEmployee) return;

    const formData = new FormData(event.currentTarget);
    const updatedEmployee = {
      empId: editingEmployee.empId,
      name: formData.get("name"),
      email: formData.get("email"),
      position: formData.get("position"),
      dept: formData.get("department"),
      po: editingEmployee.po,
      joinDate: new Date(formData.get("joinDate")).toISOString(),
      performanceScore: parseInt(formData.get("performance")),
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/employee/edit`,
        updatedEmployee
      );
      fetchEmployees(); // Refresh the employee list
      setEditingEmployee(null);
      toast({
        title: `Employee detail edited successfully`,
      });
    } catch (err) {
      setError("Failed to update employee. Please try again.");
      toast({
        title: "Update failed",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEmployee = async (empId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/employee/delete/${empId}`
      );
      setEmployees(employees.filter((emp) => emp.empId !== empId));
      toast({
        title: `Employee deleted successfully`,
      });
    } catch (err) {
      setError("Failed to update employee. Please try again.");
      toast({
        title: "Update failed",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-16 gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>

      {/* Employee Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(employees.length * 0.8)}
            </div>
            <p className="text-xs text-muted-foreground">80% attendance rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Employee List</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="grid w-full gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" name="position" required />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" required />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" name="joinDate" type="date" required />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="po">Post Office (Pin code)</Label>
                  <Input
                    id="po"
                    name="po"
                    type="text"
                    pattern="\d{6}"
                    maxLength="6"
                    required
                    placeholder="Enter 6-digit pin code"
                  />
                </div>
                <DialogTrigger asChild>
                  <Button type="submit">Add Employee</Button>
                </DialogTrigger>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.empId}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{employee.performanceScore}%</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingEmployee(employee)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Employee</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleEditEmployee}
                          className="space-y-4"
                        >
                          <div className="grid w-full gap-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                              id="edit-name"
                              name="name"
                              defaultValue={editingEmployee?.name}
                              required
                            />
                          </div>
                          <div className="grid w-full gap-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                              id="edit-email"
                              name="email"
                              type="email"
                              defaultValue={editingEmployee?.email}
                              required
                            />
                          </div>
                          <div className="grid w-full gap-2">
                            <Label htmlFor="edit-position">Position</Label>
                            <Input
                              id="edit-position"
                              name="position"
                              defaultValue={editingEmployee?.position}
                              required
                            />
                          </div>
                          <div className="grid w-full gap-2">
                            <Label htmlFor="edit-department">Department</Label>
                            <Input
                              id="edit-department"
                              name="department"
                              defaultValue={editingEmployee?.department}
                              required
                            />
                          </div>
                          <div className="grid w-full gap-2">
                            <Label htmlFor="edit-joinDate">Join Date</Label>
                            <Input
                              id="edit-joinDate"
                              name="joinDate"
                              type="date"
                              defaultValue={
                                editingEmployee?.joinDate.split("T")[0]
                              }
                              required
                            />
                          </div>
                          <div className="grid w-full gap-2">
                            <Label htmlFor="edit-performance">
                              Performance Score (0-100)
                            </Label>
                            <Input
                              id="edit-performance"
                              name="performance"
                              type="number"
                              min="0"
                              max="100"
                              defaultValue={editingEmployee?.performanceScore}
                              required
                            />
                          </div>
                          <DialogTrigger asChild>
                          <Button type="submit">Save Changes</Button>
                          </DialogTrigger>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEmployee(employee.empId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={employees}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip />
              <Bar
                dataKey="performanceScore"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
