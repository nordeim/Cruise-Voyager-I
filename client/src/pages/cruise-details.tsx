import { useParams, Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Cruise, Destination } from '@shared/schema';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, DollarSign, Ship, Users, Check, Star, StarHalf } from 'lucide-react';

const CruiseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [_, navigate] = useLocation();
  const cruiseId = parseInt(id);
  
  // For image gallery
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch cruise details
  const { data: cruise, isLoading: isLoadingCruise, error: cruiseError } = useQuery({
    queryKey: [`/api/cruises/${cruiseId}`],
    enabled: !isNaN(cruiseId),
  });
  
  // Fetch destination details if we have a cruise
  const { data: destination, isLoading: isLoadingDestination } = useQuery({
    queryKey: [cruise ? `/api/destinations/${cruise.destinationId}` : null],
    enabled: !!cruise,
  });
  
  // If we're loading or have an error
  if (isNaN(cruiseId)) {
    navigate('/destinations');
    return null;
  }
  
  if (isLoadingCruise || isLoadingDestination) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-2/3 mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-300 h-96 w-full rounded-xl mb-6"></div>
              <div className="flex justify-between mb-8">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-6"></div>
                <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-full mb-6"></div>
                <div className="h-12 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (cruiseError || !cruise) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Cruise Not Found</h1>
        <p className="text-gray-600 mb-8">The cruise you're looking for doesn't exist or has been removed.</p>
        <Link href="/destinations" className="bg-[#1a75bc] hover:bg-[#0d4677] text-white px-6 py-3 rounded-lg font-medium transition duration-300">
          Browse All Cruises
        </Link>
      </div>
    );
  }
  
  // Mock image gallery (since we only have one image per cruise in our data model)
  const cruiseImages = [
    cruise.imageUrl,
    "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  ];
  
  // Mock itinerary data (since we don't have this in our data model)
  const itinerary = [
    { day: 1, port: cruise.departureFrom, arrival: "", departure: "5:00 PM", description: "Board your luxurious cruise ship and set sail for an amazing adventure." },
    { day: 2, port: "At Sea", arrival: "", departure: "", description: "Enjoy the amenities onboard as you sail to your first destination." },
    { day: 3, port: "Nassau, Bahamas", arrival: "8:00 AM", departure: "5:00 PM", description: "Explore beautiful beaches, colonial architecture, and vibrant local culture." },
    { day: 4, port: "Perfect Day at CocoCay", arrival: "7:00 AM", departure: "4:00 PM", description: "Experience thrilling water slides, zip lines, and relax on pristine beaches." },
    { day: 5, port: "At Sea", arrival: "", departure: "", description: "Relax and enjoy your last full day at sea with all the ship has to offer." },
    { day: cruise.duration, port: cruise.departureFrom, arrival: "7:00 AM", departure: "", description: "Return to port and disembark with wonderful memories of your journey." }
  ];
  
  // Mock cabin options (since we only have one cabin type in our data model)
  const cabinOptions = [
    { type: "Interior", description: "Cozy and economical", price: cruise.pricePerPerson - 200 },
    { type: cruise.cabinType, description: "Beautiful views of the ocean", price: cruise.pricePerPerson },
    { type: "Suite", description: "Luxurious accommodations with extra space", price: cruise.pricePerPerson + 500 }
  ];

  return (
    <div className="bg-[#f8f9fb] py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#1a75bc]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/destinations" className="hover:text-[#1a75bc]">Cruises</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{cruise.title}</span>
        </div>
        
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#0d4677] mr-4">{cruise.title}</h1>
            <div className="flex items-center mt-2 md:mt-0">
              {Array.from({ length: Math.floor(cruise.rating) }).map((_, i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400 h-5 w-5" />
              ))}
              {cruise.rating % 1 !== 0 && (
                <StarHalf className="fill-yellow-400 text-yellow-400 h-5 w-5" />
              )}
              <span className="ml-2 text-gray-700">{cruise.rating} ({Math.floor(Math.random() * 100) + 50} reviews)</span>
            </div>
          </div>
          <p className="text-xl text-gray-700">{cruise.description}</p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="rounded-xl overflow-hidden shadow-md mb-4">
                <img 
                  src={cruiseImages[activeImage]} 
                  alt={cruise.title} 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {cruiseImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${activeImage === index ? 'border-[#1a75bc]' : 'border-transparent'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${cruise.title} view ${index+1}`} 
                      className="w-24 h-16 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cruise Details Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid grid-cols-3 bg-[#f1f5f9]">
                <TabsTrigger 
                  value="overview" 
                  onClick={() => setActiveTab("overview")}
                  className={activeTab === "overview" ? "text-[#1a75bc]" : ""}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="itinerary" 
                  onClick={() => setActiveTab("itinerary")}
                  className={activeTab === "itinerary" ? "text-[#1a75bc]" : ""}
                >
                  Itinerary
                </TabsTrigger>
                <TabsTrigger 
                  value="cabins" 
                  onClick={() => setActiveTab("cabins")}
                  className={activeTab === "cabins" ? "text-[#1a75bc]" : ""}
                >
                  Cabins
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-4">
                <div>
                  <h2 className="text-2xl font-montserrat font-semibold text-[#0d4677] mb-4">Cruise Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center">
                      <MapPin className="text-[#1a75bc] mr-3 h-5 w-5" />
                      <span><strong>Departure Port:</strong> {cruise.departureFrom}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-[#1a75bc] mr-3 h-5 w-5" />
                      <span><strong>Duration:</strong> {cruise.duration} Nights</span>
                    </div>
                    <div className="flex items-center">
                      <Ship className="text-[#1a75bc] mr-3 h-5 w-5" />
                      <span><strong>Destination:</strong> {destination?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="text-[#1a75bc] mr-3 h-5 w-5" />
                      <span><strong>Price From:</strong> ${cruise.pricePerPerson} per person</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-montserrat font-semibold text-[#0d4677] mb-3">Experience Description</h3>
                  <p className="text-gray-700 mb-6">
                    Embark on an unforgettable journey aboard our luxury cruise ship as you explore the
                    stunning {destination?.name} region. This {cruise.duration}-night cruise departing from {cruise.departureFrom} offers 
                    the perfect balance of adventure and relaxation.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Your {cruise.cabinType} provides comfortable accommodations with spectacular views
                    throughout your journey. Enjoy world-class dining options, exciting entertainment, and a wide range
                    of onboard activities suitable for travelers of all ages.
                  </p>
                  
                  <h3 className="text-xl font-montserrat font-semibold text-[#0d4677] mb-3">Inclusions</h3>
                  <p className="text-gray-700 mb-3">{cruise.inclusions}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {cruise.availablePackages.map((pkg, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="text-green-500 mr-2 h-5 w-5" />
                        <span className="text-gray-700">{pkg}</span>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      <span className="text-gray-700">All onboard meals (excluding specialty dining)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      <span className="text-gray-700">Entertainment and activities</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      <span className="text-gray-700">Fitness center access</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      <span className="text-gray-700">Port charges and taxes</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary" className="pt-4">
                <h2 className="text-2xl font-montserrat font-semibold text-[#0d4677] mb-4">{cruise.duration}-Night Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((day) => (
                    <div key={day.day} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#1a75bc]">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Day {day.day}: {day.port}</h3>
                        <div className="text-sm text-gray-600">
                          {day.arrival && <span className="mr-3">Arrival: {day.arrival}</span>}
                          {day.departure && <span>Departure: {day.departure}</span>}
                        </div>
                      </div>
                      <p className="text-gray-700">{day.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-[#f0f7ff] p-4 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    Note: Itinerary is subject to change due to weather conditions or other unforeseen circumstances.
                    All times are local to the port.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="cabins" className="pt-4">
                <h2 className="text-2xl font-montserrat font-semibold text-[#0d4677] mb-4">Available Cabin Options</h2>
                <div className="space-y-6">
                  {cabinOptions.map((cabin, index) => (
                    <div 
                      key={index} 
                      className={`bg-white rounded-lg shadow-sm p-6 border ${cabin.type === cruise.cabinType ? 'border-[#1a75bc]' : 'border-gray-200'}`}
                    >
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{cabin.type}</h3>
                          <p className="text-gray-600">{cabin.description}</p>
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center">
                              <Check className="text-green-500 mr-2 h-4 w-4" />
                              <span className="text-gray-700 text-sm">Private bathroom</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-green-500 mr-2 h-4 w-4" />
                              <span className="text-gray-700 text-sm">TV and safe</span>
                            </div>
                            {cabin.type.includes("Ocean View") && (
                              <div className="flex items-center">
                                <Check className="text-green-500 mr-2 h-4 w-4" />
                                <span className="text-gray-700 text-sm">Window with ocean view</span>
                              </div>
                            )}
                            {cabin.type.includes("Balcony") && (
                              <div className="flex items-center">
                                <Check className="text-green-500 mr-2 h-4 w-4" />
                                <span className="text-gray-700 text-sm">Private balcony</span>
                              </div>
                            )}
                            {cabin.type.includes("Suite") && (
                              <>
                                <div className="flex items-center">
                                  <Check className="text-green-500 mr-2 h-4 w-4" />
                                  <span className="text-gray-700 text-sm">Spacious living area</span>
                                </div>
                                <div className="flex items-center">
                                  <Check className="text-green-500 mr-2 h-4 w-4" />
                                  <span className="text-gray-700 text-sm">Priority boarding</span>
                                </div>
                                <div className="flex items-center">
                                  <Check className="text-green-500 mr-2 h-4 w-4" />
                                  <span className="text-gray-700 text-sm">Concierge service</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <p className="text-2xl font-bold text-[#0d4677]">${cabin.price}</p>
                          <p className="text-gray-600 text-sm">per person</p>
                          <Link
                            href={`/booking/${cruise.id}?cabin=${cabin.type}&price=${cabin.price}`}
                            className={`inline-block mt-3 px-6 py-2 rounded-lg font-medium transition duration-300 ${
                              cabin.type === cruise.cabinType 
                                ? 'bg-[#ff7043] hover:bg-[#e65100] text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          >
                            Select
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Booking Card */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-montserrat font-bold text-[#0d4677] mb-4">Book This Cruise</h2>
                
                <div className="mb-5">
                  <p className="text-3xl font-bold text-[#0d4677]">
                    ${cruise.pricePerPerson}
                    <span className="text-sm font-normal text-gray-600 ml-1">per person</span>
                  </p>
                  {cruise.originalPrice && (
                    <p className="text-sm text-gray-500">
                      <span className="line-through">${cruise.originalPrice}</span>
                      <span className="ml-2 text-green-600 font-medium">
                        Save ${cruise.originalPrice - cruise.pricePerPerson}
                      </span>
                    </p>
                  )}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-[#1a75bc]" />
                    <span>{cruise.duration} Nights</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-[#1a75bc]" />
                    <span>Departing from {cruise.departureFrom}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Ship className="h-5 w-5 mr-3 text-[#1a75bc]" />
                    <span>{cruise.cabinType}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-3 text-[#1a75bc]" />
                    <span>Based on double occupancy</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Choose Departure Date:</h3>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a75bc] bg-white text-gray-700">
                    <option value="2023-12-18">Dec 18, 2023</option>
                    <option value="2024-01-15">Jan 15, 2024</option>
                    <option value="2024-02-12">Feb 12, 2024</option>
                    <option value="2024-03-18">Mar 18, 2024</option>
                  </select>
                </div>
                
                <Link
                  href={`/booking/${cruise.id}`}
                  className="block w-full bg-[#ff7043] hover:bg-[#e65100] text-white font-montserrat font-semibold py-3 px-6 rounded-lg text-center transition duration-300"
                >
                  Book Now
                </Link>
                
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>No booking fees • Secure payment</p>
                  <p>Free cancellation on select cruises</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CruiseDetails;
