import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
import MetaHead from "~/components/Common/MetaHead/MetaHead";
import CfpAtomicDesign from "~/components/Sharing/CompleteForProduct/CfpAtomicDesign";
import CfpSharingLogic from "~/components/Sharing/CompleteForProduct/CfpSharingLogic";
import CfpStateManagement from "~/components/Sharing/CompleteForProduct/CfpStateManagement";
import ChosingTailwindUI from "~/components/Sharing/CompleteForProduct/ChosingTailwindUI";
import CommonSharing from "~/components/Sharing/CompleteForProduct/CommonSharing";
import CompleteForProduct from "~/components/Sharing/CompleteForProduct/CompleteForProduct";
import CrossPlatform from "~/components/Sharing/CompleteForProduct/CrossPlatform";
import PlatformOwnEco from "~/components/Sharing/CompleteForProduct/PlatformOwnEco";

function CompleteProductWithReactAndReactNativePage() {
  const [currentSlide, setCurrentSlide] = createSignal(1);

  createEffect(() => {
    const click = () => {
      setCurrentSlide((prev) => prev + 1);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowDown" || e.key === "Enter") {
        setCurrentSlide((prev) => prev + 1);
      }
    };

    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("click", click);
    onCleanup(() => {
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("click", click);
    });
  });

  createEffect(() => {
    if (currentSlide()) {
      //
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    }
  });

  return (
    <>
      <MetaHead
        title="Sharing"
        body="Sharing Sessions By Lwin Moe Paing (Developer)"
      />
      <AnimateContainer>
        <div class="px-4 sm:px-8 pb-[40px]">
          <div class="max-w-[880px] mx-auto text-center">
            <Show when={currentSlide() >= 1}>
              <div class="max-w-[800px] mx-auto text-center">
                <CompleteForProduct />
              </div>
            </Show>
            <AnimateContainer>
              <Show when={currentSlide() >= 2}>
                <PlatformOwnEco />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 3}>
                <CrossPlatform />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 4}>
                <div class="w-full mt-8 mb-20">
                  <img
                    class="w-full block mx-auto"
                    src="/images/sharings/cpbe_sharing.gif"
                  />
                </div>
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 5}>
                <CommonSharing />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 6}>
                <ChosingTailwindUI />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 7}>
                <CfpAtomicDesign />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 8}>
                <CfpSharingLogic />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 9}>
                <CfpStateManagement />
              </Show>
            </AnimateContainer>
          </div>
        </div>
      </AnimateContainer>
    </>
  );
}
export default CompleteProductWithReactAndReactNativePage;
