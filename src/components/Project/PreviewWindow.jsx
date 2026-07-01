import React, { useState, useEffect } from 'react';

const PreviewWindow = ({ url }) => {
  const [address, setAddress] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    if (url) {
      setAddress(url);
      setIframeUrl(url);
    }
  }, [url]);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address) return;
    let finalUrl = address;
    if (!finalUrl.startsWith('http')) {
      finalUrl = 'https://' + finalUrl;
    }
    setIframeUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-100 border-b border-gray-300">
        <div className="flex items-center gap-2 flex-1">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <form onSubmit={handleAddressSubmit} className="ml-2 flex-1 max-w-md">
            <div className="flex items-center bg-white rounded border border-gray-200 px-2 py-0.5">
              <svg className="w-3 h-3 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Waiting for server..."
                disabled={!url}
                className="flex-1 text-xs text-gray-600 outline-none bg-transparent"
              />
            </div>
          </form>
        </div>
        
        {url && (
          <a 
            href={iframeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 p-1 rounded hover:bg-gray-200 transition-colors ml-2"
            title="Open in new tab"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      <div className="flex-1 bg-white relative">
        {!iframeUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
            <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <p className="text-sm">Run your app in the terminal to see it here.</p>
            <p className="text-xs mt-2 text-gray-500">e.g. npm run dev</p>
          </div>
        ) : (
          <iframe 
            src={iframeUrl} 
            className="w-full h-full border-none"
            title="Preview"
            allow="cross-origin-isolated"
          />
        )}
      </div>
    </div>
  );
};

export default PreviewWindow;
