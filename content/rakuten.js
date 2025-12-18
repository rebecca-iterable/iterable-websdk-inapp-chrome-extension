// 1. IMPORT the SDK directly at the top
import { initialize, getInAppMessages } from '@iterable/web-sdk';

(async () => {
    try {
        // NOTE: We deleted waitForSDK and the document.createElement('script') logic.
        // The bundler makes the SDK available immediately!

        const yourAsyncJWTGeneratorMethod = async ({ email }) => {
    // 1. Paste your encoded JWT string from JWT.io here
    const demoToken = "[jwt_token]"; 
    
    console.log("Using hardcoded demo token for email:", email);
    
    // 2. Simply return the token
    return demoToken;
};

        // 2. Initialize using the imported functions
        const { setEmail } = initialize(
            '[api_key]',
            yourAsyncJWTGeneratorMethod
        );
    
        const { request } = getInAppMessages(
            {
                count: 20,
                displayInterval: 1000,
                packageName: 'com.rebecca.webinapptest',
                // ... your other styling config ...
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

        await setEmail('rebecca@iterable.com');
        await request();
        console.log('Successfully set email and requested messages.');

    } catch (error) {
        // This specific error "Timed out waiting for Iterable..." will no longer happen!
        console.error('An error occurred during SDK setup:', error.message);
    }
})();

