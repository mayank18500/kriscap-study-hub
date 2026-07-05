import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Download, Truck, Clock } from "lucide-react";
import Orders from "./Orders";
import Downloads from "./Downloads";

const OrdersDownloads = () => {
  return (
    <div className="w-full px-6 md:px-12 pb-12">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Orders & Downloads</h2>
        <p className="text-slate-500 italic mt-2">Manage your purchases, access digital files, and track physical deliveries.</p>
      </div>

      <Tabs defaultValue="payments" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-slate-100 rounded-2xl mb-8">
          <TabsTrigger value="payments" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <CreditCard className="w-4 h-4" />
              <span>Payments Done</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="downloads" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <Download className="w-4 h-4" />
              <span>Downloads</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="track" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <Truck className="w-4 h-4" />
              <span>Track Order</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <Clock className="w-4 h-4" />
              <span>History</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <Orders />
        </TabsContent>

        <TabsContent value="downloads" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <Downloads />
        </TabsContent>

        <TabsContent value="track" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
            <Truck className="w-16 h-16 text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Track Physical Orders</h3>
            <p className="text-slate-500 font-medium text-center max-w-md">
              Tracking features for physical projects are currently being integrated. Please check your email for dispatch notifications.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
            <Clock className="w-16 h-16 text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Complete Ledger</h3>
            <p className="text-slate-500 font-medium text-center max-w-md">
              Full historic ledger and analytics of all your academic requests will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersDownloads;
