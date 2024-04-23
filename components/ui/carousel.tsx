import React, { useState } from 'react';

interface CarouselProps {
  items: CarouselItem[];
}

interface CarouselItem {
  id: number;
  title: string;
  mainImage: string;
  desc: string;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevClick = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNextClick = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const currentItem = items[currentIndex];

  return (
    <div className="flex justify-center">
      <div className="w-96">
        <div className="relative">
          {items.map((item, index) => (
            <img
              key={item.id}
              src={item.mainImage}
              alt={item.title}
              className={`w-full mx-auto transition-all ${
                index === currentIndex ? 'opacity-100 scale-110' : 'opacity-50'
              }`}
              style={{ position: 'absolute', left: `${(index - currentIndex) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button className="text-blue-500 hover:text-blue-600" onClick={handlePrevClick}>
            Prev
          </button>
          <button className="text-blue-500 hover:text-blue-600" onClick={handleNextClick}>
            Next
          </button>
        </div>
        <div className="bg-white shadow-lg p-4 mt-4">
          <h2 className="text-2xl mb-2">{currentItem.title}</h2>
          <p className="mb-4">{currentItem.desc}</p>
          <div className="flex justify-center mb-2">
            {currentItem.images.map((image, i) => (
              <img key={i} src={image} alt={`Image ${i}`} className="w-16 h-16 rounded-full mr-2" />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => console.log(`Button clicked for item ${currentItem.id}`)}
            >
              Click Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;