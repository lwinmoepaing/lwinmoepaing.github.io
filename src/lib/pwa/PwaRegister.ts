declare module "virtual:pwa-register/solid" {
  import type { Accessor, Setter } from "solid-js";
  import type { RegisterSWOptions as Option} from "vite-plugin-pwa/types";

  export function useRegisterSW(options?: Option): {
    needRefresh: [Accessor<boolean>, Setter<boolean>];
    offlineReady: [Accessor<boolean>, Setter<boolean>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };

  export type RegisterSWOptions = Option;
}
