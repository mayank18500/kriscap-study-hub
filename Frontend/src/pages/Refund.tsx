const Refund = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Refund Policy</h1>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
          <p>Last updated: [Date]</p>
          <p>
            Thank you for shopping at Kriscap Education. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may request a refund under the terms of this policy.
          </p>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">1. Digital Products</h2>
          <p>
            Due to the nature of digital goods (PDF files, study materials, TMAs), all sales are final once the download link is generated and accessed. We cannot issue refunds for digital products that have been downloaded, unless there is a proven technical defect in the file itself.
          </p>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">2. Physical Products</h2>
          <p>
            For physical project files, you may request a return or refund within 7 days of receiving the item if it arrives damaged or if you received the wrong item. 
          </p>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">3. Services and Admissions</h2>
          <p>
            Admission counseling and consulting services are non-refundable once the service has commenced. If you cancel before any service has been rendered, a partial or full refund may be issued at our discretion.
          </p>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">4. Processing Refunds</h2>
          <p>
            Approved refunds will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Refund;
