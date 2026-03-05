import React from 'react';

export default function CandidateInstructionsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-6 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-900 border-b border-gray-100 pb-4">
            Candidate Portal Instructions
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Welcome to your candidate dashboard. This platform is designed to help you manage your professional information and track your recruitment progress. Please review the following sections to get started.
          </p>
        </header>

        {/* Profile Instructions */}
        <section className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">1. Profile Management</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <p className="font-medium text-gray-800">Basic Information</p>
              <p className="text-sm">
                Use the profile form to provide your contact details, current role, and professional background. 
                Ensuring this information is up to date allows our team to match you with relevant opportunities.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Professional Links</p>
              <p className="text-sm">
                Adding your LinkedIn and GitHub URLs provides a more comprehensive view of your portfolio and 
                professional network. You may also list your technical skills as comma-separated values.
              </p>
            </div>
          </div>
        </section>

        {/* Interview Tracking */}
        <section className="mb-12">
          <br/>
          <h2 className="text-lg font-medium text-gray-900 mb-4">2. Interview Tracking</h2>
          <p className="text-sm text-gray-600 mb-6">
            The interview section provides a summary of your scheduled and completed interactions. 
            The table is organized as follows:
          </p>

          <div className="border border-gray-200 rounded">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-700">Column</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Position</td>
                  <td className="px-4 py-3 text-gray-600">The specific role for which you are being interviewed.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Date</td>
                  <td className="px-4 py-3 text-gray-600">The confirmed date and time for the interview session.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Status</td>
                  <td className="px-4 py-3 text-gray-600">
                    Indicates whether the interview is "Scheduled" or "Completed."
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="pt-8 border-t border-gray-100 text-sm text-gray-500">
          <p>If you encounter any issues while updating your profile, please contact the Talent Acquisition team.</p>
        </footer>

      </div>
    </div>
  );
}