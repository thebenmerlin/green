'use client';

import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        e.target.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-primary mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input type="text" name="name" required placeholder="Your Name" className="w-full px-4 py-2 border rounded-md" />
          <input type="email" name="email" required placeholder="Your Email" className="w-full px-4 py-2 border rounded-md" />
          <textarea name="message" required rows="5" placeholder="Your Message" className="w-full px-4 py-2 border rounded-md"></textarea>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary text-white rounded-md font-bold">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && <p className="text-green-600">✓ Message sent!</p>}
          {submitStatus === 'error' && <p className="text-red-600">✗ Error sending message</p>}
        </form>
      </div>
    </div>
  );
}
