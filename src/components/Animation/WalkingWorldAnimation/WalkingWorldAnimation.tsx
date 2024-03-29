import {
  createVisibilityObserver,
  withOccurrence,
} from "@solid-primitives/intersection-observer";
import anime from "animejs";
import { createEffect, onCleanup } from "solid-js";

const worldAnimation = (isVisible: boolean) => {
  const targets = ["#World_Walking > g"];

  if (isVisible) {
    anime({
      targets,
      easing: "easeOutQuart",
      scale: [0.8, 1],
      delay: anime.stagger(350),
      duration: function () {
        return anime.random(650, 900);
      },
      opacity: [0, 1],
    });
  } else {
    anime({
      targets,
      easing: "easeOutQuart",
      duration: function () {
        return anime.random(100, 200);
      },
      opacity: [1, 0],
    });
  }

  return () => anime.remove(targets);
};

const WalkingWorldAnimation = () => {
  let el: HTMLDivElement | undefined;
  const useVisibilityObserver = createVisibilityObserver(
    { threshold: 0.3 },
    withOccurrence((entry) => {
      return entry.isIntersecting;
    })
  );
  const visible = useVisibilityObserver(() => el);

  createEffect(() => {
    const isVisible = visible();
    const makeWorldAnimation = worldAnimation(isVisible);
    onCleanup(() => {
      makeWorldAnimation();
    });
  });

  return (
    <div ref={el}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="World_Walking"
        viewBox="0 0 620 764.09"
        // viewBox="0 0 620 564.09"
      >
        <defs>
          <style>
            {`
          .walking-cls-1 {
            opacity: .7;
          }
    
          .walking-cls-1, .walking-cls-2, .walking-cls-3, .walking-cls-4, .walking-cls-5, .walking-cls-6 {
            stroke-linecap: round;
            stroke-linejoin: round;
          }
    
          .walking-cls-1, .walking-cls-2, .walking-cls-3, .walking-cls-5, .walking-cls-6 {
            fill: none;
            stroke: #6067af;
          }
    
          .walking-cls-1, .walking-cls-3 {
            stroke-dasharray: 0 0 12 8;
          }
    
          .walking-cls-7 {
            clip-path: url(#clippath);
          }
    
          .walking-cls-8 {
            fill: #3a3a3a;
          }
    
          .walking-cls-9 {
            fill: #575f92;
          }
    
          .walking-cls-10 {
            fill: #4c4c4d;
          }
    
          .walking-cls-11 {
            fill: #6067af;
          }
    
          .walking-cls-2 {
            stroke-dasharray: 0 0 11.89 7.93;
          }
    
          .walking-cls-2, .walking-cls-5, .walking-cls-6 {
            stroke-width: 2px;
          }
    
          .walking-cls-12 {
            clip-path: url(#clippath-1);
          }
    
          .walking-cls-13 {
            stroke: #6067b0;
            stroke-miterlimit: 10;
          }
    
          .walking-cls-13, .walking-cls-4 {
            stroke-width: .5px;
          }
    
          .walking-cls-13, .walking-cls-4, .walking-cls-14 {
            fill: #fff;
          }
    
          .walking-cls-3 {
            opacity: .05;
          }
    
          .walking-cls-4 {
            stroke: #161417;
          }
    
          .walking-cls-14 {
            filter: url(#world-walking-shadow);
          }
    
          .walking-cls-6 {
            stroke-dasharray: 0 0 9.5 6.33;
          }
        `}
          </style>
          <clipPath id="clippath">
            <path
              class="walking-cls-11"
              d="M327.33,182.9l7.17,4.6,2.48-3.49s2.99,2.07,3.46,2.85,1.73,1.91,3.07,2.08,3-.24,3.79,.26,3.36,3.29,3.63,3.61,.26,1.66-1.33,1.92-11.7-.21-14.16-1.34-3.88-.64-3.88-.64l-1.08,1.17s-5.29-.14-5.33-.54,.16-5.53,.54-7.82c.16-.98,.34-1.71,.48-2.22s.73-.72,1.17-.44Z"
            />
          </clipPath>
          <clipPath id="clippath-1">
            <path
              class="walking-cls-11"
              d="M276.82,170.75l2.97,7.85,4.01-1.3s1.15,3.39,1.06,4.28,.25,2.53,1.2,3.44,2.51,1.57,2.84,2.43c.33,.86,.72,4.57,.75,4.98s-.77,1.46-2.18,.74-9.13-7.04-10.4-9.38c-1.27-2.34-2.69-2.78-2.69-2.78l-1.54,.29s-4.09-3.22-3.9-3.56,3.37-4.28,5.02-5.87c.7-.68,1.27-1.15,1.68-1.47s1-.14,1.18,.34Z"
            />
          </clipPath>
          <filter id="world-walking-shadow" filterUnits="userSpaceOnUse">
            <feOffset dx="1" dy="1" />
            <feGaussianBlur result="blur" stdDeviation="3" />
            <feFlood flood-color="#231f20" flood-opacity=".2" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>

        <g id="World_Walking_Path_Line">
          <circle
            id="World_Walking_Path_Lines"
            class="walking-cls-1"
            cx="310"
            cy="382.04"
            r="164.15"
          />
          <circle
            id="Walking_Path"
            class="walking-cls-3"
            cx="310"
            cy="382.04"
            r="269.3"
          />
        </g>
        <g id="World">
          <g>
            <path
              class="walking-cls-11"
              d="M305.05,274.86c-13.08,.75-23.83,3.1-34.97,7.6-19.65,7.95-36.44,21.5-48.5,39.16-9.14,13.38-15.19,28.98-17.49,45.09-.8,5.67-.99,8.7-.99,15.45s.18,9.51,1.01,15.18c4.39,30.96,22.1,58.48,48.5,75.35,14.72,9.41,30.91,14.84,49,16.42,3.66,.32,13.77,.27,17.52-.08,7.35-.7,13.95-1.95,20.38-3.81,28.64-8.28,52.54-28.24,65.91-55.01,3.76-7.55,5.85-13.18,8.3-22.47,2.43-9.19,3.17-14.89,3.17-24.48,.02-6.96-.37-11.71-1.51-18.53-3.79-22.86-14.39-43.3-30.79-59.37-12.98-12.75-28.14-21.57-45.66-26.58-9.19-2.63-12.48-3.19-23.31-3.86-2.3-.15-8.52-.18-10.57-.05Zm8.75,.72h1.06l-.86,1.61c-.86,1.59-.87,1.61-1.04,3.77-.1,1.27-.1,2.25-.02,2.33,.17,.17,2.95,1.02,3.04,.94,.03-.03,.18-.7,.34-1.49,.27-1.36,.34-1.51,1.07-2.23l.79-.77,5.35,2.38c2.93,1.32,6.12,2.78,7.09,3.27l1.76,.87,4.41-.35,4.39-.37,1.22-1.21c.67-.67,1.26-1.21,1.32-1.21,.05,0,2.92,1.36,6.37,3.02l6.26,3.02h5.65l1.61,.96c4.96,2.9,10.73,7.04,15.46,11.1,1.9,1.63,5.4,4.91,5.32,4.98-.03,.03-1.32-.42-2.9-1.01-6.84-2.55-11.44-4.8-13.7-6.67l-.8-.67-6.22-.49-6.24-.5-1.39,1.39c-.77,.75-1.39,1.49-1.39,1.64,.02,.13,.3,.92,.65,1.76l.64,1.51,1.19,.05c.67,.03,1.21,.1,1.22,.17,0,.07,.1,1.06,.22,2.21s.2,2.11,.2,2.13c-.02,.02-.92-.5-2.01-1.16-1.56-.92-2.01-1.14-2.13-.96-.08,.13-.69,1.21-1.36,2.38-1.06,1.88-1.26,2.13-1.56,2.05-.18-.07-.79-.15-1.34-.2-.55-.03-1.16-.13-1.34-.22s-.52-.17-.75-.2c-.3-.03-.5-.23-.72-.69-.34-.69-.45-.7-1.81-.45-.6,.12-1.06,.34-1.41,.67l-.5,.49-.75-.57c-.72-.55-.82-.59-2.15-.59-1.49,0-1.41-.05-1.78,1.12-.1,.32-.03,.37,.74,.47l.84,.12-.75,.94c-.69,.89-.72,.97-.5,1.32,.35,.52,.34,.55-.39,.55-.82,0-2.87-.52-4.29-1.09-1.24-.5-2.58-.57-3.45-.2-.7,.29-1.73,1.27-3.92,3.77l-1.66,1.91,1.32,1.32,1.32,1.32h.96c.54,0,1.54,.17,2.23,.37,1.07,.32,1.27,.44,1.41,.84,.18,.54,.4,.55,3.42,.35l1.64-.1,1.96-1.56q2.06-1.66,4.75-2.11c1.09-.18,1.11-.18,2.9,.54,1.64,.65,1.88,.7,2.75,.6,2.58-.3,2.93-.32,2.82-.13-.17,.27,.35,1.38,1.34,2.88,.45,.69,1.21,2.18,1.68,3.29,.49,1.12,1.26,2.6,1.71,3.3,.75,1.11,.87,1.39,.99,2.48,.13,1.19,.15,1.24,.55,1.21,.23-.03,1.34,.03,2.48,.13s2.1,.15,2.15,.1c.05-.03-.2-.52-.54-1.06-.45-.74-.92-1.19-1.84-1.81-1.02-.7-1.26-.96-1.51-1.59-.15-.42-.8-2.11-1.44-3.76-.65-1.64-1.14-3.02-1.11-3.04,.02-.03,.39-.18,.8-.34,.87-.34,.86-.35,1.68,1.24,.27,.5,.86,1.49,1.32,2.16,.82,1.24,.87,1.27,2.82,2.26l1.98,1.02,.08,1.44c.13,2.18,.4,2.52,2.85,3.42l1.93,.7,1.43-.75c2.03-1.07,2.05-1.09,2.5-1.93l.42-.75-.7-.94-.72-.94h3.67l1.43,1.56c1.39,1.51,1.48,1.58,3.87,2.77,1.98,.97,2.45,1.27,2.38,1.51-.03,.15-.12,.74-.18,1.27l-.12,.99,1.48,1.48,1.48,1.49-.57,.59c-.32,.32-.62,.59-.7,.59-.39,0-6.74-2.97-8.64-4.04l-2.21-1.24-3.74,.2c-2.06,.12-4.06,.25-4.43,.3l-.69,.1,.07,1.54c.03,.86,.1,1.71,.13,1.9,.05,.25,.94,.92,2.82,2.15,2.21,1.44,3.3,2.01,5.7,3.02,2.58,1.07,7.5,3.71,7.76,4.14,.05,.08,0,.92-.1,1.86-.18,1.58-.29,1.88-1.07,3.35-.47,.91-.91,1.64-.99,1.64-.07,0-.72-.4-1.46-.89-.92-.62-2.25-1.84-4.39-4.08l-3.07-3.17-.86-.02c-.82,0-.92-.05-3.47-2.06l-2.63-2.05-1.21,.05-1.21,.05-.35,1.43-.35,1.43-.59-.05c-1.07-.1-1.16-.17-1.17-.92,0-.39-.05-.84-.12-.99s-2.26-1.88-4.9-3.82c-2.63-1.95-4.76-3.59-4.75-3.62,0-.05,.5-.64,1.11-1.31,1.06-1.17,1.14-1.24,2.45-1.61,.75-.2,1.36-.44,1.36-.5,0-.05-.35-.64-.8-1.27l-.79-1.16-.91-.05c-.82-.05-1.09-.18-2.88-1.43l-2-1.36-1.93,.47-1.93,.47-1.21-.97c-.65-.55-1.78-1.48-2.47-2.05l-1.27-1.07-1.63,.1c-2.47,.13-4.86-.23-7.09-1.07l-1.84-.7-2.26,.2-2.26,.2-2.43,1.71-2.43,1.71-2.26,.39c-2.06,.34-2.36,.44-3.44,1.11-.64,.4-1.74,.89-2.43,1.09-1.17,.34-1.29,.42-1.93,1.27l-.67,.92-2.11-.1-2.1-.1-2.26,2.03c-1.44,1.31-2.28,2.2-2.36,2.48-.07,.25-.39,1.66-.74,3.15l-.62,2.68-2.21,2.35c-2.15,2.26-2.21,2.36-2.48,3.45-.17,.65-.29,1.79-.29,2.72,0,1.53,.03,1.69,.84,3.71,1.07,2.7,2.45,5.45,5.5,11.03l2.47,4.48,.96,.59c.91,.54,1.12,.59,2.78,.69l1.79,.12,2.31,1.83c1.63,1.26,2.47,1.81,2.77,1.81,.25,0,1.96,.12,3.81,.25s3.44,.25,3.52,.25c.1,0,.44,.42,.75,.94l.57,.94,.87-.12,.87-.1,1.54,1.79,1.56,1.78,.69-.08c.39-.05,.99-.15,1.38-.2l.67-.12,.44,3,.42,2.99-1.06,1.49c-.59,.82-1.63,1.98-2.3,2.57l-1.24,1.07,.49,2.8c.25,1.56,.65,5.06,.87,7.88q.42,5.06,.08,6.24-.64,2.3-2.83,3.76l-2,1.32-2.4,7.14-2.38,7.14,.74,3.64,.74,3.64-.47,3.14-.47,3.15-1.48,1.93-1.48,1.95-.12,1.91c-.08,1.29-.25,2.3-.5,3.05l-.39,1.12,1.48,.44,1.48,.44,1.68-.75,1.66-.75h4.16l3.49,1.12,3.5,1.12,2.2-1.11c1.22-.62,3.86-2.1,5.85-3.29l3.64-2.16,1.79-.18c.99-.12,1.86-.29,1.93-.39,.05-.1,.2-1.41,.34-2.88l.22-2.7,.96-1.11,.97-1.12,1.64-.2c2.63-.34,2.73-.37,4.39-1.76l1.54-1.27h2.62l4.68-4.19c5.27-4.73,4.83-4.11,5.35-7.55,.15-.97,.44-2.57,.65-3.56,.39-1.78,.4-1.81,2.2-4.46l1.79-2.67,1.12-.12c.6-.05,1.39-.1,1.76-.1,.4,0,1.36-.32,2.6-.86,1.64-.74,2.52-1.29,5.72-3.64l3.79-2.77,1.24-2.11c2.23-3.81,3.02-5.18,3.02-5.33,0-.08-.57-.35-1.26-.6l-1.26-.44-.64,.67-.62,.67-1.56-1.26c-1.96-1.59-1.86-1.53-2.01-1.09-.1,.23-.2-.35-.34-1.86-.13-1.48-.15-2.31-.03-2.52,.39-.74,.2-1.24-.89-2.38-1.22-1.26-1.9-2.53-3.05-5.67-.72-1.95-.79-2.3-1.02-4.88-.2-2.31-.2-2.97-.02-3.86,.13-.72,.18-1.66,.1-2.83-.1-1.83-.03-7.45,.12-8.65l.08-.69,1.26,.29c.69,.17,1.31,.35,1.36,.4,.07,.07-.07,1.83-.3,3.92l-.42,3.81,.8,1.74,.8,1.73v2.97c0,4.49,.3,6.62,1.34,9.71l.87,2.55,2.03,2.57c1.11,1.39,2.03,2.58,2.06,2.6,.02,.03,.45-.25,.96-.62,.89-.69,.91-.69,2.4-.69l1.49-.02,4.78-5.28,4.78-5.28,.29-1.38c.15-.75,.29-1.49,.3-1.64,0-.3-1.02-1.76-3.4-4.85-1.74-2.25-1.84-2.3-3.24-1.29-.5,.35-.97,.6-1.04,.55-.05-.07-.18-.79-.3-1.63-.17-1.26-.34-1.73-.94-2.8-.6-1.06-.8-1.27-1.09-1.24-.25,.03-.47-.1-.65-.39-.23-.35-.25-.67-.17-1.9,.07-.8,.22-1.91,.32-2.45,.2-.99,.2-1.01,1.26-1.58,.59-.32,1.07-.55,1.11-.52,.17,.23,1.84,5.01,2.15,6.17l.39,1.41,2.26,1.95c1.24,1.07,3.47,3.1,4.95,4.53l2.67,2.58,.74,2.36c.42,1.29,.99,3.54,1.27,4.96l.54,2.6,1.16,.45,1.17,.44-.05,3.34c-.03,1.83-.25,6.26-.47,9.84-.23,3.59-.4,6.54-.37,6.56s.37,.2,.77,.4c.39,.2,.7,.44,.7,.52,0,.52-1.81,6.59-2.78,9.32-4.08,11.52-9.86,21.9-17.46,31.39-15.75,19.65-38.05,33.1-62.69,37.83-6.69,1.27-12.58,1.81-19.96,1.81s-13.7-.57-20.64-1.96l-2.72-.54-1.59-1.66c-.87-.92-1.76-1.88-1.98-2.13-.42-.49-.67-.57-24.05-7.87l-4.36-1.36-2.85-1.88c-12.19-8.02-22.44-18.28-30.49-30.54l-1.78-2.7-.87-6.17c-.86-6.15-.87-6.17-1.49-7.28-.35-.6-.84-1.83-1.11-2.68l-.47-1.58,.29-2.28c.2-1.66,.35-2.33,.55-2.45,.13-.1,.72-.47,1.29-.84l1.02-.67-.03-.92c-.02-.5-.08-1.76-.13-2.77l-.08-1.84,1.76-1.29,1.78-1.31v-3.61l4.04-5.28c2.21-2.9,4.09-5.35,4.18-5.43,.1-.1,.77,.03,1.71,.32l1.56,.45,.65-.74c.42-.45,2.36-3.87,5.05-8.85l4.38-8.12,2.41-.49,2.41-.49,.69-.77c1.34-1.53,1.29-1.41,1.09-2.63-.15-.89-.47-1.68-1.64-3.86l-1.46-2.72-2.01-1.26-2.01-1.26-.05-3.1-.03-3.09-2.99-1.59-2.97-1.58,.03-4.09,.05-4.09,.67-1.24,.69-1.24-.67-1.11c-.64-1.06-.77-1.17-2.48-2.13l-1.81-1.02-.4-1.76-.4-1.76,.29-3.05c.17-1.68,.23-3.15,.15-3.29-.2-.34-3.76-4.98-3.81-4.98-.03,0-1.21,.45-2.6,1.01-2.48,.97-2.6,1.01-4.14,1.01-.87,0-1.58-.03-1.58-.08,0-.18,2.36-3.61,4.06-5.87,5.57-7.46,12.46-14.51,19.74-20.17,3.1-2.41,2.92-2.33,5.05-2.36,1.43-.03,2.53,.08,4.86,.5l3.04,.54,.62-.6c.37-.35,.79-1.04,1.01-1.63,.3-.77,.72-1.36,1.69-2.38l1.29-1.36,1.39-.08c1.21-.07,1.53-.15,2.33-.64,1.11-.67,3.22-1.51,4.34-1.73,.45-.1,3.04-.34,5.75-.54l4.95-.35,.52-.5c.29-.27,.89-.94,1.34-1.49,.8-.97,.84-.99,1.66-.99,1.16,.02,3.25,.3,3.81,.52,.25,.1,.49,.37,.55,.62,.05,.23,.27,.65,.45,.92,.27,.37,.32,.65,.27,1.29-.08,.74-.05,.8,.2,.67,.17-.08,1.04-.94,1.93-1.88,1.46-1.56,1.76-2,3.09-4.49l1.48-2.77,1.16-.12c.64-.07,1.73-.17,2.43-.22l1.27-.1,.77-1.38,.79-1.38-.72-.1-.7-.1,.84-.05c3.49-.2,6.69-.29,8.47-.23,1.16,.03,2.57,.07,3.14,.07Zm-107.06,92.29c.62,2.5,1.46,6.31,1.86,8.44l.74,3.87-.13,3.67-.13,3.67,1.58,2.87c.87,1.56,1.58,2.93,1.58,3.05,0,.1-.35,1.43-.77,2.92l-.77,2.73-.18,5.03-.17,5.05,1.02,2.92c1.07,3.04,1.46,4.76,2.62,11.67l.54,3.22,1.01,1.64c.75,1.24,1.24,2.35,2.01,4.63,.57,1.66,.97,2.95,.89,2.87-.23-.25-2.3-4.02-3.47-6.37-5.8-11.6-9.31-23.81-10.68-37.2-.72-6.98-.62-16.47,.25-23.48,.39-2.99,.86-5.79,.99-5.79,.05,0,.62,2.06,1.24,4.58Z"
            />
            <path
              class="walking-cls-11"
              d="M340.94,298.89l.17,2.18-1.43,1.63c-.99,1.12-1.59,1.98-1.9,2.72-.25,.59-.44,1.09-.4,1.12,.07,.08,7.73-.29,7.81-.37,.12-.1-.65-2.55-1.32-4.26-.35-.87-.72-2.2-.84-2.93s-.27-1.44-.34-1.58c-.12-.22-1.31-.67-1.76-.69-.12,0-.12,.7,0,2.18Z"
            />
            <path
              class="walking-cls-11"
              d="M370.17,434.75l-2.3,1.84-2.73,.18-2.73,.18-1.46,1.11c-1.43,1.07-1.48,1.14-1.98,2.45-.5,1.29-.6,1.41-2.28,2.9-1.78,1.59-2.31,1.88-3.45,1.88-.7,0-.75,.08-.37,.64,.25,.35,.22,.42-.75,1.51l-1.02,1.12v1.38q0,1.39,.44,1.39c.55,0,5.62-.5,5.87-.59,.1-.03,2.33-2.45,4.95-5.37,2.62-2.93,5.06-5.67,5.43-6.07,.62-.69,.77-.75,1.84-.92,1.16-.18,1.19-.18,2.57-1.54,.75-.74,1.38-1.43,1.38-1.53,0-.29-.86-2.43-.97-2.43-.07,.02-1.16,.84-2.41,1.86Z"
            />
          </g>
        </g>
        <g id="World_Walking_Text_Gp">
          <path
            id="World_Walking_Text_BG"
            class="walking-cls-14"
            d="M510.05,284.68L87.87,369.32c-14.27,2.86-23.84,15.73-21.26,28.61l12.69,63.28c2.58,12.87,16.37,21.06,30.65,18.2l187.47-37.58c.08,1.23,.74,2.43,2.07,3.2l22.08,11.66c2.14,1.25,5.05,.66,6.55-1.31l16.41-19.37c.93-1.23,1.07-2.58,.67-3.75l186.93-37.48c14.27-2.86,23.84-15.73,21.26-28.61l-12.69-63.28c-2.58-12.87-16.37-21.06-30.65-18.2Z"
          />
          <g id="World_Walking_Text_Dash_Array">
            <g>
              <path
                class="walking-cls-5"
                d="M294.5,431.92l5.88-1.18c.05,1.02,.64,1.99,1.88,2.6l2.36,1.16"
              />
              <path
                class="walking-cls-6"
                d="M310.32,437.28l8.33,4.07c2,.98,4.78,.42,6.24-1.25l8.2-9.35"
              />
              <path
                class="walking-cls-5"
                d="M335.17,428.37l1.74-1.98c.91-1.04,1.08-2.16,.73-3.12l5.88-1.18"
              />
              <path
                class="walking-cls-2"
                d="M351.3,420.54l168.94-33.87c13.61-2.73,23-13.63,20.88-24.22l-10.44-52.07c-2.12-10.59-14.99-17.03-28.6-14.3L99.63,376.76c-13.61,2.73-23,13.63-20.88,24.22l10.44,52.07c2.12,10.59,14.99,17.03,28.6,14.3l172.83-34.65"
              />
            </g>
          </g>
          <g id="World_Walking_Text">
            <g>
              <path
                class="walking-cls-9"
                d="M209.08,381.36c.5,.94,.89,2.09,1.16,3.45,.88,4.37-.05,7.26-2.79,8.68l-1.2-1.76c1.67-1,2.18-3.15,1.52-6.43-.78-3.88-2.6-5.54-5.47-4.96-2.86,.58-3.9,2.81-3.12,6.69,.66,3.28,1.96,5.06,3.89,5.34l-.42,2.08c-3.07-.26-5.05-2.57-5.92-6.93-1.05-5.21,.68-8.26,5.19-9.17,2.2-.44,3.99-.16,5.36,.86,.89-1.47,2.44-2.43,4.64-2.87,4.51-.91,7.28,1.24,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.02Z"
              />
              <path
                class="walking-cls-9"
                d="M223.25,382.2c-.88-4.36,.05-7.26,2.79-8.68l1.2,1.76c-1.67,1-2.18,3.15-1.52,6.43,.08,.42,.18,.82,.3,1.19,.9-1.01,2.23-1.7,3.99-2.05,1.76-.35,3.25-.25,4.47,.32-.03-.37-.09-.76-.18-1.18-.66-3.28-1.96-5.06-3.89-5.34l.42-2.08c3.07,.26,5.05,2.57,5.92,6.93,1.05,5.21-.68,8.26-5.19,9.17-4.5,.91-7.28-1.24-8.33-6.45Zm4.03,3.25c.96,1.14,2.26,1.55,3.9,1.22s2.68-1.21,3.13-2.63c-.96-1.14-2.26-1.54-3.9-1.21-1.64,.33-2.68,1.21-3.13,2.63Z"
              />
              <path
                class="walking-cls-9"
                d="M229.14,391.58c-1.04,.21-1.69,.69-1.96,1.46l-1.74-.43c.34-1.4,1.47-2.29,3.37-2.68,1.24-.25,2.3-.05,3.18,.61,.54-.94,1.43-1.54,2.67-1.79,2.5-.5,4.01,.5,4.51,3,.5,2.5-.5,4.01-3,4.51l-.33-1.65c1.4-.28,1.96-1.12,1.68-2.53-.28-1.4-1.12-1.96-2.53-1.68-1.4,.28-1.96,1.12-1.68,2.53,.5,2.5-.5,4-3,4.51-1.9,.38-3.28,0-4.14-1.17l1.44-1.07c.54,.6,1.33,.8,2.37,.59,1.4-.28,1.96-1.12,1.68-2.52-.28-1.4-1.12-1.96-2.52-1.68Z"
              />
              <path
                class="walking-cls-9"
                d="M235.6,376.03l-1.8-2.14c.89-1.47,2.44-2.43,4.64-2.87,4.5-.91,7.28,1.24,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.02Z"
              />
              <path
                class="walking-cls-9"
                d="M276.98,386c1.42-.29,2-1.1,1.73-2.44l-1.45-7.21,2.46-.5,1.45,7.21c.54,2.66-.73,4.3-3.79,4.92l-19.76,3.97c-3.08,.62-4.89-.4-5.43-3.06l-5.43-27.03c-.54-2.66,.74-4.3,3.82-4.92l14.36-2.89,.4,1.98-14.36,2.89c-1.44,.29-2.03,1.11-1.76,2.45l5.43,27.03c.27,1.34,1.12,1.87,2.57,1.58l19.76-3.97Z"
              />
              <path
                class="walking-cls-9"
                d="M267.59,369.6c.5,.94,.89,2.09,1.16,3.45,.88,4.37-.05,7.26-2.78,8.68l-1.2-1.76c1.67-1,2.18-3.15,1.52-6.43-.78-3.88-2.6-5.54-5.46-4.96-2.86,.58-3.9,2.81-3.12,6.69,.66,3.28,1.96,5.06,3.89,5.34l-.42,2.08c-3.07-.26-5.05-2.57-5.92-6.93-1.05-5.21,.68-8.26,5.19-9.17,2.2-.44,3.99-.16,5.36,.86,.89-1.47,2.44-2.43,4.64-2.87,4.5-.91,7.28,1.24,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.91-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.03Z"
              />
              <path
                class="walking-cls-9"
                d="M268.01,352.58c3.5-.7,5.61,.7,6.31,4.2,.7,3.5-.7,5.61-4.2,6.31-3.5,.7-5.61-.7-6.31-4.2-.71-3.5,.7-5.61,4.2-6.31Zm4.39,4.9l-.06-.3c-.44-2.18-1.75-3.05-3.93-2.62-2.18,.44-3.05,1.75-2.62,3.93l.07,.33c.82-.71,1.86-1.18,3.12-1.44,1.26-.25,2.4-.22,3.42,.09Zm-5.6,3.06c.69,.63,1.67,.82,2.93,.57,1.26-.25,2.09-.81,2.48-1.66-.79-.42-1.75-.52-2.87-.3-1.12,.23-1.97,.69-2.53,1.38Z"
              />
              <path
                class="walking-cls-9"
                d="M283.04,362.68c1.82-.37,2.92,.36,3.28,2.18s-.36,2.92-2.18,3.28c-1.82,.37-2.92-.36-3.28-2.18s.36-2.92,2.18-3.28Zm1.8,8.95c1.82-.37,2.92,.36,3.28,2.18,.37,1.82-.36,2.92-2.18,3.28-1.82,.37-2.92-.36-3.28-2.18-.37-1.82,.36-2.92,2.18-3.28Zm-.35-6.4c-.12-.6-.48-.84-1.08-.72-.6,.12-.84,.48-.72,1.08,.12,.6,.48,.84,1.08,.72,.6-.12,.84-.48,.72-1.08Zm1.8,8.95c-.12-.6-.48-.84-1.08-.72-.6,.12-.84,.48-.72,1.08,.12,.6,.48,.84,1.08,.72,.6-.12,.84-.48,.72-1.08Z"
              />
              <path
                class="walking-cls-9"
                d="M302.58,362.57c.5,.94,.89,2.09,1.16,3.45,.88,4.37-.05,7.26-2.79,8.68l-1.2-1.76c1.67-1,2.18-3.15,1.52-6.43-.78-3.88-2.6-5.54-5.47-4.96-2.86,.58-3.9,2.81-3.12,6.69,.66,3.28,1.96,5.06,3.89,5.34l-.42,2.08c-3.07-.26-5.05-2.57-5.92-6.93-1.05-5.21,.68-8.26,5.19-9.17,2.2-.44,3.99-.16,5.36,.86,.89-1.47,2.44-2.43,4.64-2.87,4.5-.91,7.28,1.24,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.02Z"
              />
              <path
                class="walking-cls-9"
                d="M341.31,358.47c1.05,5.21-.68,8.26-5.19,9.17-4.51,.91-7.28-1.24-8.33-6.45-.78-3.88-2.6-5.54-5.47-4.96s-3.9,2.81-3.12,6.69c.78,3.88,2.6,5.54,5.47,4.96l.4,1.98c-4.5,.91-7.28-1.24-8.33-6.45-1.05-5.21,.68-8.26,5.19-9.17,4.51-.91,7.28,1.24,8.33,6.45,.78,3.88,2.6,5.54,5.47,4.96,2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96l-.4-1.98c4.5-.91,7.28,1.24,8.33,6.45Z"
              />
              <path
                class="walking-cls-9"
                d="M331.71,345.65c1.82-.37,2.92,.36,3.28,2.18,.37,1.82-.36,2.92-2.18,3.28s-2.92-.36-3.28-2.18c-.37-1.82,.36-2.92,2.18-3.28Zm1.45,2.55c-.12-.6-.48-.84-1.08-.72s-.84,.48-.72,1.08c.12,.6,.48,.84,1.08,.72,.6-.12,.84-.48,.72-1.08Z"
              />
              <path
                class="walking-cls-9"
                d="M337.54,368.29l1.07,5.32,2.1-.42,.4,1.98-4.57,.92-1.47-7.3,2.46-.5Z"
              />
              <path
                class="walking-cls-9"
                d="M345.6,350.11c1.82-.37,2.92,.36,3.28,2.18s-.36,2.92-2.18,3.28c-1.82,.37-2.92-.36-3.28-2.18s.36-2.92,2.18-3.28Zm1.8,8.95c1.82-.37,2.92,.36,3.28,2.18s-.36,2.92-2.18,3.28-2.92-.36-3.28-2.18c-.37-1.82,.36-2.92,2.18-3.28Zm-.35-6.4c-.12-.6-.48-.84-1.08-.72-.6,.12-.84,.48-.72,1.08,.12,.6,.48,.84,1.08,.72s.84-.48,.72-1.08Zm1.8,8.95c-.12-.6-.48-.84-1.08-.72s-.84,.48-.72,1.08c.12,.6,.48,.84,1.08,.72,.6-.12,.84-.48,.72-1.08Z"
              />
              <path
                class="walking-cls-9"
                d="M359.29,355.89c.84-.4,1.62-.67,2.37-.82,2.06-.41,3.82,.09,5.27,1.5-.21,3.29-2.05,5.29-5.51,5.98-4.71,.95-7.58-1.18-8.63-6.39-1.05-5.21,.78-8.28,5.49-9.23,3.36-.68,5.77,.17,7.23,2.55l-2.19,1.22c-.97-1.62-2.52-2.21-4.64-1.79-3.06,.62-4.2,2.87-3.42,6.75,.21,1.02,.48,1.88,.83,2.58,.7-.89,1.77-1.68,3.21-2.36Zm2.36,1.31c-.48,.1-.98,.27-1.49,.52-1.29,.62-2.11,1.42-2.45,2.43,.9,.55,2,.69,3.3,.43,1.82-.37,2.96-1.32,3.43-2.85-.82-.56-1.75-.74-2.79-.53Z"
              />
              <path
                class="walking-cls-9"
                d="M379.56,358.78l1.67,8.32-2.46,.5-1.65-8.2c-4.18,.74-6.51-.04-6.97-2.35-.44-2.2,.59-3.55,3.09-4.06,3.3-.66,5.22,.31,5.74,2.91l.17,.84c1.49-.69,2.09-1.73,1.81-3.11-.3-1.5-1.85-2.35-4.63-2.54-3.72-.25-5.76-1.29-6.12-3.11-.44-2.2,.99-3.64,4.29-4.3,2.22-.45,4.05,.09,5.48,1.62l-1.78,1.7c-.96-1.14-2.06-1.59-3.3-1.34-1.66,.33-2.41,.94-2.23,1.82,.18,.9,1.44,1.43,3.79,1.58,4.16,.29,6.49,1.64,6.97,4.07,.54,2.7-.75,4.59-3.86,5.65Zm-2.84-1.37l-.21-1.02c-.26-1.28-1.22-1.76-2.88-1.42-.86,.17-1.2,.7-1.03,1.58,.21,1.02,1.57,1.31,4.11,.86Z"
              />
              <path
                class="walking-cls-9"
                d="M385.83,349.52c-1.05-5.21,.68-8.26,5.19-9.17,2.2-.44,3.99-.16,5.36,.86,.89-1.47,2.44-2.43,4.64-2.87,4.5-.91,7.28,1.25,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.03,.5,.94,.89,2.09,1.16,3.45,1.05,5.21-.68,8.26-5.19,9.17-4.51,.91-7.28-1.24-8.33-6.45Zm11.05-2.22c-.78-3.88-2.6-5.54-5.47-4.96-2.86,.58-3.9,2.81-3.12,6.69,.78,3.88,2.6,5.54,5.47,4.96,2.86-.58,3.9-2.81,3.12-6.69Z"
              />
              <path
                class="walking-cls-9"
                d="M408.18,341.34l-1.8-2.14c.89-1.47,2.44-2.43,4.64-2.87,4.51-.91,7.28,1.24,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.02Z"
              />
              <path
                class="walking-cls-9"
                d="M233.47,410.99c.91-1.16,2.33-1.94,4.25-2.32,4.5-.91,7.28,1.25,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17-.95-1.18-1.54-2.38-1.78-3.58-.17-.84-.16-1.69,.02-2.54,.36-1.65,1.21-2.94,2.57-3.86,.44-.3,.89-.53,1.36-.71-.97-2.43-2.6-3.41-4.91-2.95-1.5,.3-2.51,1.06-3.01,2.26,.12,.27,.21,.57,.28,.91,.3,1.48-.08,2.7-1.14,3.67,1.35,.48,2.17,1.46,2.47,2.94,.6,3-1.35,4.96-5.85,5.86-3.56,.72-6.07-.11-7.53-2.49l2.19-1.22c.97,1.62,2.62,2.19,4.94,1.73,2.86-.58,4.13-1.71,3.79-3.39-.31-1.54-1.59-2.09-3.83-1.63l-.4-1.98c2.24-.45,3.21-1.45,2.9-2.99-.34-1.68-1.94-2.24-4.8-1.66-2.86,.58-4.15,1.6-3.85,3.09,.1,.48,.63,.62,1.59,.43l.4,1.98c-2.6,.52-4.09-.12-4.45-1.92-.56-2.8,1.41-4.66,5.91-5.56,2.52-.51,4.44-.4,5.75,.31Zm10.12,4.62v-.06c-.28,.12-.54,.26-.8,.44-.92,.62-1.49,1.5-1.72,2.63-.11,.48-.11,1,0,1.56,.11,.54,.32,1.11,.63,1.72,1.92-.93,2.55-3.02,1.89-6.29Z"
              />
              <path
                class="walking-cls-9"
                d="M255.56,414.24c.84-.4,1.62-.67,2.37-.82,2.06-.41,3.82,.09,5.27,1.5-.21,3.29-2.05,5.29-5.52,5.98-4.71,.95-7.58-1.18-8.63-6.39-1.05-5.21,.78-8.28,5.49-9.23,3.36-.68,5.77,.17,7.23,2.54l-2.19,1.22c-.97-1.62-2.52-2.21-4.64-1.79-3.06,.62-4.21,2.87-3.42,6.75,.21,1.02,.48,1.88,.83,2.58,.7-.89,1.77-1.68,3.21-2.36Zm2.36,1.31c-.48,.1-.98,.27-1.49,.52-1.29,.62-2.11,1.42-2.45,2.43,.9,.55,2,.69,3.3,.43,1.82-.37,2.96-1.31,3.43-2.85-.82-.56-1.75-.74-2.79-.53Z"
              />
              <path
                class="walking-cls-9"
                d="M292.78,420.32c1.42-.29,2-1.1,1.73-2.44l-1.45-7.21,2.46-.5,1.45,7.21c.54,2.66-.73,4.3-3.79,4.92l-19.76,3.97c-3.08,.62-4.89-.4-5.43-3.06l-5.43-27.03c-.54-2.66,.74-4.3,3.82-4.92l19.76-3.97c3.06-.62,4.86,.41,5.4,3.07l.66,3.3-2.46,.5-.66-3.3c-.27-1.34-1.12-1.87-2.54-1.58l-19.76,3.97c-1.44,.29-2.03,1.11-1.76,2.45l5.43,27.03c.27,1.34,1.12,1.87,2.57,1.58l19.76-3.97Z"
              />
              <path
                class="walking-cls-9"
                d="M283.39,403.92c.5,.94,.89,2.09,1.16,3.45,.88,4.37-.05,7.26-2.79,8.68l-1.2-1.76c1.67-1,2.18-3.14,1.52-6.43-.78-3.88-2.6-5.54-5.47-4.96-2.86,.58-3.91,2.81-3.12,6.69,.66,3.28,1.96,5.07,3.89,5.34l-.42,2.09c-3.07-.26-5.05-2.57-5.92-6.93-1.05-5.21,.68-8.26,5.19-9.17,2.2-.44,3.99-.16,5.36,.86,.89-1.47,2.44-2.43,4.64-2.87,4.5-.91,7.28,1.25,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.03Z"
              />
              <path
                class="walking-cls-9"
                d="M293.39,401.91l-1.8-2.14c.89-1.47,2.44-2.43,4.64-2.87,4.5-.91,7.28,1.24,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69s-2.6-5.54-5.47-4.96c-1.78,.36-2.86,1.37-3.24,3.03Z"
              />
              <path
                class="walking-cls-9"
                d="M313.05,393.53c3.36-.68,5.77,.17,7.23,2.55l-2.19,1.22c-.97-1.62-2.52-2.21-4.64-1.79-3.06,.62-4.21,2.87-3.42,6.75s2.7,5.52,5.77,4.9c2.12-.43,3.32-1.57,3.59-3.44l2.49,.28c-.43,2.75-2.32,4.46-5.68,5.14-4.71,.95-7.58-1.18-8.63-6.39-1.05-5.21,.78-8.28,5.49-9.23Z"
              />
              <path
                class="walking-cls-9"
                d="M312.63,383.17c-2.18,.44-3.05,1.75-2.62,3.93,.44,2.18,1.75,3.05,3.93,2.62l.4,1.98c-3.5,.7-5.61-.7-6.31-4.2-.7-3.5,.7-5.61,4.2-6.31,2.56-.51,4.37,.09,5.43,1.82l-1.69,1.21c-.68-1.01-1.79-1.36-3.34-1.05Z"
              />
              <path
                class="walking-cls-9"
                d="M325.37,391.67c1.82-.37,2.92,.36,3.28,2.18,.37,1.82-.36,2.92-2.18,3.28s-2.92-.36-3.28-2.18c-.37-1.82,.36-2.92,2.18-3.28Zm1.8,8.95c1.82-.37,2.92,.36,3.28,2.18,.37,1.82-.36,2.92-2.18,3.28-1.82,.37-2.92-.36-3.28-2.18-.37-1.82,.36-2.92,2.18-3.28Zm-.35-6.4c-.12-.6-.48-.84-1.08-.72-.6,.12-.84,.48-.72,1.08,.12,.6,.48,.84,1.08,.72,.6-.12,.84-.48,.72-1.08Zm1.8,8.95c-.12-.6-.48-.84-1.08-.72-.6,.12-.84,.48-.72,1.08,.12,.6,.48,.84,1.08,.72,.6-.12,.84-.48,.72-1.08Z"
              />
              <path
                class="walking-cls-9"
                d="M332.55,397.73c-.88-4.37,.05-7.26,2.79-8.68l1.2,1.76c-1.67,1-2.18,3.15-1.52,6.43,.08,.42,.19,.82,.3,1.19,.9-1.01,2.23-1.7,3.99-2.05s3.25-.25,4.47,.32c-.03-.37-.09-.76-.18-1.18-.66-3.28-1.96-5.07-3.89-5.34l.42-2.08c3.07,.26,5.05,2.57,5.92,6.93,1.05,5.21-.68,8.26-5.19,9.17-4.51,.91-7.28-1.24-8.33-6.45Zm4.03,3.25c.96,1.14,2.26,1.55,3.9,1.22,1.64-.33,2.68-1.21,3.13-2.63-.96-1.14-2.26-1.55-3.9-1.22-1.64,.33-2.68,1.21-3.13,2.63Z"
              />
              <path
                class="walking-cls-9"
                d="M331.48,377.32l10.93,7.27-1.13,1.7-10.92-7.24,1.12-1.73Z"
              />
              <path
                class="walking-cls-9"
                d="M341.06,405.08c1.82-.37,2.92,.36,3.28,2.18s-.36,2.92-2.18,3.28-2.92-.36-3.28-2.18c-.37-1.82,.36-2.92,2.18-3.28Zm1.45,2.55c-.12-.6-.48-.84-1.08-.72s-.84,.48-.72,1.08c.12,.6,.48,.84,1.08,.72,.6-.12,.84-.48,.72-1.08Z"
              />
              <path
                class="walking-cls-9"
                d="M349.07,394.41c-.88-4.37,.05-7.26,2.78-8.68l1.2,1.76c-1.67,1-2.18,3.15-1.52,6.43,.08,.42,.18,.82,.3,1.19,.9-1.01,2.23-1.7,3.99-2.05,1.76-.35,3.25-.25,4.47,.32-.03-.37-.09-.76-.18-1.18-.66-3.28-1.96-5.07-3.89-5.34l.42-2.08c3.07,.26,5.05,2.57,5.92,6.93,1.05,5.21-.68,8.26-5.19,9.17s-7.28-1.24-8.33-6.45Zm4.03,3.25c.96,1.14,2.26,1.55,3.9,1.22,1.64-.33,2.68-1.21,3.13-2.63-.96-1.14-2.26-1.55-3.9-1.22-1.64,.33-2.68,1.21-3.13,2.63Z"
              />
              <path
                class="walking-cls-9"
                d="M376.23,382.64c.91-1.39,2.42-2.3,4.55-2.73,4.5-.91,7.28,1.24,8.33,6.45,1.05,5.21-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.91-2.81,3.12-6.69s-2.6-5.54-5.47-4.96c-1.76,.35-2.83,1.34-3.22,2.96,.49,.99,.87,2.16,1.14,3.52,1.05,5.21-.68,8.26-5.19,9.17-4.5,.91-7.28-1.24-8.33-6.45-.88-4.37,.05-7.26,2.79-8.68l1.2,1.76c-1.67,1-2.18,3.15-1.52,6.43,.78,3.88,2.6,5.54,5.47,4.96,2.86-.58,3.9-2.81,3.12-6.69-.66-3.28-1.96-5.07-3.89-5.34l.42-2.08c1.19,.09,2.2,.5,3.05,1.2Z"
              />
              <path
                class="walking-cls-9"
                d="M385.33,396.18l1.07,5.32,2.1-.42,.4,1.98-4.57,.92-1.47-7.3,2.46-.49Z"
              />
              <path
                class="walking-cls-9"
                d="M392.11,385.76c-1.05-5.21,.68-8.26,5.19-9.17,2.2-.44,3.99-.16,5.36,.86,.89-1.47,2.44-2.43,4.64-2.87,4.51-.91,7.28,1.24,8.33,6.45s-.68,8.26-5.19,9.17l-.4-1.98c2.86-.58,3.9-2.81,3.12-6.69-.78-3.88-2.6-5.54-5.47-4.96-1.78,.36-2.86,1.37-3.24,3.03,.5,.94,.89,2.09,1.16,3.45,1.05,5.21-.68,8.26-5.19,9.17-4.51,.91-7.28-1.24-8.33-6.45Zm11.05-2.22c-.78-3.88-2.6-5.54-5.47-4.96s-3.9,2.81-3.12,6.69c.78,3.88,2.6,5.54,5.47,4.96,2.86-.58,3.9-2.81,3.12-6.69Z"
              />
              <path
                class="walking-cls-9"
                d="M407.17,364.17c-2.18,.44-3.05,1.75-2.62,3.93,.44,2.18,1.75,3.05,3.93,2.62l.4,1.98c-3.5,.7-5.61-.7-6.31-4.2-.71-3.5,.7-5.61,4.2-6.31,2.56-.52,4.37,.09,5.43,1.81l-1.69,1.22c-.68-1.01-1.79-1.36-3.33-1.05Z"
              />
            </g>
          </g>
        </g>
        <g id="Lwin_Walking">
          <g id="Right_Foot_Group">
            <g id="Right_Foot">
              <path
                class="walking-cls-13"
                d="M328.14,175.91s-.22,6.11-1.14,6.82-.78,1.59-.78,1.59c0,0,7.51,3.02,8.15,3.55s2.25,.93,2.25,.93l1.87-1.99s-2.61-1.65-3.31-2.66c-.7-1.01-1.63-1.36-1.63-1.36,0,0-1.03-.53-.84-2.45,.19-1.92,.3-3.96,.3-3.96l-4.87-.46Z"
              />
              <g>
                <path
                  class="walking-cls-11"
                  d="M327.33,182.9l7.17,4.6,2.48-3.49s2.99,2.07,3.46,2.85,1.73,1.91,3.07,2.08,3-.24,3.79,.26,3.36,3.29,3.63,3.61,.26,1.66-1.33,1.92-11.7-.21-14.16-1.34-3.88-.64-3.88-.64l-1.08,1.17s-5.29-.14-5.33-.54,.16-5.53,.54-7.82c.16-.98,.34-1.71,.48-2.22s.73-.72,1.17-.44Z"
                />
                <g class="walking-cls-7">
                  <path
                    class="walking-cls-8"
                    d="M324.27,189.75s1.44-.8,2.56-.57c1.12,.23,4.37,1.72,5.7,2.03s1.82-.4,2.7-.26,2.39,.99,3.84,1.61c1.45,.62,4.46,1.35,7.15,1.31s3.52-.13,4.14-.46,2.09-1.05,1.66-.26-1.53,2.66-4.36,2.61c-2.83-.05-8.77-.53-10.36-1.23s-3.71-1.45-4.39-1.27-.8,.77-1.2,1.11,.92,.79-2.85,.17c-3.76-.62-4.82-1.52-4.82-1.52l.22-3.27Z"
                  />
                </g>
              </g>
            </g>
            <path
              id="Right_Second_Part"
              class="walking-cls-11"
              d="M327.68,148.54c.03-.48-.8,.64-.8,.64l.55,.97-.97,.9,.81,.46s-.92,4.77-1.04,6.52,.67,2.45,.84,3.94c.17,1.48,1.04,7.79,.57,9.26s-2.56,6.69-2.56,6.69c0,0,3.11,.91,5.35,1.13s4.29,.15,4.29,.15c0,0-.02-9.96,.45-14.84,.48-4.88,2.4-13,2.4-13,0,0-.41-2.96-1.06-3.04s-8.83,.21-8.83,.21Z"
            />
            <path
              id="Right_First_Part"
              class="walking-cls-11"
              d="M303.26,106.7s10.69,20.46,12.11,22.39c1.42,1.93,3.78,7.83,6.3,10.3s5.81,6.87,6.09,8.74c.28,1.87,8.1,1.49,8.52,1.22s.86-1.82,.86-1.82c0,0-1.99-12.59-4.05-17.2-2.05-4.61-5.12-11.47-5.29-12.89s.37-4.61,.37-4.61c0,0-5.92-11.99-7.98-12.48s-14.84,6-16.94,6.34Z"
            />
          </g>
          <g id="Left_Foot_Group">
            <g id="Left_Foot">
              <path
                class="walking-cls-13"
                d="M282.28,165.81s-4.48,4.6-5.62,4.62-1.55,.79-1.55,.79c0,0,4.16,6.8,4.36,7.59s1.24,2.05,1.24,2.05l2.65-.48s-.87-3.36-.83-4.57c.04-1.21,.02-1.61,.02-1.61,0,0-.45-1.52,.82-2.92s2.19-2.24,2.19-2.24l-3.27-3.24Z"
              />
              <g>
                <path
                  class="walking-cls-11"
                  d="M276.82,170.75l2.97,7.85,4.01-1.3s1.15,3.39,1.06,4.28,.25,2.53,1.2,3.44,2.51,1.57,2.84,2.43c.33,.86,.72,4.57,.75,4.98s-.77,1.46-2.18,.74-9.13-7.04-10.4-9.38c-1.27-2.34-2.69-2.78-2.69-2.78l-1.54,.29s-4.09-3.22-3.9-3.56,3.37-4.28,5.02-5.87c.7-.68,1.27-1.15,1.68-1.47s1-.14,1.18,.34Z"
                />
                <g class="walking-cls-12">
                  <path
                    class="walking-cls-8"
                    d="M270.38,174.37s1.61,.22,2.36,1.05,2.45,3.93,3.31,4.95c.86,1.02,1.67,.75,2.29,1.38s1.31,2.19,2.1,3.53,2.73,3.69,4.88,5.23c2.15,1.55,2.86,1.96,3.54,2.06s2.27,.4,1.46,.77-2.77,1.2-4.98-.5c-2.21-1.7-6.62-5.57-7.47-7.06s-2.08-3.32-2.72-3.58-1.08,.14-1.6,.18,.26,1.16-2.35-1.54c-2.61-2.7-2.92-4.03-2.92-4.03l2.1-2.45Z"
                  />
                </g>
              </g>
            </g>
            <path
              id="Left_Second_Part"
              class="walking-cls-11"
              d="M295.52,144.74c.28-.38-1,.09-1,.09l-.08,1.09-1.28,.21,.41,.82s-3.37,3.4-4.42,4.77c-1.06,1.37-.79,2.38-1.47,3.68s-3.41,6.94-4.6,7.9-5.76,4.08-5.76,4.08c0,0,2.05,2.45,3.76,3.85,1.71,1.41,3.43,2.47,3.43,2.47,0,0,5.43-8.17,8.49-11.9,3.06-3.73,9.08-9.33,9.08-9.33,0,0,1.28-2.65,.8-3.07s-7.35-4.66-7.35-4.66Z"
            />
            <path
              id="Left_First_Part"
              class="walking-cls-11"
              d="M301.2,101.71s-2.53,17.97-2.7,20.32-2.18,8.28-1.88,11.74-.04,8.86-1.03,10.44c-.99,1.58,5.11,6.29,5.59,6.37s1.81-.81,1.81-.81c0,0,6.57-10.7,7.98-15.46s3.51-11.86,4.28-13.03,3.22-3.21,3.22-3.21c0,0,.78-12.38-.44-14.05s-15.05-1.21-16.83-2.3Z"
            />
          </g>
          <path
            id="Body"
            class="walking-cls-13"
            d="M316.44,56.1s3.4,5.01,5.75,9.02c.8,1.36,1.22,2.92,1.22,4.5v4.89c0,.24,.32,19.12,1.6,21.89s4.05,12.3,1.42,11.31c-2.2-.83-8.65,.02-11.2,0-1.42-.01-10.91,3.33-12.19,3.95l-4.61,2.13,.59-3.69-2.66,3.69s2.02-48.82,4.99-54.21l6.8-5.2"
          />
          <g id="Head">
            <path
              class="walking-cls-13"
              d="M309.01,50.65l-.86,3.73,4.4,1.75s4.06,.25,3.88-.02-.29-1.74-.29-1.74l1.54-2.51-.07,.75s.74-.55,1.6-.15,1.22,.9,2.44,.9,1.04,.72,2.66-1.49c1.62-2.21,2.39-3.73,2.02-4.45s-.45-1.73-.45-1.73l.45-.06s-.31,.06-.27-.76,.18-1.13,.18-1.13l-.04-2.52-14.08-1.05-3.97,4.27,1.38,4.52-.52,1.68Z"
            />
            <path
              id="Hair"
              class="walking-cls-11"
              d="M318.04,43.86c.11-.16,2.27-1.42,2.27-1.42l-.21,1.42,1.21,.58s.63,.58,1.05,.42,2.64-1.79,2.64-1.79c0,0-.74,1.48-1.32,1.82s1.84-1.23,1.84-1.23l-.74,1.27s1.53-1.45,1.74-1.87,.32,1.21,.26,1.53,1.11-2.16,1.11-2.16c0,0,1.37,.87,1.58,1.25s-1.16-2.09-1.16-2.09c0,0,.63,1.42,.47-1.53s-1.16-4.59-1.16-4.59l2.63,1.9c.01-.08-3-3.85-3.73-4.54s2.37,.53,3.58,0-1.05,.74-4.59-1.79-6.38-5.48-8.7-5.38-3.37,.47-3.37,.47c0,0,1.77-.29,2.37,.32,0,0-.53,.5-1.71,.42s-2.27,.05-2.58,.24,.4-1.08-.34-2.16-1.19-1.05-1.19-1.05c0,0,.71,.79,.76,1.82s-1.69,3.64-1.69,3.64l.74,.26s-2.06-.34-3.27,.42-2.87,4.59-2.87,4.59c0,0,2.71-3.93,3.32-4.19s-2.71,3.43-3.32,5.84,1.01,6.37,1.09,7.39,.43-.55,.43-.55l.16,2.13,.43-.87s0,2.06,.4,2.57,1.11,1.86,1.11,1.86l.32-.95s.91,1.54,.87,2.41,.67,.59,.67,.59l.75-.47,.04,.52,2.93-1.98s.2,.36,0,.59,1.66-1.9,2.29-1.98,.55,.55,.55,.55l1.07-1.62s.4,.43,.99,.71-.08,.08-.28-.99,.54-2.35,.54-2.35Z"
            />
          </g>
          <path
            id="Bag"
            class="walking-cls-10"
            d="M305.05,57.23l-1.23,.57c-.65,.71-1.86,.36-2.06,.79s-3.5,4.25-3.89,5.32c-.39,1.07-.61,4.08-.27,4.87s1.16,11.46,1.42,14.61c.26,3.15,2.59,5.28,2.59,5.28,0,0-.27,1.29-.03,1.86s.76,2.43,.28,3.43c-.47,1-.9,.19-1.88,1.12s-.34,1.88-2.88,2.74c-1.42,.48-5.4,1.51-8.03,.11-1.05-.56-3.61-11.83-3.15-16.96,.45-5.13,.03-10,1.46-10.93,1.43-.93,1.02-2.46,1.8-2.46s3.38-.64,3.38-.64c0,0,2.54-2.65,3.12-4.15,.58-1.5,3.83-4.71,4.73-5.64s6.12-1.94,6.25-1.78c.92,1.08-1.61,1.87-1.61,1.87Z"
          />
          <g id="Hands">
            <g id="Right_Hand">
              <path
                class="walking-cls-13"
                d="M329.63,72.81l1.56,1.53,6.19-8.45v-1.92l1.23,.96s1.55-2.13,1.28-3.36l-.53-2.45s1.33,1.31,1.76,3.01c0,0,.11,2.4-.03,3.04-.61,2.95-3.62,4.42-3.62,4.42,0,0-4.19,8.46-4.99,9.24-.97,.96-4.39,.94-5.24-.54"
              />
              <path
                class="walking-cls-13"
                d="M323.45,76.77l.81,.22c.81,.22,2.56,2.56,2.56,2.56l1.07-3.2c1.07-3.2,2.56-4.48,2.56-4.48l-1.6-.53-9.56-10.91s3.37,4.07,3.75,6.63,.42,9.71,.42,9.71Z"
              />
              <g id="Book">
                <path
                  class="walking-cls-4"
                  d="M339.63,51.88s.2-1.12-.45-2.55c-.64-1.44,.24-2.45,.24-2.45,0,0,2.9,2.45,3.22,3.38,.32,.93,.78,1.81,.78,1.81"
                />
                <path
                  class="walking-cls-4"
                  d="M343.43,53.66s-2.84,9.35-3.67,11.2-3.95,2.68-6.02,1.89c-1.13-.43-2.44-1-3.39-1.43-.76-.34-1.13-1.2-.87-1.99,.79-2.38,2.36-7.13,2.6-8.46,.33-1.79,1.32-2.87,1.66-2.77s-.08,.78,3.64,.49,5.63-1.09,6.04-.49,0,1.57,0,1.57Z"
                />
                <path
                  class="walking-cls-11"
                  d="M334.38,54.68s2.75,.29,4.35-.12,2.79-.29,2.82,.06,.29,3.03-.92,3.47-7.16,.55-7.28,0,.28-3.52,1.03-3.41Z"
                />
              </g>
              <path
                class="walking-cls-13"
                d="M335.78,68.35l-.29-1.16c.03-.95,.51-1.83,1.3-2.37,.58-.39,1.26-1.58,1.53-1.4,.57,.38,1.07,2.61,1.07,2.61"
              />
            </g>
            <g id="Left_Hand">
              <path
                class="walking-cls-13"
                d="M305.49,59.41c.3,.08,2.2,.41,2.68,1.14s.82,3.41,.9,4.08-.65,5.74-.59,6.98l.06,1.24,.69-4.56s1.33,11.78,1.41,12.96,.69,3.78,.63,4.76-.43,1.84-.43,1.84c0,0-3.09,1.36-4.36,1.44s-6.39-1.37-6.39-1.37c0,0,.16-3.67-.56-4.51s-.84-15.86-1.07-18.29,3.03-5.64,3.03-5.64l4.02-.05Z"
              />
              <path
                class="walking-cls-13"
                d="M309.19,88.6s.59,4.53,.62,4.75,1.35,1.05,2.12,1.89,4.99,12.06,4.99,12.06l.97,2.94,2.26,3.79-1.73,5.45-2.51-8.81s-7.81-10.02-8.32-10.31-3.61-4.54-3.64-4.75-2.09-7.22-2.09-7.22l4.6,.89,2.73-.68Z"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
export default WalkingWorldAnimation;
