import React from "react";

const TermsCondtion = () => {
  return (
    <div className="max-w-4xl p-6 mx-auto text-gray-800">
      <h1 className="mb-4 text-3xl font-bold">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to our platform. By using our services, purchasing car parts, or
        listing vehicles for sale, you agree to the terms outlined below. Please
        read them carefully.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">About Us</h2>
      <p className="mb-4">
        We are a trusted online marketplace for selling and buying cars and
        genuine automotive parts. Our mission is to make car trading and parts
        sourcing simpler, safer, and more transparent for everyone.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Special Offers</h2>
      <p className="mb-4">
        When you purchase any car part through our platform, you may be eligible
        for up to <strong>£100 cashback</strong>, depending on current
        promotions. Please check offer details at the time of purchase.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Return Policy</h2>
      <p className="mb-4">
        We offer a <strong>30-day return window</strong> on all eligible car
        parts. To qualify for a return:
      </p>
      <ul className="mb-4 list-disc list-inside">
        <li>The part must be unused and in its original packaging.</li>
        <li>
          You must initiate the return within 30 days of the delivery date.
        </li>
        <li>
          Custom or electrical components may not be eligible unless faulty.
        </li>
      </ul>
      <p className="mb-4">
        Approved returns will be refunded to your original payment method within
        7–10 business days after inspection.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">User Responsibility</h2>
      <p className="mb-4">
        You are responsible for ensuring that all information provided during a
        transaction (including car listings, part compatibility, and contact
        details) is accurate. We reserve the right to remove listings or
        accounts that violate our policies.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Legal</h2>
      <p className="mb-4">
        These terms are governed by UK law. We may update our terms from time to
        time, so please review this page periodically for changes.
      </p>

      <p className="mt-6 text-sm text-gray-500">Last updated: April 23, 2025</p>
    </div>
  );
};

export default TermsCondtion;
