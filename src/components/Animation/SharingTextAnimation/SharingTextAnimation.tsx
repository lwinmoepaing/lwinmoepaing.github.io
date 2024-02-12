const SharingTextAnimation = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Sharing_Title"
      viewBox="0 0 620 256.34"
    >
      <defs>
        <filter id="drop-shadow-1" filterUnits="userSpaceOnUse">
          <feOffset dx={1} dy={1} />
          <feGaussianBlur result="blur" stdDeviation={3} />
          <feFlood flood-color="#231f20" flood-opacity={0.2} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <style>
          {
            ".sharing-cls-4{fill:#6067af}.sharing-cls-7{fill:none;stroke:#6067af;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <path
        d="M546.12 55.33H73.88c-15.97 0-29.03 11.78-29.03 26.18v70.79c0 14.4 13.06 26.18 29.03 26.18h209.7c-.18 1.34.27 2.77 1.53 3.89l21.23 17.29c2.03 1.8 5.29 1.8 7.32 0l21.83-17.29c1.26-1.12 1.71-2.55 1.53-3.89h209.1c15.97 0 29.03-11.78 29.03-26.18V81.51c0-14.4-13.06-26.18-29.03-26.18Z"
        style={{
          filter: "url(#drop-shadow-1)",
          fill: "#fff",
        }}
      />
      <path
        d="M539.69 61.95H80.31c-15.53 0-28.24 10.34-28.24 22.97v62.12c0 12.64 12.71 22.97 28.24 22.97h208.42c-.17 1.18.26 2.43 1.49 3.41l16.21 12.96c1.98 1.58 5.15 1.58 7.12 0l16.21-12.96c1.23-.98 1.67-2.23 1.49-3.41h208.42c15.53 0 28.24-10.34 28.24-22.97V84.92c0-12.64-12.71-22.97-28.24-22.97Z"
        style={{
          fill: "#fff",
        }}
      />
      <path
        d="M282.74 170.02h6c-.17 1.18.26 2.43 1.49 3.41l1.64 1.31"
        class="sharing-cls-7"
      />
      <path
        d="m297.72 179.42 8.72 6.97c1.98 1.58 5.15 1.58 7.12 0l11.65-9.31"
        style={{
          "stroke-dasharray": "0 0 11.24 7.49",
          fill: "none",
          stroke: "#6067af",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
        }}
      />
      <path
        d="m328.13 174.74 1.64-1.31c1.23-.98 1.67-2.23 1.49-3.41h6"
        class="sharing-cls-7"
      />
      <path
        d="M345.27 170.02h194.41c15.53 0 28.24-10.34 28.24-22.97V84.93c0-12.64-12.71-22.97-28.24-22.97H80.31c-15.53 0-28.24 10.34-28.24 22.97v62.12c0 12.64 12.71 22.97 28.24 22.97h198.42"
        style={{
          fill: "none",
          stroke: "#6067af",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          "stroke-dasharray": "0 0 12.02 8.01",
        }}
      />
      <text
        style={{
          "font-family": "Nunito-Medium,Nunito",
          "font-size": "34.74px",
          "font-variation-settings": "&quot",
          "font-weight": 500,
        }}
        transform="rotate(-.29 25562.59 -28365.99)"
      >
        <tspan x={0} y={0} class="sharing-cls-4">
          {"\u201CSharing\u201D"}
        </tspan>
        <tspan
          xml-space="preserve"
          x={149.43}
          y={0}
          style={{
            fill: "#231f20",
          }}
        >
          {"  is "}
        </tspan>
        <tspan x={201.64} y={0} class="sharing-cls-4">
          {"\u201CCaring\u201D"}
        </tspan>
      </text>
    </svg>
  );
};
export default SharingTextAnimation;
