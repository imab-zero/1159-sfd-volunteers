'use client';

import { useState } from 'react';

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleExport = async (format: 'csv' | 'xlsx') => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`/api/export?format=${format}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to export ${format}`);
      }

      // Create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      if (format === 'csv') {
        a.download = `school-for-the-daring-leads-${new Date().toISOString().split('T')[0]}.csv`;
      } else {
        a.download = `school-for-the-daring-leads-${new Date().toISOString().split('T')[0]}.xlsx`;
      }
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage(`Successfully exported ${format.toUpperCase()} file!`);
    } catch (error) {
      console.error(`Export ${format} error:`, error);
      setError(error instanceof Error ? error.message : `Failed to export ${format}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-black px-6 py-4">
          <h1 className="text-2xl font-bold text-white text-center">
            School for the Daring
          </h1>
          <p className="text-yellow-600 text-center mt-1">
            Admin Export Portal
          </p>
        </div>
        
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Export Leads
            </h2>
            <p className="text-gray-600">
              Download all registered leads in your preferred format
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleExport('csv')}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Exporting...' : 'Download CSV'}
            </button>

            <button
              onClick={() => handleExport('xlsx')}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Exporting...' : 'Download Excel'}
            </button>
          </div>

          {message && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <p className="font-medium">Success!</p>
              <p className="text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Data is fetched directly from Google Sheets
              <br />
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}