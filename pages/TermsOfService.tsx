import React from 'react';
import PageHero from '../components/PageHero';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Terms of Service"
        description="TEKIFY CONSULT – TERMS OF SERVICE & PAYMENT POLICY"
      />
      
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto prose dark:prose-invert prose-slate lg:prose-xl">
          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Introduction</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              These Terms of Service govern all services provided by Tekify Consult (“the Company”) to its clients. By engaging our services, the client agrees to abide by the terms outlined below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Scope of Services</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tekify Consult provides digital marketing, advertising management, web development, branding, and related digital services as agreed in individual proposals or invoices.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The specific deliverables, timelines, and scope for each client will be defined in the approved proposal, invoice, or service agreement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Payment Terms</h2>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3.1 Monthly Retainer Services</h3>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>All monthly services are payable in advance before the commencement of each service cycle.</li>
              <li>Payment confirms reservation of resources, team allocation, and service activation.</li>
              <li>Services officially commence only upon confirmation of payment.</li>
              <li>Subsequent monthly payments are due on or before the same billing date each month.</li>
              <li>A grace period of up to five (5) working days may be allowed at management discretion.</li>
              <li>Services may be paused if payment is not received after the grace period.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3.2 One-Time Projects</h3>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>A minimum of 60% upfront payment is required before project commencement.</li>
              <li>The balance is payable upon project completion or before final delivery.</li>
              <li>Final files, access credentials, or handover materials will only be released upon full payment.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Advertising Budgets</h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Advertising budgets (Meta, TikTok, Google, YouTube, etc.) are separate from Tekify Consult’s professional service fees.</li>
              <li>Ad spend is paid directly by the client to the advertising platform unless otherwise agreed in writing.</li>
              <li>Platforms may apply statutory taxes (e.g., VAT) and other applicable charges.</li>
              <li>Tekify Consult does not guarantee specific sales figures, as advertising results depend on market conditions, competition, audience behaviour, budget size, and creative performance.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Refund Policy</h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>All payments made for services are non-refundable once work has commenced.</li>
              <li>Retainer fees are non-refundable once the service month has started.</li>
              <li>Advertising budgets paid directly to platforms are subject to the platform’s refund policies.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Client Responsibilities</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">The client agrees to:</p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Provide accurate business information and required materials on time.</li>
              <li>Grant necessary access to platforms, pages, domains, and accounts.</li>
              <li>Respond to communication and approval requests within reasonable timeframes.</li>
              <li>Ensure their products or services comply with Nigerian laws and advertising platform policies.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Tekify Consult shall not be held liable for:</p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Platform account suspensions beyond our control</li>
              <li>Market downturns or seasonal demand changes</li>
              <li>Algorithm changes by advertising platforms</li>
              <li>Business losses arising from factors outside our operational control</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Confidentiality</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              All client information, data, and business materials shared with Tekify Consult shall be treated as confidential and will not be disclosed to third parties without written consent, except where required by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Termination</h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Either party may terminate a monthly retainer with 14 days written notice.</li>
              <li>Outstanding invoices must be settled before termination is finalized.</li>
              <li>Upon termination, access rights and deliverables will be handled according to payment status.</li>
            </ul>
          </section>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500">
            Last updated: February 26, 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
