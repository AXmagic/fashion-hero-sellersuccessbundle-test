interface Props {
  data: number[];
  tone?: "warning" | "destructive" | "success" | "muted";
  height?: number;
}

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  warning: "hsl(var(--warning))",
  destructive: "hsl(var(--destructive))",
  success: "hsl(var(--success))",
  muted: "hsl(var(--muted-foreground))",
};

export default function LineSpark({ data, tone = "warning", height = 44 }: Props) {
  const w = 100;
  const h = height;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * stepX;
    const y = h - 4 - ((v - min) / range) * (h - 8);
    return [x, y] as const;
  });
  const stroke = TONE[tone];
  const id = `spark-${tone}-${data.length}`;

  // Smooth path using quadratic curves
  const d = pts
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `Q ${cx} ${py} ${(cx + x) / 2} ${(py + y) / 2} T ${x} ${y}`;
    })
    .join(" ");

  const area = `${d} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
