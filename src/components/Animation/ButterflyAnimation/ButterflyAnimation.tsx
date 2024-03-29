import {
  createVisibilityObserver,
  withOccurrence,
} from "@solid-primitives/intersection-observer";
import anime from "animejs";
import { createEffect, onCleanup } from "solid-js";

const appearAnimation = (isVisible: boolean) => {
  const targets = [
    "#Doodle_Left_Butterfly",
    "#Doodle_Butterfly_Line",
    "#Doodle_Butterfly_Text",
    "#Doodle_Butterfly_Heart",
    "#Doodle_Right_Butterfly",
  ];

  if (isVisible) {
    anime({
      targets,
      easing: "easeOutQuart",
      translateY: function () {
        return 5;
      },
      delay: function (el, index) {
        return index * 200;
      },
      duration: function () {
        return anime.random(650, 900);
      },
      opacity: [0, 1],
    });
  } else {
    anime({
      targets,
      easing: "easeOutQuart",
      translateY: function () {
        return 0;
      },
      duration: function () {
        return anime.random(100, 200);
      },
      opacity: [1, 0],
    });
  }

  return () => anime.remove(targets);
};

const ButterflyAnimation = () => {
  let el: HTMLDivElement | undefined;
  const useVisibilityObserver = createVisibilityObserver(
    { threshold: 0.4 },
    withOccurrence((entry) => {
      return entry.isIntersecting;
    })
  );

  const visible = useVisibilityObserver(() => el);

  createEffect(() => {
    const isVisible = visible();
    const makeAppearAnimation = appearAnimation(isVisible);

    onCleanup(() => {
      makeAppearAnimation();
    });
  });

  return (
    <div ref={el} class="relative">
      <div class="top-[-8px] left-0 w-[30px] h-[30px] absolute" id="Path_Butterfly">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Single_Butterfly"
          viewBox="0 0 50 50"
          class="rotate-[45deg]"
        >
          <defs>
            <style>
              {`
                .single-butterfly-1 {
                  fill: #6067af;
                }
              `}
            </style>
          </defs>
          <g id="Single_Butter_Fly_Gp">
            <g>
              <path
                class="single-butterfly-1"
                d="M23.06,23.21c.13-.89,.2-1.93,.45-2.93,.97-3.91,.28-7.56-1.8-10.91-.38-.62-1.55-.88-2.4-1.01-.34-.05-.81,.69-1.22,1.08,.11,.13,.21,.27,.32,.4,.2-.07,.45-.26,.6-.2,.42,.17,.8,.45,1.19,.68-.34,.35-.78,1.04-.99,.98-.6-.18-1.4-.57-1.57-1.07-.18-.57,.04-1.49,.43-1.98,.85-1.08,2.62-1.06,3.69,.09,.75,.8,1.48,1.81,1.73,2.85,.56,2.29,.83,4.65,1.19,6.99,.07,.46,.06,.93,.09,1.4,.13,.03,.26,.05,.39,.08,.11-.44,.25-.87,.31-1.31,.33-2.45,.48-4.93,1.02-7.33,.26-1.15,1.07-2.31,1.94-3.16,.89-.88,2.38-.46,2.86,.66,.19,.45,.08,1.14-.14,1.6-.13,.27-.76,.46-1.12,.41-.29-.05-.76-.59-.7-.8,.12-.43,.53-.78,.81-1.16-.95-.57-1.89-.42-2.26,.81-1.13,3.8-2.58,7.61-.95,11.67,.23,.58,.02,1.34,.01,1.93,1.51-1.41,3.13-3.03,4.86-4.53,3.84-3.32,8.16-5.88,12.87-7.76,1.43-.57,2.89-.86,4.12,.44,1.01,1.07,1.23,3.09,.25,4.58-1.22,1.85-2.84,3.43-4.01,5.3-1.28,2.03-2.23,4.27-3.33,6.41-.88,1.7-1.84,3.36-2.64,5.1-.23,.52-.18,1.31,.04,1.86,1.28,3.18,.47,6.74-2.15,9.02-2.32,2.02-5.97,2.36-8.71,.63-1.04-.66-1.85-1.7-2.83-2.62-.37,.84-.69,1.77-1.18,2.61-.24,.41-.78,.63-1.19,.93-.3-.4-.72-.77-.86-1.22-.26-.83-.36-1.7-.55-2.67-3.58,4.1-6.53,4.94-9.63,2.86-4.08-2.73-4.93-7.16-2.34-12.39-2.19-1.07-2.87-3.04-2.73-5.27,.2-3.28-1.04-5.83-3.41-8-.9-.82-1.65-1.84-2.31-2.87-.41-.64-.68-1.44-.78-2.2-.37-2.56,.89-3.86,3.45-3.66,3.66,.29,6.85,1.76,9.76,3.92,3.77,2.78,6.86,6.21,9.42,9.76Zm3.5,8.64c-.06,2.41-.24,4.82-.14,7.23,.05,1.1,.37,2.41,1.06,3.2,1.77,2.03,6.32,2.38,8.71,.92,2.05-1.25,3.31-5.13,2.52-7.68-.32-1.05-.81-1.52-2.05-1.15-2.86,.84-5.39-.12-7.15-2.51-.46-.63-.83-1.4-1.44-1.85-.49-.37-1.26-.35-1.9-.51,.04,.63,.07,1.26,.13,1.89,0,.08,.13,.14,.19,.22,.03,.08,.05,.16,.06,.25Zm.44-6.9c.1,.06,.2,.12,.29,.18,.26-.2,.52-.39,.77-.6,3.24-2.67,6.39-5.45,9.75-7.96,1.24-.93,2.93-1.35,4.47-1.74,.52-.13,1.43,.4,1.8,.9,.24,.33-.05,1.21-.33,1.72-.35,.64-.89,1.18-1.4,1.71-1.89,1.97-3.3,4.1-3.43,7-.05,1.2-.68,2.49-1.37,3.52-1.43,2.13-2.85,2.19-4.77,.46-.48-.43-.95-.88-1.46-1.25-1.17-.85-2.45-1.08-3.68-.65,.88,1.08,1.82,2.08,2.58,3.2,2.18,3.21,6.43,3.31,8.52,.08,.8-1.23,1.47-2.58,1.96-3.97,1.22-3.51,3.08-6.58,5.58-9.34,1.01-1.11,1.84-2.47,2.42-3.85,.79-1.89-.44-3.35-2.5-3.2-.53,.04-1.09,.16-1.58,.37-6.49,2.78-12.23,6.62-16.88,11.98-.34,.39-.49,.94-.72,1.42Zm-4.61-.53c.06-.04,.12-.08,.19-.13-.11-.24-.17-.52-.34-.71-2.56-2.86-4.96-5.89-7.75-8.52-2.84-2.68-6.32-4.38-10.34-4.63-2.52-.15-3.66,1.18-2.71,3.54,.57,1.41,1.61,2.71,2.68,3.82,2.41,2.49,3.94,5.16,3.65,8.83-.25,3.2,1.83,4.73,4.97,3.91,3.2-.84,6.36-1.86,9.75-2.87-.59-.19-1.19-.57-1.76-.52-2.64,.2-5.29,.44-7.91,.82-2.08,.3-3.23-.55-2.66-2.58,.66-2.34-.16-3.97-1.62-5.62-1.21-1.36-2.32-2.83-3.29-4.37-.32-.5-.31-1.53,.01-2.02,.26-.39,1.2-.41,1.85-.44,.41-.02,.89,.18,1.24,.42,2.49,1.65,5.07,3.21,7.41,5.06,2.34,1.84,4.43,4,6.63,6.01Zm-11.64,17.1c3.05,3.47,7.48,3.23,9.58-.7,.74-1.38,.88-3.09,1.22-4.66,.3-1.39,.48-2.8,.76-4.19,.16-.82,.41-1.63,.63-2.44-.98-.09-1.96-.2-2.95-.27-.24-.02-.49,.08-.72,.14-2.69,.75-5.39,1.49-8.08,2.27-.3,.09-.59,.35-.79,.61-2.21,2.87-2.06,6.49,.36,9.25Zm15.9-14c3.04-.56,5.08,.26,6.82,2.2,1.22,1.35,2.44,1.26,3.42-.28,.71-1.12,1.17-2.5,1.35-3.82,.26-1.92,.81-3.63,2.08-5.11,.96-1.12,1.92-2.25,2.77-3.46,.69-.98,.35-1.61-.79-1.38-1.42,.28-3.01,.61-4.1,1.46-3.57,2.78-6.96,5.8-10.4,8.75-.38,.32-.59,.83-1.15,1.63Zm-4.34-1.05c.08-.11,.15-.22,.23-.33-.35-.5-.63-1.08-1.07-1.49-2.6-2.42-5.13-4.93-7.91-7.14-1.86-1.48-4.06-2.55-6.17-3.69-.38-.21-1.07,.14-1.61,.23,.13,.5,.14,1.08,.42,1.47,.92,1.28,1.93,2.5,2.92,3.73,1.49,1.84,2.77,3.65,1.78,6.29-.48,1.28,.34,1.93,1.73,1.6,3.19-.76,6.39-1.24,9.67-.66Zm.83,17.44c2.06-3.6,3.36-7.35,2.48-11.54-.13-.6-.64-1.13-.98-1.69-.49,.5-1.19,.91-1.42,1.51-1.53,3.88-.84,7.79-.07,11.72Zm1.14-19.68c-1.23,1.21-1.42,3.98-.51,5.2,.52,.7,1.28,.67,1.53-.04,.48-1.36,.76-2.8,.95-4.23,.04-.34-.56-.89-.99-1.11-.29-.15-.79,.13-.97,.17Zm1.86-1.44c-.13-.83-.07-1.5-.36-1.91-.18-.25-.91-.09-1.4-.12-.01,.68-.03,1.36-.04,2.03,.49,0,.97,0,1.8,0Z"
              />
              <path
                class="single-butterfly-1"
                d="M26.5,31.6c.39-.02,.91-.21,1.15-.03,2.22,1.7,4.58,3.28,6.52,5.27,2.25,2.3,1.31,5.41-1.54,5.94-2.25,.42-4.42-1.19-3.87-3.6,.64-2.81-.26-5.24-2.19-7.33,0-.09-.03-.17-.06-.25Zm2.68,1.59c-.13,.09-.27,.19-.4,.28,.91,2,1.17,4.06,.76,6.21-.25,1.33,.43,2.07,1.7,2.28,1.13,.19,2.24,.07,2.92-.97,.71-1.08,.52-2.3-.27-3.17-1.47-1.63-3.13-3.1-4.71-4.63Z"
              />
              <path
                class="single-butterfly-1"
                d="M20.98,30.94c-2.62,1.74-2.95,4.09-2.46,6.86,.31,1.73-.55,3.35-1.79,3.89-1.59,.68-3.13,.38-4.47-.57-1.22-.87-1.52-2.67-.92-4.33,.12-.32,.27-.64,.45-.93,2.14-3.31,5.72-3.94,9.19-4.91Zm-3.09,1.65c-1.91,.67-4.01,1.47-5.35,3.49-.97,1.45-.97,3-.03,4.1,.72,.84,2.62,1.28,3.69,.86,1.16-.45,1.63-1.69,1.57-3.51-.06-1.63,.08-3.27,.13-4.93Z"
              />
              <path
                class="single-butterfly-1"
                d="M28.95,25.61c.48-.34,1.21-.78,1.84-1.34,1.29-1.14,2.51-2.37,3.8-3.52,.51-.45,1.09-.86,1.72-1.12,.33-.14,.96-.04,1.18,.2,.28,.3,.41,.88,.35,1.3-.05,.4-.38,.8-.68,1.11-.96,1.03-2.07,1.91-.95,3.61,.26,.4-.17,1.62-.65,2.03-.35,.3-1.36,.02-1.99-.22-1.54-.6-3.03-1.34-4.61-2.05Zm8.17-4.94c-.12-.1-.25-.2-.37-.31-2.38,1.02-3.93,3.01-5.66,4.9,1.01,.59,1.88,1.14,2.8,1.61,.38,.19,.85,.2,1.28,.3,.05-.55,.36-1.31,.11-1.62-1.02-1.25-.29-2.06,.46-2.96,.5-.6,.92-1.27,1.38-1.91Z"
              />
              <path
                class="single-butterfly-1"
                d="M19.95,25.65c-1.19-.36-2.19-.9-3.17-.88-.98,.02-1.92,.71-2.92,.91-.42,.08-1.14-.22-1.36-.57-.19-.31-.04-1.1,.25-1.39,.7-.68,.46-1.23-.02-1.79-.45-.52-1.01-.95-1.44-1.48-.46-.56-.96-1.16-1.18-1.83-.13-.39,.12-1.09,.44-1.39,.24-.22,1.02-.19,1.31,.05,2.98,2.4,5.89,4.89,8.09,8.37Zm-8.76-7.81c-.19,.17-.37,.34-.56,.51,.71,.82,1.39,1.65,2.12,2.44,1.63,1.77,1.64,1.76,.39,3.7-.03,.05,.05,.18,.16,.55,1.34-.44,2.68-.89,4.16-1.38-1.87-2.26-3.81-4.33-6.28-5.82Z"
              />
              <path
                class="single-butterfly-1"
                d="M31.17,37.83c.71,.19,1.57,.2,2.1,.62,.73,.59,.73,1.53-.01,2.21-.75,.68-1.77,.78-2.34-.07-.38-.57-.22-1.52-.3-2.29l.55-.46Z"
              />
              <path
                class="single-butterfly-1"
                d="M15.69,39.28c-.7,.81-1.47,1.08-2.26,.2-.74-.82-.69-1.72,.06-2.52,.69-.73,2.05-.73,2.67-.04,.87,.98,.28,1.7-.47,2.35Zm.24-1.17c-.08-.28-.16-.56-.23-.84-.59,.14-1.24,.19-1.75,.48-.15,.09,.08,.86,.14,1.31,.61-.32,1.23-.64,1.84-.96Z"
              />
            </g>
          </g>
        </svg>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Doodle_Butterfly_Layer"
        viewBox="0 0 650 225.04"
      >
        <defs>
          <style>
            {`
              .butterfly-cls-2,
              .butterfly-cls-3{fill:#414b7d}
              .butterfly-cls-3{stroke:#f9f9fa;stroke-width:.3px}
              .butterfly-cls-5{opacity:.8}
              #Doodle_Left_Butterfly > g { opacity: 0}
              #Doodle_Butterfly_Line > g { opacity: 0}
              #Doodle_Butterfly_Text > g { opacity: 0}
              #Doodle_Butterfly_Heart > g { opacity: 0}
              #Doodle_Right_Butterfly > g { opacity: 0}
            `}
          </style>
        </defs>
        <g id="Doodle_Mid_Butterfly">
          <path
            id="Doodle_Butterfly_Line"
            d="M81.39 117.6s18.85 30.48 64.6 43.7c51.29 14.82 130.38 9.98 135.65-43.84 3.11-31.79-16.79-56.83-48.56-43.37s-32.68 100.78 62.41 97.26c95.09-3.52 95.42-58.16 158.1-77.21 65.79-19.99 98.31 2.2 98.31 2.2"
            style={{
              fill: "none",
              stroke: "#6067af",
              "stroke-dasharray": "0 0 12 8",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": ".75px",
            }}
          />
          <g
            id="Doodle_Butterfly_Text"
            style={{
              transform: "translateY(2px) translateX(16px)",
            }}
          >
            <path
              class="butterfly-cls-3"
              d="M307.36,142.49c1.43,4.09,.38,6.75-3.16,7.99s-6.02-.19-7.46-4.28c-1.07-3.05-2.73-4.18-4.98-3.4s-2.84,2.71-1.77,5.76,2.73,4.18,4.98,3.4l.54,1.56c-3.54,1.24-6.02-.19-7.46-4.28s-.38-6.75,3.16-7.99,6.03,.19,7.46,4.28c1.07,3.05,2.73,4.18,4.98,3.4s2.84-2.71,1.77-5.76-2.73-4.18-4.97-3.4l-.54-1.56c3.54-1.24,6.03,.19,7.46,4.28Z"
            />
            <path
              class="butterfly-cls-3"
              d="M296.61,128.77c2.75-.96,4.61-.07,5.57,2.69s.07,4.61-2.69,5.57c-2.75,.96-4.61,.07-5.57-2.69s-.07-4.61,2.69-5.57Zm4.02,3.23c-.6-1.71-1.76-2.27-3.47-1.67s-2.27,1.76-1.67,3.47,1.76,2.27,3.47,1.67,2.27-1.76,1.67-3.47Z"
            />
            <path
              class="butterfly-cls-3"
              d="M309.72,141.66c-1.2-3.43-.77-5.87,1.28-7.33l1.16,1.29c-1.24,1-1.41,2.79-.51,5.37,1.07,3.05,2.73,4.18,4.98,3.4s2.84-2.71,1.77-5.76c-.9-2.58-2.15-3.87-3.74-3.88l.11-1.73c2.51-.14,4.37,1.51,5.57,4.94,1.43,4.09,.38,6.75-3.16,7.99s-6.02-.19-7.46-4.28Z"
            />
            <path
              class="butterfly-cls-3"
              d="M311.62,125.27c-1.71,.6-2.27,1.76-1.67,3.47s1.76,2.27,3.47,1.67l.54,1.56c-2.75,.96-4.61,.07-5.57-2.69s-.07-4.61,2.69-5.57c2.01-.7,3.54-.42,4.59,.86l-1.23,1.17c-.66-.74-1.6-.9-2.81-.47Z"
            />
            <path
              class="butterfly-cls-3"
              d="M333.12,143.49c-2.42,.85-4,.22-4.73-1.87l-7.43-21.24c-.73-2.09,.11-3.56,2.54-4.41l7.67-2.68c2.41-.84,3.98-.22,4.71,1.88l.91,2.6-1.93,.68-.91-2.6c-.37-1.05-1.11-1.39-2.23-.99l-7.67,2.68c-1.13,.4-1.51,1.12-1.15,2.18l7.43,21.24c.37,1.05,1.12,1.38,2.25,.99l7.67-2.68c1.12-.39,1.49-1.11,1.12-2.17l-1.98-5.66,1.93-.68,1.98,5.66c.73,2.09-.11,3.56-2.51,4.4l-7.67,2.68Z"
            />
            <path
              class="butterfly-cls-3"
              d="M329.38,130.68c-1.2-3.43-.77-5.87,1.28-7.33l1.16,1.29c-1.24,1-1.41,2.79-.51,5.37,1.07,3.05,2.73,4.18,4.98,3.4s2.84-2.71,1.77-5.76c-.9-2.58-2.15-3.87-3.74-3.88l.11-1.73c2.51-.14,4.37,1.51,5.57,4.94,1.43,4.09,.38,6.75-3.16,7.99s-6.02-.19-7.46-4.28Z"
            />
            <path
              class="butterfly-cls-3"
              d="M338.67,124.31l-1.7-1.52c.56-1.29,1.7-2.24,3.43-2.84,3.54-1.24,6.03,.19,7.46,4.28s.38,6.75-3.16,7.99l-.54-1.56c2.25-.79,2.84-2.71,1.77-5.76s-2.73-4.18-4.97-3.4c-1.4,.49-2.16,1.43-2.28,2.81Z"
            />
            <path
              class="butterfly-cls-3"
              d="M354.59,118.34c.45-.6,.92-1.1,1.4-1.49,1.34-1.08,2.8-1.38,4.38-.9,1.09,2.46,.51,4.6-1.73,6.41-3.05,2.46-5.93,2.01-8.66-1.36s-2.56-6.29,.48-8.75c2.18-1.76,4.24-2.06,6.19-.89l-1.12,1.71c-1.31-.8-2.66-.65-4.03,.46-1.98,1.6-1.96,3.66,.07,6.18,.53,.66,1.06,1.18,1.58,1.55,.17-.91,.64-1.88,1.43-2.92Zm2.2,.06c-.31,.25-.6,.56-.88,.94-.7,.93-.99,1.83-.85,2.68,.86,.06,1.71-.26,2.55-.94,1.18-.95,1.65-2.07,1.4-3.35-.81-.1-1.55,.13-2.22,.67Z"
            />
            <path
              class="butterfly-cls-3"
              d="M376.58,99.5c2.72,3.37,2.63,6.23-.29,8.59s-5.74,1.85-8.46-1.52c-2.03-2.51-3.98-3.02-5.83-1.52s-1.76,3.5,.27,6.02,3.97,3.02,5.83,1.52l1.04,1.28c-2.92,2.36-5.74,1.85-8.46-1.52-2.72-3.37-2.63-6.23,.29-8.59,2.92-2.36,5.74-1.85,8.46,1.52,2.03,2.51,3.97,3.02,5.83,1.52s1.76-3.5-.27-6.02-3.97-3.02-5.83-1.53l-1.04-1.28c2.92-2.36,5.74-1.85,8.46,1.52Z"
            />
            <path
              class="butterfly-cls-3"
              d="M376.53,91.83c1.18-.95,2.25-.84,3.2,.34s.84,2.25-.34,3.2-2.25,.84-3.2-.34-.84-2.25,.34-3.2Zm4.68,5.79c1.18-.95,2.25-.84,3.2,.34s.84,2.25-.34,3.2-2.25,.84-3.2-.34-.84-2.25,.34-3.2Zm-2.67-4.5c-.31-.39-.67-.43-1.05-.11s-.43,.67-.11,1.05,.67,.43,1.05,.11,.43-.67,.11-1.05Zm4.68,5.79c-.31-.39-.67-.43-1.05-.11s-.43,.67-.11,1.05,.67,.43,1.05,.11,.43-.67,.11-1.05Z"
            />
            <path
              class="butterfly-cls-3"
              d="M403.5,82.45c2.38,3.62,2.01,6.46-1.12,8.52s-5.89,1.29-8.27-2.33c-1.78-2.7-3.66-3.39-5.65-2.08s-2.1,3.32-.32,6.02c1.78,2.7,3.66,3.39,5.65,2.08l.91,1.38c-3.13,2.06-5.89,1.29-8.27-2.33s-2.01-6.46,1.12-8.52,5.89-1.29,8.27,2.33c1.78,2.7,3.66,3.39,5.65,2.08s2.1-3.32,.32-6.02-3.66-3.39-5.65-2.08l-.91-1.38c3.13-2.06,5.89-1.29,8.27,2.33Z"
            />
            <path
              class="butterfly-cls-3"
              d="M389.72,71.77c2.44-1.61,4.46-1.19,6.06,1.25s1.19,4.46-1.25,6.06-4.46,1.19-6.06-1.25-1.19-4.46,1.25-6.06Zm4.68,2.15c-1-1.52-2.26-1.78-3.78-.78s-1.78,2.26-.78,3.77,2.26,1.78,3.77,.78,1.78-2.26,.78-3.77Z"
            />
            <path
              class="butterfly-cls-3"
              d="M403.64,91.04l2.43,3.69,1.46-.96,.91,1.38-3.17,2.09-3.34-5.07,1.71-1.13Z"
            />
            <path
              class="butterfly-cls-3"
              d="M413.32,71.32c.45-1.12,1.38-2.05,2.79-2.8,3.32-1.75,5.99-.7,8.01,3.13s1.37,6.63-1.95,8.37c-1.01-.71-1.75-1.51-2.22-2.39-.33-.62-.52-1.28-.57-1.99-.1-1.38,.27-2.58,1.12-3.61,.28-.33,.58-.62,.9-.87-1.32-1.68-2.82-2.07-4.52-1.18-1.11,.58-1.72,1.4-1.84,2.46,.15,.18,.3,.4,.43,.65,.57,1.09,.56,2.14-.05,3.13,1.16,.06,2.03,.64,2.61,1.73,1.16,2.21,.09,4.19-3.23,5.94-2.63,1.38-4.78,1.31-6.47-.21l1.43-1.46c1.13,1.04,2.55,1.11,4.26,.21,2.11-1.11,2.84-2.28,2.19-3.52-.6-1.14-1.72-1.27-3.37-.4l-.77-1.46c1.65-.87,2.18-1.87,1.58-3.01-.65-1.24-2.03-1.3-4.14-.19s-2.88,2.21-2.3,3.3c.19,.35,.63,.34,1.34-.03l.77,1.46c-1.92,1.01-3.23,.85-3.92-.48-1.09-2.06,.03-3.97,3.35-5.72,1.86-.98,3.38-1.34,4.57-1.08Zm8.98,1.29l-.02-.04c-.18,.15-.35,.33-.52,.52-.57,.7-.82,1.52-.74,2.45,.02,.4,.14,.81,.36,1.22s.51,.8,.89,1.2c1.29-1.17,1.3-2.95,.03-5.36Z"
            />
            <path
              class="butterfly-cls-3"
              d="M436.1,73.64l2.12,6.59-1.95,.63-2.09-6.5c-3.33,.98-5.28,.56-5.87-1.26s.15-2.94,2.13-3.57c2.62-.84,4.26-.23,4.92,1.83l.21,.67c1.14-.7,1.54-1.6,1.18-2.69-.38-1.19-1.71-1.73-3.99-1.63-3.04,.14-4.79-.52-5.25-1.96-.56-1.74,.47-3.04,3.08-3.88,1.76-.57,3.29-.3,4.59,.81l-1.29,1.54c-.88-.84-1.81-1.1-2.8-.78-1.32,.42-1.86,.98-1.64,1.68s1.3,1.03,3.22,.94c3.4-.15,5.41,.74,6.03,2.66,.69,2.14-.18,3.79-2.61,4.94Zm-2.43-.85l-.26-.81c-.33-1.02-1.15-1.31-2.47-.89-.68,.22-.91,.68-.69,1.38,.26,.81,1.4,.92,3.41,.32Z"
            />
            <path
              class="butterfly-cls-3"
              d="M436.69,63.63l-1.66-1.57c.59-1.27,1.75-2.19,3.5-2.75,3.57-1.15,6.02,.34,7.35,4.47,1.33,4.13,.21,6.76-3.36,7.91l-.51-1.57c2.27-.73,2.91-2.63,1.92-5.71s-2.62-4.25-4.89-3.52c-1.41,.45-2.19,1.37-2.35,2.75Z"
            />
            <path
              class="butterfly-cls-3"
              d="M448.58,56.6c1.44-.46,2.4,.03,2.86,1.47s-.03,2.4-1.47,2.86-2.4-.02-2.86-1.47,.02-2.4,1.47-2.86Zm2.28,7.09c1.44-.46,2.4,.03,2.86,1.47s-.03,2.4-1.47,2.86-2.4-.02-2.86-1.47,.02-2.4,1.47-2.86Zm-.87-5.16c-.15-.48-.47-.64-.94-.48s-.64,.47-.48,.94,.47,.64,.94,.48,.64-.47,.48-.94Zm2.28,7.09c-.15-.48-.47-.64-.94-.48s-.64,.47-.48,.94,.47,.64,.94,.48,.64-.47,.48-.94Z"
            />
            <path
              class="butterfly-cls-3"
              d="M456.49,60.11c-1.02-3.49-.47-5.91,1.66-7.26l1.1,1.35c-1.29,.93-1.55,2.71-.78,5.33,.1,.34,.21,.65,.33,.95,.66-.89,1.69-1.54,3.1-1.95s2.63-.43,3.66-.05c-.05-.3-.13-.61-.23-.95-.77-2.62-1.94-3.98-3.53-4.07l.2-1.72c2.52,0,4.28,1.74,5.3,5.22,1.22,4.16,.02,6.76-3.58,7.82s-6.01-.5-7.22-4.66Zm3.5,2.36c.86,.86,1.94,1.1,3.26,.71s2.1-1.17,2.36-2.36c-.86-.86-1.94-1.1-3.26-.71s-2.1,1.17-2.36,2.36Z"
            />
            <path
              class="butterfly-cls-3"
              d="M466.61,71.03l-3.65,1.07-.46-1.58,1.68-.49-1.24-4.25,1.97-.58,1.7,5.83Z"
            />
            <path
              class="butterfly-cls-3"
              d="M466.1,54.22l-1.62-1.61c.62-1.26,1.81-2.14,3.57-2.66,3.6-1.05,6.01,.5,7.22,4.66s.02,6.76-3.58,7.82l-.46-1.58c2.29-.67,2.98-2.55,2.07-5.66-.91-3.1-2.51-4.32-4.79-3.65-1.42,.42-2.23,1.31-2.42,2.69Z"
            />
            <path
              class="butterfly-cls-3"
              d="M485.36,48.23c3.74,.23,5.48,2.51,5.22,6.83-.27,4.33-2.27,6.37-6.01,6.14s-5.48-2.51-5.22-6.83,2.27-6.37,6.01-6.14Zm-.1,1.65c-2.38-.15-3.67,1.39-3.87,4.62s.89,4.91,3.27,5.06,3.67-1.39,3.87-4.62c.2-3.23-.89-4.91-3.27-5.06Z"
            />
            <path
              class="butterfly-cls-3"
              d="M482.78,38.05l7.1,8.02-1.24,1.1-7.1-8,1.25-1.13Z"
            />
          </g>
          <g id="Doodle_Butterfly_Heart">
            <path
              d="M533.41 119.36c1.51-.47 2.95-.99 4.43-1.35.69-.17 1.62-.52 2.1.32.46.8-.05 1.58-.6 2.17-1.16 1.25-2.32 2.52-3.61 3.62-2.1 1.78-4.3 3.45-6.5 5.11-1 .76-1.67.55-1.84-.7-.25-1.89-.47-3.82-.31-5.71.21-2.42.75-4.82 1.26-7.2.16-.75.61-1.48 1.06-2.12.77-1.09 1.79-1.04 2.54.06 1 1.47 1.2 3.17 1.38 4.87.04.33.07.67.09.92Zm-2.66-5.72c-2.31 1.72-3.81 12.15-2.2 14.91 3.83-2.85 7.72-5.61 10.55-9.57-2.3-.08-4.31.73-6.38 1.74-.66-2.43-.23-5.04-1.96-7.08ZM538.77 139.79c1.43-2.22 6.09-2.41 7.65-.58.69.81.84 1.75.5 2.74-.14.42-.36.85-.65 1.18-1.88 2.11-4.21 3.18-7.06 2.84-1.83-.22-2.47-1.54-1.46-3.07 1.21-1.82 2.97-2.82 5.18-2.88 1.42-.04 1.97.95 1.23 2.14-.63 1.01-1.65 1.48-2.8 1.58-.25.02-.53-.3-.8-.47.23-.14.45-.35.7-.4 1.01-.19 1.83-.59 2.28-1.75-.44-.05-.78-.16-1.1-.11-1.71.25-3.06 1.11-4.05 2.52-.49.7-.24 1.27.56 1.51 2.06.62 5.99-1.14 6.94-3.11.59-1.23 0-2.45-1.42-2.93-1.32-.45-2.61-.25-3.89.17-.61.2-1.21.4-1.82.6ZM521.63 111.19c.95.93 1.78 1.75 2.74 2.69-1.14.01-2.85-1.18-3.01-1.97-.04-.21.17-.47.27-.72ZM517.81 118.86c1.15.62 2.29 1.25 3.63 1.98-1.32.34-3.37-.67-3.81-1.65l.18-.33ZM538.3 113.31c.69-.95 1.38-1.89 2.21-3.02.26 1.28-.78 2.76-1.96 3.21-.08-.07-.16-.13-.24-.2ZM522.94 136.73c.54-1.11 1.14-2.15 2.28-2.7-.47 1.16-1.09 2.19-2.28 2.7ZM538.43 128.47c1.09.61 1.89 2.27 1.38 3.22-.59-1.08-1.12-2.06-1.65-3.05.09-.06.18-.12.28-.18ZM544.97 124.39c-.97-.33-1.95-.65-2.96-.99.71-.78 2.53-.31 2.96.99ZM532.04 136.93c-.12-1.07-.23-2.08-.34-3.09.13-.05.26-.09.39-.14.16.33.39.65.47 1 .31 1.41.23 1.77-.52 2.23ZM532.12 105.5l-.66 3.66c-.5-.65-.21-2.85.66-3.66ZM516.93 129.06c.48-.99 2.46-1.63 3.46-1.12-1.15.37-2.31.75-3.46 1.12ZM542.17 117.33c.93-.35 1.86-.71 2.85-1.08 0 .92-1.42 1.57-2.72 1.4-.04-.11-.08-.21-.13-.32Z"
              class="butterfly-cls-3"
            />
          </g>
        </g>
        <g id="Doodle_Left_Butterfly" class="butterfly-cls-5">
          <path
            d="M71.19 103.54c.17-.28.4-.55.51-.86.2-.54.5-.89 1.08-1.04.17-.04.34-.26.42-.44.23-.54.39-1.11.62-1.64.37-.86.77-1.68 1.58-2.26.84-.6 1.21-1.48 1.24-2.53 0-.38.04-.96.58-.88.54.07.33.6.26.95-.24 1.19-.78 2.24-1.74 2.98-.65.5-1 1.15-1.31 1.86-.25.59-.46 1.19-.68 1.77 2.06.18 3.29-1.03 4.42-2.41.73-.9 1.44-1.81 2.2-2.69.13-.15.43-.17.65-.24-.02.27.07.63-.07.79-1.13 1.28-2.33 2.49-3.45 3.77-.75.85-1.68 1.22-2.76 1.36-.32.04-.64.1-.85.13-.04.49 0 .96-.15 1.36-.09.25-.45.55-.7.57-.46.03-.67.23-.87.59-1.62 2.91-4.23 4.4-7.4 5.02-.26.05-.71-.08-.82-.27-.12-.2.02-.59.13-.87.09-.24.29-.43.4-.59-.11.04-.35.07-.54.18-1.66.96-3.51 1.12-5.35 1.2-3.31.15-6.58-.27-9.77-1.1-1.05-.27-2.08-.82-2.97-1.45-1.92-1.35-2.78-5.03.7-6.55.94-.41 1.53-1.04 1.93-1.89.5-1.05 1.27-1.73 2.36-2.15.5-.2 1.11-.55 1.31-1 .63-1.41 2.51-1.81 3.9-1.52.23.05.46.11.8.19-1.36-2.03-.67-3.9.22-5.75.32-.67.74-1.31 1.11-1.96.53-.94 1.32-1.46 2.42-1.48.47 0 .72-.16.77-.71.07-.78.48-1.43 1.19-1.82 1.22-.67 2.07-1.6 2.52-2.95.19-.58.68-1.12 1.16-1.53 1.01-.87 2.13-.76 3.11.16 2.09 1.95 3.31 4.37 3.97 7.12.77 3.2.67 6.4.06 9.61-.57 3.02-1.31 6-2.36 8.9.05.02.11.05.16.07Zm.78.08c-1.2.97-2.36 2-3.61 2.88-1.25.88-2.6 1.63-3.91 2.43.04.06.08.12.11.17 3.37-.59 5.96-2.27 7.45-5.45.27-.05.53-.12.8-.14.48-.03.58-.37.52-.71-.04-.22-.28-.41-.43-.61-.22.19-.5.34-.66.58-.16.24-.19.55-.28.83Zm-4.47 2.75c.24-.17.46-.35.7-.5.67-.4 1.03-.98 1.14-1.76.25-1.83.53-3.65.84-5.47.57-3.33 1-6.67 1-10.05 0-1.94-.02-3.86-.77-5.69-.45-1.11-1.08-2.1-2.08-2.8-.87-.61-1.57-.39-2.01.58-.13.29-.24.6-.32.92-.23 1-.76 1.73-1.79 2.03-.51.15-.83.5-.92 1.03-.18 1.16-.93 1.72-1.97 2.16-.82.34-1.64.84-2.26 1.47-2.12 2.15-1.6 5.65.44 7.25 1.66 1.3 3.09 2.83 4.2 4.64 1.25 2.04 2.5 4.08 3.8 6.19Zm-.55.33c-.99-1.66-1.96-3.25-2.91-4.85-1.25-2.09-2.67-4.04-4.6-5.57-.33-.26-.63-.61-1.01-.78-1.38-.62-2.78-.21-3.59 1.07-.59.93-1.34 1.47-2.48 1.48-.82 0-1.52.31-1.78 1.2-.35 1.22-1.2 1.91-2.37 2.33-.68.25-1.38.52-1.97.93-1.34.91-1.37 2.72-.13 3.74.93.77 1.99 1.26 3.15 1.53 3.4.78 6.83 1.28 10.33.87 1.37-.16 2.73-.34 3.99-.99.38-.2.89-.4 1.27-.3.84.2 1.39-.26 2.1-.65Zm-9.44-13.04c-.38-1.17-.47-2.35-.1-3.53.59-1.93 1.88-3.2 3.77-3.84.9-.3 1.47-.82 1.63-1.76.12-.75.59-1.2 1.27-1.4.76-.23 1.17-.74 1.38-1.48.11-.41.23-.82.4-1.21.55-1.26 1.59-1.56 2.72-.81 1.01.67 1.69 1.64 2.19 2.72.82 1.79.98 3.72.98 5.65 0 4.24-.6 8.42-1.28 12.6l-.63 3.9c.17-.15.26-.32.33-.5 1.29-3.3 2.12-6.71 2.73-10.19.57-3.25.51-6.46-.41-9.65-.66-2.28-1.83-4.24-3.54-5.87-.8-.77-1.62-.8-2.42-.04-.37.35-.74.8-.89 1.28-.45 1.43-1.35 2.41-2.64 3.09-.04.02-.06.05-.1.07-.55.3-.79.8-.91 1.38-.22 1.05-.27 1.1-1.38 1.23-.64.07-1.22.24-1.62.82-.9 1.33-1.7 2.72-2.13 4.28-.33 1.19-.12 2.28.66 3.25Zm-.56.96c-.32-.11-.64-.23-.96-.32-1.38-.35-2.46.14-3.3 1.26-.38.51-.96.95-1.55 1.19-.95.4-1.66.96-2.1 1.9-.46.97-1.08 1.79-2.19 2.14-.43.14-.82.45-1.17.75-.61.53-.86 1.24-.75 1.92.33-1.02 1.06-1.59 1.98-1.95.36-.14.71-.3 1.08-.42 1.05-.34 1.8-.98 2.13-2.06.3-.98 1.04-1.48 2-1.49 1.11 0 1.84-.49 2.36-1.41.53-.93 1.33-1.46 2.47-1.52Z"
            class="butterfly-cls-2"
          />
          <path
            d="M67.41 89.09c-.64.03-1.21-.11-1.63-.64-.41-.52-.35-1.21.12-1.57.48-.37 1.55-.27 1.82.22.1.17.06.56-.07.69-.2.2-.44.13-.61-.2-.07-.13-.47-.09-.72-.13.03.22-.02.5.09.64.39.46 1.76.4 2.13-.07.31-.4.21-.79-.15-1.07-.92-.72-1.98-1.03-3.13-.9-.78.09-1.28 1.26-.89 2.2.16.4.48.86.84 1.05 1.13.6 2.31 1.02 3.56.22.12-.08.35.01.53.02-.06.19-.06.45-.18.55-.76.61-1.63.59-2.55.46-1.6-.24-2.65-1.01-2.96-2.32-.34-1.44.42-3.35 2.67-2.87.76.16 1.52.44 2.2.8.81.42 1.08 1.09.91 1.75-.17.67-.88 1.14-1.75 1.16h-.24ZM68 83.44c-.15-.23-.44-.48-.43-.7.01-.21.37-.57.53-.55.24.04.59.32.62.55.03.2-.29.46-.45.7h-.28ZM60.18 92.89c-.18-.22-.37-.36-.36-.48 0-.13.2-.25.32-.37.12.11.32.22.34.35.02.12-.15.27-.29.51ZM68.66 95.68c.23-.16.37-.34.48-.32.13.03.31.22.31.35 0 .11-.2.3-.33.32-.11.01-.24-.17-.46-.35ZM68.02 98.77c-.15-.24-.31-.39-.29-.5.02-.13.21-.24.33-.35.12.12.31.24.33.37.01.12-.18.25-.36.48ZM62.6 89.23c-.14-.26-.3-.41-.28-.53.02-.13.21-.22.33-.33.1.13.27.25.28.38 0 .12-.16.25-.33.48ZM61.02 89.54c.15.23.32.38.3.48-.03.13-.24.29-.36.29-.11 0-.3-.21-.31-.33 0-.11.19-.23.37-.44ZM69.66 91.98c.16.21.35.35.33.46-.01.12-.22.3-.34.3-.12 0-.31-.18-.33-.3-.01-.11.17-.25.33-.45ZM52.9 102.58c-.24.06-.39.15-.51.12-.47-.14-.8.08-1.06.41-.49.61-.65 1.31-.34 2.06.3.74.97.93 1.67 1.03.34.05.69.04 1.03.08.78.08 1.22-.15 1.4-.75.21-.7-.1-1.44-.75-1.75-.59-.29-1.53-.23-1.91.13-.27.25-.39.57-.11.85.27.28.64.48 1.03.21.1-.07.12-.27.17-.41-.11-.03-.23-.05-.34-.09-.12-.04-.22-.1-.34-.15.09-.1.18-.28.27-.28.23 0 .53.01.66.15.15.16.26.53.17.69-.14.25-.43.52-.7.58-.68.17-1.35-.25-1.5-.83-.14-.56.25-1.14.93-1.37 1.2-.42 2.46.15 2.82 1.29.37 1.17-.37 2.21-1.6 2.15-.72-.03-1.47-.08-2.16-.28-.86-.25-1.32-.95-1.35-1.84-.03-.88.27-1.66 1.04-2.14.43-.27.91-.33 1.45.15ZM46.86 104.6c-.08-.29.05-.48.43-.48.41 0 .7.25.65.63-.03.22-.32.53-.54.57-.46.09-.56-.26-.55-.72ZM53.4 99.58c.16.24.34.39.32.51-.02.13-.22.23-.35.35-.11-.13-.29-.24-.3-.38-.01-.12.17-.26.33-.48ZM61.73 105.47c-.23.16-.39.34-.51.32-.13-.02-.23-.23-.35-.35.12-.11.24-.3.38-.31.12 0 .26.17.48.34ZM57.43 107.56c-.16-.23-.33-.36-.33-.49s.19-.25.3-.37c.12.11.33.22.35.35.02.12-.16.27-.32.51ZM60.39 99.96c-.22.17-.36.35-.48.34-.13-.01-.25-.2-.38-.31.12-.13.22-.33.35-.35.12-.02.28.16.51.32ZM61.82 103.05c-.22.14-.37.32-.49.3-.12-.02-.31-.23-.31-.35 0-.12.22-.32.34-.32.13 0 .26.19.46.36ZM57.55 99.7c-.16-.21-.33-.34-.33-.47 0-.12.18-.24.28-.36.12.11.32.2.34.32.02.12-.14.27-.29.5Z"
            class="butterfly-cls-2"
          />
        </g>
        <g id="Doodle_Right_Butterfly" class="butterfly-cls-5 opacity-0">
          <path
            d="M583.58 105.24c-.42-.74-.98-1.55-1.38-2.44-1.55-3.47-4.2-5.78-7.7-7.06-.65-.24-1.67.25-2.37.65-.28.16-.19.99-.28 1.51.16.04.31.08.47.11.11-.17.18-.46.33-.5.41-.12.85-.13 1.28-.19-.05.45.03 1.23-.16 1.3-.55.21-1.38.39-1.79.12-.47-.31-.84-1.13-.84-1.72 0-1.3 1.33-2.32 2.79-2.09 1.03.16 2.16.48 2.95 1.11 1.75 1.37 3.33 2.97 4.96 4.5.32.3.59.66.88.99.11-.06.22-.11.34-.17-.18-.39-.32-.79-.53-1.16-1.18-2.01-2.52-3.94-3.52-6.04-.48-1.01-.55-2.34-.4-3.48.15-1.17 1.51-1.73 2.51-1.17.4.22.72.8.83 1.27.06.27-.3.79-.6.96-.24.13-.91 0-.99-.18-.16-.39-.07-.89-.08-1.33-1.04.14-1.65.79-1.2 1.92 1.38 3.48 2.52 7.16 6.1 9.23.51.3.8.98 1.14 1.43.3-1.93.56-4.08.97-6.2.91-4.71 2.63-9.13 5.04-13.27.73-1.26 1.65-2.33 3.32-2.07 1.37.21 2.71 1.58 2.85 3.26.17 2.08-.11 4.2.11 6.28.24 2.26.84 4.47 1.26 6.71.34 1.78.59 3.57 1.02 5.32.13.52.63 1.08 1.11 1.36 2.81 1.62 4.28 4.73 3.66 7.96-.55 2.86-3.06 5.23-6.11 5.54-1.16.12-2.36-.18-3.63-.29.22.84.52 1.72.65 2.63.06.44-.22.92-.34 1.39-.46-.13-.98-.15-1.35-.4-.68-.46-1.26-1.05-1.96-1.66-.27 5.13-1.97 7.48-5.48 7.74-4.62.35-7.84-2.44-8.97-7.84-2.25.48-3.9-.59-5.1-2.33-1.76-2.56-4.17-3.72-7.2-3.95-1.15-.09-2.3-.41-3.39-.78-.68-.23-1.34-.68-1.87-1.18-1.77-1.69-1.59-3.39.43-4.74 2.89-1.92 6.12-2.68 9.54-2.79 4.42-.13 8.72.62 12.69 1.75Zm7.64 4.37c1.36 1.83 2.63 3.73 4.11 5.45.67.79 1.68 1.57 2.66 1.76 2.5.48 6.09-1.92 7.01-4.39.79-2.13-.53-5.74-2.61-7.18-.85-.59-1.49-.65-2.2.34-1.63 2.29-4.07 3.06-6.77 2.3-.71-.2-1.43-.55-2.15-.54-.57.01-1.14.47-1.71.73.4.45.79.89 1.2 1.33.05.05.18.03.27.05.07.04.13.09.19.15Zm-3.7-5.38c.11-.01.22-.02.32-.04.07-.3.16-.59.22-.89.85-3.87 1.57-7.78 2.61-11.6.38-1.41 1.39-2.71 2.31-3.9.31-.4 1.3-.54 1.86-.38.37.1.66.93.76 1.47.12.68.03 1.4-.04 2.09-.25 2.57-.06 4.97 1.53 7.21.66.92.95 2.25 1.04 3.42.18 2.42-.84 3.29-3.28 3.12-.61-.04-1.21-.1-1.82-.08-1.37.05-2.45.62-3.11 1.66 1.29.29 2.57.48 3.78.87 3.49 1.11 6.71-1.29 6.38-4.91-.13-1.38-.41-2.78-.86-4.09-1.14-3.32-1.55-6.69-1.3-10.19.1-1.41-.07-2.91-.45-4.27-.52-1.86-2.29-2.23-3.72-.92-.37.34-.72.75-.96 1.19-3.2 5.85-5.23 12.05-5.55 18.75-.02.49.19.99.29 1.48Zm-3.73 2.29c.02-.07.04-.14.06-.2-.22-.11-.43-.29-.66-.33-3.57-.63-7.13-1.48-10.73-1.81-3.67-.33-7.25.43-10.38 2.59-1.96 1.36-2.03 3.01.05 4.21 1.24.72 2.78 1.08 4.22 1.27 3.24.44 5.93 1.54 7.86 4.43 1.68 2.52 4.12 2.45 5.97 0 1.89-2.5 3.64-5.09 5.57-7.82-.55.21-1.22.28-1.62.64-1.85 1.69-3.68 3.41-5.4 5.22-1.37 1.44-2.72 1.47-3.48-.37-.87-2.12-2.44-2.86-4.48-3.23-1.69-.31-3.37-.75-4.99-1.33-.53-.19-1.12-.96-1.17-1.5-.04-.44.65-1.01 1.12-1.4.3-.25.77-.38 1.17-.41 2.82-.22 5.63-.57 8.45-.56 2.81 0 5.62.38 8.43.6Zm1.32 19.5c4.29.8 7.44-1.97 6.71-6.1-.26-1.45-1.15-2.81-1.81-4.17-.59-1.21-1.28-2.36-1.88-3.56-.36-.71-.64-1.45-.96-2.18-.79.5-1.58.99-2.35 1.52-.19.13-.32.34-.45.53-1.57 2.13-3.14 4.25-4.68 6.4-.17.24-.23.61-.23.91.03 3.42 2.25 6.02 5.66 6.66Zm3.64-19.68c1.93-2.19 3.92-2.77 6.35-2.34 1.69.3 2.55-.49 2.38-2.2-.12-1.24-.59-2.54-1.22-3.63-.93-1.58-1.52-3.17-1.44-5.01.06-1.39.11-2.79.04-4.18-.06-1.13-.67-1.4-1.39-.56-.89 1.04-1.88 2.2-2.2 3.47-1.03 4.15-1.79 8.37-2.62 12.57-.09.46.04.96.1 1.88Zm-3.84 1.75c0-.13-.02-.25-.02-.38-.55-.17-1.1-.44-1.66-.49-3.34-.28-6.69-.67-10.04-.69-2.25-.01-4.51.47-6.74.85-.41.07-.71.73-1.06 1.11.39.29.74.72 1.17.85 1.43.42 2.89.73 4.34 1.07 2.18.5 4.19 1.09 4.99 3.63.39 1.24 1.38 1.24 2.22.18 1.93-2.42 4.02-4.65 6.8-6.14Zm10.78 12.47c-.57-3.88-1.79-7.42-4.89-10.01-.45-.37-1.14-.46-1.71-.68-.07.65-.35 1.37-.18 1.95 1.13 3.77 3.92 6.28 6.78 8.75Zm-10.64-15.29c-.21 1.62 1.27 3.78 2.65 4.16.79.22 1.34-.25 1.11-.92-.43-1.29-1.07-2.52-1.76-3.69-.16-.28-.94-.34-1.38-.25-.3.06-.51.56-.63.69Zm.55-2.15c-.58-.54-.93-1.08-1.38-1.21-.28-.08-.73.46-1.11.73.39.51.77 1.02 1.16 1.53.36-.28.72-.57 1.33-1.05Z"
            class="butterfly-cls-2"
          />
          <path
            d="M591.03 109.46c.28-.24.55-.69.83-.69 2.64-.03 5.31-.23 7.91.11 3.02.4 4.13 3.26 2.32 5.31-1.43 1.62-3.98 1.7-4.97-.42-1.16-2.46-3.25-3.75-5.9-4.16a.896.896 0 0 0-.19-.15Zm2.91-.38c-.04.15-.09.29-.13.44 1.84.96 3.23 2.34 4.19 4.17.59 1.14 1.52 1.29 2.6.7.95-.52 1.7-1.25 1.6-2.42-.1-1.21-.95-2.01-2.06-2.2-2.05-.35-4.13-.48-6.2-.7ZM586.55 112.19c-.93 2.82.2 4.76 2.17 6.53 1.24 1.11 1.55 2.81.93 3.93-.78 1.43-2.1 2.11-3.66 2.18-1.41.07-2.69-1.1-3.2-2.68-.1-.31-.18-.63-.21-.95-.34-3.71 1.95-6.26 3.96-9.01Zm-1.34 3.03c-1.03 1.61-2.12 3.44-1.95 5.71.13 1.64 1.03 2.8 2.36 3.06 1.03.2 2.69-.57 3.24-1.51.6-1.01.22-2.2-.88-3.52-.99-1.18-1.85-2.47-2.78-3.74ZM589.35 103.58c.16-.53.44-1.29.59-2.07.29-1.6.48-3.23.77-4.83.11-.63.31-1.28.62-1.84.16-.29.69-.59.99-.54.38.06.82.41 1.02.76.19.33.18.82.15 1.22-.11 1.33-.42 2.63 1.4 3.24.43.14.82 1.3.7 1.89-.09.43-1 .81-1.61.99-1.5.45-3.03.77-4.62 1.16Zm3.19-8.44c-.15 0-.3 0-.46-.01-1.17 2.15-1.17 4.53-1.35 6.94 1.1-.15 2.06-.25 3.02-.44.39-.08.75-.35 1.13-.53-.28-.44-.5-1.18-.86-1.27-1.48-.33-1.42-1.36-1.38-2.47.02-.74-.06-1.48-.09-2.22ZM582.69 108.86c-1.09.43-2.15.6-2.87 1.19-.71.59-1.01 1.65-1.64 2.38-.26.31-.97.5-1.34.37-.32-.12-.67-.8-.62-1.18.12-.92-.37-1.18-1.06-1.32-.64-.13-1.3-.12-1.94-.26-.67-.15-1.39-.3-1.94-.67-.32-.21-.55-.88-.48-1.29.05-.3.65-.73 1-.73 3.61.05 7.22.2 10.89 1.5Zm-11.07-.7-.12.71c1 .19 2 .41 3 .58 2.24.36 2.24.35 2.45 2.52 0 .06.14.1.44.31.74-1.11 1.48-2.23 2.29-3.45-2.71-.58-5.36-1-8.06-.66Z"
            class="butterfly-cls-2"
          />
          <path
            d="M598.13 111.37c.64-.27 1.28-.77 1.92-.76.88.01 1.44.71 1.28 1.65-.16.94-.86 1.61-1.78 1.31-.62-.2-1.05-1-1.56-1.53l.14-.67ZM587.48 121.48c-.05 1.01-.46 1.66-1.56 1.47-1.03-.18-1.52-.88-1.42-1.9.09-.95 1.09-1.74 1.96-1.58 1.22.22 1.2 1.1 1.02 2.02Zm-.5-1.01c-.22-.16-.44-.33-.67-.49-.36.45-.81.87-1.02 1.38-.06.16.56.59.87.89.27-.59.54-1.19.81-1.78Z"
            class="butterfly-cls-2"
          />
        </g>
      </svg>
    </div>
  );
};
export default ButterflyAnimation;
