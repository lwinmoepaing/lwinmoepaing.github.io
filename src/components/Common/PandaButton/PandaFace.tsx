import anime from "animejs";
import { createEffect, createSignal, onCleanup } from "solid-js";

type Tref = HTMLDivElement | undefined;
type TsvgRef = SVGGElement | undefined;

const leftHandAnimation = (leftHandRef: TsvgRef): Promise<void> => {
  return new Promise((resolve) => {
    anime({
      targets: leftHandRef,
      duration: 800,
      opacity: [0, 1],
      changeComplete: () => resolve(),
    });
  });
};

const faceAnimation = (faceRef: TsvgRef): Promise<void> => {
  return new Promise((resolve) => {
    anime({
      targets: faceRef,
      duration: 800,
      easing: "easeOutExpo",
      translateY: [0, -24],
      scale: [0.8, 1],
      opacity: [0, 1],
      changeComplete: () => resolve(),
    });
  });
};

const rightAnimation = (rightHandRed: TsvgRef): Promise<void> => {
  return new Promise((resolve) => {
    const defaultObj = {
      targets: rightHandRed,
      duration: 400,
      easing: "easeOutBack",
    };

    const counter = 1;
    const recursive = (i: number) => {
      if (i < 8) {
        anime({
          ...defaultObj,
          rotate: i % 2 === 0 ? -10 : 10,
          changeComplete: () => {
            recursive(i + 1);
          },
        });
      } else {
        resolve();
      }
    };

    anime({
      ...defaultObj,
      translateY: [0, -11],
      scale: [0.8, 1],
      opacity: [0, 1],
      changeComplete: () => {
        recursive(counter);
      },
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hideAnimation = (props: {
  leftHandRef: TsvgRef;
  faceRef: TsvgRef;
  rightHandRef: TsvgRef;
}): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      anime({
        targets: props.leftHandRef,
        duration: 600,
        opacity: [1, 0],
      });
      anime({
        targets: props.rightHandRef,
        duration: 600,
        easing: "easeOutBack",
        translateY: [-11, 0],
        scale: [1, 0.8],
        opacity: [1, 0],
      });
      anime({
        targets: props.faceRef,
        duration: 600,
        easing: "easeOutBack",
        translateY: [-24, 0],
        scale: [1, 0.8],
        opacity: [1, 0],
        changeComplete: () => setTimeout(() => resolve(), 800),
      });
    }, 3000);
  });
};

const PandaFace = (props: { title: string; link: string }) => {
  let el: Tref, leftHandRef: TsvgRef, faceRef: TsvgRef, rightHandRef: TsvgRef;
  const [standUpAni, setStandUpAni] = createSignal(false);

  createEffect(() => {
    const onMouseEnter = async () => {
      if (standUpAni()) {
        return;
      }
      setStandUpAni(true);
      leftHandAnimation(leftHandRef);
      rightAnimation(rightHandRef);
      await faceAnimation(faceRef);
      await hideAnimation({ leftHandRef, rightHandRef, faceRef });
      setStandUpAni(false);
    };

    if (el) {
      el.addEventListener("mouseenter", onMouseEnter);
    }
    onCleanup(() => {
      if (el) {
        el.removeEventListener("mouseenter", onMouseEnter);
      }

      anime.remove([faceRef, leftHandRef, rightHandRef]);
    });
  });

  return (
    <a href={props.link}>
      <div
        ref={el}
        class="bg-white min-w-[70px] flex-1 h-full border-y-[1px] border-[#6067b0] cursor-pointer dark:text-indigo-500"
      >
        <div class="h-[48.79px] flex justify-center items-center  ">
          {props.title}
        </div>
        <div class="w-[66px] h-auto absolute top-[-30px] left-[50%] translate-x-[-50%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Panda_Top_Face_Layer"
            viewBox="0 0 54 30"
          >
            <defs>
              <style>
                {`
              .panda-face-1, .panda-face-2, .panda-face-3 {
                fill: #fff;
              }
        
              .panda-face-4, .panda-face-5 {
                fill: #6067b0;
              }
        
              .panda-face-2 {
                stroke-miterlimit: 10;
              }
        
              .panda-face-2, .panda-face-3 {
                stroke-width: .25px;
              }
        
              .panda-face-2, .panda-face-3, .panda-face-6 {
                stroke: #6067b0;
              }
        
              .panda-face-5 {
                stroke: #e2e2e2;
              }
        
              .panda-face-5, .panda-face-3, .panda-face-6 {
                stroke-linecap: round;
                stroke-linejoin: round;
              }
        
              .panda-face-5, .panda-face-6 {
                stroke-width: .5px;
              }
        
              .panda-face-6 {
                fill: none;
              }
        
              .panda-face-7 {
                opacity: 0;
              }
            `}
              </style>
            </defs>
            <g id="Panda_Face" ref={faceRef}>
              <path
                class="panda-face-5"
                d="M35.73,30.81c.16-.47,1.42-3.76,3.68-3.94s5.69,.09,7.17,3.65,.11,6.35-.67,7.08c-1.48,1.38-3.64,.7-3.64,.7l-6.54-7.5Z"
              />
              <path
                class="panda-face-5"
                d="M12.68,37.74c-2.52-.22-3.75-.41-4.46-5.28-.65-4.46,5.14-6.56,8.11-6.21s3.64,4.04,3.64,4.04l-7.29,7.45Z"
              />
              <path
                class="panda-face-3"
                d="M44.98,43.79c0,8.46-6.54,5.22-16.15,5.22s-18.68,2.6-18.68-5.22c0-10.03,7.8-16.16,17.42-16.16s17.42,6.13,17.42,16.16Z"
              />
              <path
                class="panda-face-4"
                d="M20.74,35.53c-2.57,0-5.55,1.4-6.06,4.31-.5,2.86,.97,5.15,4.09,5.09,.12,0,.24-.02,.36-.05,1.22-.24,4.26-1.21,4.49-4.15,.15-1.94-.71-5.2-2.88-5.2Zm1.6,4.07c-.12,.5-.61,.8-1.11,.91s-.7-.62-.55-1.23,.91-.79,.91-.79c.65-.09,.88,.61,.76,1.11Z"
              />
              <path
                class="panda-face-4"
                d="M34.92,35.64c2.57,0,5.55,1.39,6.06,4.28,.5,2.84-.81,4.96-3.93,4.9-.12,0-.38-.04-.5-.06-1.22-.24-4.29-1.04-4.51-3.96-.15-1.93,.71-5.17,2.88-5.17Zm-1.6,4.05c.12,.5,.61,.8,1.11,.9s.7-.62,.55-1.23-.91-.78-.91-.78c-.65-.09-.88,.61-.76,1.11Z"
              />
              <ellipse
                class="panda-face-5"
                cx="27.83"
                cy="41.1"
                rx=".99"
                ry=".59"
              />
              <path
                class="panda-face-6"
                d="M25.33,44.54s.99,.92,2.3,.91,2.18-1.06,2.18-1.06"
              />
              <ellipse
                class="panda-face-5"
                cx="19.59"
                cy="46.29"
                rx="1.37"
                ry=".78"
                transform="translate(-10.38 5.94) rotate(-13.67)"
              />
              <ellipse
                class="panda-face-5"
                cx="36.37"
                cy="46.09"
                rx=".78"
                ry="1.37"
                transform="translate(-17.01 70.54) rotate(-76.33)"
              />
            </g>
            <g id="Panda_Top_Inner_Hand" ref={rightHandRef}>
              <path
                class="panda-face-5"
                d="M52.4,34.87c-.14-.52-.32-1.16-.56-1.97,.1-.26-.16-3.06-.16-3.37,0-1.14-.76-2.07-1.69-2.07-.13,0-.26,.02-.38,.06-.07-.04-.14-.09-.21-.13-.27-.69-.84-1.17-1.51-1.17-.5,0-.96,.27-1.27,.7-.31-.43-.76-.7-1.27-.7-.8,0-1.47,.69-1.64,1.62,0,0,0,0,0,0-.83,0-1.39,.93-1.51,2.07-.09,.84,.39,2.27,.7,2.95,.13,.29,.61,1.71,.61,2.03,0,.92-2.29,2.02-2.29,2.02h9.64c1.06,0,1.82-1,1.54-2.02Zm-8.71-5.33c.43-.03,.81,.39,.86,.95,.04,.56-.27,1.04-.7,1.07-.43,.03-.81-.39-.86-.95s.27-1.04,.7-1.07Zm2.72-.88c.04,.56-.27,1.04-.7,1.07s-.81-.39-.86-.95c-.04-.56,.27-1.04,.7-1.07,.43-.03,.81,.39,.86,.95Zm2.47,.09c.04,.56-.27,1.04-.7,1.07-.43,.03-.81-.39-.86-.95-.04-.56,.27-1.04,.7-1.07,.43-.03,.81,.39,.86,.95Zm-1.98,4.63c-1.04,0-1.88-.63-1.88-1.41s.84-1.41,1.88-1.41,1.88,.63,1.88,1.41-.84,1.41-1.88,1.41Zm2.99-1.65c-.43,.03-.81-.39-.86-.95-.04-.56,.27-1.04,.7-1.07s.81,.39,.86,.95-.27,1.04-.7,1.07Z"
              />
              <path
                class="panda-face-2"
                d="M43.84,31.57c.43-.03,.74-.51,.7-1.07-.04-.56-.43-.99-.86-.95-.43,.03-.74,.51-.7,1.07s.43,.99,.86,.95Z"
              />
              <path
                class="panda-face-2"
                d="M45.55,27.71c-.43,.03-.74,.51-.7,1.07,.04,.56,.43,.99,.86,.95s.74-.51,.7-1.07c-.04-.56-.43-.99-.86-.95Z"
              />
              <path
                class="panda-face-2"
                d="M48.01,27.8c-.43,.03-.74,.51-.7,1.07,.04,.56,.43,.99,.86,.95,.43-.03,.74-.51,.7-1.07-.04-.56-.43-.99-.86-.95Z"
              />
              <path
                class="panda-face-2"
                d="M50.58,30.66c-.04-.56-.43-.99-.86-.95s-.74,.51-.7,1.07c.04,.56,.43,.99,.86,.95,.43-.03,.74-.51,.7-1.07Z"
              />
              <path
                class="panda-face-2"
                d="M46.89,30.57c-1.04,0-1.88,.63-1.88,1.41s.84,1.41,1.88,1.41,1.88-.63,1.88-1.41-.84-1.41-1.88-1.41Z"
              />
            </g>
            <rect
              id="Panda_Top_Cover_Square"
              class="panda-face-1"
              x="-.07"
              y="25.99"
              width="54.14"
              height="5"
            />
            <g id="Panda_Top_Left_Hand" ref={leftHandRef} class="panda-face-7">
              <path
                class="panda-face-5"
                d="M13.21,26.02s0,0,0,.01c.09,1.29-.69,2.4-1.74,2.48-.15,.01-.29,0-.43-.03-.08,.05-.15,.11-.23,.16-.25,.8-.86,1.39-1.61,1.45-.57,.04-1.11-.23-1.49-.69-.31,.51-.8,.86-1.37,.9-.91,.07-1.72-.66-1.99-1.7,0,0,0,0-.01,0-.94,.07-1.64-.94-1.87-2.22-.17-.94,.02-.92,.16-1.75,.21-1.2,1.39-1.78,2.62-2.05,1.58-.35,3.7-.51,4.93,.03,0,0,3.18,0,3.03,3.42Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </a>
  );
};
export default PandaFace;
