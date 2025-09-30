(async () => {
    /**
     * Waits for the Iterable SDK functions to appear on the global window object.
     * This is necessary because we are loading it via script injection, which is asynchronous.
     */
    const waitForSDK = async () => {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50; // Try for up to 5 seconds
            const globalObjectName = 'Iterable'; // The most likely global name

            const check = setInterval(() => {
                const sdkGlobal = window[globalObjectName];
                
                if (sdkGlobal && typeof sdkGlobal.initialize === 'function' && typeof sdkGlobal.getInAppMessages === 'function') {
                    clearInterval(check);
                    resolve({
                        initialize: sdkGlobal.initialize,
                        getInAppMessages: sdkGlobal.getInAppMessages
                    });
                    return;
                }

                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(check);
                    reject(new Error(`Timed out waiting for Iterable SDK functions on window.${globalObjectName}.`));
                }
            }, 100);
        });
    };

    try {
        // 1. Inject the script into the DOM
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL("iterablewebsdk.js");
        document.head.appendChild(script);

        // 2. Wait for the SDK functions to become available on the window object
        const { initialize, getInAppMessages } = await waitForSDK();

        // Streamlined async JWT generator method
        const yourAsyncJWTGeneratorMethod = async ({ email }) => {
            return new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ type: 'getJWT', email }, (response) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(response);
                    }
                });
            });
        };

        // 3. Initialize the SDK with the API key and JWT generator
        const { setEmail } = initialize(
            '[api_key]',
            yourAsyncJWTGeneratorMethod
        );
    
        // 4. Get in-app message functionality
        const { request } = getInAppMessages(
            {
                count: 20,
                displayInterval: 1000,
                onOpenScreenReaderMessage: 'In-app message loaded.',
                onOpenNodeToTakeFocus: 'input',
                packageName: 'com.rebecca.webinapptest',
                rightOffset: '20px',
                topOffset: '20px',
                bottomOffset: '20px',
                handleLinks: 'external-new-tab',
                closeButton: {
                    color: 'black',
                    size: '16px',
                    topOffset: '20px' 
                }
            },
            { display: 'immediate'}
        );

        // 5. Set the user's email and request messages
        await setEmail('rebecca@iterable.com');
        await request();
        console.log('Successfully set email and requested messages.');

    } catch (error) {
        console.error('An error occurred during SDK setup:', error.message);
    }
})();
