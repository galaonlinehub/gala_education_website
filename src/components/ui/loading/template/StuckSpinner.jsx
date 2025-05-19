"use client"

const StuckSpinner = ({
    size = 24,
    color = "#3b82f6",
    strokeWidth = 4,
    strokeLinecap = "round",
    label = "",
    variant = "solid",
  }) => {
    const dashStyles = {
      solid: {
        dasharray: "90, 150",
        dashoffset: "0",
      },
      dashed: {
        dasharray: "40, 120",
        dashoffset: "-30",
      },
      ghost: {
        dasharray: "1, 150",
        dashoffset: "0",
      },
    };
  
    const dash = dashStyles[variant] ?? dashStyles.solid;
  
    return (
      <div className="inline-flex items-center justify-center gap-2" role="status" aria-label={label || "Loading"}>
        <svg
          className="motion-safe:animate-spin-custom"
          width={size}
          height={size}
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          <circle
            className="loader-path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            style={{
              strokeDasharray: dash.dasharray,
              strokeDashoffset: dash.dashoffset,
              animation: "dash 1.6s ease-in-out infinite",
            }}
          />
        </svg>
  
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
  
        <style jsx>{`
          @keyframes spin-custom {
            100% {
              transform: rotate(360deg);
            }
          }
  
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
  
          .loader-path {
            stroke-linecap: ${strokeLinecap};
          }
  
          .motion-safe\\:animate-spin-custom {
            animation: spin-custom 1.6s linear infinite;
          }
        `}</style>
      </div>
    );
  };
  
  export default StuckSpinner;
  
  