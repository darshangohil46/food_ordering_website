import React, { useEffect } from 'react';
import API_BASE_URL from '../config';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <h1 className='text-info'>Privacy Policy</h1>
      <p className='text-danger'>Welcome to Foodie! We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.</p>

      <h4 className='text-warning'>1. Information We Collect</h4>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> When you sign up, place an order, or interact with our website, we may collect personal details such as your name, email address, phone number, and payment information.</li>
        <li><strong>Usage Data:</strong> We may collect information on how you access and use the website, including your IP address, browser type, pages visited, and time spent on pages.</li>
        <li><strong>Cookies:</strong> Our website uses cookies to enhance your browsing experience. Cookies help us understand how you use our website and allow us to offer personalized features.</li>
      </ul>

      <h4 className='text-warning'>2. How We Use Your Information</h4>
      <p>We may use your information for the following purposes:</p>
      <ul>
        <li>To process and fulfill your orders, including sending you notifications and updates.</li>
        <li>To improve our website, services, and customer support.</li>
        <li>To personalize your experience on our website, such as providing you with tailored recommendations.</li>
        <li>To communicate with you about promotions, offers, and news about our products and services.</li>
        <li>To ensure the security and integrity of our services.</li>
      </ul>

      <h4 className='text-warning'>3. Sharing Your Information</h4>
      <p>We do not sell or share your personal information with third parties, except in the following situations:</p>
      <ul>
        <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website, processing payments, or delivering services to you.</li>
        <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to legal processes.</li>
        <li><strong>Business Transfers:</strong> If Foodie is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
      </ul>

      <h4 className='text-warning'>4. Security</h4>
      <p>We take the security of your personal information seriously and implement appropriate measures to protect it. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h4 className='text-warning'>5. Your Choices</h4>
      <p>You have the following rights regarding your personal information:</p>
      <ul>
        <li>To access, update, or delete your personal information by logging into your account or contacting us directly.</li>
        <li>To opt-out of receiving promotional emails by following the unsubscribe link in our communications.</li>
        <li>To disable cookies through your browser settings, although this may affect your experience on our website.</li>
      </ul>

      <h4 className='text-warning'>6. Children's Privacy</h4>
      <p>Our services are not directed at individuals under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete it.</p>

      <h4 className='text-warning'>7. Changes to This Policy</h4>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it regularly.</p>

      <h4 className='text-warning'>8. Contact Us</h4>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us.</p>
    </div>
  );
}
