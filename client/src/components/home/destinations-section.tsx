import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Destination } from '@shared/schema';

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      whileHover={{ y: -8 }}
    >
      <div className="relative">
        <img 
          src={destination.imageUrl}
          alt={destination.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(13,70,119,0.6)] to-[rgba(13,70,119,0)]">
          <h3 className="text-2xl font-montserrat font-bold text-white">{destination.name}</h3>
          <p className="text-white opacity-90">From ${destination.priceFrom} per person</p>
        </div>
      </div>
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            <span className="mr-2">
              <i className="fas fa-calendar-alt text-[#1a75bc]"></i> {destination.durationRange}
            </span>
            <span>
              <i className="fas fa-ship text-[#1a75bc]"></i> {destination.cruiseCount} Cruises
            </span>
          </div>
          <div className="flex">
            {Array.from({ length: Math.floor(destination.rating) }).map((_, i) => (
              <i key={i} className="fas fa-star text-yellow-400"></i>
            ))}
            {destination.rating % 1 !== 0 && (
              <i className="fas fa-star-half-alt text-yellow-400"></i>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <Link href={`/destinations?region=${destination.name}`} className="inline-block text-[#1a75bc] font-semibold hover:text-[#0d4677] transition duration-300">
          Explore Cruises <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </motion.div>
  );
};

const DestinationsSection = () => {
  const { data: destinations, isLoading, error } = useQuery({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">Popular Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading destinations...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="bg-gray-300 h-64 w-full"></div>
                <div className="p-6 bg-white">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">Popular Destinations</h2>
            <p className="text-lg text-red-600">Error loading destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Limit to 3 destinations for the homepage
  const featuredDestinations = destinations?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular Destinations
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our most sought-after cruise destinations and start planning your next adventure
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
            >
              <DestinationCard destination={destination} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/destinations" 
            className="inline-block bg-white text-[#1a75bc] border-2 border-[#1a75bc] hover:bg-[#1a75bc] hover:text-white font-montserrat font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
