import { A } from "@solidjs/router";
import { FiSun, FiMoon } from "solid-icons/fi";
import { Show } from "solid-js";
import { settingStore, toggleDarkmode } from "~/store/settingStore";
import { useStore } from "@nanostores/solid";

function Navbar() {
  const setting = useStore(settingStore);

  return (
    <header>
      <nav class="main-nav backdrop-blur-xl bg-white/20  dark:bg-black/10 z-30 top-0 shadow-sm fixed flex justify-center items-center px-4 sm:px-8 h-16 w-full">
        <div class="max-wrapper w-full h-full flex justify-between items-center text-lg ">
          <h2 class="font-extrabold">
            <A class="hover:text-indigo-500 interactable" href="/">
              Lwin Moe Paing <span class="text-indigo-500">Dev</span>{" "}
            </A>
          </h2>

          <div class="hidden sm:flex gap-5 font-bold ">
            <A
              activeClass="text-indigo-500"
              inactiveClass=""
              class="hover:text-indigo-500 interactable"
              href="/blog"
            >
              {" "}
              Blog{" "}
            </A>
            <A
              activeClass="text-indigo-500"
              inactiveClass=""
              class="hover:text-indigo-500 interactable"
              href="/books"
            >
              {" "}
              Books{" "}
            </A>
            <A
              activeClass="text-indigo-500"
              inactiveClass=""
              class="hover:text-indigo-500 interactable"
              href="/sharing"
            >
              {" "}
              Sharing{" "}
            </A>
            <Show
              when={setting().darkmode}
              fallback={
                <span
                  onClick={toggleDarkmode}
                  class="h-6 w-6 cursor-pointer hover:text-indigo-500 interactable"
                  data-type="darkmode"
                >
                  <FiMoon class="w-full h-full" />
                </span>
              }
            >
              <span
                onClick={toggleDarkmode}
                class="h-6 w-6 cursor-pointer hover:text-indigo-500 interactable"
                data-type="darkmode"
              >
                <FiSun class="w-full h-full" />
              </span>
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
