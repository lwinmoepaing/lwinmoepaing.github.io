import { useStore } from "@nanostores/solid";
import { settingStore } from "~/store/settingStore";
import {
  createVisibilityObserver,
  withOccurrence,
} from "@solid-primitives/intersection-observer";
import anime from "animejs";
import { createEffect, onCleanup } from "solid-js";

const lineAnimation = (isVisible: boolean) => {
  const bgLine = "#Caring_BG_Line";
  const bgPath = "#Caring_Bg_Line > path";

  if (isVisible) {
    anime({
      targets: bgLine,
      easing: "easeInOutExpo",
      duration: 2500,
      opacity: [0, 1],
    });
    anime({
      targets: bgPath,
      easing: "easeInOutExpo",
      duration: 1200,
      scale: [0, 1],
    });
  } else {
    anime({
      targets: bgLine,
      easing: "easeInOutExpo",
      duration: 300,
      opacity: [1, 0],
    });
    anime({
      targets: bgPath,
      easing: "easeInOutExpo",
      duration: 300,
      scale: [1, 0],
    });
  }

  return () => anime.remove([bgPath, bgLine]);
};

const circleAnimation = (isVisible: boolean) => {
  const circleWrapper = "#Caring_Circles";
  const circleLines = "#Caring_Circles_Lines";
  const eachCircle = "#Caring_Circles > .inner-circle";

  if (isVisible) {
    anime({
      targets: [circleLines, eachCircle],
      easing: "easeInOutExpo",
      delay: 200,
      duration: 1500,
      scale: [0, 1],
      opacity: [0, 1],
    });
  } else {
    anime({
      targets: [circleLines, eachCircle],
      easing: "easeInOutExpo",
      delay: 200,
      duration: 300,
      scale: [1, 0],
      opacity: [1, 0],
    });
  }

  return () => anime.remove([circleWrapper, eachCircle, circleLines]);
};

const rectAnimation = (isVisible: boolean) => {
  const rects = "#Caring_Rects > g";

  if (isVisible) {
    anime({
      targets: [rects],
      easing: "easeInOutExpo",
      duration: 1500,
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(120),
    });
  } else {
    anime({
      targets: [rects],
      easing: "easeInOutExpo",
      duration: 300,
      scale: [1, 0],
      opacity: [1, 0],
      delay: anime.stagger(120),
    });
  }

  return () => anime.remove([rects]);
};

const CircleBackgroundAnimation = () => {
  const setting = useStore(settingStore);
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
    const makeBgLineAnimation = lineAnimation(isVisible);
    const makeCircleAnimation = circleAnimation(isVisible);
    const makeRectAnimation = rectAnimation(isVisible);
    onCleanup(() => {
      makeBgLineAnimation();
      makeCircleAnimation();
      makeRectAnimation();
    });
  });

  return (
    <div ref={el}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Caring_Lyaer"
        viewBox="0 0 1218 560"
      >
        <defs>
          <clipPath id="circle-clippath">
            <rect
              width={201}
              height={214.83}
              x={468.96}
              y={262.58}
              class={
                setting().darkmode ? "circle-red-active" : "circle-bg-cls-5"
              }
              rx={44.66}
              ry={44.66}
              transform="rotate(9.3 609.39 279.944)"
            />
          </clipPath>
          <clipPath id="circle-clippath-1">
            <rect
              width={153.47}
              height={162.02}
              x={149.18}
              y={185.51}
              class="circle-bg-cls-3"
              rx={52.71}
              ry={52.71}
              transform="rotate(11.41 225.89 266.522)"
            />
          </clipPath>
          <clipPath id="circle-clippath-2">
            <path
              d="m1018.771 244.151 57.177 11.54c23.78 4.799 39.194 28.007 34.395 51.787l-11.54 57.177c-4.846 24.016-28.278 39.578-52.294 34.731l-56.755-11.454c-24.016-4.847-39.578-28.278-34.732-52.294l11.455-56.756c4.846-24.016 28.278-39.578 52.294-34.731Z"
              class={
                setting().darkmode ? "circle-yellow-active" : "circle-bg-cls-2"
              }
            />
          </clipPath>
          <style>
            {`
                .circle-bg-cls-2{fill:#f8f4bb}
                .circle-bg-cls-3{fill:#eaeaea}
                .circle-red-active{fill: #fb1882}
                .circle-yellow-active{fill: #f1e86c}
                .circle-bg-cls-5{fill:#fdeef5}
                .circle-bg-cls-8{stroke:#6067af;stroke-dasharray:0 0 3 3;stroke-linecap:round;stroke-linejoin:round;fill:none}
                .circle-bg-cls-10,
                .circle-bg-cls-9{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:.75px}
                .circle-bg-cls-10{stroke:#cccccb}
            `}
          </style>
        </defs>
        <g id="Caring_Circles_Lines">
          <circle cx={609} cy={280} r={109.1} class="circle-bg-cls-10" />
          <circle cx={609} cy={280} r={244.17} class="circle-bg-cls-10" />
          <circle cx={609} cy={280} r={199.49} class="circle-bg-cls-10" />
          <circle cx={609} cy={280} r={154.3} class="circle-bg-cls-10" />
        </g>

        <g id="Caring_Circles">
          <circle
            cx={609}
            cy={280}
            r={244.17}
            class="circle-bg-cls-10 opacity-0"
          />
          <circle
            cx={419.68}
            cy={125.7}
            r={13.45}
            class="inner-circle"
            style={{
              fill: "#6067af",
            }}
          />
          <circle
            cx={763.3}
            cy={152.16}
            r={8.39}
            class="inner-circle"
            style={{
              fill: "#f05172",
            }}
          />
          <circle
            cx={650.74}
            cy={428.71}
            r={6.62}
            class="inner-circle"
            style={{
              fill: "#92caee",
            }}
          />
        </g>
        <g id="Caring_Bg_Line">
          <path
            d="M-1218 360.44s59.51-43.7 126.75-82.37c67.24-38.66 87.41-57.15 173.14 0 85.73 57.15 173.14 105.9 267.27 82.37s161.54-149.6 277.44-144.56c115.9 5.04 171.37 151.28 236.93 169.77C-70.93 404.15 0 360.44 0 360.44M0 360.44s59.51-43.7 126.75-82.37c67.24-38.66 87.41-57.15 173.14 0 85.73 57.15 173.14 105.9 267.27 82.37S728.7 210.84 844.6 215.88c115.9 5.04 171.37 151.28 236.93 169.77 65.56 18.49 136.48-25.21 136.48-25.21"
            class="circle-bg-cls-8"
          />
        </g>
        <g id="Caring_Rects">
          <g>
            <g id="Pink_Grid">
              <rect
                width={201}
                height={214.83}
                x={468.96}
                y={262.58}
                class={
                  setting().darkmode ? "circle-red-active" : "circle-bg-cls-5"
                }
                rx={44.66}
                ry={44.66}
                transform="rotate(9.3 609.39 279.944)"
              />
              <g
                style={{
                  "clip-path": "url(#circle-clippath)",
                }}
              >
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={109.13}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={89.16}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={68.96}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={48.76}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={28.56}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={8.37}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={129.33}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={149.52}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={169.72}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={189.92}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={210.12}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={230.32}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={250}
                  class="circle-bg-cls-10"
                />
                <circle
                  cx={490.33}
                  cy={370.36}
                  r={270.36}
                  class="circle-bg-cls-10"
                />
              </g>
            </g>
          </g>
          <g>
            <g id="Gray_Grid">
              <rect
                width={153.47}
                height={162.02}
                x={149.18}
                y={185.51}
                class="circle-bg-cls-3"
                rx={52.71}
                ry={52.71}
                transform="rotate(11.41 225.89 266.522)"
              />
              <g
                style={{
                  "clip-path": "url(#circle-clippath-1)",
                }}
              >
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={109.13}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={89.16}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={68.96}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={48.76}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={28.56}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={8.37}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={129.33}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={149.52}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={169.72}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={189.92}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={210.12}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={230.32}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={250}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={126.84}
                  cy={357.13}
                  r={270.36}
                  class="circle-bg-cls-9"
                />
              </g>
            </g>
          </g>
          <g>
            <g id="Yellow_Grid">
              <path
                d="m1018.771 244.151 57.177 11.54c23.78 4.799 39.194 28.007 34.395 51.787l-11.54 57.177c-4.846 24.016-28.278 39.578-52.294 34.731l-56.755-11.454c-24.016-4.847-39.578-28.278-34.732-52.294l11.455-56.756c4.846-24.016 28.278-39.578 52.294-34.731Z"
                class={
                  setting().darkmode
                    ? "circle-yellow-active"
                    : "circle-bg-cls-2"
                }
              />
              <g
                style={{
                  "clip-path": "url(#circle-clippath-2)",
                }}
              >
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={109.13}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={89.16}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={68.96}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={48.76}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={28.56}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={8.37}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={129.33}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={149.52}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={169.72}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={189.92}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={210.12}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={230.32}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={250}
                  class="circle-bg-cls-9"
                />
                <circle
                  cx={928.9}
                  cy={411.41}
                  r={270.36}
                  class="circle-bg-cls-9"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CircleBackgroundAnimation;
