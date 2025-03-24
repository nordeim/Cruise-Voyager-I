import { Link } from 'wouter';
import { motion } from 'framer-motion';

const BookingProcessSection = () => {
  return (
    <section className="py-16 bg-[#0d4677] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Book Your Dream Cruise in 4 Easy Steps
          </motion.h2>
          <motion.p 
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our simple booking process makes planning your cruise vacation quick and effortless
          </motion.p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Booking Steps */}
          <motion.div 
            className="relative mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center z-10 w-1/4">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-[#ff7043] flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className="fas fa-search text-2xl"></i>
                </motion.div>
                <h3 className="font-montserrat font-semibold text-lg mb-2">Choose Your Cruise</h3>
                <p className="text-sm opacity-80 px-2">Browse destinations and find your perfect cruise package</p>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center z-10 w-1/4">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-[#00acc1] flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className="fas fa-calendar-check text-2xl"></i>
                </motion.div>
                <h3 className="font-montserrat font-semibold text-lg mb-2">Select Date & Cabin</h3>
                <p className="text-sm opacity-80 px-2">Pick your preferred dates and choose your ideal cabin</p>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center z-10 w-1/4">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-[#ff7043] flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className="fas fa-user-plus text-2xl"></i>
                </motion.div>
                <h3 className="font-montserrat font-semibold text-lg mb-2">Enter Guest Details</h3>
                <p className="text-sm opacity-80 px-2">Provide information for all travelers in your party</p>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center z-10 w-1/4">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-[#00acc1] flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className="fas fa-credit-card text-2xl"></i>
                </motion.div>
                <h3 className="font-montserrat font-semibold text-lg mb-2">Confirm & Pay</h3>
                <p className="text-sm opacity-80 px-2">Review your booking details and complete your payment</p>
              </div>
            </div>
            
            {/* Step Connectors */}
            <div className="absolute top-8 left-0 right-0 flex justify-between items-center z-0 px-8">
              <div className="h-[3px] flex-1 bg-[#1a75bc]"></div>
              <div className="h-[3px] flex-1 bg-[#1a75bc]"></div>
              <div className="h-[3px] flex-1 bg-[#1a75bc]"></div>
            </div>
          </motion.div>
          
          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-lg mb-6">Ready to embark on your next adventure?</p>
            <Link
              href="/destinations"
              className="inline-block bg-[#ff7043] hover:bg-[#e65100] text-white font-montserrat font-bold py-4 px-10 rounded-full text-lg transition duration-300"
            >
              Start Booking Now
            </Link>
            <p className="mt-4 text-sm opacity-80">No booking fees • Free cancellation on select cruises • Best price guarantee</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingProcessSection;
