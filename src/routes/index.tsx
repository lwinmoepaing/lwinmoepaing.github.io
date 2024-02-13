import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
import MetaHead from "~/components/Common/MetaHead/MetaHead";
import HeroSectionAnimation from "~/components/Animation/HeroSectionAnimation/HeroSectionAnimation";
import ButterflyAnimation from "~/components/Animation/ButterflyAnimation/ButterflyAnimation";
import SharingTextAnimation from "~/components/Animation/SharingTextAnimation/SharingTextAnimation";
import CircleBackgroundAnimation from "~/components/Animation/CircleBackgroundAnimation/CircleBackgroundAnimation";
import WaveTextAnimation from "~/components/Animation/WaveTextAnimation/WaveTextAnimation";
import WalkingWorldAnimation from "~/components/Animation/WalkingWorldAnimation/WalkingWorldAnimation";
import IntroText from "~/components/Home/IntroText";

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

          <div class="mx-auto">
            <div class="max-w-[400px] mx-auto">
              <SharingTextAnimation />
            </div>

            <div class="relative max-w-[1600px] mx-auto md:top-[-2.5rem]">
              <CircleBackgroundAnimation />
            </div>
          </div>

          <div class="mb-[2.5rem]">
            <WaveTextAnimation />
          </div>

          <div class="max-w-[570px] mx-auto">
            <WalkingWorldAnimation />
          </div>

        </div>
      </AnimateContainer>
    </>
  );
}
export default HomePage;
