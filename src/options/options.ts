import { browser } from "webextension-polyfill-ts";

console.log("fdfdsfgdsgsd");
async function reloadTabs() {
  try {
    const tabs = await browser.tabs.query({ url: "https://someurl.com" });

    await Promise.all([...tabs].map((tab) => browser.tabs.reload(tab.id)));

    await browser.notifications.create({
      type: "basic",
      iconUrl: "icon.pndgg",
      title: "Tabs reloaded",
      message: "Your tabs have been reloaded",
    });
  } catch (error) {
    console.error(`An error occurred while reloading tabs: ${error.message}`);
  }
}

reloadTabs();
