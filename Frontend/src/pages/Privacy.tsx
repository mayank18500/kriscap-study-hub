const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
          <p>Last updated: [Date]</p>
          <p>
            At Kriscap Education, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">1. Information We Collect</h2>
          <p>
            We may collect personal identification information from users in a variety of ways, including, but not limited to, when users visit our site, register on the site, place an order, and in connection with other activities, services, features, or resources we make available on our site.
          </p>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">2. How We Use Your Information</h2>
          <p>
            We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
          </p>
          <ul className="list-disc pl-5">
            <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
            <li>To improve our website in order to better serve you.</li>
            <li>To quickly process your transactions.</li>
          </ul>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">3. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
