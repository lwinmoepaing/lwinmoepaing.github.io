import anime from "animejs";
import { Accessor, Setter, createEffect, onCleanup } from "solid-js";

type Tref = HTMLDivElement | undefined;
type TsvgRef = SVGGElement | undefined;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeInnerHandAnimate = (
  show: boolean = true,
  innerRef: TsvgRef
): Promise<void> => {
  return new Promise((resolve) => {
    if (!innerRef) return resolve();

    anime({
      targets: innerRef,
      translateX: show ? 18 : 0,
      easing: "easeInOutExpo",
      duration: show ? 500 : 300,
      changeComplete: () => {
        resolve();
      },
    });
  });
};

const makeUpperHandAnimate = (
  upperRef: TsvgRef,
  innerRef: TsvgRef
): Promise<void> => {
  return new Promise((resolve) => {
    if (!upperRef) return resolve();

    const defaultConfig = {
      targets: upperRef,
      duration: 300,
      easing: "easeInOutExpo",
    };

    const hideAnimate = () => {
      anime({
        ...defaultConfig,
        translateX: [0, 8],
        opacity: [1, 0],
        scale: [1, 0],
        changeComplete: async () => {
          makeInnerHandAnimate(false, innerRef);
          resolve();
        },
      });
    };

    const rotateLeft = () => {
      anime({
        ...defaultConfig,
        rotate: -10,
        changeComplete: hideAnimate,
      });
    };

    const rotateTop = () => {
      anime({
        ...defaultConfig,
        rotate: 10,
        changeComplete: rotateLeft,
      });
    };

    anime({
      ...defaultConfig,
      translateX: [8, 0],
      opacity: [0, 1],
      scale: [0, 1],
      changeComplete: rotateTop,
    });
  });
};

const PandaRightSide = (props: {
  isAnimating: Accessor<boolean>;
  setIsAnimating: Setter<boolean>;
}) => {
  let el: Tref, innerRef: TsvgRef, upperRef: TsvgRef;

  createEffect(() => {
    const isAnimate = props.isAnimating();
    const onMouseEnter = async () => {
      if (isAnimate) {
        return;
      }
      props.setIsAnimating(true);
      await makeInnerHandAnimate(true, innerRef);
      makeInnerHandAnimate(false, innerRef);
      await makeUpperHandAnimate(upperRef, innerRef);
      props.setIsAnimating(false);
    };

    if (el) {
      el.addEventListener("mouseenter", onMouseEnter);
    }
    onCleanup(() => {
      if (el) {
        el.removeEventListener("mouseenter", onMouseEnter);
      }
      anime.remove([innerRef, upperRef]);
    });
  });

  return (
    <div ref={el} class="h-[50px] w-[47.5px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Panda_Right_Hand_Layer"
        viewBox="0 0 37.85 40"
      >
        <defs>
          <style>
            {`
              .panda-right-1, .panda-right-2 {
                fill: none;
              }
        
              .panda-right-1, .panda-right-2, .panda-right-3 {
                stroke: #6067b0;
              }
        
              .panda-right-1, .panda-right-2, .panda-right-4 {
                stroke-linecap: round;
                stroke-linejoin: round;
              }
        
              .panda-right-2 {
                stroke-dasharray: 0 0 5.85 2.93;
              }
        
              .panda-right-5, .panda-right-3 {
                fill: #fff;
              }
        
              .panda-right-6 {
                fill: #e2e2e2;
              }
        
              .panda-right-3 {
                stroke-miterlimit: 10;
                stroke-width: .25px;
              }
        
              .panda-right-4 {
                fill: #6067b0;
                stroke: #e2e2e2;
                stroke-width: .5px;
              }
        
              .panda-right-7 {
                opacity: 0;
              }
            `}
          </style>
        </defs>
        <g id="Panda_Right_Gp">
          <g ref={innerRef} id="Panda_Right_Inner_Hand">
            <path
              class="panda-right-4"
              d="M1.99,27.35c2.52-.11,5.93-.43,8.9-1.29,.34,.13,3.98-.21,4.39-.21,1.49,0,2.69-.98,2.69-2.19,0-.17-.03-.33-.07-.49,.05-.09,.12-.18,.16-.28,.9-.36,1.52-1.1,1.52-1.96,0-.61-.31-1.16-.8-1.56v-.18c.49-.4,.8-.95,.8-1.56,0-1.04-.9-1.92-2.1-2.14,0,0,0,0,0-.01,0-1.08-1.21-1.8-2.69-1.96-1.09-.11-2.95,.51-3.83,.91-.38,.17-2.23,.86-2.63,.79-1.61-.3-3.18-.7-4.59-1.1-2.74-.79-3.73,1.29-3.73,4.15v5.51c0,2.04-.05,3.66,1.99,3.57ZM15.26,15.46c.04,.56-.51,1.06-1.24,1.11-.73,.06-1.35-.35-1.4-.91-.04-.56,.51-1.06,1.24-1.11s1.35,.35,1.4,.91Zm1.14,3.53c-.73,.06-1.35-.35-1.4-.91s.51-1.06,1.24-1.11c.73-.06,1.35,.35,1.4,.91,.04,.56-.51,1.06-1.24,1.11Zm-.12,3.21c-.73,.06-1.35-.35-1.4-.91-.04-.56,.51-1.06,1.24-1.11,.73-.06,1.35,.35,1.4,.91,.04,.56-.51,1.06-1.24,1.11Zm-6.02-2.57c0-1.35,.82-2.44,1.83-2.44s1.83,1.09,1.83,2.44-.82,2.44-1.83,2.44-1.83-1.09-1.83-2.44Zm2.14,3.89c-.04-.56,.51-1.06,1.24-1.11,.73-.06,1.35,.35,1.4,.91s-.51,1.06-1.24,1.11-1.35-.35-1.4-.91Z"
            />
            <path
              class="panda-right-3"
              d="M12.63,15.67c.04,.56,.67,.97,1.4,.91,.73-.06,1.28-.55,1.24-1.11-.04-.56-.67-.97-1.4-.91s-1.28,.55-1.24,1.11Z"
            />
            <path
              class="panda-right-3"
              d="M17.64,17.88c-.04-.56-.67-.97-1.4-.91-.73,.06-1.28,.55-1.24,1.11s.67,.97,1.4,.91c.73-.06,1.28-.55,1.24-1.11Z"
            />
            <path
              class="panda-right-3"
              d="M17.53,21.08c-.04-.56-.67-.97-1.4-.91-.73,.06-1.28,.55-1.24,1.11,.04,.56,.67,.97,1.4,.91,.73-.06,1.28-.55,1.24-1.11Z"
            />
            <path
              class="panda-right-3"
              d="M13.81,24.43c.73-.06,1.28-.55,1.24-1.11s-.67-.97-1.4-.91c-.73,.06-1.28,.55-1.24,1.11,.04,.56,.67,.97,1.4,.91Z"
            />
            <path
              class="panda-right-3"
              d="M13.92,19.63c0-1.35-.82-2.44-1.83-2.44s-1.83,1.09-1.83,2.44,.82,2.44,1.83,2.44,1.83-1.09,1.83-2.44Z"
            />
          </g>
          <g id="Panda_Right_Btn_Border">
            <path
              class="panda-right-5"
              d="M0,39.44s19.6-.47,19.6-19.44S0,.56,0,.56"
            />
            <g>
              <path class="panda-right-1" d="M0,39.44s1.19-.03,2.97-.35" />
              <path
                class="panda-right-2"
                d="M5.82,38.4c5.78-1.72,13.78-6.29,13.78-18.4C19.6,6.86,10.19,2.6,4.41,1.22"
              />
              <path class="panda-right-1" d="M2.97,.92C1.19,.59,0,.56,0,.56" />
            </g>
          </g>
          <g id="Panda_Right_Upper_Hand" ref={upperRef} class="panda-right-7">
            <path
              class="panda-right-4"
              d="M19.04,26.72c-2.33,.15-5.16,.17-7.74-.23-.32,.17-3.98,.31-4.38,.36-1.48,.19-2.8-.62-2.95-1.83-.02-.17-.01-.33,0-.5-.07-.08-.14-.17-.2-.25-.94-.24-1.65-.89-1.76-1.75-.08-.6,.15-1.19,.59-1.65l-.02-.18c-.54-.33-.92-.84-.99-1.44-.14-1.04,.64-2.02,1.81-2.39,0,0,0,0,0-.01-.14-1.07,.97-1.94,2.42-2.29,1.07-.25,2.99,.13,3.92,.41,.4,.12,2.32,.57,2.71,.44,.96-.31,1.91-.66,2.81-1.02,3.47-1.39,7.32,.83,7.8,4.54l.32,2.47c.35,2.69-1.63,5.14-4.34,5.31Z"
            />
            <path
              class="panda-right-6"
              d="M18.65,25.45s1.51,.32,2.28-.74,.71-2.25,.71-2.25c0,0-.46,1.82-1.58,2.17s-1.42,.83-1.42,.83Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
export default PandaRightSide;
