interface Props {
  data: number[];
  height?: number;
}

export default function MarginSparkline({ data, height = 220 }: Props) {
  const w = 720;
  const h = height;
  const padL = 36;
  const padR = 16;
  const padT = 16;
  const padB = 28;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const max = Math.ceil(Math.max(...data, 30) / 10) * 10;
  const min = 0;
  const range = max - min || 1;
  const stepX = innerW / data.length;
  const barW = stepX * 0.55;
  const last = data[data.length - 1];
  const lastY = padT + innerH - ((last - min) / range) * innerH;

  const yTicks = [0, max / 3, (max * 2) / 3, max].map((v) => Math.round(v));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: h }}>
      {/* Y grid + labels */}
      {yTicks.map((t) => {
        const y = padT + innerH - ((t - min) / range) * innerH;
        return (
          <g key={t}>
            <line
              x1={padL}
              x2={w - padR}
              y1={y}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeDasharray="0"
              opacity="0.6"
            />
            <text
              x={padL - 8}
              y={y + 3}
              textAnchor="end"
              fontSize="10"
              fill="hsl(var(--muted-foreground))"
            >
              {t}%
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((v, i) => {
        const barH = ((v - min) / range) * innerH;
        const x = padL + i * stepX + (stepX - barW) / 2;
        const y = padT + innerH - barH;
        const isLast = i === data.length - 1;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="2"
              fill={isLast ? "hsl(var(--destructive))" : "hsl(var(--foreground) / 0.78)"}
            />
            <text
              x={x + barW / 2}
              y={h - 10}
              textAnchor="middle"
              fontSize="10"
              fill={isLast ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))"}
              fontWeight={isLast ? 600 : 400}
            >
              T-{data.length - i}
            </text>
          </g>
        );
      })}

      {/* Dashed reference line at last value */}
      <line
        x1={padL}
        x2={w - padR}
        y1={lastY}
        y2={lastY}
        stroke="hsl(var(--warning))"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.8"
      />
      <text
        x={w - padR}
        y={lastY - 4}
        textAnchor="end"
        fontSize="10"
        fill="hsl(var(--warning))"
        fontWeight={600}
      >
        {last}%
      </text>
    </svg>
  );
}
