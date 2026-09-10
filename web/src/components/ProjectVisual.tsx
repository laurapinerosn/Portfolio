"use client";

type VisualKind = "football" | "forecast" | "mmm" | "media" | "credit";

export default function ProjectVisual({ kind }: { kind: VisualKind }) {
  if (kind === "football") {
    return (
      <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden>
        <rect width="640" height="360" fill="#ebe4d8" />
        <rect
          x="48"
          y="36"
          width="544"
          height="288"
          fill="none"
          stroke="#1c1b19"
          strokeOpacity="0.18"
        />
        <line
          x1="320"
          y1="36"
          x2="320"
          y2="324"
          stroke="#1c1b19"
          strokeOpacity="0.15"
        />
        <circle
          cx="320"
          cy="180"
          r="42"
          fill="none"
          stroke="#1c1b19"
          strokeOpacity="0.15"
        />
        <path
          d="M90 260 C 180 120, 280 110, 390 170 S 540 240, 560 90"
          fill="none"
          stroke="#e85a1b"
          strokeWidth="2"
          strokeDasharray="4 7"
        />
        <circle cx="180" cy="168" r="4" fill="#1c1b19" />
        <circle cx="290" cy="132" r="4" fill="#1c1b19" />
        <circle cx="390" cy="170" r="5" fill="#e85a1b" />
        <circle cx="470" cy="210" r="3.5" fill="#1c1b19" opacity="0.6" />
        <path
          d="M200 250 L260 190 L340 210 L410 150"
          fill="none"
          stroke="#1c1b19"
          strokeOpacity="0.25"
        />
        <text x="56" y="28" fill="#8c857a" fontSize="10" fontFamily="monospace">
          pitch · trajectories
        </text>
      </svg>
    );
  }

  if (kind === "forecast") {
    return (
      <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden>
        <rect width="640" height="360" fill="#ebe4d8" />
        <path
          d="M60 250 C 120 240, 150 200, 200 205 S 280 240, 320 180"
          fill="none"
          stroke="#1c1b19"
          strokeWidth="2"
        />
        <path
          d="M320 180 C 380 130, 420 150, 480 120 S 560 90, 590 100"
          fill="none"
          stroke="#e85a1b"
          strokeWidth="2"
          strokeDasharray="5 6"
        />
        <path
          d="M320 180 C 380 110, 430 120, 490 85 S 560 60, 590 70 L 590 150 C 560 140, 500 160, 440 190 S 360 220, 320 180 Z"
          fill="#e85a1b"
          fillOpacity="0.12"
        />
        <line
          x1="320"
          y1="40"
          x2="320"
          y2="320"
          stroke="#1c1b19"
          strokeOpacity="0.2"
          strokeDasharray="3 5"
        />
        <text x="332" y="54" fill="#e85a1b" fontSize="10" fontFamily="monospace">
          forecast horizon →
        </text>
      </svg>
    );
  }

  if (kind === "mmm") {
    return (
      <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden>
        <rect width="640" height="360" fill="#ebe4d8" />
        {[90, 150, 210].map((y, i) => (
          <g key={y}>
            <circle cx="100" cy={y} r="10" fill="#1c1b19" fillOpacity="0.75" />
            <path
              d={`M120 ${y} C 220 ${y - 20 + i * 8}, 320 ${180}, 420 180`}
              fill="none"
              stroke="#1c1b19"
              strokeOpacity="0.3"
            />
          </g>
        ))}
        <circle cx="460" cy="180" r="28" fill="#e85a1b" fillOpacity="0.9" />
        <text
          x="444"
          y="184"
          fill="#f4efe6"
          fontSize="10"
          fontFamily="monospace"
        >
          impact
        </text>
        <path
          d="M520 260 C 560 220, 580 180, 600 120"
          fill="none"
          stroke="#e85a1b"
          strokeWidth="1.5"
        />
        <text x="56" y="48" fill="#8c857a" fontSize="10" fontFamily="monospace">
          channels → response
        </text>
      </svg>
    );
  }

  if (kind === "media") {
    return (
      <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden>
        <rect width="640" height="360" fill="#ebe4d8" />
        {Array.from({ length: 18 }).map((_, i) => {
          const h = 40 + ((i * 37) % 140);
          return (
            <rect
              key={i}
              x={60 + i * 30}
              y={300 - h}
              width="16"
              height={h}
              fill={i % 5 === 0 ? "#e85a1b" : "#1c1b19"}
              fillOpacity={i % 5 === 0 ? 0.85 : 0.18}
            />
          );
        })}
        <path
          d="M60 120 C 160 90, 240 160, 340 130 S 500 70, 580 110"
          fill="none"
          stroke="#e85a1b"
          strokeWidth="1.5"
        />
        <text x="56" y="40" fill="#8c857a" fontSize="10" fontFamily="monospace">
          audience · temporal signal
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden>
      <rect width="640" height="360" fill="#ebe4d8" />
      <path
        d="M80 280 C 140 280, 160 120, 240 120 S 320 280, 400 280 S 480 80, 560 80"
        fill="none"
        stroke="#1c1b19"
        strokeWidth="1.6"
      />
      <ellipse
        cx="320"
        cy="200"
        rx="120"
        ry="70"
        fill="#e85a1b"
        fillOpacity="0.1"
        stroke="#e85a1b"
        strokeOpacity="0.5"
      />
      {[180, 240, 300, 360, 420].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={200 + Math.sin(i) * 30}
          r="4"
          fill={i === 2 ? "#e85a1b" : "#1c1b19"}
        />
      ))}
      <text x="56" y="40" fill="#8c857a" fontSize="10" fontFamily="monospace">
        probability · risk surface
      </text>
    </svg>
  );
}
