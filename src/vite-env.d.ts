/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    ym: (counter: number, type: string, value: string) => void;
  }
}