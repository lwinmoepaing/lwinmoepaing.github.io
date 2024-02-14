import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
import MetaHead from "~/components/Common/MetaHead/MetaHead";
import HeroSectionAnimation from "~/components/Animation/HeroSectionAnimation/HeroSectionAnimation";
import ButterflyAnimation from "~/components/Animation/ButterflyAnimation/ButterflyAnimation";
import SharingTextAnimation from "~/components/Animation/SharingTextAnimation/SharingTextAnimation";
import CircleBackgroundAnimation from "~/components/Animation/CircleBackgroundAnimation/CircleBackgroundAnimation";
import WaveTextAnimation from "~/components/Animation/WaveTextAnimation/WaveTextAnimation";
import WalkingWorldAnimation from "~/components/Animation/WalkingWorldAnimation/WalkingWorldAnimation";
import IntroText from "~/components/Home/IntroText";
import PandaButton from "~/components/Common/PandaButton/PandaButton";

function HomePage() {
  return (
    <>
      <MetaHead title="Home" body="Portfolio : Lwin Moe Paing (Developer)" />

      <AnimateContainer>
        <div>
          <div class="max-w-[1300px] mx-auto">
            <div class="overflow-hidden flex justify-center items-center">
              <div class="w-full min-w-[690px] mx-auto">
                <HeroSectionAnimation />
              </div>
            </div>
          </div>

          <IntroText />

          <div class="max-w-[960px] mx-auto ">
            <ButterflyAnimation />
          </div>

          <div class="mx-auto mb-[5rem] md:mb-0">
            <div class="max-w-[400px] mx-auto">
              <SharingTextAnimation />
            </div>

            <div class="relative max-w-[1600px] mx-auto md:top-[-2.5rem]">
              <div class="overflow-hidden flex justify-center items-center">
                <div class="w-full min-w-[590px] mx-auto">
                  <CircleBackgroundAnimation />
                </div>
              </div>
            </div>
          </div>

          <div class="my-[2.5rem]">
            <div class="relative max-w-[1600px] mx-auto md:top-[-2.5rem]">
              <div class="overflow-hidden flex justify-center items-center">
                <div class="w-full min-w-[900px] mx-auto">
                  <WaveTextAnimation />
                </div>
              </div>
            </div>
          </div>

          <div class="mx-auto mb-10 text-center">
            <PandaButton
              title="Send Email Now!"
              link="mailto:lwinmoepaing.dev@gmail.com"
            />
          </div>

          <div class="max-w-[570px] mx-auto">
            <WalkingWorldAnimation />
          </div>

          <div class="max-wrapper px-4 sm:px-8 animate-[opacity0to1_0.3s_ease-in-out]">
            <div class="max-w-[500px] mx-auto my-[3rem] text-center">
              <h2 class="text-lg my-2">
                <span class="text-indigo-500 font-bold">Thank you </span> for
                visiting lwinmoepaing.com
              </h2>
            </div>
          </div>
        </div>
      </AnimateContainer>
    </>
  );
}
export default HomePage;
