import { settingStore, toggleDarkmode } from "~/store/settingStore";
import { useStore } from "@nanostores/solid";
const SittingAnimation = () => {
  const setting = useStore(settingStore);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 343.26 300">
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="106.82"
          y1="116.42"
          x2="236.39"
          y2="116.42"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#5453a3" />
          <stop offset="1" stop-color="#89a7d7" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="217.23"
          y1="76.02"
          x2="226.62"
          y2="76.02"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-3"
          x1="99.59"
          y1="116.05"
          x2="105.03"
          y2="116.05"
          gradientTransform="translate(57.81 -32.27) rotate(22.83)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-4"
          x1="216.61"
          y1="168.55"
          x2="220.28"
          y2="154.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#5453a3" />
          <stop offset="1" stop-color="#f0536f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-5"
          x1="75.13"
          y1="130.13"
          x2="240.12"
          y2="130.13"
          gradientTransform="translate(4.95 -3.41) rotate(-4.06)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-6"
          x1="55.86"
          y1="158.27"
          x2="171.63"
          y2="158.27"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-7"
          x1="56.08"
          y1="211.44"
          x2="87.59"
          y2="211.44"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-8"
          x1="57.4"
          y1="213.61"
          x2="85.27"
          y2="213.61"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-9"
          x1="56.08"
          y1="215.15"
          x2="87.61"
          y2="215.15"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-10"
          x1="86.56"
          y1="214.54"
          x2="171.73"
          y2="214.54"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-11"
          x1="171.63"
          y1="158.27"
          x2="287.4"
          y2="158.27"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-12"
          x1="255.67"
          y1="211.44"
          x2="287.18"
          y2="211.44"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-13"
          x1="257.99"
          y1="213.61"
          x2="285.86"
          y2="213.61"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-14"
          x1="255.65"
          y1="215.15"
          x2="287.18"
          y2="215.15"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-15"
          x1="171.42"
          y1="214.54"
          x2="256.69"
          y2="214.54"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-16"
          x1="144.51"
          y1="107.26"
          x2="161.18"
          y2="107.26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#5453a3" />
          <stop offset="1" stop-color="#f0536f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-17"
          x1="157.17"
          y1="122.98"
          x2="168.14"
          y2="122.98"
          gradientTransform="translate(325.31 245.96) rotate(-180)"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-18"
          x1="158.42"
          y1="114.92"
          x2="117.45"
          y2="114.92"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-19"
          x1="498.24"
          y1="207.31"
          x2="500.52"
          y2="207.31"
          gradientTransform="translate(678.58 302) rotate(-180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#101130" />
          <stop offset="1" stop-color="#444" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-20"
          x1="495.15"
          y1="200.48"
          x2="499.32"
          y2="200.48"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-21"
          x1="495.48"
          y1="202.83"
          x2="501.48"
          y2="202.83"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-22"
          x1="495.25"
          y1="206.38"
          x2="498.24"
          y2="206.38"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-23"
          x1="495.82"
          y1="201.94"
          x2="500.61"
          y2="201.94"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-24"
          x1="502.29"
          y1="208.65"
          x2="505.52"
          y2="208.65"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-25"
          x1="491.23"
          y1="205.69"
          x2="493.66"
          y2="205.69"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-26"
          x1="495.82"
          y1="215.93"
          x2="499.32"
          y2="215.93"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-27"
          x1="522.23"
          y1="200.84"
          x2="524.39"
          y2="200.84"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-28"
          x1="643.02"
          y1="178.94"
          x2="643.87"
          y2="178.94"
          gradientTransform="translate(829.33 285.36) rotate(-180)"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-29"
          x1="496.41"
          y1="195.47"
          x2="497.38"
          y2="195.47"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-30"
          x1="491.77"
          y1="200.84"
          x2="495.82"
          y2="200.84"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-31"
          x1="493.93"
          y1="212.18"
          x2="495.25"
          y2="212.18"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-32"
          x1="493.66"
          y1="203.26"
          x2="495.82"
          y2="203.26"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-33"
          x1="493.66"
          y1="204.75"
          x2="495.82"
          y2="204.75"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-34"
          x1="495.82"
          y1="209.73"
          x2="499.59"
          y2="209.73"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-35"
          x1="495.82"
          y1="214.45"
          x2="499.59"
          y2="214.45"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-36"
          x1="495.82"
          y1="182.86"
          x2="497.38"
          y2="182.86"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-37"
          x1="493.12"
          y1="197.87"
          x2="495.82"
          y2="197.87"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-38"
          x1="492.31"
          y1="195.58"
          x2="494.2"
          y2="195.58"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-39"
          x1="495.18"
          y1="190.62"
          x2="496.41"
          y2="190.62"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-40"
          x1="499.32"
          y1="215.39"
          x2="502.55"
          y2="215.39"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-41"
          x1="493.98"
          y1="189.26"
          x2="496.41"
          y2="189.26"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-42"
          x1="492.04"
          y1="192.17"
          x2="496.41"
          y2="192.17"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-43"
          x1="521.42"
          y1="203.26"
          x2="524.66"
          y2="203.26"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-44"
          x1="516.3"
          y1="213.37"
          x2="520.07"
          y2="213.37"
          href="#linear-gradient-19"
        />
        <linearGradient
          id="linear-gradient-45"
          x1="159.07"
          y1="237.01"
          x2="189.37"
          y2="121.84"
          href="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-46"
          x1="142.91"
          y1="160.05"
          x2="205.66"
          y2="109.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#5453a3" />
          <stop offset="0" stop-color="#5953a1" />
          <stop offset="1" stop-color="#f0536f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-47"
          x1="158.79"
          y1="179.93"
          x2="221.55"
          y2="129.78"
          href="#linear-gradient-46"
        />
        <linearGradient
          id="linear-gradient-48"
          x1="149.55"
          y1="168.36"
          x2="212.3"
          y2="118.21"
          href="#linear-gradient-46"
        />
        <linearGradient
          id="linear-gradient-49"
          x1="176.93"
          y1="202.62"
          x2="239.68"
          y2="152.48"
          href="#linear-gradient-46"
        />
        <linearGradient
          id="linear-gradient-50"
          x1="123.07"
          y1="213.43"
          x2="141.16"
          y2="213.43"
          href="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-51"
          x1="201.66"
          y1="213.43"
          x2="219.76"
          y2="213.43"
          href="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-52"
          x1="168.32"
          y1="300.06"
          x2="184.21"
          y2="239.69"
          href="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-53"
          x1="164.96"
          y1="236.37"
          x2="178.93"
          y2="236.37"
          href="#linear-gradient-4"
        />
        <clipPath id="clippath">
          <path
            id="Pathing"
            d="M194.48,139.64c1.28,2.16,2.44,3.92,3.35,4.95,2.76,3.11,7.95,10.02,3.45,24.7-4.49,14.68-5.87,19.35-4.15,24.87,1.73,5.53,5.53,8.64,3.45,12.44-2.07,3.8-2.5,4.15-2.5,4.15,0,0,5.01,.52,6.65,2.68s-1.73,10.02-3.02,14.16c-1.3,4.15-2.42,5.96-8.64,6.13s-21.85,0-21.85,0c0,0-15.63,.17-21.85,0-6.22-.17-7.34-1.99-8.64-6.13-1.3-4.15-4.66-12-3.02-14.16s6.65-2.68,6.65-2.68c0,0-.43-.35-2.5-4.15-2.07-3.8,1.73-6.91,3.45-12.44,1.73-5.53,.35-10.19-4.15-24.87-4.49-14.68,.69-21.59,3.45-24.7,.91-1.03,2.07-2.79,3.35-4.95H80.72v160.65h178.82V139.64h-65.06Z"
            style={{ fill: "none" }}
          />
        </clipPath>
        <mask
          id="mask"
          x="44.31"
          y="42.96"
          width="223.48"
          height="339.04"
          maskUnits="userSpaceOnUse"
        />
        <radialGradient
          id="radial-gradient"
          cx="-373.42"
          cy="624.25"
          fx="-373.42"
          fy="624.25"
          r="115.02"
          gradientTransform="translate(533.23 842.07) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".41" stop-color="#73cddd" />
          <stop offset="1" stop-color="#7a88c4" />
        </radialGradient>
        <linearGradient
          id="linear-gradient-54"
          x1="236.03"
          y1="160.49"
          x2="59.22"
          y2="74.71"
          gradientTransform="translate(-2.25 338.68) scale(1 -1)"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-55"
          x1="245.84"
          y1="140.28"
          x2="69.02"
          y2="54.5"
          gradientTransform="translate(-2.25 338.68) scale(1 -1)"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-56"
          x1="254.72"
          y1="121.98"
          x2="77.9"
          y2="36.2"
          gradientTransform="translate(-2.25 338.68) scale(1 -1)"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-57"
          x1="246.56"
          y1="138.79"
          x2="69.75"
          y2="53.01"
          gradientTransform="translate(-2.25 338.68) scale(1 -1)"
          href="#linear-gradient-16"
        />
        <radialGradient
          id="radial-gradient-2"
          cx="-460.02"
          cy="711.48"
          fx="-460.02"
          fy="711.48"
          r="74.56"
          gradientTransform="translate(636.85 946.45) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#6f469c" />
          <stop offset="1" stop-color="#ed2224" />
        </radialGradient>
        <radialGradient
          id="radial-gradient-3"
          cx="-1087.29"
          cy="4073.29"
          fx="-1087.29"
          fy="4073.29"
          r="74.56"
          gradientTransform="translate(701.63 956.85) rotate(-8.69) scale(.36 -.18)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#f27792" />
          <stop offset="1" stop-color="#ed2224" />
        </radialGradient>
        <clipPath id="clippath-1">
          <ellipse
            cx="104.01"
            cy="152.23"
            rx="7.96"
            ry="3.66"
            style={{ fill: "#171311" }}
          />
        </clipPath>
        <radialGradient
          id="radial-gradient-4"
          cx="101.69"
          cy="146.11"
          fx="101.69"
          fy="146.11"
          r="14.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#cdd19c" />
          <stop offset=".13" stop-color="#c6ca98" stop-opacity=".84" />
          <stop offset=".35" stop-color="#bcc093" stop-opacity=".58" />
          <stop offset=".45" stop-color="#b9bd92" stop-opacity=".48" />
          <stop offset=".51" stop-color="#9fa895" stop-opacity=".38" />
          <stop offset=".64" stop-color="#73839c" stop-opacity=".22" />
          <stop offset=".77" stop-color="#5269a1" stop-opacity=".1" />
          <stop offset=".89" stop-color="#3f59a4" stop-opacity=".02" />
          <stop offset="1" stop-color="#3954a5" stop-opacity="0" />
        </radialGradient>
        <clipPath id="clippath-2">
          <path
            d="M104.15,135.49c-.38,0-.7,.3-.7,.69v16.01s0,.45,.7,.37l.7-.08v-16.29c0-.38-.3-.69-.68-.69,0,0-.01,0-.02,0Z"
            style={{ fill: "#0f0b0b" }}
          />
        </clipPath>
        <radialGradient
          id="radial-gradient-5"
          cx="105.19"
          cy="120"
          fx="105.19"
          fy="120"
          r="23.56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#d8d992" />
          <stop offset=".14" stop-color="#cdd19c" />
          <stop offset=".24" stop-color="#c6ca98" stop-opacity=".84" />
          <stop offset=".4" stop-color="#bcc093" stop-opacity=".58" />
          <stop offset=".48" stop-color="#b9bd92" stop-opacity=".48" />
          <stop offset=".54" stop-color="#c6caa7" stop-opacity=".38" />
          <stop offset=".66" stop-color="#dfe1cd" stop-opacity=".22" />
          <stop offset=".78" stop-color="#f0f1e8" stop-opacity=".1" />
          <stop offset=".9" stop-color="#fbfbf9" stop-opacity=".02" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <linearGradient
          id="linear-gradient-58"
          x1="74.66"
          y1="98.79"
          x2="117.05"
          y2="132.03"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#f4ee6e" />
          <stop offset=".24" stop-color="#f0eb71" />
          <stop offset=".42" stop-color="#e7e57a" />
          <stop offset=".59" stop-color="#d6da8a" />
          <stop offset=".75" stop-color="#bfcaa1" />
          <stop offset=".9" stop-color="#a1b7bf" />
          <stop offset="1" stop-color="#89a7d7" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-59"
          x1="229.49"
          y1="-58.4"
          x2="236.63"
          y2="-58.4"
          gradientTransform="translate(134.28 372.4) rotate(-90)"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-60"
          x1="59.98"
          y1="130.09"
          x2="65.51"
          y2="130.09"
          gradientTransform="translate(-18.67 11.99) rotate(-9.62)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-61"
          x1="63.64"
          y1="280.29"
          x2="72.66"
          y2="280.29"
          gradientTransform="translate(-211.41 244.28) rotate(-70.86)"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-62"
          x1="64.41"
          y1="237.48"
          x2="66.94"
          y2="237.48"
          gradientTransform="translate(250.94 424.69) rotate(146.15)"
          href="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-63"
          x1="265.07"
          y1="49.13"
          x2="275.07"
          y2="46.36"
          href="#linear-gradient"
        />
        <radialGradient
          id="radial-gradient-6"
          cx="270.07"
          cy="47.75"
          fx="270.07"
          fy="47.75"
          r="3.28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#7180bf" />
          <stop offset=".1" stop-color="#6a7abc" stop-opacity=".92" />
          <stop offset=".29" stop-color="#5a6db4" stop-opacity=".71" />
          <stop offset=".55" stop-color="#3f58a7" stop-opacity=".38" />
          <stop offset=".81" stop-color="#21409a" stop-opacity="0" />
        </radialGradient>
        <linearGradient
          id="linear-gradient-64"
          x1="268.6"
          y1="47.75"
          x2="271.54"
          y2="47.75"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-65"
          x1="225.22"
          y1="151.31"
          x2="255.47"
          y2="150.19"
          gradientTransform="translate(-33.05 69.3) rotate(-15.48)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#d4d4d4" />
          <stop offset="1" stop-color="#fff" />
        </linearGradient>
        <clipPath id="clippath-3">
          <polygon
            points="216.68 157 232.45 143.14 248.67 146.49 232.69 161.68 216.68 157"
            style={{ fill: "url(#linear-gradient-65)" }}
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-66"
          x1="215.9"
          y1="153.03"
          x2="250.96"
          y2="153.03"
          gradientTransform="translate(-33.05 69.3) rotate(-15.48)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-67"
          x1="245.76"
          y1="136.88"
          x2="266.3"
          y2="144.42"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-68"
          x1="242.23"
          y1="142.96"
          x2="245.4"
          y2="144.12"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-69"
          x1="268.36"
          y1="140.19"
          x2="276.39"
          y2="138.42"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-70"
          x1="268.64"
          y1="141.44"
          x2="276.67"
          y2="139.67"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-71"
          x1="268.84"
          y1="142.35"
          x2="276.87"
          y2="140.57"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-72"
          x1="269.01"
          y1="143.14"
          x2="277.04"
          y2="141.36"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-73"
          x1="270.39"
          y1="145.09"
          x2="278.42"
          y2="143.32"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-74"
          x1="270.48"
          y1="145.5"
          x2="278.51"
          y2="143.72"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-75"
          x1="270.87"
          y1="147.24"
          x2="278.9"
          y2="145.46"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-76"
          x1="271.08"
          y1="148.21"
          x2="279.11"
          y2="146.44"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-77"
          x1="271.17"
          y1="148.63"
          x2="279.21"
          y2="146.86"
          gradientTransform="translate(28.32 -46.07) rotate(9.85)"
          href="#linear-gradient"
        />
        <clipPath id="clippath-4">
          <rect
            x="164.34"
            y="223.98"
            width="14.16"
            height="5.82"
            rx="2.75"
            ry="2.75"
            style={{ fill: "none" }}
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-78"
          x1="-385.22"
          y1="515.19"
          x2="-385"
          y2="509.96"
          gradientTransform="translate(-213.47 -279.65) rotate(-180) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#010101" stop-opacity=".5" />
          <stop offset="1" stop-color="#010101" stop-opacity=".8" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-79"
          x1="171.05"
          y1="83.77"
          x2="171.27"
          y2="78.54"
          gradientTransform="translate(0 302) scale(1 -1)"
          href="#linear-gradient-78"
        />
        <clipPath id="clippath-5">
          <circle cx="167.6" cy="226.89" r="2.26" style={{ fill: "none" }} />
        </clipPath>
        <clipPath id="clippath-6">
          <circle cx="172.21" cy="226.89" r="2.26" style={{ fill: "none" }} />
        </clipPath>
      </defs>
      <g id="Cycle">
        <circle
          id="Inner_Cycle"
          data-name="Inner Cycle"
          cx="171.6"
          cy="116.42"
          r="64.54"
          style={{
            fill: "none",
            stroke: "url(#linear-gradient)",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "0.5px",
          }}
          class="opacity-0 animate-[opacity0to1_1s_100ms_ease-in-out_forwards]"
        />
        <g
          id="Inner_Icons"
          data-name="Inner Icons"
          class="opacity-0 animate-[opacity0to1_1s_100ms_ease-in-out_forwards]"
        >
          <circle
            cx="221.93"
            cy="76.02"
            r="4.69"
            style={{ fill: "url(#linear-gradient-2)" }}
          />
          <circle
            cx="107.07"
            cy="114.39"
            r="2.72"
            style={{ fill: "url(#linear-gradient-3)" }}
          />
          <circle
            cx="218.69"
            cy="160.63"
            r="3.78"
            style={{ fill: "url(#linear-gradient-4)" }}
          />
        </g>
        <g>
          <circle
            id="Outter_Cycles"
            data-name="Outter Cycles"
            cx="171.4"
            cy="115.24"
            r="82"
            style={{
              fill: "none",
              stroke: "url(#linear-gradient-5)",
              "stroke-dasharray": "0 0 5 6",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            }}
            class="opacity-0 animate-[opacity0to1_1s_400ms_ease-in-out_forwards]"
          />
          <g
            id="Icon_Path"
            data-name="Icon Path"
            class="opacity-0 animate-[opacity0to1_1s_400ms_ease-in-out_forwards]"
          >
            <g id="Html">
              <path
                d="M176.22,36.96c-.18-.07-.35-.13-.53-.2-.84-.3-1.68-.6-2.52-.91-.14-.05-.29-.1-.43-.15-.03,0-.04-.02-.04-.05,0-.49-.01-.98-.02-1.48,0-.45-.01-.9-.02-1.36,0-.49-.02-.98-.02-1.47,0-.49-.01-.98-.02-1.47,0-.49-.01-.98-.02-1.47,0-.45-.01-.9-.02-1.36,0-.13,0-.27,0-.4,0-.05,0-.06,.06-.06,.94,.07,1.88,.14,2.83,.21,1.97,.15,3.93,.3,5.9,.44,.07,0,.07,0,.06,.07-.05,.29-.1,.58-.15,.87-.05,.29-.1,.59-.15,.88-.05,.29-.09,.57-.14,.86-.05,.29-.1,.59-.15,.88-.05,.28-.09,.57-.14,.85-.05,.29-.1,.59-.15,.88-.05,.29-.09,.58-.14,.86-.05,.29-.1,.58-.15,.87-.05,.29-.09,.58-.14,.86-.05,.29-.1,.58-.14,.87,0,.05-.02,.1-.02,.15,0,.04-.02,.05-.05,.05-.32,.06-.64,.13-.97,.19-.88,.17-1.77,.35-2.65,.52,0,0-.02,0-.02,0h-.03Z"
                style={{ fill: "#e34e26" }}
              />
              <path
                d="M176.86,28.77c.03-.35,.05-.69,.08-1.04,0-.05,.01-.06,.06-.06,1.17,.09,2.33,.18,3.5,.26,.05,0,.06,.02,.05,.06-.02,.1-.04,.2-.05,.31-.01,.09-.03,.18-.04,.27-.03,.14-.05,.29-.07,.43-.02,.09-.03,.18-.04,.28-.02,.14-.05,.28-.07,.41-.02,.09-.03,.18-.04,.27-.02,.14-.05,.28-.07,.42-.02,.09-.03,.18-.04,.28-.02,.14-.05,.28-.07,.41-.02,.09-.03,.18-.04,.27-.02,.14-.05,.28-.07,.42-.02,.09-.03,.19-.04,.28-.02,.14-.05,.27-.07,.41-.02,.09-.03,.18-.04,.27-.02,.14-.05,.28-.07,.42-.02,.09-.03,.19-.04,.28-.02,.14-.05,.27-.07,.41-.02,.09-.03,.18-.04,.28-.02,.14-.05,.28-.07,.42-.02,.09-.03,.19-.04,.28-.02,.14-.05,.27-.07,.41-.02,.1-.03,.19-.04,.29,0,.05-.02,.08-.08,.09-.35,.07-.71,.14-1.06,.21-.3,.06-.6,.12-.91,.18-.31,.06-.62,.12-.93,.19-.03,0-.03-.01-.03-.03,0-.09,.01-.18,.02-.27,.02-.26,.04-.51,.06-.77,0-.02,0-.05,0-.07,0-.01,.02-.02,.03-.02,.27-.06,.55-.11,.82-.16,.46-.09,.92-.18,1.39-.28,.07-.01,.07-.01,.08-.08,.06-.33,.11-.65,.16-.98,.05-.29,.1-.58,.14-.86,.05-.32,.11-.65,.16-.97,.02-.13,.04-.26,.06-.39,.01-.07,0-.07-.06-.08-.44-.03-.87-.07-1.31-.1-.39-.03-.78-.06-1.18-.09-.22-.01-.45-.03-.67-.05-.24-.02-.47-.03-.71-.05-.03,0-.06,0-.07-.03,.03-.02,.06-.01,.09,0,.41,.03,.82,.06,1.24,.09,.01,0,.02,0,.03,0q.08,0,.09-.08c.02-.31,.05-.62,.07-.94,0-.03,0-.06,.02-.08,.03-.02,.07-.01,.1,0,.81,.06,1.63,.12,2.44,.18,.02,0,.05,0,.07,0,.03,0,.05-.01,.05-.04,.04-.22,.08-.45,.11-.67,.02-.1,.03-.2,.05-.29,0-.05,0-.06-.05-.07-.02,0-.04,0-.06,0-.85-.06-1.69-.13-2.54-.19-.03,0-.07,0-.1-.03Z"
                style={{ fill: "#f0672a" }}
              />
              <path
                d="M175.23,30.9s.04,0,.06,.01c.47,.04,.93,.07,1.4,.11,.02,.02,.01,.05,.01,.07-.02,.32-.05,.65-.07,.97,0,.02,0,.04-.01,.06,0,0,0,0,0,0-.02,0-.04,0-.07,0-.78-.06-1.57-.12-2.35-.18-.05,0-.06-.02-.06-.07,0-.33,0-.66-.01-.99,0-.41-.01-.81-.02-1.22,0-.35,0-.71-.02-1.06,0-.05,.02-.05,.06-.04,.89,.07,1.77,.13,2.66,.2,.02,0,.05,0,.07,0,.02,0,.04,0,.07,0,.88,.07,1.76,.13,2.64,.2,.05,0,.06,.02,.05,.07-.06,.33-.11,.66-.17,1,0,.05-.04,.04-.07,.04-.68-.05-1.35-.1-2.03-.15-.19-.01-.39-.03-.58-.04-.03,.02-.06,.01-.09,0-.45-.03-.91-.07-1.36-.1-.1,0-.09,0-.09,.09,0,.25,0,.51,.01,.76,0,.06,0,.11,0,.17,0,.03,0,.06-.01,.09Z"
                style={{ fill: "#ededee" }}
              />
              <path
                d="M176.4,35.04s-.01,0-.02,0c-.3-.11-.6-.22-.9-.33-.42-.15-.84-.3-1.26-.46-.04-.01-.05-.03-.05-.07,0-.34,0-.68-.01-1.02,0-.21,0-.41,0-.62,0-.04,0-.06,.06-.06,.33,.03,.67,.05,1,.08,.04,0,.05,.02,.05,.06,0,.27,0,.53,0,.8,0,.02,0,.04,.03,.05,.39,.14,.78,.27,1.17,.41,0,0,.01,0,.02,0,0,0,0,0,0,0,0,.02,0,.05,0,.07-.03,.34-.05,.68-.08,1.02,0,.02,0,.03,0,.05Z"
                style={{ fill: "#eaeaea" }}
              />
              <path
                d="M176.48,33.89c.04-.59,.09-1.18,.13-1.77h0s.05-.01,.07-.01c.41,.03,.81,.06,1.22,.09,.08,0,.08,.01,.07,.09-.04,.26-.09,.53-.13,.79-.03,.17-.06,.34-.08,.51,0,.06-.02,.07-.08,.08-.38,.07-.76,.14-1.14,.22-.02,0-.05,.01-.07,0h0Z"
                style={{ fill: "#f0672a" }}
              />
              <path
                d="M176.48,33.9c.4-.08,.79-.15,1.19-.22,.06-.01,.07-.03,.08-.09,.05-.29,.09-.58,.14-.87,.03-.15,.05-.31,.08-.46,0-.02,0-.03-.02-.03-.01,0-.02,0-.04,0-.41-.03-.83-.06-1.24-.09-.02,0-.04,0-.06,0,.03-.37,.06-.73,.08-1.1,.02,0,.04,0,.06,0,.82,.06,1.63,.12,2.45,.18,.05,0,.07,0,.06,.07-.09,.52-.17,1.04-.26,1.56-.08,.5-.17,1-.25,1.5-.01,.07-.03,.14-.03,.21,0,.04-.02,.05-.06,.06-.57,.11-1.13,.22-1.7,.34-.18,.04-.37,.07-.55,.11-.02-.02,0-.04,0-.06,.03-.36,.05-.72,.08-1.09Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M175.23,30.9c0-.08,0-.16,0-.24,0-.27,0-.54-.01-.81,0-.01,0-.03,0-.04,0-.04,.01-.05,.05-.04,.31,.02,.62,.05,.94,.07,.19,.01,.39,.03,.58,.05-.03,.35-.05,.71-.08,1.06,0,.05-.02,.06-.07,.06-.44-.04-.89-.07-1.33-.1-.02,0-.05,0-.07,0Z"
                style={{ fill: "#e34f26" }}
              />
            </g>
            <g id="Css">
              <path
                d="M249.51,106.09l8.8-1.35,.6,8.65-8.89-.14-1.27-3.45,.76-3.71Z"
                style={{ fill: "#1e74bb" }}
              />
              <path
                d="M249.6,109.74l8.17-.58,.24,3.56-7.36-.12-1.06-2.87Z"
                style={{ fill: "#1e88c7" }}
              />
              <path
                d="M256.92,111.91l-.39-5.48-1.06,.22,.18,2.6-1.28-2.48-1.02,.22,.27,3.77-1.45-.03-.34-1.26,.21-1.18,.81-.15-.08-1.06-1.69,.26-.47,2.32,.85,2.14,3.35,.04-.16-2.31,1.22,2.44,1.04-.07Z"
                style={{ fill: "#fff" }}
              />
            </g>
            <g id="Javascript">
              <path
                d="M221.06,187.06c.14,.44-.05,.47-.19,.56-.79,.51-1.58,1.02-2.37,1.53-.86,.55-1.72,1.11-2.57,1.66-.04,.03-.08,.05-.13,.07-.5,.28-.97,.61-1.45,.92-.56,.36-1.13,.73-1.69,1.09-.08,.05-.15,.12-.25,.11l-.1-.08c-.16-.42-.4-.79-.63-1.17-.58-.95-1.08-1.96-1.61-2.94-.41-.77-.82-1.54-1.23-2.31-.45-.84-.89-1.69-1.34-2.53-.09-.16-.07-.32,.05-.45,.74-.87,1.48-1.74,2.25-2.59,.36-.4,.8-.69,1.34-.82,.11-.03,.21-.08,.32-.12,.98-.32,1.96-.62,2.94-.92,.22-.07,.38,0,.51,.17,.77,1.04,1.57,2.06,2.36,3.08,.77,1.01,1.55,2.01,2.32,3.02,.39,.52,.75,1.06,1.13,1.59,.06,.08,.07,.2,.33,.1Z"
                style={{ fill: "#e7c92f" }}
              />
              <path
                d="M215.8,190.86s.06-.03,.09-.04c.04,0,.04,0,.02,.03-1.1,.71-2.2,1.42-3.3,2.13-.05,.03-.1,.13-.19,.07,.02-.06,.08-.08,.13-.11,1.04-.67,2.08-1.34,3.12-2.01,.04-.03,.08-.06,.13-.06Z"
                style={{ fill: "#faf4dd" }}
              />
              <path
                d="M215.8,190.86c-1.12,.73-2.25,1.46-3.37,2.19l-.03-.04c1.04-.67,2.08-1.34,3.12-2.01,.09-.06,.17-.13,.28-.13Z"
                style={{ fill: "#e6c61f" }}
              />
              <path
                d="M218.49,189.14c.86-.56,1.73-1.12,2.59-1.69,.04,.12-.08,.1-.12,.13-.81,.53-1.63,1.06-2.45,1.59-.04,0-.04,0-.02-.03Z"
                style={{ fill: "#f4e5ad" }}
              />
              <path
                d="M218.49,189.14s.02,.02,.02,.03l-2.6,1.68s-.02-.02-.02-.03c.86-.56,1.73-1.12,2.59-1.68Z"
                style={{ fill: "#f5ecc6" }}
              />
              <path
                d="M213.55,185.38c.82,1.26,1.63,2.52,2.45,3.78q.19,.29-.09,.47c-1,.65-2,1.3-3.01,1.94-.25,.16-.3,.14-.44-.13-.42-.81-.85-1.61-1.27-2.42-.39-.74-.77-1.49-1.16-2.23-.31-.58-.63-1.16-.94-1.74-.16-.29-.3-.59-.46-.89-.06-.12-.02-.2,.05-.29,.7-.8,1.39-1.6,2.08-2.41,.14-.17,.21-.1,.3,.05,.83,1.28,1.66,2.56,2.48,3.85Z"
                style={{ fill: "#fddd22" }}
              />
              <path
                d="M213.77,184.89c-.67-1.03-1.34-2.07-2.01-3.1-.16-.24-.16-.25,.11-.33,.83-.28,1.67-.55,2.5-.84,.26-.09,.34,0,.57,.8,.67,.62,.77,.76,.5,.86-.14,.05-.27,.11-.41,.17q-.37,.16-.59-.19t-.66-.21-.17,.53c1.04,1.6,2.07,3.21,3.11,4.81,.13,.19,.13,.3-.09,.41-.14,.07-.26,.17-.39,.25-.34,.22-.28,.25-.51-.1-.66-1.02-1.32-2.04-1.98-3.06Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M212.64,190.38c-.16-.4-.38-.77-.48-1.19,.36-.3,.77-.52,1.16-.77,.17-.11,.19-.19,.08-.36-.29-.42-.56-.84-.82-1.27-.08-.13-.14-.14-.27-.06-.35,.24-.71,.47-1.07,.69-.06,.04-.11,.12-.21,.09-.11-.19-.22-.39-.33-.58-.12-.14-.23-.28-.28-.46-.18-.44-.47-.82-.69-1.24-.2-.37-.42-.74-.64-1.1-.08-.13-.06-.21,.04-.31,.55-.56,1.1-1.13,1.65-1.7,.11-.11,.17-.11,.26,.03,.16,.26,.32,.51,.49,.76,.08,.12,.06,.19-.02,.3-.32,.39-.62,.79-.94,1.18-.1,.12-.12,.22-.03,.37,.23,.38,.44,.76,.65,1.15,.07,.12,.1,.13,.21,.03,.4-.36,.81-.7,1.22-1.06,.09-.08,.14-.08,.21,.02,.81,1.27,1.63,2.54,2.44,3.81-.01,.04-.05,.06-.08,.09-.8,.51-1.59,1.03-2.39,1.54-.04,.02-.07,.07-.13,.04Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M211.02,187.52c.43-.27,.86-.53,1.28-.81,.13-.09,.2-.07,.28,.06,.29,.46,.59,.92,.89,1.38,.08,.11,.07,.17-.05,.25-.42,.26-.84,.53-1.26,.8,.12-.2,.35-.27,.52-.39,.19-.14,.39-.27,.6-.39,.16-.09,.19-.19,.08-.35-.27-.39-.52-.79-.77-1.19-.09-.15-.18-.18-.33-.07-.32,.22-.64,.42-.97,.63-.08,.05-.16,.13-.27,.09Z"
                style={{ fill: "#fddb00" }}
              />
              <path
                d="M212.64,190.38c.87-.56,1.73-1.11,2.6-1.67-.02,.09-.1,.13-.16,.17-.73,.47-1.46,.94-2.19,1.42-.07,.05-.14,.11-.24,.08Z"
                style={{ fill: "#fddb00" }}
              />
              <path
                d="M210.4,186.48c.09,.15,.19,.3,.28,.46-.15-.12-.26-.26-.28-.46Z"
                style={{ fill: "#fddb00" }}
              />
            </g>
            <g id="React">
              <path
                d="M114.33,167.58l.22-.02c.48-.03,.91,.06,1.25,.42,.37,.38,.6,.84,.66,1.37,.05,.45,.12,.89,.06,1.34-.03,.21,.06,.32,.27,.38,.51,.16,1.01,.35,1.45,.67,.46,.34,.84,.74,.9,1.35l.02,.22c0,.91-.58,1.43-1.24,1.9-.22,.16-.46,.3-.71,.39-.25,.09-.29,.24-.23,.48,.14,.56,.19,1.12,.13,1.7-.06,.58-.27,1.09-.75,1.45-.18,.13-.37,.21-.6,.21-.16,.01-.33,.03-.49,.04-.63,.08-1.17-.19-1.7-.48-.2-.11-.37-.33-.58-.31-.2,.01-.33,.25-.5,.39-.51,.42-1.07,.74-1.75,.82l-.39,.03c-1-.1-1.51-.58-1.74-1.59-.11-.48-.15-.96-.1-1.45,.02-.23-.05-.33-.27-.4-.72-.23-1.39-.55-1.92-1.12-.26-.27-.37-.59-.45-.94l-.03-.34c.04-.86,.61-1.37,1.24-1.83,.26-.19,.53-.35,.82-.49,.16-.07,.19-.17,.15-.33-.13-.56-.22-1.12-.15-1.7,.07-.61,.27-1.15,.8-1.51,.38-.26,.82-.24,1.24-.25,.69-.02,1.25,.33,1.82,.67,.36,.22,.28,.29,.67-.07,.54-.5,1.14-.91,1.89-1.02Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M109.23,177.47c-.06-.44-.03-.84,.03-1.24,.02-.17-.02-.21-.18-.25-.7-.17-1.36-.4-1.92-.88-.61-.53-.67-1.15-.16-1.77,.46-.55,1.06-.88,1.71-1.15,.18-.07,.25-.13,.18-.36-.21-.63-.32-1.27-.23-1.93,.11-.9,.67-1.29,1.56-1.1,.64,.14,1.2,.46,1.72,.85,.18,.14,.29,.17,.47-.03,.4-.45,.86-.83,1.41-1.09,.96-.44,1.71-.04,1.92,.99,.12,.58,.12,1.15,.04,1.73-.03,.19,0,.29,.22,.34,.67,.15,1.32,.37,1.86,.82,.64,.54,.69,1.14,.16,1.78-.45,.54-1.04,.87-1.68,1.14-.18,.08-.22,.14-.16,.35,.2,.67,.33,1.35,.19,2.05-.17,.84-.7,1.18-1.53,1.02-.67-.13-1.24-.48-1.76-.89-.16-.13-.24-.13-.38,.03-.47,.52-1,.95-1.67,1.2-.76,.28-1.33,.02-1.63-.72-.07-.17-.13-.35-.14-.54,0-.12-.02-.24-.03-.33Z"
                style={{ fill: "#53c0dd" }}
              />
              <path
                d="M112.69,175.62c-.16,.01-.32,0-.48,.04-.46,.13-.75-.07-.99-.45-.23-.38-.49-.73-.74-1.09-.09-.13-.11-.24-.04-.39,.22-.54,.47-1.06,.74-1.57,.08-.14,.17-.2,.33-.22,.55-.04,1.1-.09,1.65-.14,.17-.02,.29,.03,.39,.16,.36,.47,.7,.95,1.01,1.45,.07,.11,.07,.19,.03,.31-.23,.56-.49,1.09-.76,1.63-.07,.14-.16,.19-.31,.2-.28,.02-.56,.05-.84,.07,0,0,0,0,0,0Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M109.05,172.57c.1-.04,.1,.05,.13,.1,.18,.41,.37,.81,.59,1.2,.05,.08,.04,.16,0,.24-.14,.4-.27,.81-.36,1.23-.03,.14-.08,.18-.23,.15-.56-.14-1.09-.32-1.57-.65-.58-.41-.62-.88-.1-1.36,.42-.4,.92-.66,1.45-.88,.03-.01,.05-.02,.08-.03Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M109.69,177.48c0-.43,0-.82,.06-1.21,.02-.15,.07-.15,.2-.15,.44,.03,.87,.05,1.31,.07,.11,0,.17,.06,.23,.13,.28,.33,.58,.64,.89,.93,.07,.06,.12,.11,.03,.2-.45,.47-.93,.9-1.55,1.13-.53,.2-.83,.05-1.02-.49-.07-.21-.11-.43-.15-.62Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M115.33,170.14c.02,.34,0,.71-.04,1.08-.01,.12-.05,.22-.21,.19-.41-.07-.84-.08-1.25-.1-.12,0-.2-.05-.28-.14-.28-.3-.57-.6-.85-.89-.05-.05-.16-.09-.06-.2,.49-.52,.99-1.02,1.71-1.22,.31-.09,.53-.01,.7,.26,.19,.3,.25,.64,.29,1.03Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M115.9,176.79c.05,.37,.04,.71-.08,1.04-.12,.33-.35,.47-.7,.43-.72-.09-1.28-.48-1.85-.89-.09-.06-.06-.11,0-.18,.26-.34,.5-.7,.71-1.08,.06-.1,.14-.15,.26-.18,.41-.09,.82-.19,1.22-.3,.15-.04,.2,0,.24,.14,.09,.34,.2,.68,.2,1.02Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M109.86,169.24c.49,0,.98,.27,1.45,.57,.57,.36,.56,.37,.17,.92-.11,.16-.23,.32-.32,.5-.11,.24-.29,.34-.54,.38-.34,.05-.68,.14-1,.25-.1,.03-.2,.05-.25-.09-.19-.63-.33-1.27-.22-1.93,.07-.39,.26-.56,.7-.59Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M117.87,173.28c.02,.18-.05,.34-.15,.47-.44,.57-1.05,.88-1.69,1.16-.12,.05-.13-.03-.16-.09-.18-.41-.38-.81-.61-1.2-.06-.1-.03-.17,0-.27,.12-.39,.24-.78,.35-1.18,.04-.14,.09-.18,.23-.14,.54,.13,1.06,.3,1.53,.61,.23,.16,.46,.33,.5,.64Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M114.41,175.36c.2-.43,.38-.81,.56-1.22,.19,.27,.3,.57,.44,.85,.05,.1,0,.14-.09,.16-.29,.07-.57,.19-.92,.2Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M110.15,174.54c.29,.41,.53,.76,.79,1.13-.33,.03-.64-.02-.94-.04-.11,0-.12-.05-.1-.14,.08-.29,.16-.59,.25-.94Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M112.07,176.19l1.33-.11c-.14,.3-.33,.53-.51,.78-.05,.06-.08,.09-.15,.03-.23-.21-.47-.42-.67-.7Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M113,171.29l-1.34,.11c.14-.3,.33-.54,.52-.78,.05-.07,.11-.06,.16,0,.21,.22,.42,.43,.65,.67Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M114.1,171.83c.34-.02,.64,.03,.94,.07,.1,.01,.12,.07,.09,.16-.08,.29-.16,.57-.25,.89-.27-.38-.51-.73-.78-1.12Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M110.05,173.36c-.15-.32-.27-.58-.39-.84-.05-.1-.03-.16,.08-.19,.29-.07,.56-.19,.89-.2-.19,.4-.36,.78-.57,1.23Z"
                style={{ fill: "#fff" }}
              />
              <path
                d="M113.55,173.66c.05,.59-.37,1.08-.97,1.12-.57,.04-1.08-.41-1.12-.98-.04-.57,.39-1.05,.97-1.1,.6-.05,1.07,.35,1.12,.96Z"
                style={{ fill: "#55c0dd" }}
              />
            </g>
            <g>
              <path
                d="M99.25,86.19s-.04-.05-.06-.07c-.01-.06,0-.11,.04-.16,.08-.07,.15-.2,.29-.1-.07,.11-.14,.23-.21,.34-.02,0-.04,0-.06,0Z"
                style={{ fill: "#3b5176" }}
              />
              <path
                d="M93.55,83.66c-.27-.08-.48-.26-.7-.42-.5-.47-.6-1.09-.66-1.72-.1-1.12,.17-2.19,.53-3.23,.27-.63,.56-1.25,.88-1.86,.37-.69,.79-1.34,1.24-1.97,.06-.08,.12-.22,.28-.14,.14,.45,.28,.9,.42,1.36,.02,.07,.02,.16,.12,.18-.19,.43,0,.63,.37,.89,.52,.35,1.01,.74,1.51,1.11,.24,.18,.41,.42,.45,.73-.02,.31-.14,.61-.21,.91-.08,.22-.04,.45-.12,.67-.08,.24-.16,.28-.39,.18-.24-.1-.41-.31-.59-.49-.28-.29-.65-.43-.96-.67-.19-.15-.45-.19-.64-.45-.03,.67,.02,1.25,.08,1.83,.04,.42,0,.83-.19,1.23-.19,.39-.46,.77-.35,1.25,.02,.1,0,.21-.1,.26-.14,.08-.15,.22-.19,.35-.26,.17-.52-.02-.78,0Z"
                style={{ fill: "#5389c4" }}
              />
              <path
                d="M92.79,78.26c-.28,.85-.52,1.71-.56,2.6-.03,.74,.06,1.49,.48,2.14,.05,.07,.09,.15,.13,.23-.77-.43-1.54-.87-2.24-1.41-.52-.4-.7-1.03-.79-1.67-.14-1,.04-1.98,.35-2.93,.11-.32,.16-.67,.37-.95,.21,.01,.34,.14,.41,.33,.06,.14,.14,.16,.28,.12,.48-.13,.6-.06,.71,.41,.04,.16,.1,.17,.23,.1,.23-.13,.44-.05,.63,.09,.18,.13,.12,.31,.09,.49-.03,.15-.06,.3-.1,.45Z"
                style={{ fill: "#91c2e5" }}
              />
              <path
                d="M92.79,78.26c.01-.18,.01-.36,.05-.53,.03-.14,.07-.27-.08-.36-.17-.1-.34-.21-.54-.08-.27,.17-.31,.16-.33-.15-.02-.35-.23-.49-.56-.36-.22,.09-.4,.15-.44-.19-.02-.18-.24-.19-.33-.31,.39-1.04,.96-1.98,1.56-2.9,.14-.21,.3-.41,.45-.62,.06-.09,.11-.13,.21-.06,.77,.5,1.55,1.01,2.32,1.51,.02,.02,.03,.07,.04,.1-.36,.2-.49,.59-.71,.9-.46,.64-.8,1.37-1.17,2.06-.17,.32-.25,.67-.44,.98Z"
                style={{ fill: "#82b9e0" }}
              />
              <path
                d="M94.31,83.64c-.04-.17-.12-.35,.17-.38,.1-.01,.09-.14,.07-.23-.07-.3-.01-.57,.15-.84,.26-.44,.47-.95,.4-1.46-.06-.44-.03-.88-.13-1.31-.05-.22,.07-.44-.01-.66-.02-.04,0-.1,.06-.12,.07-.02,.11,.02,.15,.06,.33,.35,.79,.5,1.17,.77,.22,.16,.42,.36,.62,.54,.03,.03,.06,.06,.08,.09,.11,.14,.28,.24,.43,.22,.16-.02,.09-.25,.15-.38,.07-.14-.03-.32,.08-.45,.06,.05,.08,.12,.07,.19-.08,.79,.18,1.53,.37,2.28,.05,.24,.18,.47,.16,.73-.09,.22-.22,.17-.32,.02-.12-.19-.28-.29-.47-.38-.21-.1-.43-.22-.58-.4-.34-.42-.86-.57-1.29-.93,.02,.6,.23,1.12,.34,1.67,0,.03,0,.06-.02,.08-.34,.14-.49,.47-.75,.7h0c-.13,.05-.28,.04-.36,.18-.04,.01-.07,.02-.11,.04-.14,0-.29,.07-.43-.02Z"
                style={{ fill: "#4a7cbd" }}
              />
              <path
                d="M100.84,76.77c.06,0,.12-.04,.17,.01,.12,.19,.36,.27,.42,.5,.03,.12-.04,.18-.13,.24-.18,.11-.26,.27-.25,.47,.01,.79-.32,1.52-.45,2.29-.04,.22-.26,.32-.31,.53-.19,.75-.48,1.48-.64,2.25-.06,.3-.02,.61-.11,.91-.02,.08-.01,.18-.07,.22-.33,.2-.35,.55-.45,.86-.18,.05-.18-.11-.21-.2-.07-.17-.07-.37-.14-.54-.1-.36-.24-.72-.26-1.1-.06-.26,.09-.46,.19-.68,.29-.69,.53-1.4,.78-2.1,.23-.63,.39-1.28,.55-1.93,.11-.44,.26-.85,.47-1.25,.06-.11,.07-.25,.12-.37,.07-.17,.17-.24,.34-.11Z"
                style={{ fill: "#2f5593" }}
              />
              <path
                d="M100.84,76.77c-.14-.05-.24-.02-.27,.15-.08,.33-.17,.66-.43,.91-.03,.03-.05,.09-.05,.13,0,.67-.29,1.29-.46,1.92-.15,.56-.32,1.12-.57,1.66-.16,.33-.21,.71-.4,1.03-.12,.2-.21,.4-.19,.63-.25-.08-.16-.32-.22-.48,0-.25-.14-.47-.16-.71-.17-.53,.01-1.02,.2-1.5,.35-.93,.57-1.9,.86-2.84,.11-.35,.22-.72,.53-.97,.26-.17,.57-.13,.86-.19,.14,.04,.23,.14,.29,.27Z"
                style={{ fill: "#345d9c" }}
              />
              <path
                d="M102.03,78.41c.13,.22,.09,.47,.12,.71-.04,.25-.02,.51-.04,.76-.06,.34-.16,.67-.14,1.02,0,.02-.02,.04-.03,.06-.12,.13-.09,.31-.14,.46-.13,.26-.22,.54-.27,.83h0c-.19,.35-.38,.7-.48,1.1-.04,.06-.07,.13-.11,.19-.14,.08-.15,.23-.2,.36-.11,.2-.23,.41-.34,.61-.06,.04-.12,.1-.2,.05-.09-.06-.17,0-.25,.02-.08,.02-.16,0-.2-.08-.04-.08-.03-.17,.04-.21,.27-.17,.29-.42,.33-.71,.04-.27,.11-.58,.38-.77,.09-.06,.1-.16,.07-.24-.14-.33-.05-.66,.01-.99,.04-.18,.06-.37,.07-.55,0-.04,.01-.09,.03-.13,.04-.18,.13-.32,.29-.42,.24-.15,.28-.42,.37-.65,.07-.2,.15-.35,.4-.25,.08,.03,.14,.02,.14-.08,0-.08-.03-.15-.12-.12-.15,.05-.25,.02-.29-.14-.06-.21-.06-.44,.13-.56,.15-.09,.22-.2,.27-.35,.07-.04,.1,.03,.14,.06Z"
                style={{ fill: "#284a85" }}
              />
              <path
                d="M100.75,80.91s0,.08,0,.12c-.05,.22-.05,.45-.24,.6-.04,.03-.05,.09-.05,.14,.02,.55-.27,1.02-.44,1.52-.11,.32-.24,.62-.32,.95-.02,.1-.06,.21,0,.28,.19,.19,.07,.36-.02,.53-.07,.14-.16,.27-.21,.42-.05,.17-.17,.21-.32,.16-.19-.16-.25-.35-.15-.58,0-.2,.04-.39,.08-.58,.01-.06,.02-.13,.08-.15,.39-.13,.35-.49,.37-.78,.03-.59,.21-1.15,.39-1.71,.11-.35,.21-.71,.31-1.06,.02-.06,0-.14,.04-.17,.44-.32,.32-.85,.48-1.28,.18-.49,.25-1,.25-1.53,0-.17,.12-.27,.28-.34,.06-.03,.19-.07,.1-.2,.22-.06,.21,.19,.34,.25,.04,.08,.08,.16,.12,.23,.03,.13,.08,.26,.02,.4-.22,.31-.43,.61-.48,1.01-.07,.49-.31,.92-.48,1.38-.04,.12-.07,.26-.13,.38Z"
                style={{ fill: "#2a4e8a" }}
              />
              <path
                d="M99,85.06c.03,.19,.03,.38,.16,.54,.2,.1,.11,.27,.1,.42-.02,.03-.04,.07-.06,.1-.37-.23-.73-.45-1.1-.68-.09-.13-.23-.19-.37-.24-.04,0-.08,0-.09-.05-.05-.15-.19-.15-.31-.2-.04-.09-.17-.03-.21-.12-.12-.12-.25-.23-.42-.27-.2-.07-.28-.24-.33-.41-.14-.43-.16-.89-.36-1.31,0-.03-.04-.05-.04-.09,0-.02,0-.04,0-.06,.03-.09,0-.21,.13-.24,.12-.02,.18,.07,.22,.17,.08,.2,.3,.36,.18,.63,.09-.15,.22-.17,.35-.12,.24,.08,.48,.19,.66,.38,.09,.1,.22,.17,.3,.28,.23,.28,.61,.35,.87,.59,.03,.03,.03-.08,.08-.09,.14,.24,.08,.56,.27,.78Z"
                style={{ fill: "#3f6bb1" }}
              />
              <path
                d="M97.93,78.56c-.11-.46-.48-.69-.83-.94-.36-.26-.76-.48-1.05-.82-.1-.11-.25-.09-.36-.19-.27-.22-.3-.41-.09-.7,.02-.02,.03-.05,.05-.07,.07-.17,.24-.23,.37-.33,.5,.42,1.04,.78,1.6,1.11,.14,.08,.25,.18,.35,.31,.07,.1,.14,.19,.23,.27q.33,.28,.18,.66c-.06,.17-.14,.34-.24,.5-.05,.08-.07,.19-.2,.18Z"
                style={{ fill: "#4c80c0" }}
              />
              <path
                d="M98.31,77.86c.04-.09,.08-.18,.11-.27,.03-.09,.04-.18-.09-.2-.08-.01-.15-.05-.2-.12-.4-.59-1.05-.84-1.59-1.23-.19-.14-.41-.28-.52-.52,.18-.31,.48-.44,.8-.55,.1,.03,.22,0,.28,.13,.07,.16,.22,.19,.37,.2,.04,0,0,0,.03,0,.15,.03,.38,.05,.37,.22-.02,.22-.25,.08-.39,.11-.02,0-.04,0,0,0,.33,.08,.73,.11,1,.48,.16,.22,.37,.43,.62,.59,.08,.05,.13,.12,.13,.22-.01,.11-.09,.17-.16,.24-.19,.17-.37,.34-.52,.56-.05,.08-.11,.17-.23,.13Z"
                style={{ fill: "#4879ba" }}
              />
              <path
                d="M99.17,76.95c-.16-.27-.46-.4-.64-.65-.02-.03-.08-.04-.09-.07-.26-.48-.73-.47-1.18-.54-.05,0-.09-.02-.19-.04,.27-.16,.53,.01,.79-.11-.12-.09-.22-.14-.35-.16-.19-.02-.42,.03-.48-.26-.01-.06-.14-.09-.21-.14,.47-.17,.93-.18,1.37,.09,.07,.12,.2,.14,.31,.19,.17,.04,.28,.19,.43,.26,.1,.14,.27,.17,.41,.24,.41,.24,.83,.45,1.22,.73-.03,.08-.12,.13-.19,.12-.23-.03-.44,.07-.65,.11-.19,.05-.29,.31-.54,.22Z"
                style={{ fill: "#4572b4" }}
              />
              <path
                d="M99.25,86.02c-.1-.13,.03-.3-.1-.42,.14,.01,.24,0,.26-.19,.02-.22,.24-.37,.29-.6,0-.04,.1-.08,.04-.12-.34-.2-.13-.47-.07-.67,.18-.56,.41-1.11,.63-1.67,.05-.13,.06-.25,.06-.37,0-.22,0-.43,.24-.56,.15-.08,.02-.29,.15-.39,0,.31-.08,.62-.13,.92-.03,.18-.05,.35,.04,.54,.07,.15,.09,.31-.15,.47-.2,.13-.35,.48-.3,.77,.06,.3-.1,.45-.3,.58-.08,.06-.13,.11-.09,.18,.05,.09,.13,.09,.21,0,.12-.14,.21-.1,.24,.08,0,.28-.23,.45-.35,.67-.05,.09-.11,.18-.15,.28-.1,.09-.18,.2-.23,.33-.13-.01-.18,.11-.27,.17Z"
                style={{ fill: "#2a4d8a" }}
              />
              <path
                d="M95.95,82.75s.03,.06,.04,.09c-.2,.05-.27,.26-.42,.37-.12,.08-.19,.22-.35,.25,.19-.29,.3-.66,.73-.7Z"
                style={{ fill: "#5279aa" }}
              />
              <path
                d="M101.06,83.35c-.05-.16-.07-.31,.09-.43,.18-.14,.08-.42,.25-.57,.04-.04,.07-.09,.13-.11-.11,.39-.3,.74-.48,1.1Z"
                style={{ fill: "#33456d" }}
              />
              <path
                d="M99.75,85.52c0-.11,.02-.2,.09-.29,.16-.21,.28-.44,.41-.66,.05-.02,.1-.03,.16-.05-.19,.35-.4,.69-.66,1Z"
                style={{ fill: "#364972" }}
              />
              <path
                d="M101.98,80.9c-.08-.35-.04-.69,.11-1.01,.01-.02,.02-.02,.03-.02,0,0,.01,.01,.01,.02,0,.34-.09,.67-.16,1.01Z"
                style={{ fill: "#223d63" }}
              />
              <path
                d="M94.31,83.64c.14,0,.29,.02,.43,.02-.4,.16-.8,.13-1.2,0,.25-.12,.51,.13,.77-.01Z"
                style={{ fill: "#597eac" }}
              />
              <path
                d="M101.69,77.51c-.16-.03-.19-.23-.34-.25-.03-.22-.33-.25-.34-.48,.29,.19,.55,.4,.68,.73Z"
                style={{ fill: "#354f73" }}
              />
              <path
                d="M101.79,78.17c0-.14,.01-.28,.02-.42,.17,.19,.19,.43,.22,.67-.04-.02-.09-.04-.13-.06-.06-.04-.15-.08-.11-.18Z"
                style={{ fill: "#2c456f" }}
              />
              <path
                d="M101.54,82.26c-.03-.31,.09-.58,.25-.83,.01-.02,.02-.03,.04-.02,.01,0,.02,.01,.02,.02-.11,.27-.16,.57-.31,.83Z"
                style={{ fill: "#2f4566" }}
              />
              <path
                d="M102.13,79.9s-.03,0-.05,0c.02-.26-.04-.52,.07-.77,.02,.26,0,.52-.02,.77Z"
                style={{ fill: "#23304e" }}
              />
              <path
                d="M94.85,83.63c.04-.22,.2-.21,.36-.18-.09,.11-.23,.15-.36,.18Z"
                style={{ fill: "#5279aa" }}
              />
              <path
                d="M97.72,85.19c.19-.02,.32,.05,.37,.24-.14-.06-.27-.13-.37-.24Z"
                style={{ fill: "#476693" }}
              />
              <path
                d="M97.32,84.94c.14,.01,.34-.08,.31,.2-.12-.05-.22-.1-.31-.2Z"
                style={{ fill: "#46689a" }}
              />
              <path
                d="M101.84,81.43s-.03,0-.05,0c.02-.17-.03-.35,.16-.46-.03,.15-.07,.31-.1,.46Z"
                style={{ fill: "#27385f" }}
              />
              <path
                d="M96.68,84.56c.21-.02,.34,.09,.42,.27-.14-.09-.28-.18-.42-.27Z"
                style={{ fill: "#516998" }}
              />
              <path
                d="M100.76,83.91c0-.16-.01-.32,.2-.36-.05,.13-.1,.26-.2,.36Z"
                style={{ fill: "#2e426b" }}
              />
              <path
                d="M99.33,75.77c-.18-.01-.33-.06-.41-.24,.15,.05,.29,.14,.41,.24Z"
                style={{ fill: "#536c9c" }}
              />
              <path
                d="M98.49,75.26c-.14,0-.3,.02-.31-.19,.12,.04,.22,.1,.31,.19Z"
                style={{ fill: "#517198" }}
              />
              <path
                d="M99.17,76.95c.2-.02,.32-.25,.54-.22-.27,.36-.47,.74-.52,1.19-.02,.19-.09,.38-.17,.52-.22,.4-.19,.85-.36,1.26-.18,.43-.28,.88-.48,1.31-.15,.33-.02,.67-.09,.99-.27-.81-.48-1.63-.39-2.5,.07-.31,.14-.62,.22-.94,.17-.21,.27-.46,.38-.7,.29-.31,.55-.64,.86-.92Z"
                style={{ fill: "#3964a5" }}
              />
              <path
                d="M98.73,84.27c0,.06-.02,.13-.02,.2-.33-.26-.73-.38-1.02-.67-.2-.2-.38-.44-.68-.54-.2-.07-.4-.22-.53,.09-.02,.05-.1,.08-.15,.03-.05-.05,0-.09,.03-.12,.17-.11,.11-.22,.02-.34-.04-.06-.09-.13-.12-.2-.03-.09-.05-.21-.16-.22-.11,0-.07,.15-.15,.19-.18-.46-.28-.95-.36-1.44-.02-.12-.02-.25-.03-.36,.09-.05,.12,.01,.16,.05,.21,.19,.43,.36,.71,.45,.28,.09,.4,.39,.62,.56,.21,.16,.42,.33,.68,.39,.19,.04,.21,.22,.3,.33,.06,.08,.11,.23,.23,.04,.16,.12,.06,.36,.22,.48,.04,.37,.17,.72,.26,1.07Z"
                style={{ fill: "#4472b5" }}
              />
              <path
                d="M101.79,78.17c.03,.06,.12,.09,.11,.18,0,.18,.05,.35-.23,.39-.16,.02-.2,.48-.09,.61,.08,.08,.12,0,.17-.03,.08-.07,.16-.06,.2,.02,.06,.12,.04,.25,0,.37-.04,.1-.12,.02-.17,0-.21-.13-.29-.08-.36,.16-.09,.29-.14,.64-.5,.77-.14,.05-.08,.22-.18,.29,.01-.47,.26-.87,.39-1.31,.02-.05,.07-.1,.07-.16,.02-.41,.21-.77,.36-1.14,.04-.1,.11-.16,.23-.14Z"
                style={{ fill: "#2a4d8a" }}
              />
              <path
                d="M100.59,83.59c.05,.16,.1,.25,.04,.35,0,.01-.07,.02-.07,.01-.07-.1-.04-.19,.03-.36Z"
                style={{ fill: "#2a4d8a" }}
              />
            </g>
          </g>
        </g>
      </g>
      <g id="Desk" style={{ opacity: "0.95" }}>
        <polyline
          points="171.63 143.3 130.91 143.3 56.18 158.94 86.67 173.24 132.46 162.63 171.63 162.63"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-6)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="56.18 158.94 56.18 163.83 83.92 176.8 85.17 262.75 87.49 263.94 86.67 173.16 56.18 158.94"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-7)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="84.49 258.6 61.42 246.56 61.42 166.28 57.5 164.45 57.5 246.3 85.17 262.75 85.11 258.93 84.49 258.6"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-8)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="57.5 164.45 57.5 246.3 87.49 263.94 86.71 266.4 56.18 248.7 56.52 163.92 57.5 164.45"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-9)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="171.52 166.9 132.97 165.72 89.68 175.34 90.54 262.75 89.33 265.71 86.71 266.4 87.49 263.94 86.67 173.24 132.46 162.63 171.63 162.63 171.52 166.9"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-10)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polyline
          points="171.63 143.3 212.35 143.3 287.08 158.94 256.59 173.24 210.8 162.63 171.63 162.63"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-11)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="287.08 158.94 287.08 163.83 259.34 176.8 258.09 262.75 255.77 263.94 256.59 173.16 287.08 158.94"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-12)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="258.77 258.6 281.84 246.56 281.84 166.28 285.76 164.45 285.76 246.3 258.09 262.75 258.15 258.93 258.77 258.6"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-13)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="285.76 164.45 285.76 246.3 255.77 263.94 256.54 266.4 287.08 248.7 286.74 163.92 285.76 164.45"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-14)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
        <polygon
          points="171.52 166.9 210.29 165.72 253.58 175.34 252.72 262.75 253.92 265.71 256.54 266.4 255.77 263.94 256.59 173.24 210.8 162.63 171.63 162.63 171.52 166.9"
          style={{
            fill: "#181c1e",
            stroke: "url(#linear-gradient-15)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.2px",
          }}
        />
      </g>
      <g id="Human_With_Chair" data-name="Human With Chair">
        <g id="Lcd">
          <rect
            x="135.27"
            y="96.23"
            width="70.72"
            height="50.51"
            rx="5.61"
            ry="5.61"
            style={{
              fill: "#e2e2e2",
              stroke: "#303030",
              "stroke-miterlimit": "10",
            }}
          />
          <rect
            x="138.18"
            y="99.76"
            width="64.9"
            height="37.6"
            rx="1.91"
            ry="1.91"
            style={{ fill: "#181c1e" }}
          />
        </g>
        <g id="Keyboard">
          <rect
            x="144.51"
            y="105.16"
            width="16.67"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "url(#linear-gradient-16)" }}
          />
          <rect
            x="163.18"
            y="105.16"
            width="10.96"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#181c1e" }}
          />
          <rect
            x="175.84"
            y="105.16"
            width="10.96"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#181c1e" }}
          />
          <rect
            x="170.13"
            y="120.88"
            width="4.21"
            height="4.21"
            rx="1.88"
            ry="1.88"
            transform="translate(344.47 245.96) rotate(180)"
            style={{ fill: "#181c1e" }}
          />
          <rect
            x="157.17"
            y="120.88"
            width="10.96"
            height="4.21"
            rx="1.88"
            ry="1.88"
            transform="translate(325.31 245.96) rotate(180)"
            style={{ fill: "url(#linear-gradient-17)" }}
          />
          <rect
            x="144.51"
            y="120.88"
            width="10.96"
            height="4.21"
            rx="1.88"
            ry="1.88"
            transform="translate(299.99 245.96) rotate(180)"
            style={{ fill: "#7a88c4" }}
          />
          <rect
            x="140.69"
            y="112.81"
            width="10.96"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "url(#linear-gradient-18)" }}
          />
          <rect
            x="153.26"
            y="112.81"
            width="14.45"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#5454a4" }}
          />
          <rect
            x="169.2"
            y="112.81"
            width="18.58"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#ed2224" }}
          />
          <rect
            x="150.32"
            y="129.03"
            width="10.96"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#f26f63" }}
          />
          <rect
            x="162.98"
            y="129.03"
            width="10.96"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#181c1e" }}
          />
          <rect
            x="175.56"
            y="129.03"
            width="18.58"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#181c1e" }}
          />
          <rect
            x="189.27"
            y="112.81"
            width="10.71"
            height="4.21"
            rx="1.88"
            ry="1.88"
            style={{ fill: "#f26f63" }}
          />
        </g>
        <g id="Shirt">
          <path
            d="M172.38,132.1c2.5,.25,10.29-2.15,9.19-2.41s-2.52-6-2.52-6l-.57-2.21s-5.8,1.61-6.51,1.53c-.7,.08-6.96-1.53-6.96-1.53l-.57,2.21s-1.42,5.75-2.52,6,6.69,2.66,9.19,2.41"
            style={{ fill: "#eeae8a" }}
          />
          <path
            d="M137.17,150.58l-2.04,12.7s-.18,10.68,3.85,8.65,7.08-11.47,7.08-11.47l-8.9-9.88Z"
            style={{ fill: "#fab693" }}
          />
          <path
            d="M206.09,150.58l2.04,12.7s.18,10.68-3.85,8.65-7.08-11.47-7.08-11.47l8.9-9.88Z"
            style={{ fill: "#fab693" }}
          />
          <path
            d="M171.84,131.52s6.04-1.11,9.19-2.2,2.72,0,2.72,0c0,0,10.13,1.96,14.28,5.34,4.14,3.38,6.54,9.26,6.54,9.26l2.29,8.28s-2.07,2.51-6.1,3.16c-4.03,.65-8.5,1.09-8.5,1.09l-2.9-5.78s.91,23,0,29.43-2.11,6.76-8.87,6.87c-6.76,.11-8.68,0-8.68,0h-.1s-1.93,.11-8.68,0c-6.76-.11-7.96-.44-8.87-6.87s0-29.43,0-29.43l-2.9,5.78s-4.47-.44-8.5-1.09-6.1-3.16-6.1-3.16l2.29-8.28s2.4-5.89,6.54-9.26,14.28-5.34,14.28-5.34c0,0-.43-1.09,2.72,0s9.19,2.2,9.19,2.2"
            style={{ fill: "#233871" }}
          />
        </g>
        <g id="Stable_Hairs" data-name="Stable Hairs">
          <ellipse
            cx="171.62"
            cy="111.2"
            rx="10.3"
            ry="13.96"
            style={{ fill: "#10111e" }}
          />
          <polygon
            points="157.43 111.54 157.5 111.45 157.57 111.62 157.43 111.54"
            style={{
              fill: "#fff",
              stroke: "#8c8c8c",
              "stroke-miterlimit": "10",
            }}
          />
          <polygon
            points="177.44 98.88 177.37 98.87 177.38 98.83 177.44 98.88"
            style={{
              fill: "#fff",
              stroke: "#8c8c8c",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2px",
            }}
          />
          <polygon
            points="177.38 98.83 177.37 98.87 177.38 98.82 177.38 98.83"
            style={{
              fill: "#fff",
              stroke: "#8c8c8c",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2px",
            }}
          />
          <polygon
            points="177.37 98.87 177.36 98.81 177.38 98.82 177.37 98.87"
            style={{
              fill: "#fff",
              stroke: "#8c8c8c",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2px",
            }}
          />
          <polygon
            points="178.99 89.98 180.33 99.41 178.05 95.1 178.99 89.98"
            style={{ fill: "url(#linear-gradient-19)" }}
          />
          <polygon
            points="159.58 109.11 159.58 108.84 159.63 109.01 157.5 111.45 157.43 111.27 156.89 106.42 161.79 106.53 159.58 109.11"
            style={{ fill: "#10111e" }}
          />
          <polygon
            points="177.84 94.56 180.33 99.4 177.16 98.81 177.1 98.75 177.84 94.56"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="161.79 104.59 161.79 106.53 156.89 106.42 162.76 101.68 161.79 104.59"
            style={{ fill: "#11123e" }}
          />
          <polygon
            points="156.89 106.42 157.96 103.72 162.76 101.68 156.89 106.42"
            style={{ fill: "#1a194b" }}
          />
          <polygon
            points="183.43 103.37 179.26 100.7 182.76 99.68 183.43 103.37"
            style={{ fill: "url(#linear-gradient-20)" }}
          />
          <polygon
            points="183.57 103.56 181.31 104.64 180.34 102.7 179.37 100.76 183.54 103.42 183.57 103.56"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="183.1 99.73 177.7 99.43 177.1 98.6 180.33 99.41 183.1 99.73"
            style={{ fill: "url(#linear-gradient-21)" }}
          />
          <polygon
            points="183.33 91.56 182.76 99.68 180.33 99.41 183.33 91.56"
            style={{ fill: "url(#linear-gradient-22)" }}
          />
          <polygon
            points="183.49 103.72 182.17 108.47 181.2 104.59 183.46 103.51 183.49 103.72"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="179.26 100.7 177.97 99.41 182.76 99.68 179.26 100.7"
            style={{ fill: "url(#linear-gradient-23)" }}
          />
          <polygon
            points="176.29 92.4 173.91 98.76 173.84 98.76 173.06 95.37 176.29 92.4"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="173.84 98.76 170.97 98.76 173.06 95.37 173.84 98.76"
            style={{ fill: "#222745" }}
          />
          <polygon
            points="174.14 91.33 176.29 92.4 173.06 95.37 174.14 91.33"
            style={{ fill: "url(#linear-gradient-24)" }}
          />
          <polygon
            points="170.87 98.76 168.58 98.76 168.48 98.87 170.09 95.91 170.87 98.76"
            style={{ fill: "#121123" }}
          />
          <polygon
            points="173.06 95.37 170.97 98.76 170.87 98.76 170.09 95.91 173.06 95.37"
            style={{ fill: "#121123" }}
          />
          <polygon
            points="170.09 95.91 171.17 92.13 173.06 95.37 170.09 95.91"
            style={{ fill: "#222745" }}
          />
          <polygon
            points="171.17 92.13 174.14 91.33 173.06 95.37 171.17 92.13"
            style={{ fill: "#2f3860" }}
          />
          <polygon
            points="167.67 94.02 170.63 88.9 170.09 95.91 167.67 94.02"
            style={{ fill: "#112" }}
          />
          <polygon
            points="170.63 88.9 176.02 87.28 171.17 92.13 170.09 95.91 170.63 88.9"
            style={{ fill: "#2f3860" }}
          />
          <polygon
            points="177.36 98.81 177.32 98.76 176.34 98.76 173.91 98.76 176.29 92.4 177.36 98.81"
            style={{ fill: "#2f3860" }}
          />
          <polygon
            points="170.09 95.91 168.48 98.87 167.67 94.02 170.09 95.91"
            style={{ fill: "#2f3860" }}
          />
          <polygon
            points="187.34 94.83 184.92 97.79 184.92 94.83 187.34 94.83"
            style={{ fill: "url(#linear-gradient-25)" }}
          />
          <polygon
            points="180.87 85.4 182.76 85.13 179.26 87.01 180.87 85.4"
            style={{ fill: "url(#linear-gradient-26)" }}
          />
          <polygon
            points="161.74 118.55 159.85 116.93 160.82 113.32 161.74 118.55"
            style={{ fill: "#11122e" }}
          />
          <polygon
            points="154.19 101.57 156.08 100.22 156.35 102.11 154.19 101.57"
            style={{ fill: "url(#linear-gradient-27)" }}
          />
          <path
            d="M186.26,109.11l-.81-5.39s1.08,3.77,.81,5.39Z"
            style={{ fill: "url(#linear-gradient-28)" }}
          />
          <polygon
            points="159.85 116.93 157.57 111.62 160.82 113.32 159.85 116.93"
            style={{ fill: "#090d10" }}
          />
          <polygon
            points="157.96 103.72 156.35 102.11 156.08 100.22 157.16 98.06 157.96 103.72"
            style={{ fill: "#12122b" }}
          />
          <polygon
            points="181.2 106.53 181.2 104.59 182.17 108.47 181.2 106.53"
            style={{ fill: "url(#linear-gradient-29)" }}
          />
          <polygon
            points="162.76 101.68 157.96 103.72 157.16 98.06 162.76 101.68"
            style={{ fill: "#171745" }}
          />
          <polygon
            points="159.72 108.91 161.79 106.53 160.82 109.44 159.72 108.91"
            style={{ fill: "#10111e" }}
          />
          <polygon
            points="164.7 100.7 162.76 101.68 157.16 98.06 167.61 99.73 164.7 100.7"
            style={{ fill: "#141143" }}
          />
          <polygon
            points="184.55 113.98 182.76 118.55 182.17 114.29 184.55 113.98"
            style={{ fill: "#202658" }}
          />
          <polygon
            points="184.92 99.41 186.8 102.91 182.76 99.68 184.92 99.41"
            style={{ fill: "url(#linear-gradient-30)" }}
          />
          <polygon
            points="183.57 88.09 184.65 88.09 183.33 91.56 183.57 88.09"
            style={{ fill: "url(#linear-gradient-31)" }}
          />
          <polygon
            points="184.65 88.09 185.19 91.06 184.92 94.83 182.76 99.68 184.65 88.09"
            style={{ fill: "#222745" }}
          />
          <polygon
            points="184.92 97.79 184.92 99.41 182.76 99.68 184.92 97.79"
            style={{ fill: "url(#linear-gradient-32)" }}
          />
          <polygon
            points="184.92 94.83 184.92 97.79 182.76 99.68 184.92 94.83"
            style={{ fill: "url(#linear-gradient-33)" }}
          />
          <polygon
            points="183.33 91.56 184.65 88.09 182.76 99.68 183.33 91.56"
            style={{ fill: "#2f3860" }}
          />
          <polygon
            points="180.33 99.41 180.88 95.91 182.22 87.28 183.57 88.09 183.33 91.56 180.33 99.41"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="180.88 95.91 180.33 99.41 178.99 89.98 182.76 85.13 180.33 91.33 180.88 95.91"
            style={{ fill: "url(#linear-gradient-34)" }}
          />
          <polygon
            points="179.26 87.01 182.76 85.13 178.99 89.98 179.26 87.01"
            style={{ fill: "url(#linear-gradient-35)" }}
          />
          <polygon
            points="180.33 91.33 182.76 85.13 182.22 87.28 180.88 95.91 180.33 91.33"
            style={{ fill: "#222745" }}
          />
          <path
            d="M186.26,109.11c-.27,1.62-1.08,3.23-1.08,3.23l-.59,1.5-1.2-2.66,2.87-2.08Z"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="186.8 102.91 187.34 107.5 185.45 103.72 182.76 99.68 186.8 102.91"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="167.67 94.02 168.48 98.87 164.97 94.83 167.67 94.02"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="181.2 118.17 182.76 118.55 181.2 120.11 181.2 119.14 181.2 118.17"
            style={{ fill: "url(#linear-gradient-36)" }}
          />
          <polygon
            points="159.72 108.91 160.82 109.44 160.82 113.32 159.63 109.01 159.72 108.91"
            style={{ fill: "#10111e" }}
          />
          <polygon
            points="178.05 95.1 177.91 94.83 177.38 98.82 177.36 98.81 176.29 92.4 179.26 87.01 178.99 89.98 178.05 95.1"
            style={{ fill: "#222745" }}
          />
          <polygon
            points="183.57 103.45 183.43 103.37 182.76 99.68 185.45 103.72 184.38 108.58 183.57 103.45"
            style={{ fill: "url(#linear-gradient-37)" }}
          />
          <polygon
            points="185.45 103.72 186.26 109.11 184.38 108.58 185.45 103.72"
            style={{ fill: "url(#linear-gradient-38)" }}
          />
          <polygon
            points="183.57 103.17 184.92 108.5 186.53 109.11 181.95 108.58 183.57 103.17"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="183.3 111.27 182.17 114.29 182.17 111.38 182.17 108.47 183.4 111.2 183.3 111.27"
            style={{ fill: "url(#linear-gradient-39)" }}
          />
          <polygon
            points="160.82 113.32 157.57 111.62 157.5 111.45 159.63 109.01 160.82 113.32"
            style={{ fill: "#1b223f" }}
          />
          <polygon
            points="162.28 87.28 164.16 87.01 162.01 89.71 162.28 87.28"
            style={{ fill: "#112" }}
          />
          <polygon
            points="159.04 96.99 158.5 90.79 162.01 89.71 159.04 96.99"
            style={{ fill: "#060809" }}
          />
          <polygon
            points="162.01 89.71 164.16 87.01 164.97 88.9 164.97 94.83 162.01 89.71"
            style={{ fill: "#222745" }}
          />
          <polygon
            points="164.97 88.9 166.32 89.71 164.97 94.83 164.97 88.9"
            style={{ fill: "#112" }}
          />
          <polygon
            points="164.97 94.83 166.32 89.71 167.67 94.02 164.97 94.83"
            style={{ fill: "#222745" }}
          />
          <polygon
            points="164.97 94.83 168.48 98.87 165.51 96.72 164.97 94.83"
            style={{ fill: "#464c62" }}
          />
          <polygon
            points="161.74 94.56 167.61 99.73 159.04 96.99 162.01 89.71 161.74 94.56"
            style={{ fill: "#222659" }}
          />
          <polygon
            points="168.48 98.87 167.61 99.73 165.51 96.72 168.48 98.87"
            style={{ fill: "#112" }}
          />
          <polygon
            points="162.01 89.71 164.97 94.83 165.51 96.72 167.61 99.73 161.74 94.56 162.01 89.71"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="170.63 88.9 174.67 85.4 178.45 85.94 176.02 87.28 170.63 88.9"
            style={{ fill: "#2f3860" }}
          />
          <polygon
            points="171.17 92.13 176.02 87.28 179.26 87.01 174.14 91.33 171.17 92.13"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="172.52 85.94 174.67 85.4 170.63 88.9 172.52 85.94"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="169.89 87.53 172.52 85.94 170.63 88.9 169.89 87.53"
            style={{ fill: "#464c62" }}
          />
          <polygon
            points="178.45 85.94 179.26 87.01 176.02 87.28 178.45 85.94"
            style={{ fill: "url(#linear-gradient-40)" }}
          />
          <polygon
            points="170.63 88.9 167.67 94.02 166.32 89.71 169.89 87.53 170.63 88.9"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="174.14 91.33 179.26 87.01 176.29 92.4 174.14 91.33"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="166.32 89.71 168.75 85.4 169.89 87.53 166.32 89.71"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="182.17 114.29 182.76 118.55 181.2 118.17 182.17 114.29"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="183.3 111.27 183.4 111.2 184.6 113.85 184.55 113.98 182.17 114.29 183.3 111.27"
            style={{ fill: "url(#linear-gradient-41)" }}
          />
          <polygon
            points="182.17 108.47 186.53 109.11 183.4 111.2 182.17 108.47"
            style={{ fill: "url(#linear-gradient-42)" }}
          />
          <g>
            <path
              d="M162.3,119.77l.3,1.76-.15,1.3,.88-1.53,.89,2.09v1.21l.84-1.3,.6,1.3v1.11l1.11-1.02,1.26,.83s1.15,.32,1.2,.65,0,.83,0,.83v-1.99l1.5,.79,.64,1.21,.28-1.21s-1.86-1.62-2-1.81-.42-1.99-.42-1.99l-1.62,1.39-1.06-1.48-.47-2.6s-.88-.28-.88,0-.67-.74-.67-.74l-.95-5.54,2.3-5.6,2.16-3.33-2.96,2.92-1.54,2.09-.92,2.38-.3,2.31-.38,2.09-1.48,.81"
              style={{ fill: "#0c132b" }}
            />
            <polygon
              points="168.72 100.68 168.97 107.14 167.24 104.52 167.67 108.17 165.89 105.68 166.56 115.09 165.08 112.77 165.22 110.35 163.09 108.99 164.25 102.74 166.79 99.37 168.22 98.85 168.72 100.68"
              style={{ fill: "#171745" }}
            />
            <polygon
              points="170.18 98.7 168.88 102.64 168.36 99.67 167.68 103.53 166.82 101.61 166.82 106.15 165.18 103.66 164.4 105.02 163.23 103.11 163.88 99.35 164.85 100 165.7 100.16 166.7 98.68 167.5 99.62 167.68 98.81 168.88 98 169.58 98.68 170.18 98.7"
              style={{ fill: "#404b75" }}
            />
            <polygon
              points="164.9 100.19 164.06 106.83 162.88 103.34 163.01 108.66 161.18 106.28 161.66 102.89 162.15 101.43 164.9 100.19"
              style={{ fill: "#0c132b" }}
            />
            <polygon
              points="161.69 108.44 163.2 111.42 163.2 113.95 163.36 116.39 162.53 114.6 162.32 117.91 161.38 118.14 160.44 115.9 160.44 113.63 159.67 113.82 160.44 107.72 161.5 106.5 161.69 108.44"
              style={{ fill: "#141143" }}
            />
            <polygon
              points="160.61 117.91 161.56 120.02 161.25 122.25 162.77 120.44 162.32 117.91 160.61 117.91"
              style={{ fill: "#0c132b" }}
            />
            <polygon
              points="162.88 102.49 165.36 110.32 163.59 108.23 164.68 112.44 161.5 109.3 161.45 106.62 161.72 105.11 162.77 106.8 162.88 102.49"
              style={{ fill: "#10111e" }}
            />
          </g>
          <g>
            <path
              d="M180.71,118.88l-.3,1.76,.15,1.3-.88-1.53-.89,2.09v1.21l-.84-1.3-.6,1.3v1.11l-1.11-1.02-1.26,.83s-1.15,.32-1.2,.65,0,.83,0,.83v-1.99l-1.5,.79-.64,1.21-.28-1.21s1.86-1.62,2-1.81,.42-1.99,.42-1.99l1.62,1.39,1.06-1.48,.47-2.6s.88-.28,.88,0,.67-.74,.67-.74l.95-5.54-2.3-5.6-2.16-3.33,2.96,2.92,1.54,2.09,.92,2.38,.3,2.31,.38,2.09,1.48,.81"
              style={{ fill: "#0c132b" }}
            />
            <polygon
              points="174.28 99.79 174.04 106.25 175.77 103.63 175.33 107.28 177.11 104.8 176.44 114.2 177.92 111.88 177.79 109.47 179.91 108.1 178.76 101.86 176.21 98.49 174.79 97.97 174.28 99.79"
              style={{ fill: "#171745" }}
            />
            <polygon
              points="172.83 97.82 174.12 101.75 174.65 98.79 175.32 102.64 176.18 100.73 176.18 105.27 177.83 102.78 178.61 104.14 179.77 102.22 179.12 98.47 178.15 99.11 177.3 99.28 176.3 97.79 175.51 98.74 175.32 97.93 174.12 97.12 173.42 97.79 172.83 97.82"
              style={{ fill: "#404b75" }}
            />
            <polygon
              points="178.11 99.31 178.94 105.95 180.13 102.46 179.99 107.78 181.83 105.4 181.34 102 180.86 100.55 178.11 99.31"
              style={{ fill: "#0c132b" }}
            />
            <polygon
              points="181.31 107.55 179.8 110.54 179.8 113.07 179.64 115.51 180.48 113.72 180.68 117.03 181.62 117.26 182.56 115.02 182.56 112.75 183.34 112.94 182.56 106.83 181.5 105.61 181.31 107.55"
              style={{ fill: "#141143" }}
            />
            <polygon
              points="182.39 117.03 181.44 119.14 181.76 121.37 180.24 119.56 180.68 117.03 182.39 117.03"
              style={{ fill: "#0c132b" }}
            />
            <polygon
              points="180.13 101.61 177.65 109.44 179.41 107.35 178.32 111.56 181.5 108.42 181.56 105.73 181.29 104.23 180.24 105.92 180.13 101.61"
              style={{ fill: "#10111e" }}
            />
          </g>
        </g>
        <g id="Animation_Hairs" data-name="Animation Hairs">
          <polygon
            points="186.13 91.33 186.67 94.83 184.24 94.83 186.13 91.33"
            style={{ fill: "#202658" }}
          />
          <polygon
            points="188.15 97.79 184.92 99.41 184.92 97.79 188.15 97.79"
            style={{ fill: "#10122d" }}
          />
          <polygon
            points="177.21 83.24 178.45 85.94 174.67 85.4 177.21 83.24"
            style={{ fill: "#404b75" }}
          />
          <polygon
            points="155.54 98.6 153.92 97.25 157.16 98.06 156.08 100.22 154.19 99.41 155.54 98.6"
            style={{ fill: "url(#linear-gradient-43)" }}
          />
          <polygon
            points="163.62 85.13 162.28 87.28 160.93 86.47 163.62 85.13"
            style={{ fill: "#112" }}
          />
          <polygon
            points="157.16 98.06 157.16 96.99 156.35 95.91 157.96 96.18 159.04 96.99 167.61 99.73 157.16 98.06"
            style={{ fill: "#25285f" }}
          />
          <polygon
            points="158.5 90.79 160.93 86.47 162.28 87.28 162.01 89.71 158.5 90.79"
            style={{ fill: "url(#linear-gradient-44)" }}
          />
          <polygon
            points="168.75 85.4 173.11 83.24 172.52 85.94 169.89 87.53 168.75 85.4"
            style={{ fill: "#2f3860" }}
          />
        </g>
        <g id="Chair">
          <g>
            <path
              d="M189.27,277.25l-.27,1.58s1.66,.62,3.81,.27,5.93-.71,6.82-1.51,.76-3.16-.16-2.58-9.37,2.4-10.19,2.24Z"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M198.3,270.82s.85-.88,1.61,.35-.12,4.55-.12,4.55"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M189,269.97s-.06,3.73,.72,4.85l-.72,.79,.36,1.52s2.17,.79,5.71,0c3.54-.79,4.53-1.37,4.58-1.52s.04-2.16-.26-2.36-.65,.25-.65,.25c0,0-.25-3.92-.66-5.32s-1.29-.69-1.29-.69c0,0-6.3,2.73-7.79,2.48Z"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M190.89,265.18s-1.16,1.59-.63,2.2,1.27,1.03,3.47,.48,2.24-3.05,2.24-3.05c0,0,.02-.98,.69-.61s1.33,1.33,1.33,1.91,0,1.95-1.67,2.78-3.8,1.97-5.07,1.52-3.2-.23-3-1.82,1.19-3.04,1.91-3.23"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M194.34,200.62s10.17-6.99,13.04,.98c3.22,8.96-8.98,46.66-8.98,46.66,0,0-4.58,13.05-2.1,15.8,1.55,1.72-2.77,4.51-4.56,3.86-1.07-.39-2.03-.81-2.03-.81,0,0-1.8-.13-.81-11.12,.99-10.99,2.64-43.59-4.15-41.82l9.59-13.54Z"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
              }}
            />
          </g>
          <g>
            <path
              d="M155.22,276.94l.27,1.58s-1.66,.62-3.81,.27c-2.14-.35-5.93-.71-6.82-1.51s-.76-3.16,.16-2.58,9.37,2.4,10.19,2.24Z"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M146.19,270.51s-.85-.88-1.61,.35,.12,4.55,.12,4.55"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M155.5,269.67s.06,3.73-.72,4.85l.72,.79-.36,1.52s-2.17,.79-5.71,0c-3.54-.79-4.53-1.37-4.58-1.52s-.04-2.16,.26-2.36,.65,.25,.65,.25c0,0,.25-3.92,.66-5.32s1.29-.69,1.29-.69c0,0,6.3,2.73,7.79,2.48Z"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M153.61,264.88s1.16,1.59,.63,2.2-1.27,1.03-3.47,.48-2.24-3.05-2.24-3.05c0,0-.02-.98-.69-.61s-1.33,1.33-1.33,1.91,0,1.95,1.67,2.78c1.67,.83,3.8,1.97,5.07,1.52s3.2-.23,3-1.82-1.19-3.04-1.91-3.23"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M150.15,200.32s-10.17-6.99-13.04,.98c-3.22,8.96,8.98,46.66,8.98,46.66,0,0,4.58,13.05,2.1,15.8-1.55,1.72,2.77,4.51,4.56,3.86,1.07-.39,2.03-.81,2.03-.81,0,0,1.8-.13,.81-11.12-.99-10.99-2.64-43.59,4.15-41.82l-9.59-13.54Z"
              style={{
                fill: "#181c1e",
                stroke: "#46494c",
                "stroke-miterlimit": "10",
              }}
            />
          </g>
          <g>
            <path
              d="M204.92,213.4c-1.64-2.16-6.65-2.68-6.65-2.68,0,0,.43-.35,2.5-4.15,2.07-3.8-1.73-6.91-3.45-12.44s-.35-10.19,4.15-24.87c4.49-14.68-.69-21.59-3.45-24.7-2.76-3.11-7.77-12.95-11.75-20.21-3.97-7.25-14.85-5.01-14.85-5.01,0,0-10.88-2.25-14.85,5.01-3.97,7.25-8.98,17.1-11.75,20.21-2.76,3.11-7.95,10.02-3.45,24.7,4.49,14.68,5.87,19.35,4.15,24.87-1.73,5.53-5.53,8.64-3.45,12.44,2.07,3.8,2.5,4.15,2.5,4.15,0,0-5.01,.52-6.65,2.68s1.73,10.02,3.02,14.16c1.3,4.15,2.42,5.96,8.64,6.13,6.22,.17,21.85,0,21.85,0,0,0,15.63,.17,21.85,0s7.34-1.99,8.64-6.13c1.3-4.15,4.66-12,3.02-14.16Zm-37.35-65.55c-3.45,.46-12.41,.43-13.33-.09s-2.22-2.1-1.76-3.14c.46-1.04,12.26-8.2,14.68-7.69s2.5,1.15,2.56,2.19c0,0,1.3,8.26-2.16,8.72Zm21.49-.09c-.92,.52-9.87,.55-13.33,.09s-2.16-8.72-2.16-8.72c.06-1.04,.14-1.67,2.56-2.19s14.22,6.65,14.68,7.69c.46,1.04-.83,2.62-1.76,3.14Z"
              style={{
                fill: "#181c1e",
                stroke: "url(#linear-gradient-45)",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
            <path
              d="M169.74,139.12c-.06-1.04-.14-1.67-2.56-2.19s-14.22,6.65-14.68,7.69c-.46,1.04,.83,2.62,1.76,3.14s9.87,.55,13.33,.09,2.16-8.72,2.16-8.72Zm-1.64,6.16s-.52,1.04-1.61,1.04-10.94,.23-11.4,0-.69-1.35,.52-1.93,10.24-6.21,11.4-5.99c2.56,.49,1.18,6.33,1.09,6.88Z"
              style={{ fill: "url(#linear-gradient-46)" }}
            />
            <path
              d="M151.73,232.28s1.03-2.48,1.32-7.43-1.47-11.23-1.64-11.83-.22-8.98,.64-14.34,7.22-24.27,6.53-33.25c-.69-8.98-10.19-21.07-10.19-21.07,0,0-1.03-2.25-1.95-1.61s-1.33,.74-.63,1.61c0,0,10.19,12.26,10.88,21.25,.69,8.98-5.35,27.12-6.22,32.47-.86,5.35-1.04,14.29-.86,14.9s1.95,6.64,1.67,11.59c-.29,4.95-2.13,7.72-2.13,7.72,0,0-.75,.81,.29,1.27s1.79-.33,2.29-1.27Z"
              style={{ fill: "url(#linear-gradient-47)" }}
            />
            <path
              d="M173.58,139.12c.06-1.04,.14-1.67,2.56-2.19s14.22,6.65,14.68,7.69c.46,1.04-.83,2.62-1.76,3.14s-9.87,.55-13.33,.09-2.16-8.72-2.16-8.72Zm1.64,6.16s.52,1.04,1.61,1.04,10.94,.23,11.4,0,.69-1.35-.52-1.93-10.24-6.21-11.4-5.99c-2.56,.49-1.18,6.33-1.09,6.88Z"
              style={{ fill: "url(#linear-gradient-48)" }}
            />
            <path
              d="M191.58,232.28s-1.03-2.48-1.32-7.43c-.29-4.95,1.47-11.23,1.64-11.83s.22-8.98-.64-14.34c-.86-5.35-7.22-24.27-6.53-33.25,.69-8.98,10.19-21.07,10.19-21.07,0,0,1.03-2.25,1.95-1.61s1.33,.74,.63,1.61c0,0-10.19,12.26-10.88,21.25s5.35,27.12,6.22,32.47c.86,5.35,1.04,14.29,.86,14.9s-1.95,6.64-1.67,11.59,2.13,7.72,2.13,7.72c0,0,.75,.81-.29,1.27s-1.79-.33-2.29-1.27Z"
              style={{ fill: "url(#linear-gradient-49)" }}
            />
          </g>
          <g>
            <g>
              <path
                d="M140.87,228.04c-.23-.06-1.18-2.65-1.18-2.65l-5.49-1.27-.23-1.61,1.73-3.34s-3.68-13.93-3.74-14.91,2.65,1.04,3.63,0,1.09-5.99-3.97-6.39-8.29,.69-8.29,3.63,.46,3.63,1.78,2.94,2.1-1.04,2.38-.29,.68,4.09,.68,4.09l.69-.4,1.32,12.55,1.32,.4,.58,6.05s1.27,2.24,5.37,2.25c4.1,.01,3.43-1.04,3.43-1.04Z"
                style={{
                  fill: "#181c1e",
                  stroke: "url(#linear-gradient-50)",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.5px",
                }}
              />
              <path
                d="M201.96,228.04c.23-.06,1.18-2.65,1.18-2.65l5.49-1.27,.23-1.61-1.73-3.34s3.68-13.93,3.74-14.91-2.65,1.04-3.63,0-1.09-5.99,3.97-6.39,8.29,.69,8.29,3.63-.46,3.63-1.78,2.94-2.1-1.04-2.38-.29-.68,4.09-.68,4.09l-.69-.4-1.32,12.55-1.32,.4-.58,6.05s-1.27,2.24-5.37,2.25c-4.1,.01-3.43-1.04-3.43-1.04Z"
                style={{
                  fill: "#181c1e",
                  stroke: "url(#linear-gradient-51)",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.5px",
                }}
              />
              <path
                d="M172.18,293.76h1.34l-.09,2.07h3.8l.52-8.46-3.02-.17,.78-14.16c7.69,.35,29.62,8.9,29.62,8.9v7.69h4.06v-1.81h1.47v1.81h3.89v-8.46h-3.71v1.38h-1.64v-1.3s-4.15-2.5-14.16-7.34c-10.02-4.84-19.52-5.1-19.52-5.1l2.42-15.03h-1.81l1.03-15.59s-4.96,.69-4.96,.69l-4.96-.69,1.03,15.59h-1.81l2.42,15.03s-9.5,.26-19.52,5.1c-10.02,4.84-14.16,7.34-14.16,7.34v1.3h-1.64v-1.38h-3.71v8.46h3.89v-1.81h1.47v1.81h4.06v-7.69s21.94-8.55,29.62-8.9l.78,14.16-3.02,.17,.52,8.46h3.8l-.09-2.07s1.34,0,1.34,0Z"
                style={{
                  fill: "#181c1e",
                  stroke: "url(#linear-gradient-52)",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.5px",
                }}
              />
            </g>
            <path
              d="M178.66,233.87s-.22,3.02-.91,3.83-6.05,1.18-6.05,1.18h.47s-5.35-.36-6.05-1.18-.91-3.83-.91-3.83h13.43Z"
              style={{
                fill: "#181c1e",
                stroke: "url(#linear-gradient-53)",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
          </g>
        </g>
      </g>
      <g
        id="Transform_Wave"
        class="opacity-0 animate-[moveWaveTop_1s_900ms_ease-in-out_forwards]"
      >
        <g style={{ "clip-path": "url(#clippath)" }}>
          <g id="Wave">
            <g style={{ mask: "url(#mask)" }}>
              <g id="wave3">
                <path
                  d="M232.34,255.27c-8.81,8.13-15.61,32.72-23.29,39.01-7.68,6.29-1.39,7.58,4.01,3.23,11.47-9.23,14.78-29.59,20.57-37.97s3.28-8.5-1.3-4.27Z"
                  style={{ fill: "url(#radial-gradient)" }}
                />
              </g>
            </g>
            <g id="wave2">
              <path
                d="M138.82,149.86c8.03-4.15,15.84,2.57,28.86,2.1,13.84-.5,31.13-11.67,45.48-1.39,9.69,6.94,7.84,24.35,13.87,36.91,6.04,12.55,20.22,18.78,20.22,31.25,0,14.46-19.59,10.26-21.52,33.42-.67,8.05-10.49,9.99-12.67-.08-2.14-9.89,5.29-15.86,9.31-28.21,2.2-6.75-.16-15.17-7.68-26.45-7.42-11.13-6.98-20.84-16.4-29.25-9.42-8.41-22.43,.75-30.71,2.95-9.48,2.52-16.45-2.01-26.41-.55-9.96,1.46-13.6,13.34-18.4,9.11-5.7-5.04,8-25.64,16.03-29.79h0Z"
                style={{ fill: "url(#linear-gradient-54)" }}
              />
              <path
                d="M101.32,207.75c-4.78,6.39-6.12,18.29-3.52,23.91,2.77,5.99,8.35,10.7,12.25,19.88,3.9,9.18-2.77,27.35,13.76,37.34,17.12,10.35,31.46-7.38,49.67-3.94,11.28,2.14,23.03,1.64,23.91-6.8s-12.73-11.16-27.86-9.4c-15.86,1.85-26.47,12.37-37.79,7.96-11.32-4.41-6.94-23.55-10.71-31.26-4.49-9.16-10.78-6.59-15.37-12.76-5.75-7.72,1.39-20.1,2.75-23.21,1.88-4.29-1.45-9.25-7.08-1.73h0Z"
                style={{ fill: "url(#linear-gradient-55)" }}
              />
              <path
                d="M135.8,271.02c-.25,2.17,5.35,3.04,9.57,1.51,3.75-1.36,6.21-4.94,5.35-6.17-1.64-2.33-14.47,.82-14.91,4.66h0Z"
                style={{ fill: "url(#linear-gradient-56)" }}
              />
              <path
                d="M94.79,245.25c2.98,.13,.91,11.38,7.17,24.61,5.71,12.07,17.58,15.74,14.79,19.08s-13.96-4.32-19.69-16.65c-5.35-11.48-6.25-27.22-2.27-27.04Z"
                style={{ fill: "url(#linear-gradient-57)" }}
              />
            </g>
            <g id="wave1">
              <path
                d="M211.32,145.64c1.31,5.41-15.57,7.14-16.48,3.79-1.11-4.08,14.66-11.35,16.48-3.79Z"
                style={{ fill: "#f26f63" }}
              />
              <path
                d="M133.21,243.53c2.81-1.31,7.62,8.7,4.06,10.08-4.84,1.87-7.07-8.66-4.06-10.08Z"
                style={{ fill: "url(#radial-gradient-2)" }}
              />
              <path
                d="M196.48,285.37c1.61,2.18,14.31-1.55,13.75-4.72-.56-3.17-4.51-3.67-8.99-1.87s-5.73,5.26-4.75,6.58h0Z"
                style={{ fill: "url(#radial-gradient-3)" }}
              />
              <path
                d="M240.17,255.22c5.25,2.04,9.29-4.18,5.52-8.54-2.55-2.93-9.06,7.16-5.52,8.54Z"
                style={{ fill: "#f27792" }}
              />
            </g>
          </g>
        </g>
      </g>
      <g id="Lamp">
        <g id="LampFooter">
          <path
            d="M111.96,152.23v2.45c0,.22-.1,.42-.28,.55-.82,.6-3.43,2.24-7.61,2.19h-.35c-4.18,.05-6.79-1.59-7.61-2.19-.18-.13-.28-.33-.28-.55v-2.45"
            style={{ fill: "#1d1314" }}
          />
          <g>
            <ellipse
              cx="104.01"
              cy="152.23"
              rx="7.96"
              ry="3.66"
              style={{ fill: "#171311" }}
            />
            <g style={{ "clip-path": "url(#clippath-1)" }}>
              <polygon
                id="LightShadow"
                points="95.55 160.87 116.7 151.53 93.38 131.36 86.69 139.86 95.55 160.87"
                style={{
                  fill: "url(#radial-gradient-4)",
                  opacity: `${setting().darkmode ? "1" : "0"}`,
                }}
              />
            </g>
          </g>
        </g>
        <g id="LampFooterStick">
          <path
            d="M104.15,135.49c-.38,0-.7,.3-.7,.69v16.01s0,.45,.7,.37l.7-.08v-16.29c0-.38-.3-.69-.68-.69,0,0-.01,0-.02,0Z"
            style={{ fill: "#0f0b0b" }}
          />
          <g style={{ "clip-path": "url(#clippath-2)" }}>
            <polyline
              points="103.45 135.42 104.15 153.79 102.07 153.79 102.46 135.42 103.45 135.42"
              style={{ fill: "#241f1b" }}
            />
          </g>
        </g>
        <g data-type="darkmode" class={`interactable`} onClick={toggleDarkmode}>
          <circle
            id="Light"
            cx="105.19"
            cy="120"
            r="23.56"
            style={{
              fill: "url(#radial-gradient-5)",
              opacity: `${setting().darkmode ? "1" : "0"}`,
            }}
          />
          <path
            id="LampHead"
            d="M95.55,135.33c-.01,.72,2.41,1.96,3.09,2.19,1.39,.46,2.11,.85,6.35,.56,3.42-.23,5.05-.63,6.58-1.03,.78-.21,1.38-.81,1.38-1.62v-26.31c0-.63-.36-1.21-.93-1.48-1.14-.54-3.4-1.27-7.25-1.22-4.81,.06-6.78,.36-7.98,1.01-.5,.27-.8,.82-.81,1.39l-.43,26.51Z"
            style={{
              fill: "url(#linear-gradient-58)",
              stroke: "#181818",
              "stroke-miterlimit": "10",
              "stroke-width": "0.2px",
            }}
          />
        </g>
      </g>
      <g id="Particles">
        <g id="Left_Middle">
          <circle
            cx="75.88"
            cy="139.35"
            r="3.32"
            style={{
              fill: "none",
              stroke: "url(#linear-gradient-59)",
              "stroke-miterlimit": "10",
              "stroke-width": "0.5px",
            }}
          />
          <path
            d="M67.16,131.36l-2.24,1c-.24,.11-.51,.05-.69-.15l-1.64-1.82c-.17-.19-.2-.47-.07-.7l1.23-2.12c.13-.22,.39-.34,.64-.29l2.4,.51c.25,.05,.44,.26,.47,.52l.26,2.44c.03,.26-.11,.5-.35,.61Z"
            style={{
              fill: "none",
              stroke: "url(#linear-gradient-60)",
              "stroke-miterlimit": "10",
              "stroke-width": "0.5px",
            }}
          />
        </g>
        <g id="Left_Button">
          <polygon
            points="72.41 272.26 77.34 276.73 79.34 268.89 72.41 272.26"
            style={{
              fill: "none",
              stroke: "url(#linear-gradient-61)",
              "stroke-miterlimit": "10",
              "stroke-width": "0.5px",
            }}
          />
          <path
            d="M63.81,261.38s2.31,3.1,2.07,4.3-2.7,.4-3.19-1.93,1.12-2.37,1.12-2.37Z"
            style={{ fill: "url(#linear-gradient-62)" }}
          />
        </g>
        <circle
          id="Top_Left_Circle"
          cx="59.14"
          cy="49.69"
          r="1.43"
          style={{ fill: "#82b9e0" }}
        />
        <rect
          id="Top_Left_Yellow"
          x="78.39"
          y="31.3"
          width="1.61"
          height="11.72"
          rx=".8"
          ry=".8"
          transform="translate(-4.41 62.9) rotate(-42.25)"
          style={{ fill: "#fddb00" }}
        />
        <g id="Top_Right">
          <circle
            cx="270.07"
            cy="47.75"
            r="5.06"
            style={{
              fill: "none",
              stroke: "url(#linear-gradient-63)",
              "stroke-dasharray": "0 0 0.4 1",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "0.25px",
            }}
          />
          <circle
            cx="270.07"
            cy="47.75"
            r="3.28"
            style={{ fill: "url(#radial-gradient-6)" }}
          />
          <circle
            cx="270.07"
            cy="47.75"
            r="1.47"
            style={{ fill: "url(#linear-gradient-64)" }}
          />
        </g>
      </g>
      <g id="Book">
        <a
          data-type="book"
          class="interactable"
          href="https://drive.google.com/file/d/1EcXt3WrOzLh-PR6ywdEXR1kIMr0DxK3s/view?usp=drive_link"
        >
          <g>
            <g>
              <path
                d="M248.8,147.27c.02,.34,.03,.69,.05,1.03-1.18,.88-2.1,2.04-3.25,2.94-1.31,1-2.65,1.97-3.84,3.11-.87,.8-1.69,1.64-2.44,2.57-.67,.83-1.39,1.63-2.13,2.41-.62,.65-1.28,1.27-1.9,1.92-.33,.35-.74,.61-1.08,.95-.22,.21-.55,.11-.79,.26-.23,.04-.44,0-.66-.06-.7-.2-1.42-.3-2.17-.48,.16,.21,.53,.1,.53,.38,0,.21-.15,.39-.36,.48-.39,.04-.75-.11-1.12-.21-1.48-.4-2.94-.96-4.45-1.17-2.04-.28-3.89-1.14-5.82-1.72-.67-.2-1.35-.41-2.02-.63-.13-.04-.27-.07-.4-.13-.17-.08-.43-.11-.39-.37,.04-.24,.26-.36,.5-.4,.11-.02,.23-.02,.34,0,.72,.2,1.46,.31,2.19,.49,.67,.16,1.35,.26,2.05,.1,.5-.04,.92,.22,1.39,.33,1.86,.45,3.68,1.01,5.52,1.53,1.35,.38,2.7,.76,4.01,1.28,.15,.06,.3,.06,.46,.08,.42-.21,.79-.5,1.14-.81,1.08-.94,2.12-1.92,3.1-2.97,.28-.3,.62-.53,.87-.86,.03-.03,.05-.06,.08-.08,.29-.19,.51-.45,.73-.71,.03-.03,.05-.05,.09-.08,.34-.19,.55-.53,.82-.8,.92-1.03,1.99-1.91,2.99-2.85,1.56-1.47,3.17-2.87,4.69-4.37,.34-.34,.72-.64,1.02-1.01,.07-.08,.15-.17,.28-.16Z"
                style={{ fill: "#e4e4e3" }}
              />
              <path
                d="M245.56,151.16c.53-.51,1.1-.98,1.62-1.52,.43-.45,.86-.92,1.4-1.25,.08-.05,.18-.06,.28-.09,0,.23,.11,.45,.06,.68-1.34,1.02-2.47,2.24-3.68,3.53,.42-.01,.65-.18,.88-.36,.21-.17,.4-.35,.63-.5,.1-.06,.21-.11,.31-.01,.1,.1,.04,.21-.03,.3-.12,.17-.24,.34-.32,.42,.54-.35,1.02-.91,1.61-1.34,.23-.17,.33-.51,.69-.52,.24,.37,.25,.57-.05,.86-.94,.91-1.9,1.81-2.84,2.72-1.04,1.01-2.13,1.97-3.14,3.02-.29,.31-.68,.51-.95,.84-.06,.06-.12,.11-.2,.14-.2,.05-.41,.08-.62,.14-.1,.04-.23,.06-.31-.05-.07-.11-.03-.23,.04-.32,.14-.2,.31-.38,.07-.62-.03-.03-.03-.09,0-.12,.3-.46-.17-.54-.38-.63-.36-.15-.26-.29-.1-.5,.77-.98,1.68-1.82,2.6-2.65,.54-.48,1.1-.93,1.6-1.44,.33-.19,.57-.48,.84-.74Z"
                style={{ fill: "#f0f0f0" }}
              />
              <path
                d="M248.8,147.27c-.9,.98-1.91,1.85-2.86,2.78-.72,.71-1.49,1.35-2.21,2.05-.93,.91-1.91,1.77-2.87,2.65-.35,.32-.64,.7-1.01,.99-.36,.19-.51,.61-.87,.79-.26,.26-.53,.52-.79,.77h0c-.84,.79-1.63,1.63-2.5,2.38-.77,.67-1.43,1.47-2.31,2.01-.06,.04-.11,.08-.19,.07-.11-.04-.08-.13-.08-.22,0-.04,.02-.08,.04-.12,.46-.49,.98-.92,1.48-1.38,1-.94,1.95-1.95,3-2.84,.83-.7,1.52-1.55,2.37-2.22,.22-.13,.35-.36,.54-.53,.96-.87,1.93-1.73,2.87-2.62,.34-.32,.66-.65,1.01-.97,1.32-1.21,2.64-2.41,3.91-3.68,.09-.09,.18-.24,.35-.14,.04,.07,.08,.15,.13,.22Z"
                style={{ fill: "#cccbcb" }}
              />
              <path
                d="M249.03,150.43s-.04,.06-.06,.1c-.71,.66-1.41,1.32-2.2,1.89-.11,.08-.22,.16-.38,.19,.22-.3,.44-.59,.71-.98-.44,.1-.66,.35-.89,.56-.22,.21-.5,.3-.76,.44-.09,.05-.23,.09-.31-.02-.09-.12,.04-.22,.1-.29,.51-.56,1.03-1.11,1.56-1.65,.48-.47,.99-.91,1.46-1.39,.18-.18,.37-.29,.62-.32,.04,.48,.08,.97,.13,1.45Z"
                style={{ fill: "#e7e6e6" }}
              />
              <path
                d="M221.62,158.79c-.29,.17-.62,.17-.92,.14-.62-.07-1.24-.19-1.85-.34-.5-.13-1.03-.14-1.52-.35-.08-.04-.2-.02-.29,0-.19,.03-.38,.16-.42,.31-.06,.2,.19,.2,.32,.25,.77,.25,1.55,.47,2.32,.73,.79,.26,1.56,.56,2.35,.81,1.13,.36,2.23,.81,3.45,.9,.84,.06,1.66,.39,2.48,.62,.71,.2,1.42,.42,2.13,.62-.22,.26-.51,.16-.76,.13,.62,.15,1.23,.39,1.86,.55,.15,.04,.28,.14,.25,.34-.01,.09,.02,.16,.08,.23,.1,.09,.18,.2,.1,.33-.09,.15-.25,.13-.38,.08-.38-.16-.8-.1-1.24-.32,.35,.26,.94,.04,.94,.67-.44,.17-.81-.15-1.21-.21-.26-.04-.51-.14-.78-.19-.21-.13-.44-.15-.67-.18-.04,0-.07-.03-.1-.05-.02-.03-.03-.07-.03-.11,.04-.17-.1-.16-.19-.2-.51-.24-1.07-.29-1.59-.5-.09-.04-.19-.04-.23-.16,0-.25,.05-.55-.37-.31-.12,.07-.33,0-.33-.16,0-.38-.26-.32-.49-.36-.33-.05-.61,.02-.84,.26-.43,.15-.79-.15-1.17-.24-.76-.18-1.52-.4-2.28-.62-.11-.03-.22-.06-.29-.15-.04-.07,.06-.18-.03-.23-.13-.07-.19,.07-.28,.12-.17,.06-.32,.07-.43-.11,.26-.45,.24-.49-.25-.74-.36-.18-.39-.31-.13-.55-.53-.22-1.07-.4-1.62-.56-.33-.09-.62-.24-.88-.47-.09-.09-.1-.18-.03-.29,.21-.48,.56-.66,1.08-.51,.25,.07,.5-.02,.72-.17,.68,.09,1.34,.28,2,.47,.38,.11,.76,.21,1.15,.29,.16,.03,.35,.03,.37,.27Z"
                style={{ fill: "#d7d7d7" }}
              />
              <path
                d="M233.37,162.39c.18-.05,.29-.33,.55-.15,.03,.02,.17-.08,.24-.14,.65-.58,1.28-1.17,1.91-1.78,.71-.69,1.37-1.44,2.05-2.15,.56-.59,1.01-1.27,1.56-1.87,.64-.7,1.24-1.44,2.04-1.99,0,.02,.02,.04,.03,.05,0,.11-.06,.19-.13,.26-1.01,.95-1.77,2.1-2.7,3.11-.09,.1-.26,.19-.05,.37,.15,.13,.25,.2,.42,.04,.14-.14,.31-.25,.48-.35,.14-.08,.3-.25,.45-.08,.16,.18,.01,.34-.11,.47-.06,.03,.04,.06,0,.03-.01,0,0-.02,.02-.03,.12-.1,.27-.15,.39-.06,.14,.12,0,.26-.06,.37-.11,.2-.28,.35-.43,.56,.37-.16,.65-.52,1.09-.37-.11,.41-.46,.61-.77,.84-.39-.01-.7,.19-1,.4-.09,.06-.2,.16-.3,.05-.09-.1,.01-.21,.08-.3,.05-.07,.11-.13,.17-.19,.19-.21,.45-.4,.07-.67-.07-.05,.02-.16-.03-.26-1.65,1.34-3.18,2.78-4.58,4.37,.23-.1,.37-.31,.58-.43,.07-.04,.16-.09,.23-.02,.07,.07,.02,.16-.01,.23-.15,.31-.45,.46-.71,.65-.24,.06-.4,.24-.59,.38-.13,.1-.26,.21-.44,.2-.06-.01-.11-.04-.14-.1,0-.2,.15-.32,.27-.46,.11-.13,.19-.27,.3-.41-.26,.02-.42,.33-.71,.25-.07-.08-.09-.18-.07-.28,.12-.11,.05-.18-.06-.24-.06-.1-.07-.2,0-.29Z"
                style={{ fill: "#e7e6e6" }}
              />
              <path
                d="M233.21,165.36c-.18-.1-.4-.1-.59-.15-.43-.21-.91-.23-1.36-.38-.26-.09-.59-.05-.74-.36-.04-.31-.28-.37-.52-.4-.23-.03-.44-.07-.6-.26,.1-.14,.24-.1,.34-.05,.36,.21,.81,.06,1.16,.29,.07,.05,.21,.08,.26-.03,.06-.14-.05-.2-.16-.24-.13-.05-.25-.06-.1-.27,.16-.24-.12-.23-.26-.27-.67-.2-1.35-.4-2.02-.66,.35-.08,.71,.05,1.04-.09,.36,.08,.71,.21,1.08,.21,.98,.18,1.92,.53,2.89,.73,.09,.12,.08,.25,.03,.38,.03,.02,.06,.05,.09,.07,.1,.11,.06,.26,.12,.39,.04,.12,.06,.24,.08,.37"
                style={{ fill: "#ccc" }}
              />
              <path
                d="M229.09,160.35c1.3,.36,2.59,.79,3.91,1.08,.08,.02,.14,.08,.21,.13l-.05,.18c.09,.15,.17,.29-.11,.29-.48,.11-.9-.16-1.28-.31-1.22-.5-2.5-.79-3.75-1.17-1.34-.41-2.69-.79-4.05-1.14-.78-.2-1.54-.48-2.34-.62-.09-.13-.24-.14-.37-.17-.69-.12-1.35-.35-2.02-.54-.36-.1-.76-.12-1.11-.29-.1,.02-.18,0-.23-.1-.09-.16-.27-.11-.4-.18-.14-.07-.37-.06-.36-.31,.21-.04,.4,.01,.61,.08,.63,.2,1.28,.37,1.92,.54,.43,.12,.86,.22,1.29,.33,1.1,.16,2.14,.56,3.22,.83,.2,.15,.43,.15,.66,.18"
                style={{ fill: "#b3b3b3" }}
              />
              <path
                d="M233.58,163.38c-.35,.17-.65-.05-.96-.14-.63-.18-1.28-.26-1.87-.57,.14-.02,.14-.17,.21-.24,.15-.16,.11-.24-.09-.27-.21-.03-.53-.08-.48-.29,.06-.26,.34-.04,.5,0,.69,.16,1.4,.22,2.08,.47,.12,.05,.27,.03,.4,.04,.02,.11,.05,.22,.07,.33,.06,.05,.07,.1,.03,.17l.07,.33c.06,.05,.07,.1,.03,.17Z"
                style={{ fill: "#d9d9d9" }}
              />
              <path
                d="M233.04,162.03c.16-.05,.14-.17,.11-.29,.71-.41,1.23-1.04,1.83-1.57,.7-.62,1.37-1.27,2.06-1.9,.2-.18,.4-.36,.57-.56,.15-.18,.33-.35,.58-.4-.07,.25-.28,.38-.45,.55-1.17,1.15-2.31,2.32-3.54,3.39-.18,.16-.39,.27-.58,.42-.14,.1-.31,.15-.34,.39-.02,.18-.16,.05-.24-.02Z"
                style={{ fill: "#d9d9d9" }}
              />
              <path
                d="M245.56,151.16c-.2,.32-.44,.61-.79,.77-.81,.74-1.7,1.39-2.51,2.12-.14,.13-.28,.34-.54,.25,.26-.4,.65-.71,1.02-.98,.71-.52,1.31-1.18,2.1-1.6,.27-.15,.42-.46,.72-.57Z"
                style={{ fill: "#e7e6e6" }}
              />
              <path
                d="M238.19,157.3c.17-.36,.45-.59,.79-.77-.19,.33-.42,.63-.79,.77Z"
                style={{ fill: "#d9d9d9" }}
              />
              <path
                d="M238.98,156.53c.33-.23,.42-.7,.87-.79-.28,.27-.44,.68-.87,.79Z"
                style={{ fill: "#d9d9d9" }}
              />
              <path
                d="M241.71,154.31c.91-.73,1.83-1.45,2.73-2.19,.1-.08,.18-.17,.32-.19-.38,.59-.99,.95-1.49,1.41-.97,.88-1.91,1.78-2.74,2.78-.12,.15-.17,.25,.1,.23,.1,0,.21-.02,.24,.11,.07,.25,.26,.23,.51,.14-.11,.19-.19,.31-.26,.43-.03,.06-.11,.15-.05,.19,.51,.31,.04,.48-.09,.7-.04,.07-.07,.15-.03,.25,.29,.01,.55-.2,.85-.16-.17,.3-.31,.64-.73,.67-.47-.01-.78,.41-1.25,.52,.13-.44,.55-.63,.65-1.04-.26-.09-.4,.14-.68,.27,.14-.18,.23-.29,.31-.41,.06-.08,.13-.17,.06-.27-.1-.12-.18,0-.25,.05-.21,.13-.42,.27-.62,.44-.12,.11-.35,.46-.44-.05-.68-.25-.07-.46,.05-.61,.65-.82,1.34-1.62,2-2.44,.25-.31,.65-.46,.81-.84Z"
                style={{ fill: "#e8e8e8" }}
              />
              <path
                d="M217.14,157.2c.18,.24,.46,.22,.71,.29,.07,.02,.32,.01,.07,.17-.16,.18-.32,.06-.48,.01-.3-.11-.5,.14-.74,.22-.43,.15-.6,.01-.53-.45,.02-.03,.05-.06,.08-.08,.05-.01,.11,0,.16,0,.02,0,.05,.05,.07,0,0,0-.04-.04-.04-.07,.01-.06,.06-.09,.1-.12,.2-.05,.41-.19,.6,.02Z"
                style={{ fill: "#949495" }}
              />
              <path
                d="M247.88,150.92c-.18,.17-.36,.34-.55,.52,.09-.27,.27-.45,.55-.52Z"
                style={{ fill: "#f0f0f0" }}
              />
              <path
                d="M217.22,160.48c-.49-.3-.85-.7-1.07-1.23,.08-.04,.25,.01,.18-.19-.05-.13-.08-.28,.07-.38,.71,.52,1.59,.59,2.37,.93,.1,.04,.25,.04,.27,.17,.04,.22-.15,.08-.23,.13-.16,.09-.05,.18,.01,.22,.14,.09,.31,.14,.46,.21,.11,.06,.29,.06,.23,.28-.05,.17,.06,.43-.27,.41-.12,.08-.22-.01-.32-.05-.18-.11-.39-.1-.59-.12-.06-.01-.11-.03-.16-.06-.3-.15-.65-.14-.94-.31Z"
                style={{ fill: "#d4d4d4" }}
              />
              <path
                d="M221.37,161.96c-.25-.1-.54-.05-.77-.2-.02-.02-.05-.03-.07-.05-.25-.09-.53-.05-.76-.2-.26-.14-.51-.29-.82-.23-.36-.22-.83-.13-1.14-.46,.08-.2,.09-.2,.42-.09,.03,.02,.07,.04,.1,.07,.21,.06,.42,.07,.63,.13,.09,.04,.19,.08,.28,.11,.14,.11,.29,.12,.45,.08,.14-.08,.22,0,.28,.11,.65,.19,1.31,.35,1.96,.56,.44,.14,.9,.18,1.32,.39,.15,.08,.32,.12,.49,.07,.69,.16,1.41,.23,2.03,.61,.67,.2,1.35,.41,2.02,.61,.08,.02,.18,.04,.18,.15,0,.11-.12,.09-.19,.12-.22,0-.44,0-.63-.14-.05-.07-.11-.05-.17-.04-.52-.16-1.07-.24-1.58-.45h0c-.24-.09-.52-.05-.74-.19-.03-.02-.06-.04-.09-.06-.25-.05-.51-.08-.75-.19"
                style={{ fill: "#e4e4e3" }}
              />
              <path
                d="M225.76,162.86c-.67-.22-1.4-.27-2.03-.61,.04-.35,.37-.28,.56-.34,.19-.06,.44,.03,.65,.07,.15,.03,.29,.1,.2,.28-.06,.12-.05,.18,.08,.21,.1,.02,.2,.05,.25-.07,.03-.1,.03-.19,.18-.16,.15,.03,.15,.12,.15,.25,0,.13,.23,.27-.04,.37Z"
                style={{ fill: "#d4d4d4" }}
              />
              <path
                d="M216.39,158.68c-.04,.14-.02,.26,.06,.39,.06,.09,.02,.24-.06,.3-.13,.1-.11-.16-.24-.12-.23-.33-.18-.72-.22-1.08,.09-.25,.05-.56,.3-.75,.03,.15-.13,.36,.09,.44,.25,.09,.48-.09,.63-.21,.19-.15,.32-.14,.5-.06,.05,.18,.02,.33-.2,.3-.49-.05-.77,.17-.91,.62-.07,.07-.06,.13,.03,.17Z"
                style={{ fill: "#b8b8b9" }}
              />
              <path
                d="M216.36,158.51c.04-.45,.34-.74,.85-.7,.22,.01,.19-.14,.26-.22,.15,.05,.28,.15,.45,.08,.07,.04,.13,.09,.2,.13-.19,.39-.56,.3-.84,.24-.4-.09-.67-.07-.8,.37-.01,.04-.08,.07-.13,.11Z"
                style={{ fill: "#d4d4d4" }}
              />
              <path
                d="M219.96,161.22c-.09-.04-.19-.08-.28-.11-.02-.18,.1-.22,.24-.2,.09,.01,.2,.05,.21,.16,0,.1-.09,.13-.17,.15Z"
                style={{ fill: "#d4d4d4" }}
              />
              <path
                d="M223.72,161.44c-.23,.04-.37-.02-.49-.15-.01-.01,.03-.1,.05-.1,.18-.02,.33,.04,.44,.25Z"
                style={{ fill: "#e4e4e3" }}
              />
              <path
                d="M235.1,164.45c-.05,.03-.1,.07-.15,.1-.03,.15-.14,.22-.28,.23-.26-.13-.52-.3-.84-.24,.03-.09,.01-.18-.05-.25,.22-.45,.62-.71,1-.99,.21-.29,.64-.38,.74-.81-.4,.13-.56,.6-1.02,.6,1.46-1.78,3.14-3.33,4.95-4.77,.13,.2-.28,.53,.23,.55,.11,0,.02,.26-.06,.36-.18,.23-.38,.44-.62,.73,.5-.16,.78-.67,1.3-.5-.31,.31-.6,.65-.94,.93-.77,.65-1.44,1.4-2.21,2.04-.47,.39-.96,.8-1.31,1.33-.25,.22-.38,.57-.72,.69Z"
                style={{ fill: "#e4e4e3" }}
              />
              <path
                d="M234.82,161.95c.26-.56,.78-.87,1.21-1.27,.22-.2,.46-.36,.62-.62,.07-.11,.18-.29,.32-.18,.14,.11,0,.28-.11,.35-.51,.29-.81,.8-1.26,1.17-.25,.2-.45,.45-.77,.55Z"
                style={{ fill: "#e4e4e3" }}
              />
              <path
                d="M233.58,163.38c-.01-.06-.02-.11-.03-.17,.24-.21,.53-.34,.87-.49-.17,.46-.47,.75-.74,1.06-.03-.14-.06-.27-.1-.41Z"
                style={{ fill: "#e8e8e8" }}
              />
              <path
                d="M234.78,163.3c-.29,.37-.66,.66-1,.99-.04-.14-.06-.28-.01-.43,.28-.05,.44-.29,.67-.43,.11-.06,.17-.26,.35-.14Z"
                style={{ fill: "#e8e8e8" }}
              />
              <path
                d="M237.4,159.53c.07-.26,.2-.4,.54-.46-.23,.17-.26,.41-.54,.46Z"
                style={{ fill: "#e4e4e3" }}
              />
              <path
                d="M234.47,162.7c.08-.24,.16-.36,.31-.44q0,.21-.31,.44Z"
                style={{ fill: "#e8e8e8" }}
              />
              <path
                d="M233.48,162.88c-.01-.06-.02-.11-.03-.17,.11,.02,.23-.23,.3-.04,.08,.2-.16,.15-.27,.2Z"
                style={{ fill: "#e8e8e8" }}
              />
              <path
                d="M233.83,164.54c.36-.3,.59-.04,.84,.18-.01,.29-.21,.42-.45,.52"
                style={{ fill: "#e8e8e8" }}
              />
              <path
                d="M218.21,160.72c-.14,.05-.32-.13-.42,.09-.24-.04-.42-.16-.58-.34,.34,.06,.69,.05,1,.24Z"
                style={{ fill: "#d7d7d7" }}
              />
              <path
                d="M216.27,157.4c.03-.09,.11-.11,.19-.11,.08,.1,.25,0,.31,.17-.18,.04-.34,.02-.5-.06Z"
                style={{ fill: "#b8babc" }}
              />
              <path
                d="M218.95,160.91c-.24,.09-.44,0-.63-.13,.22-.01,.45-.07,.63,.13Z"
                style={{ fill: "#d7d7d7" }}
              />
            </g>
            <g>
              <polygon
                points="216.68 157 232.45 143.14 248.67 146.49 232.69 161.68 216.68 157"
                style={{ fill: "url(#linear-gradient-65)" }}
              />
              <g style={{ "clip-path": "url(#clippath-3)" }}>
                <circle
                  cx="247.33"
                  cy="146.87"
                  r="1.88"
                  style={{ fill: "#ef63a3" }}
                />
                <circle
                  cx="231.77"
                  cy="158.99"
                  r=".43"
                  style={{ fill: "#ef63a3" }}
                />
                <circle
                  cx="232.57"
                  cy="159.82"
                  r=".2"
                  style={{ fill: "#98bee3" }}
                />
                <ellipse
                  cx="233.22"
                  cy="142.92"
                  rx="2.92"
                  ry="2.21"
                  transform="translate(-24.43 51.08) rotate(-11.88)"
                  style={{ fill: "#98bee3" }}
                />
                <ellipse
                  cx="231.02"
                  cy="143.44"
                  rx="2.92"
                  ry="2.21"
                  transform="translate(-24.58 50.64) rotate(-11.88)"
                  style={{ fill: "#98bee3" }}
                />
                <g>
                  <rect
                    x="243.13"
                    y="148.33"
                    width=".17"
                    height=".74"
                    rx=".07"
                    ry=".07"
                    transform="translate(-25.4 53.26) rotate(-11.88)"
                    style={{ fill: "#ef63a3" }}
                  />
                  <rect
                    x="243.14"
                    y="148.32"
                    width=".17"
                    height=".74"
                    rx=".07"
                    ry=".07"
                    transform="translate(338.65 -119.94) rotate(78.12)"
                    style={{ fill: "#ef63a3" }}
                  />
                </g>
                <g>
                  <rect
                    x="241.88"
                    y="148.86"
                    width=".22"
                    height=".94"
                    rx=".07"
                    ry=".07"
                    transform="translate(-25.56 53.02) rotate(-11.88)"
                    style={{ fill: "#ef63a3" }}
                  />
                  <rect
                    x="241.88"
                    y="148.84"
                    width=".22"
                    height=".94"
                    rx=".07"
                    ry=".07"
                    transform="translate(338.28 -118.24) rotate(78.12)"
                    style={{ fill: "#ef63a3" }}
                  />
                </g>
                <g>
                  <rect
                    x="222.23"
                    y="154.55"
                    width=".17"
                    height=".74"
                    rx=".07"
                    ry=".07"
                    transform="translate(-27.13 49.09) rotate(-11.88)"
                    style={{ fill: "#ef63a3" }}
                  />
                  <rect
                    x="222.24"
                    y="154.53"
                    width=".17"
                    height=".74"
                    rx=".07"
                    ry=".07"
                    transform="translate(328.13 -94.56) rotate(78.12)"
                    style={{ fill: "#ef63a3" }}
                  />
                </g>
                <g>
                  <rect
                    x="220.98"
                    y="155.07"
                    width=".22"
                    height=".94"
                    rx=".07"
                    ry=".07"
                    transform="translate(-27.29 48.85) rotate(-11.88)"
                    style={{ fill: "#ef63a3" }}
                  />
                  <rect
                    x="220.99"
                    y="155.05"
                    width=".22"
                    height=".94"
                    rx=".07"
                    ry=".07"
                    transform="translate(327.76 -92.86) rotate(78.12)"
                    style={{ fill: "#ef63a3" }}
                  />
                </g>
              </g>
            </g>
            <g>
              <path
                d="M227.8,149.72l.16,.05-.45,.41,.5,.18,.45-.41,.16,.05-1.07,.97-.16-.05,.5-.46-.5-.18-.5,.46-.16-.05,1.07-.97Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
              <path
                d="M229.11,150.33l-.4-.14,.12-.11,.95,.33-.12,.11-.4-.14-.96,.87-.15-.05,.96-.87Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
              <path
                d="M229.98,150.49l.19,.07-.29,.47-.11,.18h0s.23-.13,.23-.13l.63-.35,.19,.07-1.07,.97-.15-.05,.54-.49c.1-.09,.31-.25,.4-.33h0s-.28,.16-.28,.16l-.59,.32-.11-.04,.25-.44,.14-.21h0c-.08,.09-.25,.26-.35,.35l-.54,.49-.14-.05,1.07-.97Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
              <path
                d="M231.19,150.91l.15,.05-.96,.87,.59,.21-.12,.1-.74-.26,1.07-.97Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
              <path
                d="M232.42,152.35c.31-.28,.89-.15,1.12-.36,.06-.06,.09-.12,0-.15s-.2,.01-.29,.09c-.2,.18-.23,.51-.16,.72,.02,.09,.06,.16,.11,.2l-.15,.09c-.06-.05-.11-.13-.14-.24-.07-.26-.01-.62,.2-.82,.14-.13,.36-.19,.52-.14s.15,.16,.02,.28c-.27,.24-.85,.15-1.09,.36-.12,.11-.1,.21,.03,.26,.09,.03,.23,.02,.38-.02,.19-.05,.37-.14,.56-.26l.14,.05c-.21,.13-.43,.23-.66,.31-.2,.06-.38,.08-.55,.02-.21-.07-.23-.24-.06-.4Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
              <path
                d="M234.91,152.9c.34-.31,.78-.42,1.09-.31,.14,.05,.2,.15,.2,.23l-.17,.05c0-.08-.04-.14-.14-.17-.23-.08-.54,.02-.81,.26s-.29,.45-.06,.53c.11,.04,.24,.03,.39-.01v.11c-.19,.06-.36,.07-.52,0-.3-.1-.32-.37,.03-.69Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
              <path
                d="M235.61,153.65l.19-.05c.01,.11,.08,.2,.22,.24,.16,.06,.33,.03,.43-.06,.11-.1,.05-.17-.02-.25l-.11-.12c-.08-.08-.14-.2,.02-.34s.45-.2,.68-.12c.15,.05,.23,.15,.24,.25l-.17,.05c-.02-.08-.07-.15-.19-.19-.14-.05-.29-.03-.39,.06-.1,.09-.03,.17,.04,.24l.1,.12c.1,.1,.14,.21-.02,.35-.17,.15-.47,.22-.73,.13-.18-.06-.26-.17-.28-.3Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
              <path
                d="M236.71,154.04l.19-.05c.01,.11,.08,.2,.22,.24,.16,.06,.33,.03,.43-.06,.11-.1,.05-.17-.02-.25l-.11-.12c-.08-.08-.14-.2,.02-.34s.45-.2,.68-.12c.15,.05,.23,.15,.24,.25l-.17,.05c-.02-.08-.07-.15-.19-.19-.14-.05-.29-.03-.39,.06-.1,.09-.03,.17,.04,.24l.1,.12c.1,.1,.14,.21-.02,.35-.17,.15-.47,.22-.73,.13-.18-.06-.26-.17-.28-.3Z"
                style={{
                  fill: "#231f20",
                  stroke: "#181c1e",
                  "stroke-miterlimit": "10",
                  "stroke-width": "0.05px",
                }}
              />
            </g>
            <path
              d="M216.55,157.39l15.87-14.01,16.11,3.32-.42,.67-15.33,14.24-15.11-4.33s-1.9-.22-1.55,1.85,2.92,2.52,2.92,2.52l14.9,3.66,15.47-14.21"
              style={{
                fill: "none",
                stroke: "url(#linear-gradient-66)",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "0.5px",
              }}
            />
          </g>
        </a>
        <path
          d="M268.39,138.02c-2.94-2.2-20.78-1.07-24.75,5.36"
          style={{
            fill: "none",
            stroke: "url(#linear-gradient-67)",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "0.5px",
          }}
        />
        <path
          d="M244.3,143.31l-1.18,.61s-.08-.94-.32-1.27,.96,.66,1.5,.66Z"
          style={{
            fill: "none",
            stroke: "url(#linear-gradient-68)",
            "stroke-miterlimit": "10",
            "stroke-width": "0.75px",
          }}
        />
        <g>
          <path
            d="M272.43,138.75s-.08-.05-.13-.07c-.05-.02-.1-.05-.15-.07-.05-.02-.11-.04-.16-.06-.05-.02-.1-.04-.15-.06-.02,0-.04-.01-.07-.02-.02,0-.05-.02-.07-.02-.02,0-.04-.01-.05-.01-.02,0-.02,0-.03,0-.03,.07-.06,.16-.09,.26-.03,.1-.07,.2-.1,.3-.03,.1-.06,.19-.08,.28-.02,.09-.04,.15-.04,.19,0,.02,.02,.05,.05,.08s.09,.05,.14,.07c.02,0,.05,.02,.07,.02,.03,0,.05,.02,.08,.03,.03,.01,.05,.03,.07,.05,.01,.02,.02,.04,0,.06,0,.02-.02,.04-.03,.06-.01,.02-.05,.01-.1,0-.02,0-.06-.02-.11-.04-.05-.02-.1-.04-.16-.07-.06-.03-.12-.05-.18-.07-.06-.02-.12-.03-.17-.04-.12-.02-.24-.03-.35-.04-.11,0-.21,0-.3,0s-.17,0-.24,.02c-.07,.01-.11,.03-.15,.04-.02,.01-.03,.01-.03,.01,0,0-.01,0-.02,0,0,0-.02-.01-.03-.04s-.02-.05-.01-.08c0-.01,.04-.03,.09-.04s.12-.02,.2-.03c.08,0,.16-.01,.24-.01,.08,0,.15,0,.21,0,.02-.02,.05-.07,.1-.16s.1-.22,.17-.4c.07-.18,.16-.4,.26-.67,.1-.27,.22-.59,.36-.96,.04-.1,.07-.21,.11-.32,.04-.11,.07-.21,.09-.31,.03-.09,.05-.18,.06-.25,.01-.07,.02-.13,0-.16,0-.03-.03-.05-.07-.07-.04-.02-.08-.04-.13-.06l-.17-.06s-.03-.01-.05-.02c-.02,0-.04-.02-.06-.03-.02-.01-.03-.02-.04-.04,0-.01-.01-.03,0-.04,.01-.03,.02-.05,.04-.06s.06,0,.12,.02c.03,.01,.06,.02,.11,.04,.04,.02,.09,.04,.13,.05,.04,.02,.09,.03,.13,.05,.04,.02,.08,.03,.12,.05,.09,.03,.21,.07,.35,.1,.14,.03,.29,.07,.43,.12,.11,.03,.22,.07,.33,.11,.11,.04,.21,.07,.31,.11,.1,.03,.18,.06,.25,.09,.07,.02,.12,.04,.15,.04,.05-.07,.11-.13,.16-.18,.05-.05,.1-.07,.13-.06,.01,0,.03,.02,.05,.04,.02,.02,.03,.04,.02,.05-.01,0-.02,.01-.03,.02-.02,.01-.03,.02-.03,.03-.06,.05-.11,.11-.18,.2-.06,.08-.12,.17-.17,.27-.05,.09-.1,.19-.15,.28-.04,.09-.07,.17-.08,.24-.02,.04-.05,.06-.07,.05-.05-.02-.07-.03-.07-.05s0-.04,.01-.05c.01-.02,.03-.05,.04-.08,.02-.04,.03-.06,.04-.09,.03-.07,.02-.14,0-.2-.03-.07-.07-.13-.14-.19s-.15-.12-.25-.17c-.1-.06-.21-.1-.32-.14-.03-.01-.07-.03-.13-.04-.05-.02-.1-.02-.13,0-.01,.02-.04,.07-.07,.14-.03,.07-.07,.16-.11,.26-.04,.1-.08,.21-.13,.32-.04,.11-.09,.23-.13,.33-.04,.11-.08,.21-.11,.29-.03,.09-.06,.16-.07,.2,.06,.02,.11,.04,.16,.06l.16,.06c.17,.06,.32,.12,.46,.15,.13,.04,.22,.06,.27,.06,.03,0,.05,0,.08-.01s.04-.02,.06-.04,.03-.03,.05-.03c.01-.01,.03-.01,.04,0,.01,0,.03,.02,.04,.04s0,.03,0,.04c-.03,.03-.06,.06-.09,.12-.03,.05-.07,.11-.1,.17-.03,.06-.07,.13-.1,.2-.03,.07-.06,.14-.08,.2,0,.01,0,.02-.01,.04,0,.01,0,.03-.01,.04,0,0-.01,.01-.03,.01-.01,0-.03,0-.04,0s-.03-.01-.04-.02c-.01,0-.01-.01-.01-.02,0-.02,.01-.04,.02-.06,0-.03,0-.05,0-.08,0-.03,0-.06-.02-.08-.01-.03-.04-.06-.07-.09l-.06-.04Z"
            style={{ fill: "url(#linear-gradient-69)" }}
          />
          <path
            d="M275.55,138.78s-.09,.03-.15,.06c-.06,.02-.12,.04-.18,.06-.06,.02-.12,.03-.18,.04-.06,0-.11,0-.16-.01-.04-.01-.07-.04-.1-.07-.02-.03-.05-.06-.07-.09-.02-.03-.04-.06-.06-.09-.02-.03-.04-.05-.07-.06-.08-.03-.15-.02-.23,.03-.08,.04-.15,.11-.22,.19-.07,.09-.13,.18-.19,.29-.06,.11-.1,.22-.14,.32-.03,.09-.05,.16-.07,.22-.01,.06-.02,.11-.02,.15,0,.04,.01,.07,.03,.09,.02,.02,.05,.04,.08,.05,.04,.01,.08,.02,.13,.03,.01,0,.01,0,.01,.02,0,.02,0,.03,0,.04,0,0,0,.01-.02,.01-.01,0-.02,0-.02,0-.07,0-.15,0-.22,.01s-.14,.01-.19,.02c-.05,0-.1,0-.16,0-.06,0-.11,0-.15-.02-.05-.02-.08-.04-.11-.06s-.03-.05-.03-.06c0-.01,.01-.03,.02-.03,.01,0,.03-.03,.04-.06,.02-.04,.05-.09,.07-.15,.03-.06,.06-.12,.09-.18,.03-.07,.06-.13,.09-.21,.03-.07,.06-.14,.09-.21,.06-.16,.1-.3,.13-.42,.03-.11,.04-.21,.04-.29,0-.08-.02-.14-.05-.19-.03-.05-.09-.08-.15-.11-.02,0-.03-.01-.04-.01-.01,0-.02,0-.04,0-.02,0-.02-.02-.02-.04s.02-.03,.04-.03c.04,0,.1-.02,.18-.04,.08-.01,.16-.03,.24-.04s.16-.02,.24-.02c.08,0,.13,0,.16,0,.04,.01,.06,.04,.08,.07,.02,.03,.02,.07,.02,.11,0,.04,0,.09-.02,.14-.01,.05-.02,.1-.04,.14-.01,.04-.03,.07-.04,.11-.02,.04-.03,.08-.05,.12,.2-.14,.37-.25,.51-.32,.14-.07,.26-.08,.35-.05,.03,.01,.06,.04,.09,.08,.02,.04,.05,.09,.07,.13s.05,.1,.08,.14c.03,.04,.07,.07,.11,.09,.04,.01,.07,.02,.09,.02,.02,0,.04,0,.05,0,.02,0,.03,.03,.02,.06h0Z"
            style={{ fill: "url(#linear-gradient-70)" }}
          />
          <path
            d="M276.82,140.73s-.11,.05-.2,.09c-.09,.04-.19,.07-.3,.1-.12,.03-.24,.04-.37,.04-.13,0-.26-.02-.39-.07-.12-.04-.23-.1-.32-.18-.1-.08-.18-.17-.24-.27-.06-.1-.1-.22-.11-.36-.01-.13,0-.28,.07-.44,.05-.13,.09-.24,.14-.32,.05-.09,.1-.16,.16-.22,.05-.06,.11-.11,.16-.15,.05-.04,.11-.07,.16-.1,.07-.03,.14-.06,.22-.09s.17-.04,.26-.05,.18-.01,.27,0c.09,0,.18,.03,.27,.06,.16,.06,.27,.13,.34,.21,.07,.08,.09,.17,.05,.26-.02,.06-.06,.1-.11,.14,.03,0,.07,0,.13,0,.05,0,.1,0,.16-.01,.05,0,.1,0,.14-.01,.04,0,.07,0,.09-.01,0,0,.01,0,.02,0,0,0,0,.01,0,.02-.01,.04-.03,.07-.06,.08-.02,.02-.05,.03-.07,.04-.06,.01-.14,.02-.24,.04-.1,.01-.21,.02-.34,.03-.12,0-.25,.02-.38,.02-.13,0-.25,.02-.36,.02-.11,0-.21,.02-.3,.02-.08,0-.14,.01-.17,.02-.04,.1-.05,.2-.04,.29,0,.1,.04,.19,.08,.28,.05,.09,.11,.17,.2,.24,.08,.07,.18,.13,.3,.17,.1,.04,.2,.06,.29,.07,.09,0,.17,0,.24,0,.07,0,.12-.01,.16-.03,.04,0,.06-.01,.07-.01,.01,0,.02,.01,.03,.03,0,.01,0,.03,0,.04Zm-1.28-1.2c.05,0,.12,0,.19,0,.07,0,.14,0,.21-.01,.07,0,.13-.02,.19-.02s.1-.02,.14-.03c.07-.02,.11-.07,.15-.16,.01-.03,.02-.07,.02-.11,0-.04,0-.08-.02-.12-.01-.04-.04-.08-.07-.11s-.07-.06-.11-.07c-.04-.01-.09-.02-.14,0-.06,.01-.12,.04-.18,.09-.06,.05-.13,.12-.19,.21-.06,.09-.12,.21-.17,.36Z"
            style={{ fill: "url(#linear-gradient-71)" }}
          />
          <path
            d="M278.82,141.45s-.11,.05-.2,.09c-.09,.04-.19,.07-.3,.1-.12,.03-.24,.04-.37,.04-.13,0-.26-.02-.39-.07-.12-.04-.23-.1-.32-.18-.1-.08-.18-.17-.24-.27s-.1-.22-.11-.36c-.01-.13,0-.28,.07-.43,.05-.13,.09-.24,.14-.32,.05-.09,.1-.16,.16-.22,.05-.06,.11-.11,.16-.15,.05-.04,.11-.07,.16-.1,.06-.03,.14-.06,.22-.09,.08-.02,.17-.04,.26-.05,.09,0,.18-.01,.27,0,.09,0,.18,.03,.27,.06,.15,.06,.27,.13,.34,.21,.07,.08,.09,.17,.05,.26-.02,.06-.06,.1-.11,.14,.03,0,.07,0,.13,0,.05,0,.1,0,.16-.01,.05,0,.1,0,.14-.01,.04,0,.07,0,.09-.01,0,0,.01,0,.02,0,0,0,0,.01,0,.02-.01,.04-.03,.07-.06,.08-.02,.02-.05,.03-.07,.04-.06,.01-.13,.02-.24,.04s-.21,.02-.34,.03c-.12,0-.25,.02-.38,.03-.13,0-.25,.01-.37,.02-.11,0-.21,.02-.3,.02-.08,0-.14,.01-.17,.02-.03,.1-.05,.2-.04,.29,0,.1,.04,.19,.08,.28,.05,.09,.11,.17,.19,.24s.18,.13,.3,.17c.1,.04,.2,.06,.29,.07,.09,0,.17,0,.24,0,.07,0,.12-.01,.16-.03,.04,0,.06-.01,.06-.01,.01,0,.02,.01,.03,.03,0,.01,.01,.03,0,.04Zm-1.28-1.2c.06,0,.12,0,.19,0s.14,0,.21-.02c.07,0,.13-.02,.19-.02s.1-.02,.14-.03c.06-.02,.11-.07,.15-.16,.01-.03,.02-.07,.02-.11s0-.08-.02-.12c-.01-.04-.04-.08-.07-.11s-.07-.06-.12-.07c-.04-.01-.09-.02-.14,0-.06,.01-.11,.04-.18,.09-.06,.05-.13,.12-.19,.21-.06,.09-.12,.21-.17,.36Z"
            style={{ fill: "url(#linear-gradient-72)" }}
          />
          <path
            d="M283.05,144.37s.01-.09,.01-.14c0-.05-.03-.08-.08-.1-.04-.02-.1-.03-.18-.06-.08-.02-.16-.04-.24-.07-.09-.02-.17-.05-.26-.07-.08-.02-.16-.05-.22-.07-.25-.09-.46-.21-.62-.35s-.29-.3-.38-.47c-.09-.17-.13-.36-.14-.56s.03-.41,.11-.62c.11-.3,.25-.53,.42-.71,.17-.18,.36-.31,.57-.39,.21-.08,.43-.11,.66-.1,.23,0,.47,.06,.69,.14,.07,.03,.14,.05,.22,.09,.08,.03,.15,.07,.22,.1,.07,.03,.13,.06,.18,.09,.05,.03,.09,.05,.11,.06,.01,0,.04-.01,.07-.06,.03-.05,.07-.1,.11-.15,.04-.05,.09-.1,.14-.14,.05-.04,.09-.06,.13-.04,.04,.03,.07,.06,.09,.09,.01,.02,0,.04-.06,.06-.08,.03-.16,.08-.24,.15-.08,.07-.15,.16-.23,.27-.03,.03-.06,.08-.1,.14-.04,.06-.08,.14-.12,.22-.01,.02-.04,.03-.06,.01-.03-.01-.04-.04-.04-.08,0-.05-.01-.1-.03-.17-.02-.06-.06-.13-.11-.2-.05-.07-.12-.14-.2-.2-.08-.06-.18-.12-.29-.16-.13-.05-.26-.05-.39-.03-.13,.03-.25,.09-.37,.17-.12,.08-.22,.19-.32,.31-.1,.13-.18,.26-.24,.41,.02,.01,.07,.04,.14,.07s.15,.07,.23,.1c.08,.03,.17,.07,.25,.1,.08,.03,.14,.05,.18,.06,.09,.03,.18,.06,.28,.09,.09,.02,.18,.04,.26,.05,.08,.01,.15,.02,.21,.02,.06,0,.11,0,.14-.02,.02-.01,.04-.01,.06,0,.02,.01,.03,.02,.04,.04-.02,.02-.04,.05-.07,.09-.03,.04-.06,.08-.1,.13-.04,.05-.07,.1-.11,.17-.03,.06-.07,.13-.09,.2-.01,.03-.04,.03-.06,0-.02-.02-.03-.04-.03-.07,0-.05-.01-.1-.05-.14-.04-.04-.09-.08-.15-.12-.07-.04-.14-.08-.23-.11-.09-.03-.18-.07-.29-.11-.19-.07-.35-.13-.47-.17s-.21-.07-.26-.08c-.03,.09-.06,.18-.08,.29-.02,.11-.04,.21-.04,.33,0,.11,0,.22,.02,.34,.02,.11,.05,.22,.1,.32,.05,.1,.12,.19,.21,.27,.09,.08,.21,.15,.35,.2,.13,.05,.26,.07,.37,.08,.11,0,.22,0,.31-.03,.09-.02,.17-.05,.23-.09,.06-.03,.11-.07,.14-.1,.01,0,.02,0,.02,0,.01,0,.02,.01,.04,.03s.02,.03,.01,.04c-.02,.03-.04,.06-.06,.09-.04,.07-.08,.15-.11,.24-.03,.07-.05,.15-.07,.22-.02,.07-.03,.14-.03,.19-.03,0-.06,0-.08-.01-.02,0-.03-.03-.03-.06Z"
            style={{ fill: "url(#linear-gradient-73)" }}
          />
          <path
            d="M284.46,141.17c.02-.06,.05-.1,.09-.1,.03,0,.07,0,.1,.02,.1,.03,.19,.07,.26,.09,.08,.03,.15,.05,.22,.08,.06,.02,.13,.04,.18,.05,.06,.01,.11,.02,.17,.02,.03,0,.04,0,.03,.03,0,.02,0,.03-.01,.05,0,.02-.02,.03-.04,.03-.02,0-.04,0-.07,0-.02,0-.05,0-.07-.01-.02,0-.03,0-.04,0-.02,.03-.05,.09-.1,.19s-.1,.21-.17,.35c-.06,.13-.13,.28-.19,.43s-.12,.3-.17,.44c.04-.02,.09-.04,.17-.07,.08-.03,.17-.06,.27-.08s.21-.03,.32-.03,.22,.02,.33,.06c.11,.04,.2,.09,.28,.16s.14,.15,.19,.24c.04,.09,.07,.19,.07,.3s-.01,.23-.06,.35c-.04,.1-.09,.2-.17,.29s-.17,.18-.27,.26c-.1,.08-.22,.15-.35,.21-.13,.06-.26,.11-.4,.14-.14,.03-.28,.05-.41,.05-.14,0-.27-.03-.4-.07-.14-.05-.25-.11-.34-.17-.08-.07-.14-.13-.18-.19-.04-.06-.06-.11-.07-.16-.01-.04-.02-.07-.01-.08,.02-.02,.05-.09,.1-.2,.05-.11,.11-.24,.18-.41,.07-.16,.14-.34,.22-.53,.08-.2,.15-.39,.22-.58,.06-.17,.11-.31,.14-.42,.03-.12,.06-.21,.08-.29,.02-.08,.02-.14,.03-.18,0-.05,0-.08-.01-.11-.02-.06-.05-.09-.09-.11l-.05-.02Zm.07,1.99s-.05,.1-.08,.17c-.03,.07-.05,.14-.08,.21-.02,.07-.05,.13-.06,.19-.02,.06-.03,.09-.03,.11,0,.05,0,.1,.01,.16,.01,.06,.04,.12,.08,.18s.08,.12,.14,.17,.13,.09,.21,.12c.18,.07,.35,.06,.52-.03,.16-.08,.29-.26,.39-.52,.05-.15,.08-.28,.07-.39,0-.12-.03-.22-.07-.3-.04-.09-.09-.15-.16-.21-.06-.06-.12-.09-.18-.12-.08-.03-.16-.04-.22-.04-.06,0-.12,.01-.18,.03-.09,.03-.16,.06-.22,.11s-.1,.1-.14,.17Z"
            style={{ fill: "url(#linear-gradient-74)" }}
          />
          <path
            d="M287.82,145.48s-.1,.03-.17,.06c-.07,.02-.15,.04-.23,.06-.09,.02-.18,.02-.28,.03-.1,0-.19-.02-.29-.05-.14-.05-.26-.12-.36-.21-.09-.09-.16-.19-.21-.3-.05-.11-.07-.23-.07-.36s.03-.26,.07-.39c.05-.15,.13-.28,.21-.38,.09-.1,.18-.18,.28-.25,.1-.06,.2-.11,.3-.14,.1-.03,.19-.05,.26-.06,.04,0,.08-.01,.13-.02,.05,0,.11,0,.17,0s.12,0,.19,.02,.13,.03,.2,.05c.12,.04,.24,.1,.34,.18,.1,.07,.19,.16,.25,.26s.11,.21,.12,.34c.02,.13,0,.26-.06,.41-.04,.12-.11,.22-.19,.32-.08,.09-.17,.17-.26,.23-.09,.06-.17,.11-.25,.15-.08,.04-.14,.06-.17,.08Zm-.51-.11c.16,.06,.31,.04,.44-.05,.13-.09,.24-.27,.34-.52,.05-.13,.07-.26,.07-.38,0-.12-.01-.24-.05-.34-.03-.11-.09-.2-.16-.28-.07-.08-.15-.14-.25-.17-.07-.03-.15-.03-.22-.02-.08,.01-.15,.05-.23,.1-.07,.05-.14,.13-.21,.22-.06,.09-.12,.2-.16,.32-.05,.13-.07,.26-.07,.38,0,.12,.03,.23,.07,.33,.04,.1,.1,.18,.17,.25,.07,.07,.16,.12,.25,.16Z"
            style={{ fill: "url(#linear-gradient-75)" }}
          />
          <path
            d="M290.29,146.37s-.1,.03-.17,.06c-.07,.02-.15,.04-.23,.06-.09,.02-.18,.02-.28,.03-.1,0-.19-.02-.29-.05-.14-.05-.26-.12-.36-.21-.09-.09-.16-.19-.21-.3-.05-.11-.07-.23-.07-.36s.03-.26,.07-.39c.05-.15,.13-.28,.21-.38,.09-.1,.18-.18,.28-.25,.1-.06,.2-.11,.3-.14,.1-.03,.19-.05,.26-.06,.03,0,.08-.01,.13-.02,.05,0,.11,0,.17,0s.12,0,.19,.02c.07,0,.13,.03,.2,.05,.12,.04,.24,.1,.34,.18,.11,.07,.19,.16,.25,.26,.07,.1,.11,.21,.12,.34,.02,.13,0,.26-.06,.41-.04,.12-.11,.22-.19,.32-.08,.09-.17,.17-.26,.23-.09,.06-.18,.11-.25,.15-.08,.04-.14,.06-.17,.08Zm-.51-.11c.17,.06,.31,.04,.44-.05,.13-.09,.24-.27,.34-.52,.05-.13,.07-.25,.08-.38,0-.12-.01-.24-.05-.34-.03-.11-.09-.2-.15-.28-.07-.08-.15-.14-.25-.17-.07-.03-.15-.03-.22-.02s-.15,.05-.23,.1c-.07,.05-.14,.12-.21,.21s-.12,.2-.16,.32c-.05,.13-.07,.26-.07,.38,0,.12,.03,.23,.07,.33s.1,.18,.17,.25,.16,.12,.25,.16Z"
            style={{ fill: "url(#linear-gradient-76)" }}
          />
          <path
            d="M291.87,146.2c-.02,.06-.05,.13-.08,.21s-.07,.17-.1,.27c-.04,.1-.05,.18-.03,.24,.02,.06,.05,.09,.1,.11,0,0,.01,0,.02,0,.01,0,.02,0,.04,0s.03,0,.04,0h.02s.01,.01,.01,.02c0,.01,0,.02,0,.03-.02,.01-.07,.02-.14,.03-.07,0-.15,.01-.24,.01-.09,0-.17,0-.24,0-.08,0-.13-.01-.17-.03-.04-.01-.07-.04-.08-.07-.02-.03-.02-.05-.02-.06,0,0,0-.01,0-.02,0,0,0,0,0,0,0,0,0,0,.01-.01,0,0,.01-.02,.02-.03,.02-.03,.05-.08,.08-.14,.03-.05,.06-.13,.1-.21,.04-.09,.08-.19,.13-.31s.11-.27,.18-.44c.05-.13,.1-.27,.15-.4,.05-.13,.09-.25,.14-.37,.04-.11,.08-.22,.12-.31,.03-.1,.06-.18,.09-.24,.05-.14,.08-.25,.09-.33,.01-.08,.02-.14,0-.17-.01-.04-.03-.06-.07-.08-.03-.01-.06-.03-.07-.03,0-.03,.02-.05,.03-.07,.01-.02,.03-.03,.04-.04,.02,0,.04-.01,.07,0,.05,.02,.11,.04,.18,.06,.07,.02,.14,.05,.22,.07,.08,.02,.15,.04,.23,.06s.14,.03,.2,.04c.02,0,.03,.01,.02,.02,0,.01-.01,.04-.03,.06,0,.02-.02,.02-.03,.02-.02,0-.03,0-.05,0-.02,0-.03,0-.04-.01-.01,0-.03,0-.04,.01,0,.01-.02,.03-.04,.05-.02,.02-.04,.05-.06,.09-.03,.05-.07,.13-.11,.22-.04,.09-.09,.2-.14,.31-.05,.11-.1,.24-.15,.36s-.11,.25-.15,.37c-.05,.12-.09,.23-.13,.33-.04,.1-.07,.19-.1,.25,.08,.03,.18,.04,.29,.04,.11,0,.22-.03,.33-.07,.11-.04,.2-.1,.29-.17,.09-.07,.15-.16,.19-.27,.03-.08,.02-.13-.04-.15-.05-.02-.09-.02-.13-.02-.04,0-.07,0-.08,0-.04-.02-.06-.04-.06-.06,0-.02,.02-.03,.04-.05,.02-.02,.04-.02,.06-.03,.06,.02,.13,.04,.21,.06,.08,.02,.16,.04,.24,.06,.08,.02,.16,.03,.24,.05,.07,.01,.14,.03,.19,.03,.01,.01,.02,.02,.01,.03,0,.03-.05,.07-.13,.14-.08,.07-.18,.14-.29,.22-.12,.07-.24,.14-.38,.2-.14,.06-.27,.1-.39,.11,.03,.03,.05,.08,.08,.16,.03,.07,.07,.16,.1,.25,.04,.09,.07,.19,.12,.29s.09,.2,.13,.29c.05,.09,.1,.17,.15,.23,.05,.07,.11,.11,.17,.13,.04,.02,.08,.02,.11,.02s.06,0,.09,0c.01,.01,.02,.03,.01,.04,0,.02-.03,.04-.06,.06-.03,.01-.09,.02-.17,.01-.05,0-.12,0-.19,0-.07,0-.14,0-.21,0s-.12,0-.17,0-.08,0-.09-.01c-.02-.01-.05-.06-.08-.12s-.07-.15-.11-.25c-.04-.1-.08-.2-.12-.32s-.08-.22-.13-.32c-.04-.1-.08-.19-.12-.28-.04-.08-.08-.14-.11-.17h-.03Z"
            style={{ fill: "url(#linear-gradient-77)" }}
          />
        </g>
      </g>

      <g id="CenterPoint">
        <circle cx="172.23" cy="115.24" r="2.1" style={{ fill: "#10111e" }} />
      </g>
      <g id="Theme" class="interactable" data-type="darkmode">
        <g
          id="Toggler"
          class={`${setting().darkmode ? "animate" : ""}`}
          onClick={toggleDarkmode}
        >
          <g id="Background_Container" data-name="Background Container">
            <rect
              id="Background_Rectangle"
              data-name="Background Rectangle"
              x="164.34"
              y="223.98"
              width="14.16"
              height="5.82"
              rx="2.75"
              ry="2.75"
              style={{ fill: "#4282b4" }}
            />
            <g style={{ "clip-path": "url(#clippath-4)" }}>
              <g>
                <g id="Bg_Circle_Group" data-name="Bg Circle Group">
                  <circle
                    cx="167.6"
                    cy="226.89"
                    r="7.76"
                    style={{
                      fill: "#f6fcfe",
                      isolation: "isolate",
                      opacity: "0.1",
                    }}
                  />
                  <circle
                    cx="167.6"
                    cy="226.89"
                    r="6"
                    style={{
                      fill: "#f6fcfe",
                      isolation: "isolate",
                      opacity: "0.2",
                    }}
                  />
                  <circle
                    cx="167.6"
                    cy="226.89"
                    r="4.09"
                    style={{
                      fill: "#f6fcfe",
                      isolation: "isolate",
                      opacity: "0.4",
                    }}
                  />
                </g>
                <g id="Cloud">
                  <path
                    d="M179.04,227.15c0-.83-.67-1.5-1.5-1.5s-1.5,.67-1.5,1.5c0,.08,0,.15,.02,.22-.53,.16-.93,.61-1.03,1.16-.15-.05-.32-.08-.49-.08-.48,0-.9,.22-1.18,.57-.16-.06-.34-.09-.52-.09-.3,0-.58,.09-.81,.24-.27-.34-.7-.57-1.17-.57-.6,0-1.11,.35-1.35,.85-.24-.21-.57-.34-.93-.34-.51,0-.96,.26-1.18,.64-.2-.25-.5-.41-.85-.41-.59,0-1.08,.48-1.08,1.08s.48,1.08,1.08,1.08c.41,0,.76-.22,.94-.56,.24,.3,.63,.5,1.08,.5s.82-.19,1.06-.47c.27,.38,.72,.63,1.22,.63,.3,0,.58-.09,.81-.24,.27,.34,.7,.57,1.17,.57s.9-.22,1.18-.57c.16,.06,.34,.09,.52,.09,.74,0,1.35-.53,1.47-1.23,.15,.05,.32,.08,.49,.08,.83,0,1.5-.67,1.5-1.5,0-.08,0-.15-.02-.22,.61-.19,1.05-.76,1.05-1.43h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M177.4,224.48c-.91,0-1.64,.73-1.64,1.64,0,.1,0,.19,.02,.28-.05,0-.1,0-.16,0-.46,0-.88,.19-1.18,.5-.15-.04-.3-.07-.46-.07-.69,0-1.28,.43-1.52,1.03-.18,0-.35,.04-.5,.09-.28-.25-.66-.41-1.07-.41-.67,0-1.24,.41-1.48,.99-.19-.08-.4-.13-.63-.13-.53,0-1,.26-1.29,.65-.27-.21-.61-.34-.98-.34-.89,0-1.6,.72-1.6,1.6s.72,1.6,1.6,1.6c.53,0,1-.26,1.29-.65,.27,.21,.61,.34,.98,.34,.67,0,1.24-.41,1.48-.99,.19,.08,.4,.13,.63,.13,.19,0,.37-.03,.54-.09,.28,.25,.66,.41,1.07,.41,.65,0,1.22-.39,1.47-.95,0,0,.02,0,.02,0,.46,0,.88-.19,1.18-.5,.15,.04,.3,.07,.46,.07,.91,0,1.64-.73,1.64-1.64,0-.1,0-.19-.02-.28,.05,0,.1,0,.16,0,.91,0,1.64-.73,1.64-1.64s-.73-1.64-1.64-1.64h0Z"
                    style={{
                      fill: "#f6fcfe",
                      isolation: "isolate",
                      opacity: "0.3",
                    }}
                  />
                </g>
                <g id="Inner_Shadow" data-name="Inner Shadow">
                  <path
                    id="Bottom_Shadow"
                    data-name="Bottom Shadow"
                    d="M167.25,230.41h8.34c1.6,0,2.91-1.31,2.91-2.91h0c0-.08,0-.16-.01-.24-.12,1.49-1.38,2.67-2.9,2.67h-8.34c-1.52,0-2.77-1.18-2.9-2.67,0,.08-.01,.16-.01,.24h0c0,1.6,1.31,2.91,2.91,2.91h0Z"
                    style={{ fill: "url(#linear-gradient-78)" }}
                  />
                  <path
                    id="Top_Shadow"
                    data-name="Top Shadow"
                    d="M175.61,223.36h-8.34c-1.6,0-2.91,1.31-2.91,2.91h0c0,.08-.11,.17-.1,.25,.12-1.49,1.49-2.67,3.01-2.67h8.34c1.52,0,2.77,1.18,2.9,2.67,0-.08,.01-.16,.01-.24h0c0-1.6-1.31-2.91-2.91-2.91h0Z"
                    style={{ fill: "url(#linear-gradient-79)" }}
                  />
                </g>
                <g
                  id="Star_Group"
                  data-name="Star Group"
                  style={{ opacity: "0" }}
                >
                  <path
                    d="M171.94,225.94l-.21,.12s-.03,.03-.04,.04l-.11,.21-.11-.2s-.03-.04-.06-.06l-.2-.11,.2-.11s.04-.03,.05-.06l.11-.2,.11,.21s.03,.04,.05,.05l.21,.11Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M171.38,227.42l-.1,.06s-.02,.01-.02,.02l-.05,.1-.05-.1s-.02-.02-.03-.03l-.1-.05,.1-.06s.02-.02,.03-.03l.05-.1,.06,.1s.01,.02,.02,.02l.1,.05Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M170.06,225.7l-.08,.05s-.01,.01-.02,.02l-.04,.08-.04-.08s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M169.48,226.97l-.05,.03s0,0-.01,.01l-.03,.05-.03-.05s0-.01-.01-.01l-.05-.03,.05-.03s.01,0,.01-.01l.03-.05,.03,.05s0,0,.01,.01l.05,.03h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M170.4,228.22l-.16,.09s-.03,.02-.03,.03l-.08,.16-.08-.15s-.03-.03-.04-.04l-.15-.08,.15-.08s.03-.02,.04-.04l.08-.15,.09,.15s.02,.03,.04,.04l.15,.08h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M167.35,225.18l-.21,.12s-.03,.03-.04,.04l-.11,.21-.11-.2s-.03-.04-.06-.06l-.2-.11,.2-.11s.04-.03,.05-.06l.11-.2,.11,.2s.03,.04,.05,.05l.21,.11Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M167.22,226.69l-.11,.06s-.02,.01-.02,.02l-.06,.11-.06-.1s-.02-.02-.03-.03l-.1-.05,.1-.06s.02-.02,.03-.03l.06-.1,.06,.1s.01,.02,.03,.02l.11,.06Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M166.17,228.04l-.08,.04s-.01,0-.02,.02l-.04,.08-.04-.07s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M165.78,228.5l-.08,.04s-.01,0-.02,.02l-.04,.08-.04-.07s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M167.17,228.81l-.08,.04s-.01,0-.02,.02l-.04,.08-.04-.07s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                  <path
                    d="M165.78,225.94l-.13,.07s-.02,.02-.03,.03l-.07,.13-.07-.12s-.02-.03-.03-.03l-.12-.06,.12-.07s.02-.02,.03-.03l.07-.12,.07,.12s.02,.02,.03,.03l.12,.07h0Z"
                    style={{ fill: "#f6fcfe" }}
                  />
                </g>
              </g>
            </g>
            <rect
              x="164.34"
              y="223.98"
              width="14.16"
              height="5.82"
              rx="2.75"
              ry="2.75"
              style={{
                fill: "none",
                stroke: "#f1efef",
                "stroke-miterlimit": "10",
                "stroke-width": "0.5px",
              }}
            />
          </g>
          <g id="Button">
            <circle
              cx="167.6"
              cy="226.89"
              r="2.26"
              style={{ fill: "#f8cc36" }}
            />
            <g style={{ "clip-path": "url(#clippath-5)" }}>
              <g>
                <path
                  id="Left_Path"
                  data-name="Left Path"
                  d="M169.7,225.77c.11,.26,.18,.55,.18,.85,0,1.24-1.06,2.25-2.36,2.25-.97,0-1.81-.56-2.17-1.37,.3,.95,1.19,1.64,2.24,1.64,1.3,0,2.35-1.05,2.35-2.35,0-.37-.09-.72-.24-1.03Z"
                  style={{
                    fill: "#1f2135",
                    isolation: "isolate",
                    opacity: "0.1",
                  }}
                />
                <path
                  id="Top_Path"
                  data-name="Top Path"
                  d="M165.42,226.97c0-1.28,1.03-2.31,2.31-2.31,.45,0,.87,.18,1.22,.4-.38-.27-.84-.48-1.33-.48-1.28,0-2.31,1.03-2.31,2.31,0,.83,.49,1.52,1.14,1.93-.59-.42-1.03-1.08-1.03-1.86h0Z"
                  style={{ fill: "#f6fcfe" }}
                />
                <g id="Moon">
                  <circle
                    cx="172.21"
                    cy="226.89"
                    r="2.26"
                    style={{ fill: "#cecfdb" }}
                  />
                  <g style={{ "clip-path": "url(#clippath-6)" }}>
                    <g>
                      <path
                        id="Left_Path-2"
                        data-name="Left Path-2"
                        d="M174.31,225.77c.11,.26,.18,.55,.18,.85,0,1.24-1.06,2.25-2.36,2.25-.97,0-1.81-.56-2.17-1.37,.3,.95,1.19,1.64,2.24,1.64,1.3,0,2.35-1.05,2.35-2.35,0-.37-.09-.72-.24-1.03h0Z"
                        style={{
                          fill: "#1f2135",
                          isolation: "isolate",
                          opacity: "0.1",
                        }}
                      />
                      <path
                        id="Top_Path-2"
                        data-name="Top Path-2"
                        d="M170.03,226.97c0-1.28,1.03-2.31,2.31-2.31,.45,0,.87,.18,1.22,.4-.38-.27-.84-.48-1.33-.48-1.28,0-2.31,1.03-2.31,2.31,0,.83,.49,1.52,1.14,1.93-.59-.42-1.03-1.08-1.03-1.86h0Z"
                        style={{ fill: "#f6fcfe" }}
                      />
                      <g id="Moon_Dots" data-name="Moon Dots">
                        <circle
                          cx="172.04"
                          cy="225.55"
                          r=".35"
                          style={{
                            fill: "#a0a5bc",
                            stroke: "#aaa9aa",
                            "stroke-miterlimit": "10",
                            "stroke-width": "0.2px",
                          }}
                        />
                        <circle
                          cx="173.1"
                          cy="227.53"
                          r=".45"
                          style={{
                            fill: "#a0a5bc",
                            stroke: "#aaa9aa",
                            "stroke-miterlimit": "10",
                            "stroke-width": "0.2px",
                          }}
                        />
                        <circle
                          cx="171.29"
                          cy="227.07"
                          r=".74"
                          style={{
                            fill: "#a0a5bc",
                            stroke: "#aaa9aa",
                            "stroke-miterlimit": "10",
                            "stroke-width": "0.2px",
                          }}
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SittingAnimation;
