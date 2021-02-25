import { browser } from "webextension-polyfill-ts";

async function reloadTabs() {
  try {
    const tabs = await browser.tabs.query({
      url: "https://www.wikipedia.org/",
    });
    await Promise.all([...tabs].map((tab) => browser.tabs.reload(tab.id)));
  } catch (error) {
    console.error(`An error occurred while reloading tbs: ${error.message}`);
  }
}

reloadTabs()
  .then(async () => {
    const { User } = await import("@/background/bg");
    const user = new User("Kostya");
    console.log(user.greet());
    return user.greet();
  })
  .catch((error) => console.error(error));
