import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">About Us</h2>

      <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
        Welcome to <span className="font-semibold text-red-600">ShopEase</span>, your trusted
        online destination for quality products at affordable prices. We started with a simple idea —
        to make online shopping easy, enjoyable, and accessible for everyone. Whether you’re shopping
        for fashion, electronics, or daily essentials, we bring everything you need to your fingertips.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Our Mission</h3>
          <p className="text-gray-600">
            At ShopEase, our mission is to deliver happiness with every order. We believe that
            shopping should be effortless and enjoyable, which is why we focus on providing a seamless
            experience — from product discovery to doorstep delivery. Customer satisfaction is at the
            heart of everything we do.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Our Story</h3>
          <p className="text-gray-600">
            Founded in 2023 by a passionate team of dreamers and innovators, ShopEase grew from a small
            local idea into a nationwide online platform. With a commitment to innovation and quality,
            we’ve built a space where customers can explore, trust, and enjoy shopping online.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">What Makes Us Different</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 mt-6">
          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2 text-red-600">Quality First</h4>
            <p>
              Every product we offer goes through strict quality checks to ensure that our customers
              receive only the best.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2 text-red-600">Customer Focused</h4>
            <p>
              We’re always here for you — with fast delivery, simple returns, and responsive support
              that actually listens.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2 text-red-600">Sustainability</h4>
            <p>
              We care about the planet. Our packaging and logistics are designed to minimize waste
              and reduce our environmental footprint.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Journey</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’re more than just an online store — we’re a community that values trust, quality,
          and convenience. Join us as we continue to grow and redefine what online shopping means
          for everyone.
        </p>
      </div>
    </div>
  );
};

export default About;
