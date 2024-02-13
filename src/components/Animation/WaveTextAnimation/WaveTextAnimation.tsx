const WaveTextAnimation = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Hello_World_Line_Layer"
    viewBox="0 0 1218 361.15"
  >
    <defs>
      <style>
        {`
          .wave-class-2{font-family:MyriadPro-Regular,"Myriad Pro"}
          .wave-class-3{fill:none;stroke-dasharray:0 0 3 3;stroke-linecap:round;stroke-linejoin:round}
          .wave-outline-text {
            fill: #fff;
            font-size: 36px;
            stroke: #575f92;
            stroke-miterlimit: 10;
            stroke-width: 1.25px;
          }
          .wave-fill-text {
            fill: #575f92;
            font-size: 36px;
            stroke-miterlimit: 10;
          }
        `}
      </style>
    </defs>

    <path
      class="wave-class-3"
      d="M7.22,104.93c53.51-9.99,110.11-56.47,181.89-51.58,116.55,7.94,219.51,68.95,315.76,68.95,176.5,0,217.32-51.66,353-52.81,134.47-1.14,149.04,29.24,272.31,69.65,64.72,21.22,94.64,6.56,94.64,6.56"
      id="Wave_Text_Line_1"
    />
    <path
      class="wave-class-3"
      d="M7.22,181.77c53.51-9.99,110.11-56.47,181.89-51.58,116.55,7.94,219.51,68.95,315.76,68.95,176.5,0,217.32-51.66,353-52.81,134.47-1.14,149.04,29.24,272.31,69.65,64.72,21.22,94.64,6.56,94.64,6.56"
      id="Wave_Text_Line_2"
    />
    <path
      class="wave-class-3"
      d="M7.22,263.97c53.51-9.99,110.11-56.47,181.89-51.58,116.55,7.94,219.51,68.95,315.76,68.95,176.5,0,217.32-51.66,353-52.81,134.47-1.14,149.04,29.24,272.31,69.65,64.72,21.22,94.64,6.56,94.64,6.56"
      id="Wave_Text_Line_3"
    />

    <text class="wave-outline-text">
      <textPath href="#Wave_Text_Line_1" startOffset={0}>
        <tspan class="wave-fill-text">println("Hello World");</tspan>
        <tspan>echo "Hello World";</tspan>
        <tspan class="wave-fill-text">console.log("Hello World");</tspan>
        <tspan>System.out.print("Hello World");</tspan>
        <tspan class="wave-fill-text">println("Hello World");</tspan>
        <tspan>echo "Hello World";</tspan>
        <tspan class="wave-fill-text">console.log("Hello World");</tspan>
        <tspan>System.out.print("Hello World");</tspan>
        <tspan class="wave-fill-text">println("Hello World");</tspan>
        <tspan>echo "Hello World";</tspan>
        <tspan class="wave-fill-text">console.log("Hello World");</tspan>
        <tspan>System.out.print("Hello World");</tspan>
        <tspan class="wave-fill-text">println("Hello World");</tspan>
        <tspan>echo "Hello World";</tspan>
        <tspan class="wave-fill-text">console.log("Hello World");</tspan>
        <tspan>System.out.print("Hello World");</tspan>
      </textPath>
    </text>
    <text class="wave-fill-text">
      <textPath href="#Wave_Text_Line_2" startOffset={0}>
        <tspan class="wave-outline-text">console.log("Hello World");</tspan>
        <tspan>echo "Hello World";</tspan>
        <tspan class="wave-outline-text">println("Hello World");</tspan>
        <tspan>System.out.print("Hello World");</tspan>
      </textPath>
    </text>
    <text class="wave-outline-text">
      <textPath href="#Wave_Text_Line_3" startOffset={0}>
        <tspan class="wave-fill-text">System.out.print("Hello World");</tspan>
        <tspan >println("Hello World");</tspan>
        <tspan class="wave-fill-text">console.log("Hello World");</tspan>
        <tspan >echo "Hello World";</tspan>
      </textPath>
    </text>
  </svg>
);
export default WaveTextAnimation;
