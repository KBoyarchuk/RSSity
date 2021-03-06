import { browser } from "webextension-polyfill-ts";

const isCurrentWindowTop = () => {
  return window.top === window;
};

// interface IObserver {
//   observe(target: Node): void;
//   disconnect(): void;
//   observerHandler(mutations: MutationRecord[]): void;
// }

// class Observer implements IObserver {
//   private static observerInstance: IObserver;

//   private mutationObserver: MutationObserver;
//   private mutationObserverConfig: MutationObserverInit;
//   private mutationObserverActive: boolean;

//   private constructor() {
//     this.mutationObserver = new MutationObserver(this.observerHandler);
//     this.mutationObserverConfig = {
//       subtree: true,
//       childList: true,
//       attributeFilter: ["type"],
//     };
//     this.mutationObserverActive = false;
//   }

//   observerHandler(mutations: MutationRecord[]) {}

//   observe(target: Node) {
//     this.mutationObserverActive = true;
//     this.mutationObserver.observe(target, this.mutationObserverConfig);
//   }

//   disconnect() {
//     this.mutationObserverActive = false;
//     this.mutationObserver.disconnect();
//   }

//   public static createObserverInstance(): Observer {
//     if (!Observer.observerInstance) {
//       Observer.observerInstance = new Observer();
//     }

//     return Observer.observerInstance;
//   }
// }

// Observer.createObserverInstance();
