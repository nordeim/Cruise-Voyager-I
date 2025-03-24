import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { contactSchema, type ContactData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: (response) => {
      // Only display one type of confirmation - either toast or in-form
      setSubmitted(true);
      
      // We'll remove the toast to avoid double notifications
      // and rely on the in-form confirmation which is more visible
      
      // Reset form fields but this won't be visible 
      // since we're showing the success message component
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="bg-[#f5f7fa]">
      {/* Hero section */}
      <div className="bg-[#0d4677] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-montserrat font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-lg text-center max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions or need assistance? We're here to help you plan your perfect cruise vacation.
          </motion.p>
        </div>
      </div>

      {/* Contact section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-[#0d4677]">Send Us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-medium text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">
                  Your message has been sent successfully. We'll get back to you as soon as possible.
                </p>
                <Button 
                  className="mt-4 bg-[#0d4677] hover:bg-[#0a3861]"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Phone Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please type your message here..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0d4677] hover:bg-[#0a3861] text-white"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>

          {/* Contact information */}
          <div>
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg mb-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-montserrat font-bold mb-6 text-[#0d4677]">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 bg-[#0d4677] p-3 rounded-full text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Visit Us</h3>
                    <p className="text-gray-600">123 Cruise Way, Miami, FL 33101, United States</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 bg-[#0d4677] p-3 rounded-full text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
                    <p className="text-gray-600">+1 (800) 123-4567</p>
                    <p className="text-gray-500 text-sm mt-1">Mon-Fri: 8AM-8PM (EST)<br/>Sat-Sun: 9AM-6PM (EST)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 bg-[#0d4677] p-3 rounded-full text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
                    <p className="text-gray-600">info@oceanviewcruises.com</p>
                    <p className="text-gray-500 text-sm mt-1">We'll respond as quickly as possible</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-montserrat font-bold mb-4 text-[#0d4677]">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 flex items-center">
                    <MessageSquare size={16} className="mr-2 text-[#ff7043]" />
                    How do I book a cruise?
                  </h3>
                  <p className="text-gray-600 pl-6">You can book online, call our cruise specialists, or work with your travel agent.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 flex items-center">
                    <MessageSquare size={16} className="mr-2 text-[#ff7043]" />
                    What's included in my cruise?
                  </h3>
                  <p className="text-gray-600 pl-6">Your fare includes accommodations, meals in main dining venues, entertainment, and access to many onboard facilities.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 flex items-center">
                    <MessageSquare size={16} className="mr-2 text-[#ff7043]" />
                    Can I cancel my booking?
                  </h3>
                  <p className="text-gray-600 pl-6">Cancellation policies vary depending on the cruise and timing. Please refer to our cancellation policy for details.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="w-full h-[400px] bg-gray-300 mt-8">
        <div className="h-full flex items-center justify-center bg-[#e0e7ee]">
          <div className="text-center p-8">
            <h3 className="text-2xl font-montserrat font-semibold mb-4 text-[#0d4677]">Visit Our Office</h3>
            <p className="text-gray-600 mb-6">123 Cruise Way, Miami, FL 33101, United States</p>
            <Button className="bg-[#0d4677] hover:bg-[#0a3861]">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;