import React, { useEffect } from 'react';
import API_BASE_URL from '../config';

export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-warning">Frequently Asked Questions</h1>

      <div className="accordion" id="faqAccordion">
        {/* FAQ 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              What is Foodie?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Foodie is an online food ordering platform that allows you to browse menus from various restaurants, place orders, and have your favorite meals delivered right to your doorstep.
            </div>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              How do I place an order?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Placing an order on Foodie is easy! Simply browse our menu, select the items you wish to order, add them to your cart, and proceed to checkout. You can choose to pay online or on delivery.
            </div>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              What payment methods are accepted?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              We accept various payment methods, including credit/debit cards, net banking, UPI, and cash on delivery. Choose the one that is most convenient for you at checkout.
            </div>
          </div>
        </div>

        {/* FAQ 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Can I track my order?
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Yes, once your order is placed, you can track its status in real-time from the Foodie app or website. You will receive updates on when your food is being prepared, out for delivery, and delivered.
            </div>
          </div>
        </div>

        {/* FAQ 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              What if there is an issue with my order?
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              If you encounter any issues with your order, such as incorrect items or delays, you can contact our customer support team for assistance. We are here to ensure that your experience with Foodie is a positive one.
            </div>
          </div>
        </div>

        {/* FAQ 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
              How can I contact Foodie?
            </button>
          </h2>
          <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              You can contact us through the "Contact Us" page on our website or by emailing us at support@foodie.com. We are always here to help with any questions or concerns you may have.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
