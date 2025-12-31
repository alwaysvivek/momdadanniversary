'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PersonalMessageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg font-medium text-gray-900">
              Dear Uncle & Aunty,
            </p>

            <p>
              Congratulations on reaching this incredible milestone of <strong>20 wonderful years together</strong>.
            </p>

            <p>
              Your love story is truly inspiring. The way you support each other, laugh together, 
              and navigate life's journey hand-in-hand shows what a beautiful partnership looks like.
            </p>

            <div className="py-6 my-6 border-t border-b border-gray-200">
              <p className="text-xl font-medium text-gray-900 mb-4">
                Thank you for Rishu 💕
              </p>
              <p>
                She is the most wonderful person in my life, and that is a testament to the love, 
                values, and care you've given her. Your guidance has shaped her into the amazing 
                person she is, and I feel incredibly blessed to have her in my life.
              </p>
            </div>

            <p>
              Thank you for welcoming me with open arms and making me feel like part of your family. 
              Your kindness and warmth mean the world to me.
            </p>

            <p>
              Here's to your beautiful journey together – past, present, and future.
            </p>

            <div className="text-right mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">With love and respect</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
