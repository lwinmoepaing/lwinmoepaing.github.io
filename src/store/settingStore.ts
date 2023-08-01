import { action } from "nanostores";
import { SettingType } from "~/types/SettingType.t";

import { persistentAtom } from "@nanostores/persistent";

export const settingStore = persistentAtom<SettingType>(
  "setting",
  {
    darkmode: true,
  },
  {
    encode: (value) => {
      return JSON.stringify(value);
    },
    decode: (value) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
  }
);

export const toggleDarkmode = action(
  settingStore,
  "toggleDarkmode",
  (store) => {
    const setting = store.get();

    store.set({
      ...setting,
      darkmode: !setting.darkmode,
    });
  }
);
