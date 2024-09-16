import React, { useEffect } from "react";
import API_BASE_URL from '../config';


export default function Aboutus() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      {/* font style */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Nerko+One&family=SUSE:wght@100..800&display=swap" rel="stylesheet" />

      <div className="container py-5" style={{ fontFamily: '"SUSE", sans-serif' }}>
        <h1 className="text-center mb-4 text-danger">About Foodie</h1>
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-3 text-warning">Who We Are</h2>
            <p>
              At Foodie, we are passionate about bringing the best culinary experiences to your doorstep. Whether you're craving local delicacies or international cuisine, Foodie connects you with the top restaurants in your area, ensuring that you get exactly what you want, when you want it.
            </p>
            <p>
              Founded with the mission to simplify the food ordering process, Foodie has become the go-to platform for food lovers who value quality, convenience, and speed. Our team is dedicated to curating a wide variety of options to satisfy every palate.
            </p>
          </div>
          <div className="col-md-6">
            <h2 className="mb-3 text-warning">Our Vision</h2>
            <p>
              We believe that food is more than just sustenance; it's a way to bring people together, celebrate cultures, and create lasting memories. Our vision is to make Foodie the most trusted food ordering platform by offering an unmatched selection of dishes, exceptional service, and a seamless user experience.
            </p>
            <p>
              We're constantly innovating to enhance our offerings and streamline the process from the moment you place your order to the time it arrives at your door. With Foodie, you can trust that your meal will be prepared with care and delivered with precision.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h2 className="mb-3 text-warning">Why Choose Us?</h2>
            <ul className="list-unstyled">
              <li><strong className="text-warning">Wide Selection:</strong> A vast array of cuisines and dishes to choose from.</li>
              <li><strong className="text-warning">Easy Ordering:</strong> User-friendly platform with intuitive navigation.</li>
              <li><strong className="text-warning">Fast Delivery:</strong> Timely deliveries with real-time tracking.</li>
              <li><strong className="text-warning">Quality Assurance:</strong> Only the best restaurants and chefs.</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h2 className="mb-3 text-warning">Our Commitment</h2>
            <p>
              At Foodie, we are committed to providing a top-notch experience for our customers. Your satisfaction is our priority, and we are always here to listen to your feedback and improve our services.
            </p>
            <p>
              Join us on this delicious journey and explore the world of food like never before. From your favorite local spots to new culinary adventures, Foodie is here to make your dining experience extraordinary.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
