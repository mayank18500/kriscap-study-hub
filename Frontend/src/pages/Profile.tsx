import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User as UserIcon, Mail, Phone, MapPin, Save, Loader2, BadgeCheck, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (user) {
      const defaultAddress = user.addresses?.length > 0 ? user.addresses[user.addresses.length - 1] : {};
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        addressLine1: defaultAddress.addressLine1 || "",
        city: defaultAddress.city || "",
        state: defaultAddress.state || "",
        pincode: defaultAddress.pincode || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (formData.phone !== user?.phoneNumber || formData.name !== user?.name) {
        await api.patch("/api/user/profile", {
          name: formData.name,
          phoneNumber: formData.phone
        });
      }

      if (formData.addressLine1) {
        await api.post("/api/user/address", {
          addresses: [{
            addressLine1: formData.addressLine1,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            isDefault: true
          }]
        });
      }

      await checkAuth();
      toast({ title: "Portfolio Updated", description: "Your credentials have been successfully synced." });
    } catch (error) {
      toast({ variant: "destructive", title: "Sync Error", description: "Failed to update your academic profile." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Profile Header: Academic Badge Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center lg:text-left"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-slate-900 flex items-center justify-center border-4 border-[#fdfcf8] shadow-xl overflow-hidden">
              <UserIcon className="w-14 h-14 text-amber-400" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-amber-500 rounded-full text-white border-2 border-white hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <h2 className="font-serif text-3xl font-bold text-slate-900">{user.name}</h2>
              <BadgeCheck className="w-6 h-6 text-emerald-500 fill-emerald-50" />
            </div>
            <p className="text-slate-500 font-medium italic">{user.email}</p>
            <div className="pt-2">
              <span className="px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                Official NIOS Candidate
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Main Form Fields */}
        <div className="md:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-slate-100 rounded-[1.5rem] bg-white shadow-sm overflow-hidden">
              <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-serif font-bold text-slate-900">Primary Credentials</h3>
              </div>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Legal Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-12 h-12 rounded-xl border-slate-200 focus:ring-amber-500/20 bg-[#fdfcf8]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-12 h-12 rounded-xl border-slate-200 focus:ring-amber-500/20 bg-[#fdfcf8]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-slate-100 rounded-[1.5rem] bg-white shadow-sm overflow-hidden">
              <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-serif font-bold text-slate-900">Logistics & Delivery</h3>
              </div>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Residence Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                    <Textarea
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      className="pl-12 min-h-[100px] rounded-xl border-slate-200 bg-[#fdfcf8]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="h-12 rounded-xl border-slate-200 bg-[#fdfcf8]" />
                  <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="h-12 rounded-xl border-slate-200 bg-[#fdfcf8]" />
                </div>
                <Input name="pincode" placeholder="PIN Code" value={formData.pincode} onChange={handleChange} className="h-12 rounded-xl border-slate-200 bg-[#fdfcf8]" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar Actions */}
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-slate-900 rounded-[1.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Save size={120} />
              </div>
              <h4 className="font-serif text-xl font-bold mb-4">Account Sync</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Ensure your shipping details are accurate to avoid delays in physical project file deliveries.
              </p>
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-full transition-all"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Update"}
              </Button>
            </div>
          </motion.div>

          <div className="p-6 border-2 border-dashed border-slate-200 rounded-[1.5rem]">
             <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Security Notice</h5>
             <p className="text-[11px] text-slate-400 text-center leading-relaxed italic">
               The email address <span className="text-slate-600 font-bold">{user.email}</span> is permanently linked to your student ID and cannot be modified.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;