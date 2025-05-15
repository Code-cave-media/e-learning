import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, TrendingUp, ShoppingCart, Copy, ExternalLink, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-hot-toast";

// Mock data for charts
const earningsData = [
  { month: "Jan", earnings: 1200 },
  { month: "Feb", earnings: 1800 },
  { month: "Mar", earnings: 1500 },
  { month: "Apr", earnings: 2400 },
  { month: "May", earnings: 2100 },
  { month: "Jun", earnings: 3000 },
];

const conversionData = [
  { name: "Courses", value: 45 },
  { name: "eBooks", value: 30 },
  { name: "Memberships", value: 25 },
];

const trafficData = [
  { source: "Direct", visitors: 400 },
  { source: "Social", visitors: 300 },
  { source: "Referral", visitors: 200 },
  { source: "Search", visitors: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock data for withdrawal history
const withdrawalHistory = [
  { id: 1, date: "2024-03-15", amount: 500, status: "Completed", method: "Bank Transfer" },
  { id: 2, date: "2024-02-28", amount: 750, status: "Completed", method: "UPI" },
  { id: 3, date: "2024-02-15", amount: 300, status: "Processing", method: "Bank Transfer" },
  { id: 4, date: "2024-01-31", amount: 600, status: "Completed", method: "UPI" },
];

const AffiliateDashboardPage = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountName: "",
  });

  const handleWithdraw = () => {
    // Handle withdrawal logic here
    console.log("Withdrawing:", {
      amount: withdrawAmount,
      paymentMode,
      upiId,
      bankDetails,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-down">
        <div>
          <h1 className="text-2xl font-bold">Affiliate Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track your earnings and manage withdrawals</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <Wallet className="w-4 h-4" />
              Withdraw Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>
                Enter the amount and your payment details to process the withdrawal.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Amount Input */}
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>

              {/* Payment Mode Selection */}
              <div className="grid gap-2">
                <Label>Choose Payment Mode</Label>
                <RadioGroup
                  defaultValue="upi"
                  value={paymentMode}
                  onValueChange={setPaymentMode}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Bank Transfer</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* UPI Details */}
              {paymentMode === "upi" && (
                <div className="grid gap-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="Enter your UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {/* Bank Details */}
              {paymentMode === "bank" && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="Enter bank name"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter account number"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      placeholder="Enter IFSC code"
                      value={bankDetails.ifscCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accountName">Account Holder Name</Label>
                    <Input
                      id="accountName"
                      placeholder="Enter account holder name"
                      value={bankDetails.accountName}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleWithdraw}>Submit Withdrawal Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300"
          >
            Recent Activity
          </TabsTrigger>
          <TabsTrigger 
            value="links" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300"
          >
            Affiliate Links
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  +8 new this month
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in [animation-delay:200ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  -0.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in [animation-delay:300ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">789</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle className="text-base">Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#0088FE"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        animationDuration={2000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in [animation-delay:100ms]">
              <CardHeader>
                <CardTitle className="text-base">Product Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        animationDuration={2000}
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in [animation-delay:200ms]">
              <CardHeader>
                <CardTitle className="text-base">Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="source" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="visitors" 
                        fill="#0088FE" 
                        radius={[4, 4, 0, 0]}
                        animationDuration={2000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity">
          <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Sale", product: "Web Development Course", amount: "$99.99", time: "2 hours ago" },
                  { type: "Click", product: "Digital Marketing eBook", amount: "-", time: "3 hours ago" },
                  { type: "Sale", product: "Data Science Course", amount: "$129.99", time: "5 hours ago" },
                  { type: "Click", product: "UI/UX Design Course", amount: "-", time: "6 hours ago" },
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between py-3 border-b last:border-0 transition-all duration-300 hover:bg-muted/50 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <p className="font-medium text-sm">{activity.product}</p>
                      <p className="text-xs text-muted-foreground">{activity.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{activity.amount}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Affiliate Links Tab */}
        <TabsContent value="links">
          <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Your Affiliate Links</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Manage and track your affiliate links</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { 
                    id: 1, 
                    name: "Web Development Course", 
                    url: "https://learnhub.com/ref/123/web-dev",
                    clicks: 245,
                    conversions: 12,
                    earnings: "$599.88"
                  },
                  { 
                    id: 2, 
                    name: "Digital Marketing eBook", 
                    url: "https://learnhub.com/ref/123/digital-marketing",
                    clicks: 189,
                    conversions: 8,
                    earnings: "$199.92"
                  },
                  { 
                    id: 3, 
                    name: "Data Science Course", 
                    url: "https://learnhub.com/ref/123/data-science",
                    clicks: 156,
                    conversions: 6,
                    earnings: "$299.94"
                  },
                ].map((link) => (
                  <div 
                    key={link.id} 
                    className="bg-card rounded-lg border p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Link Info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{link.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <code className="px-2 py-1 bg-muted rounded-md font-mono text-xs break-all">
                            {link.url}
                          </code>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center lg:text-left">
                        <div>
                          <p className="text-sm text-muted-foreground">Clicks</p>
                          <p className="text-lg font-semibold">{link.clicks}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversions</p>
                          <p className="text-lg font-semibold">{link.conversions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Earnings</p>
                          <p className="text-lg font-semibold text-green-600">{link.earnings}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => {
                            navigator.clipboard.writeText(link.url);
                            toast.success('Link copied to clipboard!');
                          }}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Withdrawal History */}
      <Card className="border-none shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
        <CardHeader>
          <CardTitle className="text-base">Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalHistory.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell>{withdrawal.date}</TableCell>
                  <TableCell>${withdrawal.amount}</TableCell>
                  <TableCell>{withdrawal.method}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      withdrawal.status === "Completed" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {withdrawal.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateDashboardPage; 