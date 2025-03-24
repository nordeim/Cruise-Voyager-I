import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#0d4677] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <div className="text-2xl font-montserrat font-bold mb-6">
              <span className="text-white">Ocean</span><span className="text-[#ff7043]">View</span>
            </div>
            <p className="opacity-80 mb-6">Embark on unforgettable journeys across stunning oceans and exotic locations with our premium cruise experiences.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#ff7043] transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#ff7043] transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[#ff7043] transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#ff7043] transition duration-300">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white hover:text-[#ff7043] transition duration-300">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-6">Destinations</h4>
            <ul className="space-y-3">
              <li><Link href="/destinations?region=Caribbean" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Caribbean</Link></li>
              <li><Link href="/destinations?region=Mediterranean" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Mediterranean</Link></li>
              <li><Link href="/destinations?region=Alaska" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Alaska</Link></li>
              <li><Link href="/destinations?region=Europe" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Europe</Link></li>
              <li><Link href="/destinations?region=Asia" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Asia & Pacific</Link></li>
              <li><Link href="/destinations?region=Australia" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Australia & New Zealand</Link></li>
              <li><Link href="/destinations" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">South America</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-6">Information</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">About Us</a></li>
              <li><Link href="/#onboard" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Onboard Experience</Link></li>
              <li><a href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Shore Excursions</a></li>
              <li><a href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Travel Insurance</a></li>
              <li><a href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Cruise FAQ</a></li>
              <li><a href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Careers</a></li>
              <li><Link href="/contact" className="text-white opacity-80 hover:opacity-100 hover:text-[#ff7043] transition duration-300">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#ff7043]"></i>
                <span className="opacity-80">123 Cruise Way, Miami, FL 33101, United States</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-[#ff7043]"></i>
                <span className="opacity-80">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-[#ff7043]"></i>
                <span className="opacity-80">info@oceanviewcruises.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-[#ff7043]"></i>
                <span className="opacity-80">Mon-Fri: 8AM-8PM (EST)<br/>Sat-Sun: 9AM-6PM (EST)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-70 mb-4 md:mb-0">© {new Date().getFullYear()} OceanView Cruises. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-white opacity-70 hover:opacity-100 transition duration-300">Privacy Policy</a>
              <a href="#" className="text-sm text-white opacity-70 hover:opacity-100 transition duration-300">Terms of Service</a>
              <a href="#" className="text-sm text-white opacity-70 hover:opacity-100 transition duration-300">Cookie Policy</a>
              <a href="#" className="text-sm text-white opacity-70 hover:opacity-100 transition duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
