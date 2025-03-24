import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Amenity } from '@shared/schema';

const AmenityCard = ({ amenity }: { amenity: Amenity }) => {
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      whileHover={{ y: -8 }}
    >
      <img 
        src={amenity.imageUrl}
        alt={amenity.name} 
        className="w-full h-60 object-cover"
      />
      <div className="p-6 bg-white">
        <h3 className="text-xl font-montserrat font-bold text-[#0d4677] mb-3">{amenity.name}</h3>
        <p className="text-gray-600 mb-4">{amenity.description}</p>
        <a href="#" className="inline-block text-[#1a75bc] font-semibold hover:text-[#0d4677] transition duration-300">
          Learn More <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </motion.div>
  );
};

const OnboardExperienceSection = () => {
  const { data: amenities, isLoading, error } = useQuery({
    queryKey: ['/api/amenities'],
  });

  if (isLoading) {
    return (
      <section id="onboard" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">Luxury Onboard Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading amenities...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="bg-gray-300 h-60 w-full"></div>
                <div className="p-6 bg-white">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="onboard" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">Luxury Onboard Experience</h2>
            <p className="text-lg text-red-600">Error loading amenities. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Show only first 3 amenities
  const featuredAmenities = amenities?.slice(0, 3) || [];

  return (
    <section id="onboard" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Luxury Onboard Experience
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Indulge in world-class amenities and activities during your cruise adventure
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredAmenities.map((amenity, index) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
            >
              <AmenityCard amenity={amenity} />
            </motion.div>
          ))}
        </div>
        
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-montserrat font-bold text-[#0d4677] mb-6">Endless Activities for Everyone</h3>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're seeking adventure, relaxation, or family fun, our ships offer something for every traveler. From thrilling water slides to serene adult-only retreats, your perfect vacation awaits.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <i className="fas fa-swimming-pool text-[#1a75bc] text-xl mr-3"></i>
                <span className="text-gray-700">Multiple Pools</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-cocktail text-[#1a75bc] text-xl mr-3"></i>
                <span className="text-gray-700">Premium Bars</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-gamepad text-[#1a75bc] text-xl mr-3"></i>
                <span className="text-gray-700">Arcade & Casino</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-child text-[#1a75bc] text-xl mr-3"></i>
                <span className="text-gray-700">Kids Programs</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-dumbbell text-[#1a75bc] text-xl mr-3"></i>
                <span className="text-gray-700">Fitness Center</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-theater-masks text-[#1a75bc] text-xl mr-3"></i>
                <span className="text-gray-700">Theater Shows</span>
              </div>
            </div>
            
            <Link
              href="/destinations"
              className="inline-block bg-[#ff7043] hover:bg-[#e65100] text-white font-montserrat font-semibold py-3 px-8 rounded-full transition duration-300"
            >
              Explore All Activities
            </Link>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Cruise Activities" 
              className="rounded-xl shadow-xl w-full h-auto"
            />
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl shadow-lg max-w-xs hidden lg:block">
              <div className="flex items-center mb-2">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Guest" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Sarah M.</p>
                  <div className="flex">
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">"The best cruise experience ever! So many activities to choose from, we never had a dull moment."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OnboardExperienceSection;
