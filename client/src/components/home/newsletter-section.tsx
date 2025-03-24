import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    setSubmitted(true);
    toast({
      title: "Thank you for subscribing!",
      description: "You'll now receive our latest cruise deals and offers.",
      variant: "success",
    });
    form.reset();
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter */}
          <motion.div 
            className="bg-[#1a75bc] p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-montserrat font-bold text-white mb-4">Get Exclusive Cruise Deals</h3>
            <p className="text-white opacity-90 mb-6">Subscribe to our newsletter and be the first to receive special offers, early booking discounts, and travel tips.</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input 
                          placeholder="Your email address" 
                          className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7043]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-white text-xs" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="bg-[#ff7043] hover:bg-[#e65100] text-white font-montserrat font-semibold px-6 py-3 rounded-lg transition duration-300 whitespace-nowrap"
                >
                  Subscribe Now
                </Button>
              </form>
            </Form>
            <p className="text-white text-sm mt-3 opacity-70">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
          </motion.div>
          
          {/* App Download */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-montserrat font-bold text-[#0d4677] mb-4">Download Our Mobile App</h3>
            <p className="text-gray-600 mb-6">Manage your bookings, check-in online, and explore your ship before boarding with our convenient mobile app.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a href="#" className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">
                <i className="fab fa-apple text-2xl mr-3"></i>
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="font-medium text-sm">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">
                <i className="fab fa-google-play text-2xl mr-3"></i>
                <div>
                  <p className="text-xs">Get it on</p>
                  <p className="font-medium text-sm">Google Play</p>
                </div>
              </a>
            </div>
            
            <div className="flex items-center text-gray-600">
              <div className="mr-4">
                <i className="fas fa-mobile-alt text-[#1a75bc] text-3xl"></i>
              </div>
              <div>
                <p className="font-medium">Get instant access to:</p>
                <p>Online check-in, itinerary planner, ship maps, and more</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
