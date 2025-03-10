import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Users, Globe2, GraduationCap, Languages, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CourseListing from './Student/CourseListing';

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { name: 'English', flag: '🇺🇸' },
    { name: 'Hindi', flag: '🇮🇳' },
    { name: 'Spanish', flag: '🇪🇸' },
    { name: 'French', flag: '🇫🇷' },
    { name: 'German', flag: '🇩🇪' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'Korean', flag: '🇰🇷' },
    { name: 'Chinese', flag: '🇨🇳' },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const trendingCourses = [
    {
      title: "Advanced Machine Learning",
      instructor: "Dr. Sarah Johnson",
      rating: 4.9,
      students: 18500,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      badge: "Bestseller"
    },
    {
      title: "Full-Stack Development Masterclass",
      instructor: "Michael Chen",
      rating: 4.8,
      students: 15000,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      badge: "New"
    },
    {
      title: "Digital Marketing Strategy",
      instructor: "Emma Davis",
      rating: 4.7,
      students: 12000,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      badge: "Popular"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Header/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 text-blue-600">
                <Languages className="w-5 h-5" />
                <span className="text-sm font-medium">Choose Your Language</span>
              </div>
              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                Learn in{' '}
                <span className="relative">
                  <span className="relative z-10">{selectedLanguage}</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-200 -z-10"></span>
                </span>
                <br />
                Master Your Future
              </h1>
              <p className="text-xl text-gray-600">
                Access over 150+ premium courses in {languages.length} languages. Start your learning journey today.
              </p>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedLanguage === lang.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => setSelectedLanguage(lang.name)}
                  >
                    {lang.flag} {lang.name}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Start Learning Now
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-gray-900">150+ Courses</span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-gray-900">Certified Learning</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: BookOpen, count: "150+", label: "Courses", delay: 0 },
              { icon: Users, count: "1.9M+", label: "Students", delay: 0.2 },
              { icon: Star, count: "4.7", label: "Rating", delay: 0.4 },
              { icon: Globe2, count: "10+", label: "Languages", delay: 0.6 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-bold">{stat.count}</h3>
                <p className="mt-2 text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      {/* <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-semibold">FEATURED COURSES</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Trending This Week</h2>
            <p className="text-xl text-gray-600">Discover our most popular courses</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  {course.badge && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="ml-2 text-gray-700 font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span className="ml-2 text-gray-700 font-medium">{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      <CourseListing/>

      {/* Reviews Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400" />
                ))}
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">4.7 Star Rating</h2>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              1.9 Million Happy Learners
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    alt="Student"
                    className="w-14 h-14 rounded-full ring-4 ring-blue-50"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Student Name</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "The course exceeded my expectations. The content was well-structured and easy to follow.
                  I've learned so much and feel confident in my new skills. The instructor was excellent!"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Home;