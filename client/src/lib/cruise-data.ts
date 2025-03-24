import { Destination, Cruise, Amenity, Testimonial } from '@shared/schema';

// This file contains utility functions to transform data from the API
// and provide additional computed properties for the UI

export interface EnhancedCruise extends Cruise {
  destination?: Destination;
  discount?: number;
  discountPercentage?: number;
  formattedDuration?: string;
}

export interface EnhancedDestination extends Destination {
  cruiseCount?: number;
}

// Transform cruise data to add computed properties
export function enhanceCruise(cruise: Cruise, destinations?: Destination[]): EnhancedCruise {
  const enhanced: EnhancedCruise = { ...cruise };
  
  // Add destination information
  if (destinations) {
    enhanced.destination = destinations.find(d => d.id === cruise.destinationId);
  }
  
  // Calculate discount if there's an original price
  if (cruise.originalPrice && cruise.originalPrice > cruise.pricePerPerson) {
    enhanced.discount = cruise.originalPrice - cruise.pricePerPerson;
    enhanced.discountPercentage = Math.round((enhanced.discount / cruise.originalPrice) * 100);
  }
  
  // Format duration for display
  enhanced.formattedDuration = `${cruise.duration} ${cruise.duration === 1 ? 'Night' : 'Nights'}`;
  
  return enhanced;
}

// Transform multiple cruises at once
export function enhanceCruises(cruises: Cruise[], destinations?: Destination[]): EnhancedCruise[] {
  return cruises.map(cruise => enhanceCruise(cruise, destinations));
}

// Filter cruises by search criteria
export function filterCruises(cruises: Cruise[], filters: {
  destination?: string;
  duration?: string;
  price?: [number, number];
  date?: string;
  deals?: boolean;
}): Cruise[] {
  return cruises.filter(cruise => {
    // Filter by destination
    if (filters.destination && cruise.destinationId.toString() !== filters.destination) {
      return false;
    }
    
    // Filter by duration
    if (filters.duration) {
      switch (filters.duration) {
        case '2-5 Days':
          if (cruise.duration < 2 || cruise.duration > 5) return false;
          break;
        case '6-9 Days':
          if (cruise.duration < 6 || cruise.duration > 9) return false;
          break;
        case '10+ Days':
          if (cruise.duration < 10) return false;
          break;
      }
    }
    
    // Filter by price
    if (filters.price && (cruise.pricePerPerson < filters.price[0] || cruise.pricePerPerson > filters.price[1])) {
      return false;
    }
    
    // Filter for deals
    if (filters.deals && (!cruise.originalPrice || cruise.originalPrice <= cruise.pricePerPerson)) {
      return false;
    }
    
    return true;
  });
}

// Group cruises by destination
export function groupCruisesByDestination(cruises: Cruise[]): Record<number, Cruise[]> {
  return cruises.reduce((groups, cruise) => {
    const destId = cruise.destinationId;
    if (!groups[destId]) {
      groups[destId] = [];
    }
    groups[destId].push(cruise);
    return groups;
  }, {} as Record<number, Cruise[]>);
}

// Get random featured cruises
export function getFeaturedCruises(cruises: Cruise[], count: number = 2): Cruise[] {
  // First look for bestsellers
  const bestsellers = cruises.filter(cruise => cruise.isBestSeller);
  
  // If we have enough bestsellers, return them
  if (bestsellers.length >= count) {
    return bestsellers.slice(0, count);
  }
  
  // Otherwise, add some new itineraries
  const newItineraries = cruises.filter(cruise => cruise.isNewItinerary && !cruise.isBestSeller);
  const featured = [...bestsellers];
  
  // Add new itineraries until we reach the count
  for (let i = 0; i < newItineraries.length && featured.length < count; i++) {
    featured.push(newItineraries[i]);
  }
  
  // If we still don't have enough, add random cruises
  const remaining = count - featured.length;
  if (remaining > 0) {
    const otherCruises = cruises.filter(
      cruise => !cruise.isBestSeller && !cruise.isNewItinerary
    );
    
    for (let i = 0; i < otherCruises.length && featured.length < count; i++) {
      featured.push(otherCruises[i]);
    }
  }
  
  return featured;
}

// Format mock itinerary for a cruise
export function getMockItinerary(cruise: Cruise): any[] {
  return [
    { day: 1, port: cruise.departureFrom, arrival: "", departure: "5:00 PM", description: "Board your luxurious cruise ship and set sail for an amazing adventure." },
    { day: 2, port: "At Sea", arrival: "", departure: "", description: "Enjoy the amenities onboard as you sail to your first destination." },
    { day: 3, port: "Nassau, Bahamas", arrival: "8:00 AM", departure: "5:00 PM", description: "Explore beautiful beaches, colonial architecture, and vibrant local culture." },
    { day: 4, port: "Perfect Day at CocoCay", arrival: "7:00 AM", departure: "4:00 PM", description: "Experience thrilling water slides, zip lines, and relax on pristine beaches." },
    { day: 5, port: "At Sea", arrival: "", departure: "", description: "Relax and enjoy your last full day at sea with all the ship has to offer." },
    { day: cruise.duration, port: cruise.departureFrom, arrival: "7:00 AM", departure: "", description: "Return to port and disembark with wonderful memories of your journey." }
  ];
}

// Mock cabin options based on the cruise
export function getMockCabinOptions(cruise: Cruise): any[] {
  return [
    { type: "Interior", description: "Cozy and economical", price: cruise.pricePerPerson - 200 },
    { type: cruise.cabinType, description: "Beautiful views of the ocean", price: cruise.pricePerPerson },
    { type: "Suite", description: "Luxurious accommodations with extra space", price: cruise.pricePerPerson + 500 }
  ];
}

// Get mock future sailing dates
export function getMockSailingDates(): string[] {
  const dates = [];
  const startDate = new Date();
  startDate.setDate(1); // Start from the first day of the current month
  
  for (let i = 0; i < 6; i++) {
    const futureDate = new Date(startDate);
    futureDate.setMonth(futureDate.getMonth() + i);
    dates.push(futureDate.toISOString().split('T')[0]);
  }
  
  return dates;
}
