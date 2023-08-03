import { useRegisterSW } from "virtual:pwa-register/solid";

const intervalMS = 60 * 60 * 1000;

export const usePwaRegister = () =>
  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
    onNeedRefresh() {
      if (confirm("New content available. Reload?")) {
        usePwaRegister();
      }
    }
  });
