let is_active = true;

// add a listener for https://*.google.com/search*
browser.webRequest.onBeforeRequest.addListener(process, {
  urls: ['https://*.google.com/search*'],
  types: ['main_frame']
}, ['blocking'] );

function process(details) {
  if (!is_active) {
    return;
  }

  // Detect if we are in a tab where adding udm=14 would break that page
  if (details.url.includes("udm=2") || details.url.includes("udm=3")) {
    return;
  }

  // add &udm=14 if URL already has search string, otherwise ?udm=14
  let udm14 = (details.url.includes('?') ? '&' : '?') + 'udm=14';

  if (is_active && !details.url.includes('udm=14')) {
    return {redirectUrl: details.url + udm14};
  } else if (!is_active && !details.url.includes('udm=14')) {
    return {redirectUrl: details.url.replace(udm14,'')};
  }
}

browser.browserAction.onClicked.addListener((tab) => {
  is_active = !is_active;

  if (is_active) {
    let settingIcon = browser.browserAction.setIcon({
      path: {
        "48": "icons/browser_on.svg",
        "64": "icons/browser_on.svg",
        "128": "icons/browser_on.svg",
        "512": "icons/browser_on.svg"
      },
    });
  } else {
    let settingIcon = browser.browserAction.setIcon({
      path: {
        "48": "icons/browser_off.svg",
        "64": "icons/browser_off.svg",
        "128": "icons/browser_off.svg",
        "512": "icons/browser_off.svg"
      }
    });
  }
});
