export type VisibilityState =
  | "hidden"
  | "active"
  | "passive"
  | "terminated"
  | "frozen";

export type PageEvent = { event: Event; newState: VisibilityState };

export interface IPageLifecycle {
  getState(): VisibilityState;
  isCurrentWindowTop(): boolean;
}

export class PageLifecycle implements IPageLifecycle {
  private readonly browserEvents = [
    "focus",
    "blur",
    "visibilitychange",
    "freeze",
    "resume",
    "pageshow",
    "pagehide",
  ] as const;

  state: VisibilityState;

  constructor() {
    this.state = this.getCurrentState();
    this.setupEvents();
  }

  private getCurrentState(): VisibilityState {
    if (document.visibilityState === "hidden") {
      return "hidden";
    }
    if (document.hasFocus() || document.activeElement) {
      return "active";
    }
    return "passive";
  }

  private dispatchChangesIfNeeded(event: Event, newState: VisibilityState) {
    if (newState !== this.state) {
      const { target } = event;

      this.state = newState;
      if (target) {
        target.dispatchEvent(
          new CustomEvent<PageEvent>("statechange", {
            detail: {
              newState,
              event,
            },
          })
        );
      }
    }
  }

  private handleBrowserEvents(event: Event) {
    switch (event.type) {
      case "pageshow":
      case "resume":
        this.dispatchChangesIfNeeded(event, this.getCurrentState());
        break;
      case "focus":
        this.dispatchChangesIfNeeded(event, "active");
        break;
      case "blur":
        if (this.state === "active") {
          this.dispatchChangesIfNeeded(event, this.getCurrentState());
        }
        break;
      case "pagehide":
      case "unload":
        this.dispatchChangesIfNeeded(
          event,
          (event as PageTransitionEvent).persisted ? "frozen" : "terminated"
        );
        break;
      case "visibilitychange":
        if (this.state !== "frozen" && this.state !== "terminated") {
          this.dispatchChangesIfNeeded(event, this.getCurrentState());
        }
        break;
      case "freeze":
        this.dispatchChangesIfNeeded(event, "frozen");
        break;
    }
  }

  getState(): VisibilityState {
    return this.state;
  }

  isCurrentWindowTop(): boolean {
    return window.top === window;
  }

  private setupEvents() {
    for (const browserEvent of this.browserEvents)
      window.addEventListener(browserEvent, this.handleBrowserEvents, true);
  }
}
