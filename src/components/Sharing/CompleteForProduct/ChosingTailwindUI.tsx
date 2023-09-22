import anime from "animejs";
import { onCleanup, onMount } from "solid-js";

function ChosingTailwindUI() {
  onMount(() => {
    anime({
      targets: ["tspan"],
      delay: function () {
        return anime.random(0, 600);
      },
      duration: function () {
        return anime.random(1500, 2500);
      },
      opacity: [0, 1],
      loop: false,
    });

    onCleanup(() => {
      anime.remove(["tspan"]);
    });
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      viewBox="0 0 680.56 298.65"
    >
      <text
        transform="translate(266.19 46.1)"
        style={{
          fill: "#6366f1",
          "font-family": "Nunito-Regular, Nunito",
          "font-size": "26px",
          "font-variation-settings": "'wght' 400",
        }}
      >
        <tspan x="0" y="0" style={{ "letter-spacing": "-.06em" }}>
          W
        </tspan>
        <tspan x="27.09" y="0">
          e{" "}
        </tspan>
        <tspan x="47.63" y="0" style={{ "letter-spacing": "0em" }}>
          c
        </tspan>
        <tspan x="59.57" y="0" style={{ "letter-spacing": "0em" }}>
          an choose
        </tspan>
        <tspan x="-37.53" y="31.2" style={{ "letter-spacing": "-.08em" }}>
          T
        </tspan>
        <tspan x="-23.85" y="31.2">
          ai
        </tspan>
        <tspan x="-4.04" y="31.2" style={{ "letter-spacing": "-.01em" }}>
          l
        </tspan>
        <tspan x="3.37" y="31.2">
          wind{" "}
        </tspan>
        <tspan x="67.9" y="31.2" style={{ "letter-spacing": "-.01em" }}>
          (
        </tspan>
        <tspan x="75.88" y="31.2">
          o
        </tspan>
        <tspan x="90.34" y="31.2" style={{ "letter-spacing": ".02em" }}>
          r
        </tspan>
        <tspan x="100.11" y="31.2" style={{ "letter-spacing": "0em" }}>
          ){" "}
        </tspan>
        <tspan x="115.06" y="31.2" style={{ "letter-spacing": "-.08em" }}>
          T
        </tspan>
        <tspan x="128.74" y="31.2" style={{ "letter-spacing": "0em" }}>
          amagui
        </tspan>
      </text>
      <g>
        <text
          transform="translate(80.26 143.13)"
          style={{
            fill: "#6366f1",
            "font-family": "Nunito-Medium, Nunito",
            "font-size": "18px",
            "font-variation-settings": "'wght' 500",
            "font-weight": "500",
          }}
        >
          <tspan x="0" y="0">
            Tamagui - Light design-system and style library for RN + WEB.
          </tspan>
        </text>
        <text
          transform="translate(80.26 182.9)"
          style={{
            fill: "#6366f1",
            "font-family": "Nunito-Medium, Nunito",
            "font-size": "18px",
            "font-variation-settings": "'wght' 500",
            "font-weight": "500",
          }}
        >
          <tspan x="0" y="0">
            Tailwind - Web a utility-frst CSS framework .
          </tspan>
        </text>
        <text
          transform="translate(80.26 222.53)"
          style={{
            fill: "#6366f1",
            "font-family": "Nunito-Medium, Nunito",
            "font-size": "18px",
            "font-variation-settings": "'wght' 500",
            "font-weight": "500",
          }}
        >
          <tspan x="0" y="0">
            Nativewind - Tailwind to create a universal style system.
          </tspan>
        </text>
        <text
          transform="translate(80.26 261.61)"
          style={{
            fill: "#6366f1",
            "font-family": "Nunito-Medium, Nunito",
            "font-size": "18px",
            "font-variation-settings": "'wght' 500",
            "font-weight": "500",
          }}
        >
          <tspan x="0" y="0">
            Storybook - UI Development environment tool as a playground.
          </tspan>
        </text>
      </g>
    </svg>
  );
}
export default ChosingTailwindUI;
