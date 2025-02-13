import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsCarousel = ({ darkMode, testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [direction, setDirection] = useState(1);

  const testimonialItems = testimonials || [
    {
      name: "Sarah Johnson",
      role: "CTO, TechStart Inc",
      text: "AI Studio transformed how we build products. The accuracy and speed of their models are unmatched in the industry.",
    },
    {
      name: "Michael Chen",
      role: "Lead Developer, FutureAI",
      text: "The developer experience is exceptional. Comprehensive docs and responsive support made integration effortless.",
    },
    {
      name: "Emma Williams",
      role: "AI Product Manager, InnovateCorp",
      text: "Reduced our development time by 40% while improving model performance. Essential tool for any AI team.",
    }
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialItems.length);
    setAutoRotate(false);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialItems.length) % testimonialItems.length);
    setAutoRotate(false);
  };

  const goToTestimonial = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setAutoRotate(false);
  };

  useEffect(() => {
    if (autoRotate) {
      const interval = setInterval(nextTestimonial, 7000);
      return () => clearInterval(interval);
    }
  }, [autoRotate, activeIndex]);

  return (
    <div className={`relative py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Trusted by Innovators
        </h2>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6 dark:text-white" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6 dark:text-white" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              {testimonialItems.map((testimonial, index) => (
                index === activeIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: direction * 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -100 }}
                    transition={{ duration: 0.4 }}
                    className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <UserCircleIcon className="w-12 h-12 text-gray-400" />
                      <div>
                        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {testimonial.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      “{testimonial.text}”
                    </p>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonialItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-purple-600 w-6' 
                  : darkMode 
                    ? 'bg-gray-600' 
                    : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

TestimonialsCarousel.propTypes = {
  darkMode: PropTypes.bool,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  )
};

export default TestimonialsCarousel;