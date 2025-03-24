import { useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const searchSchema = z.object({
  destination: z.string(),
  date: z.string().optional(),
  duration: z.string(),
  travelers: z.string(),
});

type SearchFormData = z.infer<typeof searchSchema>;

const HeroSection = () => {
  const [_, navigate] = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      destination: 'Any Destination',
      date: '',
      duration: 'Any Length',
      travelers: '2 Adults',
    }
  });

  const onSearch = (data: SearchFormData) => {
    // Build query parameters for search
    const params = new URLSearchParams();
    if (data.destination !== 'Any Destination') {
      params.append('region', data.destination);
    }
    if (data.date) {
      params.append('date', data.date);
    }
    if (data.duration !== 'Any Length') {
      params.append('duration', data.duration);
    }
    if (data.travelers !== '2 Adults') {
      params.append('travelers', data.travelers);
    }

    // Navigate to destinations page with search params
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <section className="relative pt-16">
      <div 
        className="h-screen bg-center bg-cover bg-fixed" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,70,119,0.6)] to-[rgba(13,70,119,0)]"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center text-white relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-montserrat font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover the World's <br />Most Beautiful <span className="text-[#ff7043]">Destinations</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Embark on unforgettable journeys across stunning oceans and exotic locations
            </motion.p>
            
            {/* Search Box */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-xl max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-[#0d4677] text-xl font-montserrat font-semibold mb-4">Find Your Perfect Cruise</h3>
              <form onSubmit={handleSubmit(onSearch)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Destination</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc] bg-white text-gray-700"
                      {...register('destination')}
                    >
                      <option>Any Destination</option>
                      <option>Caribbean</option>
                      <option>Mediterranean</option>
                      <option>Alaska</option>
                      <option>Europe</option>
                      <option>Asia</option>
                      <option>Australia</option>
                    </select>
                    {errors.destination && (
                      <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc]"
                      {...register('date')}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Duration</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc] bg-white text-gray-700"
                      {...register('duration')}
                    >
                      <option>Any Length</option>
                      <option>2-5 Days</option>
                      <option>6-9 Days</option>
                      <option>10+ Days</option>
                    </select>
                    {errors.duration && (
                      <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Travelers</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc] bg-white text-gray-700"
                      {...register('travelers')}
                    >
                      <option>2 Adults</option>
                      <option>1 Adult</option>
                      <option>2 Adults, 1 Child</option>
                      <option>2 Adults, 2 Children</option>
                      <option>3+ Adults</option>
                    </select>
                    {errors.travelers && (
                      <p className="text-red-500 text-xs mt-1">{errors.travelers.message}</p>
                    )}
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#ff7043] hover:bg-[#e65100] text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Search Cruises
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg className="animate-[wave_3s_ease-in-out_infinite_alternate]" viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 64L60 64C120 64 240 64 360 53.3C480 43 600 21 720 26.7C840 32 960 64 1080 80C1200 96 1320 96 1380 96L1440 96V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0V64Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
