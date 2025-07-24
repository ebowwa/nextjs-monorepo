// src/components/view-vendors/vendorCard.tsx
// src/components/view-vendors/vendorCard.tsx

import React, { useState } from 'react';

// Define the props the VendorCard component will accept
interface VendorCardProps {
  title: string;
  description: string;
  category: string;
  image: string; // URL of the vendor's image
}

// The VendorCard component displays information about a vendor
export const VendorCard: React.FC<VendorCardProps> = ({
  title,
  description,
  category,
  image,
}) => {
  // State to manage whether the description is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expanded state of the description
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Define the maximum number of characters to show in the shortened description
  const descriptionPreviewLength = 100;

  // Function to render the vendor description based on the isExpanded state
  const renderDescription = () => {
    // If the description is short enough, display it in full
    if (description.length <= descriptionPreviewLength) {
      return description;
    }

    // Display either the shortened description with a "Read more" link or the full description with a "Read less" link
    return isExpanded ? (
      <>
        {description}
        <span className="text-blue-600 cursor-pointer" onClick={toggleDescription}> Read less</span>
      </>
    ) : (
      <>
        {description.substring(0, descriptionPreviewLength)}...
        <span className="text-blue-600 cursor-pointer" onClick={toggleDescription}> Read more</span>
      </>
    );
  };

  // Main render function for the VendorCard component
  return (
    <div className="border p-4 flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{renderDescription()}</p>
      <p className="text-sm text-gray-500">{category}</p>
      {image && (
        <div className="mt-2 bg-gray-100 w-full flex justify-center items-center overflow-hidden" style={{ height: '200px' }}>
          <img
            src={image}
            alt={title}
            className="object-cover" // Ensures the image covers the designated area without distortion
            style={{ width: '100%', height: '200px' }} // Standardizes all images to the same size for uniformity
          />
        </div>
      )}
    </div>
  );
};

