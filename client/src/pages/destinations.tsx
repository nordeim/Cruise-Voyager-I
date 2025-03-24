import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Destination, Cruise } from '@shared/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Form schema for search
const searchSchema = z.object({
  destination: z.string().optional(),
  date: z.string().optional(),
  duration: z.string().optional(),
  travelers: z.string().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;

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
          className="w-full h-64 md:h-full object-cover"
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

const Destinations = () => {
  const [location] = useLocation();
  const [activeView, setActiveView] = useState<'destinations' | 'cruises'>('destinations');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Parse URL search params
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const regionParam = searchParams.get('region');
  const dateParam = searchParams.get('date');
  const durationParam = searchParams.get('duration');
  const travelersParam = searchParams.get('travelers');
  const dealsParam = searchParams.get('deals');
  
  // Set up search form
  const { register, handleSubmit, setValue } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      destination: regionParam || '',
      date: dateParam || '',
      duration: durationParam || '',
      travelers: travelersParam || '',
    }
  });
  
  // Set form values based on URL params
  useEffect(() => {
    if (regionParam) setValue('destination', regionParam);
    if (dateParam) setValue('date', dateParam);
    if (durationParam) setValue('duration', durationParam);
    if (travelersParam) setValue('travelers', travelersParam);
    
    // If a region is specified, show cruises
    if (regionParam) {
      setActiveView('cruises');
      setActiveRegion(regionParam);
    }
  }, [regionParam, dateParam, durationParam, travelersParam, setValue]);
  
  // Fetch destinations
  const { data: destinations, isLoading: isLoadingDestinations } = useQuery({
    queryKey: ['/api/destinations'],
  });
  
  // Fetch all cruises or by destination
  const { data: cruises, isLoading: isLoadingCruises } = useQuery({
    queryKey: [
      activeRegion ? `/api/cruises/destination/${getDestinationIdByName(activeRegion)}` : '/api/cruises'
    ],
  });
  
  // Helper function to get destination ID by name
  function getDestinationIdByName(name: string): number {
    if (!destinations) return 0;
    const destination = destinations.find((d: Destination) => d.name === name);
    return destination ? destination.id : 0;
  }
  
  // Search function
  const onSearch = async (data: SearchFormData) => {
    try {
      const response = await apiRequest('POST', '/api/cruises/search', data);
      const results = await response.json();
      
      // If results found and destination selected, switch to cruises view
      if (results.length > 0 && data.destination) {
        setActiveView('cruises');
        setActiveRegion(data.destination);
      } else if (results.length === 0) {
        toast({
          title: "No cruises found",
          description: "Please try different search criteria.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "An error occurred while searching for cruises.",
        variant: "destructive"
      });
    }
  };
  
  // Switch between destinations and cruises view
  const handleViewChange = (view: 'destinations' | 'cruises') => {
    setActiveView(view);
    if (view === 'destinations') {
      setActiveRegion(null);
    }
  };
  
  // Loading state
  if (isLoadingDestinations && activeView === 'destinations') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-montserrat font-bold text-[#0d4677] mb-4">Explore Destinations</h1>
          <p className="text-lg text-gray-600">Loading destinations...</p>
        </div>
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gray-300 h-64 w-full"></div>
              <div className="p-6 bg-white">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (isLoadingCruises && activeView === 'cruises') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-montserrat font-bold text-[#0d4677] mb-4">
            {activeRegion ? `${activeRegion} Cruises` : 'All Cruises'}
          </h1>
          <p className="text-lg text-gray-600">Loading cruises...</p>
        </div>
        <div className="animate-pulse space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-gray-300 h-64 md:h-auto"></div>
              <div className="md:w-3/5 p-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div className="flex flex-wrap mb-4">
                  <div className="h-8 bg-gray-300 rounded w-1/4 mr-2 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/4 mr-2 mb-2"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      {/* Hero Section */}
      <div 
        className="bg-center bg-cover h-80"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              {activeRegion ? `${activeRegion} Cruises` : 'Explore Our Destinations'}
            </h1>
            <p className="text-xl opacity-90 max-w-xl mx-auto">
              {activeRegion 
                ? `Discover unforgettable cruise experiences in ${activeRegion}`
                : 'Embark on a journey to the world\'s most breathtaking destinations'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSubmit(onSearch)} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Destination</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc] bg-white text-gray-700"
                {...register('destination')}
              >
                <option value="">Any Destination</option>
                {destinations?.map((dest: Destination) => (
                  <option key={dest.id} value={dest.name}>{dest.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc]"
                {...register('date')}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Duration</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc] bg-white text-gray-700"
                {...register('duration')}
              >
                <option value="">Any Length</option>
                <option value="2-5 Days">2-5 Days</option>
                <option value="6-9 Days">6-9 Days</option>
                <option value="10+ Days">10+ Days</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Travelers</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc] bg-white text-gray-700"
                {...register('travelers')}
              >
                <option value="2 Adults">2 Adults</option>
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                <option value="3+ Adults">3+ Adults</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full bg-[#ff7043] hover:bg-[#e65100] text-white font-montserrat font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* View Toggle */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 mr-4 font-medium ${activeView === 'destinations' ? 'text-[#1a75bc] border-b-2 border-[#1a75bc]' : 'text-gray-500 hover:text-[#1a75bc]'}`}
            onClick={() => handleViewChange('destinations')}
          >
            Destinations
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeView === 'cruises' ? 'text-[#1a75bc] border-b-2 border-[#1a75bc]' : 'text-gray-500 hover:text-[#1a75bc]'}`}
            onClick={() => handleViewChange('cruises')}
          >
            Cruises
          </button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 pb-16">
        {activeView === 'destinations' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations?.map((destination: Destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </>
        )}
        
        {activeView === 'cruises' && (
          <>
            <div className="space-y-8">
              {cruises?.length > 0 ? (
                cruises.map((cruise: Cruise) => (
                  <CruiseCard key={cruise.id} cruise={cruise} />
                ))
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">No cruises found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or explore our destinations.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Destinations;
