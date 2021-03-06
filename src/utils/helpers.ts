import { browser } from "webextension-polyfill-ts";

export const isBackgroundPage = async (): Promise<boolean> => {
  try {
    const page = await browser.runtime.getBackgroundPage();
    return page === window;
  } catch {
    return false;
  }
};

export const getExtensionID = (): string => browser.runtime.id;
