# iterable-websdk-inapp-chrome-extension
Display in-app/in-browser messages using Chrome Extension via Iterable Web SDK

In the `matches` array in the `manifest.json` file, input the website url of where the in-app message will be displayed.
The `rakuten.js` file is where you'll update the `demo_token` (JWT token), `api_key`, `packageName`, and `setEmail`.

To add as a Chrome extension, go to chrome://extensions/; click on "Load unpacked" and select the main folder (i.e. `iterable-websdk-inapp-chrome-extension`).

To view in action:
- Create an in-app message
- Go to website url from the `matches` array (i.e. `https://www.amazon.com/`)
- Sent an in-app test message to the email address in `setEmail`
- Refresh the web page and you should see the in-app message. 
