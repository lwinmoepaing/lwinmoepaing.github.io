import { A } from "@solidjs/router";
import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
import MetaHead from "~/components/Common/MetaHead/MetaHead";
import ExpCardList from "~/components/Sharing/ExperienceForJunior/ExpCardList";
import ExpJuniorTitle from "~/components/Sharing/ExperienceForJunior/ExpJuniorTitle";
import ExpLevel from "~/components/Sharing/ExperienceForJunior/ExpLevel";
import FocusOnJunior from "~/components/Sharing/ExperienceForJunior/FocusOnJunior";
import KnowledgeVsExp from "~/components/Sharing/ExperienceForJunior/KnowledgeVsExp";
import WhatDoWeAlreadyHave from "~/components/Sharing/ExperienceForJunior/WhatDoWeAlreadyHave";

function Catch22ExperiencePage() {
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
      console.log("Watching");
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  return (
    <>
      <MetaHead
        title="Sharing"
        body="Sharing Sessions By Lwin Moe Paing (Developer)"
      />
      <AnimateContainer>
        <div class="px-4 sm:px-8 pb-[300px]">
          <div class="max-w-[760px] mx-auto text-center">
            <Show when={currentSlide() >= 1}>
              <div class="max-w-[500px] mx-auto text-center">
                <ExpJuniorTitle />
              </div>
            </Show>
            <AnimateContainer>
              <Show when={currentSlide() >= 2}>
                <FocusOnJunior />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 3}>
                <KnowledgeVsExp />
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 4}>
                <div>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    <span class="text-indigo-500 mr-1 font-bold text-[20px]">
                      Knowledge :
                    </span>
                    You grasp the game's mechanics, comprehend character
                    variations, and strategic approaches for maps, teams, and
                    objectives.
                  </p>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    <span class="text-indigo-500 mr-1 font-bold text-[20px]">
                      Experience :
                    </span>
                    You've immersed yourself in the game, battled opponents, and
                    embraced team dynamics. Your reflexes and decision-making
                    have sharpened, and you anticipate foes' actions
                    instinctively.
                  </p>
                  <ExpLevel />
                </div>
              </Show>
            </AnimateContainer>
            <AnimateContainer>
              <Show when={currentSlide() >= 5}>
                <div>
                  <WhatDoWeAlreadyHave />
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    <span class="text-indigo-500 mr-1 font-bold text-[20px]">
                      Please Remember :
                    </span>
                    We are problem solvers.
                  </p>
                </div>
              </Show>
            </AnimateContainer>

            <AnimateContainer>
              <Show when={currentSlide() >= 6}>
                <ExpCardList />
              </Show>
            </AnimateContainer>

            <AnimateContainer>
              <Show when={currentSlide() >= 7}>
                <div class="mb-16 mt-5">
                  <h2 class="text-2xl text-indigo-500  mb-8">
                    Joining Hackathon
                  </h2>

                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    <span class="text-indigo-500 mr-1 font-bold text-[20px]">
                      Skill Enhancement :
                    </span>
                    New technical and problem-solving skills.
                  </p>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    <span class="text-indigo-500 mr-1 font-bold text-[20px]">
                      Networking :
                    </span>
                    You can connect with mentors, expanding your professional
                    network.
                  </p>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    <span class="text-indigo-500 mr-1 font-bold text-[20px]">
                      Innovation :
                    </span>
                    Hackathons encourage creativity and innovation.
                  </p>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto mb-3">
                    <span class="text-indigo-500 mr-1 font-bold text-[20px]">
                      Portfolio Boost :
                    </span>
                    Completing a hackathon project adds a tangible achievement
                    to your portfolio or resume, showcasing your abilities to
                    future employers
                  </p>
                  <A class="text-indigo-500" href="https://witaward.com/">
                    https://witaward.com/
                  </A>
                </div>
              </Show>
            </AnimateContainer>

            <AnimateContainer>
              <Show when={currentSlide() >= 8}>
                <div class="mb-16 mt-5">
                  <h2 class="text-2xl text-indigo-500 mb-8">Code Reviews</h2>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    Code Reviewer’s Idea.
                  </p>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    Diverse Feedback.
                  </p>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    Improving Code Quality and Concepts
                  </p>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto mb-3">
                    Portfolio Boost
                  </p>
                  <p>Naing Lin Khant’s Projects</p>
                  <div class="my-3">
                    <A
                      class="text-indigo-500"
                      href="https://youtu.be/p-QgenD1Yrc"
                    >
                      https://youtu.be/p-QgenD1Yrc
                    </A>
                  </div>
                  <div class="my-3">
                    <A
                      class="text-indigo-500"
                      href="https://github.com/nainglinnkhant/scribble"
                    >
                      https://github.com/nainglinnkhant/scribble
                    </A>
                  </div>
                </div>
              </Show>
            </AnimateContainer>

            <AnimateContainer>
              <Show when={currentSlide() >= 9}>
                <div class="mb-16 mt-5">
                  <h2 class="text-2xl text-indigo-500 mb-8">
                    Contributing Other Projects
                  </h2>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    Sample Contribute Guide
                  </p>
                  <div class="my-3">
                    <A
                      class="text-indigo-500"
                      href="https://github.com/solidjs/solid/blob/main/CONTRIBUTING.md"
                    >
                      https://github.com/solidjs/solid/blob/main/CONTRIBUTING.md
                    </A>
                  </div>
                  <div class="my-3">
                    <A
                      class="text-indigo-500"
                      href="https://github.com/reduxjs/redux-toolkit/blob/master/CONTRIBUTING.md"
                    >
                      https://github.com/reduxjs/redux-toolkit/blob/master/CONTRIBUTING.md
                    </A>
                  </div>
                </div>
              </Show>
            </AnimateContainer>

            <AnimateContainer>
              <Show when={currentSlide() >= 10}>
                <div class="mb-16 mt-5">
                  <h2 class="text-2xl text-indigo-500 mb-8">
                    Solving The Real Problems
                  </h2>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    Case Study & Sample Projects
                  </p>
                  <div class="my-3">
                    <A
                      class="text-indigo-500"
                      href="https://29jewelleryshop.com/"
                    >
                      https://29jewelleryshop.com/
                    </A>
                  </div>
                  <div class="my-3">
                    <A
                      class="text-indigo-500"
                      href="https://www.shwepuzuncake.com/"
                    >
                      https://www.shwepuzuncake.com/
                    </A>
                  </div>
                </div>
              </Show>
            </AnimateContainer>

            <AnimateContainer>
              <Show when={currentSlide() >= 11}>
                <div class="mb-16 mt-5">
                  <h2 class="text-2xl text-indigo-500 mb-8">
                    Deliverying What you build
                  </h2>
                  <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium max-w-[600px] mx-auto">
                    Case study: web design focused on interaction design. by
                    Nana
                  </p>
                  <div class="my-3">
                    <A
                      class="text-indigo-500"
                      href="https://medium.com/design-code-repository/case-study-web-design-focused-on-interaction-design-3834617864d9"
                    >
                      https://medium.com/design-code-repository/case-study-web-design-focused-on-interaction-design-3834617864d9
                    </A>
                  </div>
                </div>
              </Show>
            </AnimateContainer>
          </div>
        </div>
      </AnimateContainer>
    </>
  );
}
export default Catch22ExperiencePage;
