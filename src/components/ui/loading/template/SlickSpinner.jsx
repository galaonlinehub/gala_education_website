const SlickSpinner = ({ size = 20, color = "#3b82f6", strokeWidth = "6" }) => {
  return (
    <div className="inline-flex items-center justify-center">
      <svg
        className="slick-loader"
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <circle
          className="loader-path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>

      <style jsx>{`
        /* 🔁 Controls how fast the spinner rotates */
        @keyframes spin-custom {
          100% {
            transform: rotate(360deg);
          }
        }

        /* 🔁 Controls the stroke dash behavior */
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }

        .slick-loader {
          animation: spin-custom 1.6s linear infinite;
        }

        .loader-path {
          stroke-linecap: round;
          animation: dash 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SlickSpinner;

