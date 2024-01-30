import "./styles.css";

function Loading() {
  return (
    <div className="loading__loader" id="loader">
      {/* <img src={loaderGif} alt="loading" className="loading__image" /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "auto",
          display: "block",
          shapeRendering: "crispedges"
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="loading__image"
      >
        <circle cx="84" cy="50" r="10" fill="#e1e7e7">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="0.5681818181818182s"
            calcMode="spline"
            keyTimes="0;1"
            values="10;0"
            keySplines="0 0.5 0.5 1"
            begin="0s"
          />
          <animate
            attributeName="fill"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="discrete"
            keyTimes="0;0.25;0.5;0.75;1"
            values="#e1e7e7;#0a69aa;#07abcc;#91bcc6;#e1e7e7"
            begin="0s"
          />
        </circle>
        <circle cx="16" cy="50" r="10" fill="#e1e7e7">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          />
        </circle>
        <circle cx="50" cy="50" r="10" fill="#91bcc6">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5681818181818182s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5681818181818182s"
          />
        </circle>
        <circle cx="84" cy="50" r="10" fill="#07abcc">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.1363636363636365s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.1363636363636365s"
          />
        </circle>
        <circle cx="16" cy="50" r="10" fill="#0a69aa">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.7045454545454546s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.272727272727273s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.7045454545454546s"
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loading;
