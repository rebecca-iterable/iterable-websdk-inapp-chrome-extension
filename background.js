chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getJWT') {
    // Return true to indicate that we will send a response asynchronously
    // This keeps the message channel open.
    (async () => {
      try {
        const getEmailFromStorage = () =>
          new Promise((resolve, reject) => {
            chrome.storage.local.get(['email'], (result) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve(result.email);
              }
            });
          });

        let email = await getEmailFromStorage();
        
        if (!email) {
          // Use the email from the request if it exists, otherwise use a default.
          email = request.email || 'rebecca@iterable.com';
        }

        const jwt = await getJWT(email);
        sendResponse(jwt);
      } catch (error) {
        console.error('Error getting JWT:', error);
        sendResponse(null); // Send a null response on error
      }
    })();
    return true; // Important: Return true to signal an asynchronous response
  }
});

async function getJWT(email) {
  let url = new URL('http://127.0.0.1:3001/generateJWT');
  url.searchParams.append('email', email);

  // Correct syntax for fetch. Use a valid variable name.
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Check if the response was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.token;
}