import type { InitialData } from "./types";

declare global {
  interface Window {
    __INITIAL_DATA__: InitialData;
  }
}
