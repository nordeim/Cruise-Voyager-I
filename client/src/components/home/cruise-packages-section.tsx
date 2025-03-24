import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Cruise } from '@shared/schema';

const CruiseCard = ({ cruise }: { cruise: Cruise }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      whileHover={{ y: -8 }}
    >
      <div className="md:w-2/5 relative">
        <img 
          src={cruise.imageUrl}
          alt={cruise.title} 
          className="w-full h-full object-cover"
        />
        {cruise.isBestSeller && (
          <div className="absolute top-0 left-0 bg-[#ff7043] text-white px-3 py-1 text-sm font-semibold">
            BESTSELLER
          </div>
        )}
        {cruise.isNewItinerary && (
          <div className="absolute top-0 left-0 bg-[#00acc1] text-white px-3 py-1 text-sm font-semibold">
            NEW ITINERARY
          </div>
        )}
      </div>
      <div className="md:w-3/5 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-montserrat font-bold text-[#0d4677]">{cruise.title}</h3>
            <div className="flex ml-2">
              {Array.from({ length: Math.floor(cruise.rating) }).map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400"></i>
              ))}
              {cruise.rating % 1 !== 0 && (
                <i className="fas fa-star-half-alt text-yellow-400"></i>
              )}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{cruise.description}</p>
          
          <div className="flex flex-wrap mb-4 text-sm">
            <span className="bg-[#f5f7fa] text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
              <i className="fas fa-map-marker-alt text-[#1a75bc] mr-1"></i> {cruise.departureFrom}
            </span>
            <span className="bg-[#f5f7fa] text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
              <i className="fas fa-calendar-alt text-[#1a75bc] mr-1"></i> {cruise.duration} Nights
            </span>
            {cruise.cabinType === "Ocean View Stateroom" && (
              <span className="bg-[#f5f7fa] text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
                <i className="fas fa-utensils text-[#1a75bc] mr-1"></i> All-Inclusive
              </span>
            )}
            {cruise.cabinType === "Balcony Stateroom" && (
              <span className="bg-[#f5f7fa] text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
                <i className="fas fa-glass-cheers text-[#1a75bc] mr-1"></i> Drink Package
              </span>
            )}
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <i className="fas fa-check text-green-500 mr-2"></i>
              <span className="text-gray-600">{cruise.cabinType}</span>
            </div>
            {cruise.availablePackages.map((pkg, index) => (
              <div key={index} className="flex items-center mb-1">
                <i className="fas fa-check text-green-500 mr-2"></i>
                <span className="text-gray-600">{pkg}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {cruise.originalPrice && (
              <span className="text-gray-500 line-through">${cruise.originalPrice}</span>
            )}
            <span className="text-2xl font-bold text-[#0d4677] ml-2">${cruise.pricePerPerson}</span>
            <span className="text-gray-600 text-sm">per person</span>
          </div>
          <Link 
            href={`/cruise/${cruise.id}`}
            className="bg-[#ff7043] hover:bg-[#e65100] text-white px-5 py-2 rounded-lg font-medium transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const CruisePackagesSection = () => {
  const [filter, setFilter] = useState('all');
  
  const { data: cruises, isLoading, error } = useQuery({
    queryKey: ['/api/cruises'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-[#f5f7fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">Featured Cruise Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading cruises...</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row animate-pulse">
                <div className="md:w-2/5 bg-gray-300 h-64 md:h-auto"></div>
                <div className="md:w-3/5 p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="flex flex-wrap mb-4">
                    <div className="h-8 bg-gray-300 rounded w-1/4 mr-2 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/4 mr-2 mb-2"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-300 rounded w-1/4"></div>
                  </div>
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
      <section className="py-16 bg-[#f5f7fa]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-[#0d4677]">Featured Cruise Packages</h2>
            <p className="text-lg text-red-600">Error loading cruises. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Filter cruises based on selected destination
  const filteredCruises = filter === 'all' 
    ? cruises
    : cruises?.filter((cruise: Cruise) => {
        const destination = cruise.destinationId;
        switch (filter) {
          case 'caribbean': return destination === 1;
          case 'mediterranean': return destination === 2;
          case 'alaska': return destination === 3;
          case 'europe': return destination === 4;
          case 'asia': return destination === 5;
          default: return true;
        }
      });

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
            Featured Cruise Packages
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our most popular cruise packages with exclusive amenities and experiences
          </motion.p>
        </div>
        
        {/* Filter Options */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${filter === 'all' ? 'bg-[#1a75bc] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setFilter('all')}
          >
            All Packages
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${filter === 'caribbean' ? 'bg-[#1a75bc] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setFilter('caribbean')}
          >
            Caribbean
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${filter === 'mediterranean' ? 'bg-[#1a75bc] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setFilter('mediterranean')}
          >
            Mediterranean
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${filter === 'alaska' ? 'bg-[#1a75bc] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setFilter('alaska')}
          >
            Alaska
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${filter === 'europe' ? 'bg-[#1a75bc] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setFilter('europe')}
          >
            Europe
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${filter === 'asia' ? 'bg-[#1a75bc] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setFilter('asia')}
          >
            Asia
          </button>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {filteredCruises?.slice(0, 2).map((cruise: Cruise, index: number) => (
            <motion.div
              key={cruise.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
            >
              <CruiseCard cruise={cruise} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/destinations" 
            className="inline-block bg-[#1a75bc] hover:bg-[#0d4677] text-white font-montserrat font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            Browse All Cruises
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CruisePackagesSection;
