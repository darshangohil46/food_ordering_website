import React, { useEffect } from 'react'
import API_BASE_URL from '../config';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className='text-info'>Terms and Conditions</h1>
      <p>Welcome to Foodie!</p>
      <p>These terms and conditions outline the rules and regulations for the use of Foodie's Website.</p>

      <h4 className='text-warning'>1. Introduction</h4>
      <p>
        By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Foodie's website if you do not accept all of the terms and conditions stated on this page.
      </p>

      <h4 className='text-warning'>2. License</h4>
      <p>
        Unless otherwise stated, Foodie and/or its licensors own the intellectual property rights for all material on Foodie. All intellectual property rights are reserved. You may view and/or print pages from https://foodie.com for your own personal use subject to restrictions set in these terms and conditions.
      </p>

      <h4 className='text-warning'>3. User Comments</h4>
      <p>
        Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material, and data ('Comments') in areas of the website. Foodie does not screen, edit, publish, or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of Foodie, its agents, or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion.
      </p>

      <h4 className='text-warning'>4. Content Liability</h4>
      <p>
        We shall have no responsibility or liability for any content appearing on your website. You agree to indemnify and defend us against all claims arising out of or based upon your website.
      </p>

      <h4 className='text-warning'>5. Governing Law</h4>
      <p>
        These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
      </p>

      <h4 className='text-warning'>6. Contact Us</h4>
      <p>
        If you have any questions about these Terms, please contact us at contact@foodie.com.
      </p>

      <p>
        By continuing to access or use our website, you agree to be bound by these Terms.
      </p>
    </div>
  )
}
