import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCampStore from '../store/campStore';
import Card from '../components/Card';

const HomePage = () => {
    const { camps, fetchAllCamps } = useCampStore();
    useEffect(() => {
        fetchAllCamps();
    }, [fetchAllCamps]);
    return (
        <>
           <div className="fixed top-0 left-0 w-full h-full z-[-2] bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,100%,90%,0)_0,rgba(248,113,113,0.3)_100%)]"></div>



        
        <div className="min-h-screen flex flex-col">


            {/* Hero Section */}
            <section className="bg-[url('Hero.png')] bg-cover bg-center text-white h-screen flex flex-col items-center justify-center px-6">
                <h2 className="text-5xl font-extrabold mb-2 text-center drop-shadow-md stroke-1 [text-shadow:_0_0_2px_red] ">Find Blood Donation Camps Near You</h2>
                <p className="mb-6 text-center text-lg drop-shadow-sm">Connecting willing donors with verified blood donation events across India.</p>
                <Link
                    to="/search"
                    className=" bg-white text-red-600 font-semibold py-2 px-6 rounded hover:bg-gray-200 transition "
                >
                    Search Camps
                </Link>
            </section>

            {/* How it Works - Modern Cards */}
            <section className="py-20 px-4  ">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-bold mb-4 text-center text-red-500">How It Works</h3>
                    <p className="max-w-2xl mx-auto text-gray-600 text-center mb-12">
                        Join the life-saving community in just a few simple steps
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl text-red-600">1</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">Find a Camp</h4>
                            <p className="text-gray-600">
                                Search for blood donation camps by location, date or organization.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl text-red-600">2</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">Register</h4>
                            <p className="text-gray-600">
                                Sign up for the camp that fits your schedule and location.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl text-red-600">3</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">Donate & Save Lives</h4>
                            <p className="text-gray-600">
                                Visit the camp and make your donation. One donation can save up to 3 lives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Camps */}
            
            <section className="py-20 px-4 ">
                

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div>
                            <h3 className="text-3xl font-bold text-red-500">Upcoming Blood Donation Camps</h3>
                            <p className="text-gray-600 mt-2">Join these verified camps near you</p>
                        </div>
                        <Link
                            to="/camps"
                            className="mt-4 md:mt-0 text-red-600 font-semibold hover:underline flex items-center"
                        >
                            View All Camps
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {camps.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">No upcoming camps found. Check back later!</p>
                            </div>
                        ) : (
                            camps.slice(0, 3).map((camp) => (
                                <Card key={camp._id} camp={camp} />
                            ))
                        )}
                    </div>
                </div>
            </section>


           
        </div>
        </>
    );
};

export default HomePage;
