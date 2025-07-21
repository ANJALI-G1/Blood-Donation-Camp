import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCampStore from '../store/campStore';
import Card from '../components/Card';
import { 
  AlertCircle,
  RefreshCw,
  ChevronDown,
  ArrowRight,
  Plus,
  Frown
} from 'lucide-react';

const HomePage = () => {
    const { camps, loading, error, fetchCamps } = useCampStore();
    const [currentBgIndex, setCurrentBgIndex] = useState(0);
    const bgImages = ['Hero.png', 'Hero2.png', 'Hero3.png'];
    
    useEffect(() => {
        fetchCamps();
        
        // Set up the interval for background image rotation
        const interval = setInterval(() => {
            setCurrentBgIndex((prevIndex) => 
                prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change every 5 seconds
        
        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [fetchCamps]);
    
    const currentBgImage = bgImages[currentBgIndex];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-100 border-t-red-500 mx-auto mb-6"></div>
                    <h2 className="text-2xl font-bold text-red-900 mb-2">Loading Camps</h2>
                    <p className="text-red-700">Gathering the latest blood donation events...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50">
                <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-red-900 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-700 mb-6">We couldn't load the camps: {error}</p>
                    <button 
                        onClick={fetchCamps}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 shadow-md transition-all"
                    >
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-white to-red-50">
            {/* Floating background elements */}
            <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-200 rounded-full opacity-10 blur-3xl"></div>
            </div>

            {/* Hero Section with rotating background */}
            <section 
                className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center before:absolute before:inset-0 before:bg-black/30 before:z-0 transition-all duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${currentBgImage})` }}
            >
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
                        Donate Blood, <span className="text-red-900 glow-text-red">Save Lives</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-red-100 mb-8 drop-shadow-md max-w-2xl mx-auto">
                        Join thousands of donors across India in our mission to ensure no one dies from lack of blood
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/search"
                            className="px-8 py-4 bg-white text-red-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Find a Camp Nearby
                        </Link>
                    </div>
                </div>
                
                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="h-8 w-8 text-white" />
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-white to-red-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">PROCESS</span>
                        <h2 className="text-4xl font-bold text-red-900 mb-4">How It Works</h2>
                        <p className="max-w-2xl mx-auto text-red-700 text-lg">
                            Joining our life-saving community is simple and rewarding
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 opacity-0 animate-fadeUp" style={{animationDelay:'0.2s'}}>
                            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <span className="text-3xl font-bold text-red-600 glow-text-red">1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-center text-red-900">Find a Camp</h3>
                            <p className="text-red-700 text-center">
                                Search our extensive database for blood donation camps by location, date or organization.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 opacity-0 animate-fadeUp" style={{animationDelay:"0.6s"}}>
                            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <span className="text-3xl font-bold text-red-600 glow-text-red">2</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-center text-red-900">Register Online</h3>
                            <p className="text-red-700 text-center">
                                Easily sign up for the camp that fits your schedule with our simple registration process.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 opacity-0 animate-fadeUp" style={{animationDelay:"1s"}}>
                            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <span className="text-3xl font-bold text-red-600 glow-text-red">3</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-center text-red-900">Donate & Save Lives</h3>
                            <p className="text-red-700 text-center">
                                Visit the camp and make your donation. Each donation can save up to 3 lives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Camps Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">CAMPS</span>
                            <h2 className="text-4xl font-bold text-red-900">Upcoming Blood Donation Camps</h2>
                            <p className="text-red-700 mt-2">Verified camps where your donation can make a difference</p>
                        </div>
                        <Link
                            to="/search"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white font-medium rounded-lg hover:from-red-800 hover:to-red-900 shadow-md transition-all"
                        >
                            View All Camps
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </Link>
                    </div>

                    {camps.length === 0 ? (
                        <div className="bg-red-50 rounded-2xl p-12 text-center">
                            <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
                                <Frown className="h-12 w-12 text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-red-900 mb-2">No Upcoming Camps</h3>
                            <p className="text-red-700 mb-6 max-w-md mx-auto">We couldn't find any upcoming blood donation camps. Check back soon </p>
                    
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {camps.slice(0, 3).map((camp) => (
                                <Card key={camp._id || camp.id} camp={camp} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="py-20 px-4  bg-red-900  text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h3>
                    <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                        Your single donation can save up to three lives. Join our community of heroes today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default HomePage;