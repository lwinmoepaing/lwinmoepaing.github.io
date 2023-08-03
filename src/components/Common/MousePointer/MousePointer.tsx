import { Match, Show, Switch, createEffect, createSignal } from "solid-js";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiMoon,
  FiSun,
  FiLayers,
  FiHeart,
  FiShare2,
} from "solid-icons/fi";
import { settingStore } from "~/store/settingStore";
import { useStore } from "@nanostores/solid";

function MousePointer() {
  const setting = useStore(settingStore);
  const [isInteracting, setInteracting] = createSignal(false);
  const [interactIcon, setInteractIcon] = createSignal("");

  createEffect(() => {
    const audio = new Audio("/clicky.mp3");
    const trailer = document.getElementById("trailer");

    const animateTrailer = (e: MouseEvent, interacting: boolean) => {
      if (!trailer) return;
      const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;

      const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 3.5 : 1})`,
      };

      trailer.animate(keyframes, {
        duration: 800,
        fill: "forwards",
      });
    };

    window?.addEventListener("mousemove", (e: MouseEvent) => {
      const interactable = (e?.target as HTMLElement)?.closest?.(
        ".interactable"
      );

      const interacting = interactable !== null;

      if (interactable as HTMLElement) {
        setInteractIcon((interactable as HTMLElement).dataset.type || "");
      }

      setInteracting(interacting);
      animateTrailer(e, interacting);
    });

    window?.addEventListener("click", (e: MouseEvent) => {
      const interactable = (e?.target as HTMLElement)?.closest?.(
        ".interactable"
      );

      const interacting = interactable !== null;
      if (interacting) {
        audio?.play();
      }
    });
  });

  return (
    <div class="mouse invisible sm:visible" id="trailer">
      <Show when={isInteracting()} fallback={<></>}>
        <Switch
          fallback={<FiArrowUpRight class="w-[6px] h-[6px] text-white " />}
        >
          <Match when={interactIcon() === "book"}>
            <FiBookOpen class="w-[6px] h-[6px] text-white " />
          </Match>
          <Match when={interactIcon() === "home"}>
            <FiHeart class="w-[6px] h-[6px] text-white " />
          </Match>
          <Match when={interactIcon() === "share"}>
            <FiShare2 class="w-[6px] h-[6px] text-white " />
          </Match>
          <Match when={interactIcon() === "blog"}>
            <FiLayers class="w-[6px] h-[6px] text-white " />
          </Match>
          <Match when={setting().darkmode && interactIcon() === "darkmode"}>
            <FiSun class="w-[6px] h-[6px] text-white " />
          </Match>
          <Match when={!setting().darkmode && interactIcon() === "darkmode"}>
            <FiMoon class="w-[6px] h-[6px] text-white " />
          </Match>
        </Switch>
      </Show>
    </div>
  );
}
export default MousePointer;
