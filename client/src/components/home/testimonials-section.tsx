import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Testimonial } from '@shared/schema';

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <i key={i} className="fas fa-star text-yellow-400"></i>
        ))}
      </div>
      <p className="text-gray-600 mb-6 font-['Playfair_Display'] italic">{testimonial.comment}</p>
      <div className="flex items-center">
        <img 
          src={testimonial.avatarUrl} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="font-semibold text-gray-800">{testimonial.name}</p>
          <p className="text-gray-500 text-sm">{testimonial.cruiseName}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-[#f5f7fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">What Our Guests Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading testimonials...</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                  <div className="flex mb-4">
                    <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                    <div className="ml-3">
                      <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#f5f7fa]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">What Our Guests Say</h2>
            <p className="text-lg text-red-600">Error loading testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#f5f7fa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Guests Say
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hear from travelers who have experienced unforgettable moments with OceanView Cruises
          </motion.p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial: Testimonial, index: number) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
