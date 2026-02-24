import React from 'react';
import PageHero from '../components/PageHero';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Terms of Service"
        description="The rules and guidelines for using our services."
      />
      
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto prose dark:prose-invert prose-slate lg:prose-xl">
          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing or using the services provided by Tekify Consult, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">2. Description of Service</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tekify Consult provides digital marketing, web development, app development, and consulting services. We reserve the right to modify or discontinue any service with or without notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">3. User Responsibilities</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Providing accurate information for bookings and projects.</li>
              <li>Maintaining the confidentiality of any account credentials.</li>
              <li>Ensuring that your use of our services complies with all applicable laws.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">4. Payment and Billing</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Payments for services are due according to the terms specified in your invoice. Late payments may result in a suspension of services or additional fees. All prices are subject to change.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">5. Intellectual Property</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Unless otherwise agreed in writing, Tekify Consult retains all intellectual property rights to the tools, code, and designs developed during the provision of services. Clients are granted a license to use the final deliverables for their intended purpose.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">6. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tekify Consult shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">7. Governing Law</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500">
            Last updated: February 24, 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
