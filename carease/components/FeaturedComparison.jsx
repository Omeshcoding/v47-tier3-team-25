import React from 'react';
import ReusableCard from './ReusableCard';

const FeaturedComparison = () => {
  return (
    <>
      <section className="py-20 px-10 bg-gradient-to-b from-white to-[#908C8D]">
        <h2 className="text-[30px] font-bigHeadings tracking-tighter sm:text-[40px] md:text-[45px] xl:text-[50px] font-normal sm:px-20">
          Featured Cars
        </h2>

        <div className="md:flex justify-center text-center text-[#312C2C] md:px-12 sm:px-20">
          <ReusableCard
            model="Aston Martin DBS"
            imgUrl="/images/Aston_Martin_DBS.png"
          />
          <ReusableCard model="MG 4" imgUrl="/images/MG4.png" />
          <ReusableCard
            model="Maserati MC20"
            imgUrl="/images/Maserati MC20.png"
          />
        </div>

        <div className="flex justify-center">
          <button className="w-[194px] h-12 sm:w-[30%] lg:w-[25%] md:h-16 text-sm md:text-xl mt-12 bg-[#E11D48] hover:bg-[#E4335A] text-white rounded-xl">
            View Comparison
          </button>
        </div>
      </section>
    </>
  );
};

export default FeaturedComparison;
