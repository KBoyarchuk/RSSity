import { browser, Tabs } from "webextension-polyfill-ts";
import { nanoid } from "nanoid";

const tabsMap = new Map<string, Tabs.Tab>();

const queryTabs = async (queryInfo: Tabs.QueryQueryInfoType = {}) => {
  try {
    const tabs = await browser.tabs.query(queryInfo);
    return tabs;
  } catch {
    return;
  }
};

// const onUpdatedHandler = () => {};

browser.tabs.onUpdated.addListener();

browser.runtime.onInstalled.addListener();
