type RequestIdleCallbackHandle = number;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

export type ScheduleCallback = () => void;
export interface IIdleValue {
  getValue(): unknown;
  setValue(newValue: unknown): void;
}

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      options?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

export class IdleValue implements IIdleValue {
  scheduleCallback: ScheduleCallback;
  private requestId: number | undefined;
  private invokedCallback: unknown;
  constructor(scheduleCallback: ScheduleCallback) {
    this.scheduleCallback = scheduleCallback;
    this.requestId = window.requestIdleCallback(() => {
      this.invokedCallback = this.scheduleCallback();
    });
  }
  private cancelIdleCallback() {
    if (this.requestId) {
      window.cancelIdleCallback(this.requestId);
      this.requestId = undefined;
    }
  }
  getValue(): unknown {
    if (this.invokedCallback === undefined) {
      this.cancelIdleCallback();
      this.invokedCallback = this.scheduleCallback();
    }
    return this.invokedCallback;
  }
  setValue(newValue: unknown): void {
    this.cancelIdleCallback();
    this.invokedCallback = newValue;
  }
}
