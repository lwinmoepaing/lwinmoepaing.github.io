import { A } from "@solidjs/router";
import { FiSun, FiMoon, FiMenu } from "solid-icons/fi";
import { For, Show } from "solid-js";
import {
  settingStore,
  toggleDarkmode,
  toogleNavbar,
} from "~/store/settingStore";
import { useStore } from "@nanostores/solid";
import FlaotAnimation from "~/components/Animation/FlaotAnimation";
const navLinks = [
  {
    name: "Blog",
    link: "/blog",
    type: "blog",
  },
  {
    name: "Books",
    link: "/books",
    type: "book",
  },
  {
    name: "Sharing",
    link: "/sharing",
    type: "sharing",
  },
];

function Navbar() {
  const setting = useStore(settingStore);

  return (
    <header class="z-[9999] relative">
      <nav
        class={`${
          setting().showNavbar ? "opacity-0" : ""
        } main-nav backdrop-blur-xl bg-white/20  dark:bg-black/10 z-30 top-0 shadow-sm fixed flex justify-center items-center px-4 md:px-8 h-16 w-full`}
      >
        <div class="max-wrapper w-full h-full flex justify-between items-center text-lg ">
          <h2 class="flex font-extrabold">
            <A
              class="hover:text-indigo-500 interactable"
              data-type="home"
              href="/"
            >
              Lwin Moe Paing <span class="text-indigo-500">Dev</span>{" "}
            </A>
          </h2>

          <div class="hidden md:flex flex-col justify-center items-center md:justify-start md:items-start md:flex-row gap-10 md:gap-5 font-bold ">
            <For each={navLinks}>
              {(link) => (
                <A
                  activeClass="text-indigo-500"
                  inactiveClass=""
                  class="hover:text-indigo-500 interactable"
                  data-type={link.type}
                  href={link.link}
                >
                  {" "}
                  {link.name}
                </A>
              )}
            </For>

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
          <div class="flex md:hidden flex-row justify-center items-center gap-5">
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
            <span
              onClick={toogleNavbar}
              class="h-6 w-6 cursor-pointer hover:text-indigo-500 interactable"
              data-type="darkmode"
            >
              <FiMenu class="w-full h-full" />
            </span>
          </div>
        </div>
      </nav>

      <Show when={setting().showNavbar}>
        <FlaotAnimation />

        <div class="top-0 z-[1000] fixed w-full h-full flex flex-col justify-center gap-12 items-center bg-white/20 dark:bg-black/10 opacity-0 animate-[opacity0to1_0.3s_1000ms_ease-in-out_forwards]">
          <For each={navLinks}>
            {(link) => (
              <A
                activeClass=""
                inactiveClass=""
                class="hover:text-indigo-500 interactable text-2xl"
                data-type={link.type}
                href={link.link}
                onClick={toogleNavbar}
              >
                {link.name}
              </A>
            )}
          </For>
        </div>
      </Show>
    </header>
  );
}
export default Navbar;
