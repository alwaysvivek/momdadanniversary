'use client';

import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, Heart } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

// Pre-generate random positions outside component to avoid impure function calls during render
const generateBackgroundHearts = () => {
  return [...Array(20)].map((_, i) => ({
    id: i,
    x1: Math.random() * 100 - 50,
    x2: Math.random() * 100 - 50,
    y1: Math.random() * 100 - 50,
    y2: Math.random() * 100 - 50,
    left: (i / 20) * 100,
    top: Math.random() * 100,
  }));
};

const backgroundHeartsData = generateBackgroundHearts();

export default function AnniversaryCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Anniversary date: January 1, 2006
  const anniversaryDate = useMemo(() => new Date('2006-01-01T00:00:00'), []);
  
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    totalDays: 0,
  });

  // Use pre-generated data
  const backgroundHearts = useMemo(() => backgroundHeartsData, []);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - anniversaryDate.getTime();
      
      // Calculate years, months, days
      const years = now.getFullYear() - anniversaryDate.getFullYear();
      const months = now.getMonth() - anniversaryDate.getMonth() + (years * 12);
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Adjust for current month
      const adjustedMonths = months % 12;
      
      setTimeElapsed({
        years,
        months: adjustedMonths,
        days: now.getDate(),
        hours,
        minutes,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [anniversaryDate]);

  const stats = [
    {
      icon: Calendar,
      value: timeElapsed.years,
      label: 'Years Together',
      color: 'from-pink-400 to-rose-500',
      suffix: 'Years',
    },
    {
      icon: Heart,
      value: timeElapsed.totalDays.toLocaleString(),
      label: 'Days of Love',
      color: 'from-purple-400 to-pink-500',
      suffix: 'Days',
    },
    {
      icon: Clock,
      value: `${timeElapsed.hours}:${timeElapsed.minutes.toString().padStart(2, '0')}`,
      label: 'Right Now',
      color: 'from-blue-400 to-purple-500',
      suffix: '',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl my-12 mx-4 md:mx-8 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-4xl opacity-10"
            animate={{
              x: [heart.x1, heart.x2],
              y: [heart.y1, heart.y2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + heart.id,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl mb-4"
          >
            ⏰
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white font-playfair">
            Time Together
          </h2>
          <p className="text-lg md:text-xl text-white/80">
            Every moment has been precious
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  key={stat.value.toString()}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-6xl font-bold text-white mb-2 font-playfair"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xl text-white/80">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <p className="text-2xl md:text-4xl font-bold text-white mb-4 font-playfair">
              {timeElapsed.totalDays.toLocaleString()} days of beautiful memories!
            </p>
            <p className="text-lg md:text-xl text-white/80">
              ...and counting! Here&apos;s to thousands more! 🥂
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
