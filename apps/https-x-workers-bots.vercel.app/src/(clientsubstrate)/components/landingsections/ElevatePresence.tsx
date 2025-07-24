// src/components/landingsections/ElevatePresence.tsx
import React from 'react';
import elevatePresence from '../../../../public/html/elevatePresence.json';

const ElevatePresence: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              {elevatePresence.keyFeaturesText}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{elevatePresence.title}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {elevatePresence.description}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              {elevatePresence.features.map((feature, index) => (
                <li key={index}>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <img
            alt="Features"
            className="mx-auto overflow-hidden object-cover object-center sm:w-full lg:order-last"
            height="100%"
            src={elevatePresence.imageUrl}
            width="100%"
          />
        </div>
      </div>
    </section>
  );
};

export default ElevatePresence;