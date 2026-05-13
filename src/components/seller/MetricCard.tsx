import { ArrowDownRight, ArrowUpRight, HelpCircle, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LineSpark from "./LineSpark";

interface Props {
  label: string;
  value: string;
  hint?: string;
  delta?: number;
  deltaSuffix?: string;
  tone?: "default" | "warning" | "destructive" | "success";
  spark?: number[];
}

export default function MetricCard({
  label,
  value,
  hint,
  delta,
  deltaSuffix = "pp",
  tone = "default",
  spark,
}: Props) {
  const { profile } = useParams();
  const isDown = typeof delta === "number" && delta < 0;
  const isUp = typeof delta === "number" && delta > 0;
  const sparkTone =
    tone === "destructive" ? "destructive" : tone === "success" ? "success" : tone === "warning" ? "warning" : "warning";

  return (
    <div className="bg-card border border-border rounded-md p-4 md:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-muted-foreground">{label}</span>
        <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60" />
      </div>

      <div className="text-2xl md:text-[28px] font-semibold tracking-tight text-foreground leading-tight">
        {value}
      </div>

      {hint && (
        <div
          className={`text-[12px] leading-snug ${
            tone === "destructive" || tone === "warning" ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {hint}
        </div>
      )}

      {typeof delta === "number" && (
        <span
          className={`inline-flex items-center gap-1 text-[12px] font-medium ${
            isDown ? "text-destructive" : isUp ? "text-success" : "text-muted-foreground"
          }`}
        >
          {isDown ? (
            <ArrowDownRight className="w-3.5 h-3.5" />
          ) : isUp ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : null}
          {delta > 0 ? "+" : ""}
          {delta}
          {deltaSuffix} vs. poprzednie 30 dni
        </span>
      )}

      {spark && spark.length > 1 && (
        <div className="mt-auto pt-1">
          <LineSpark data={spark} tone={sparkTone} height={42} />
        </div>
      )}

      <Link
        to={`/seller/${profile ?? "dorota"}/unlock`}
        className="mt-auto inline-flex items-center justify-center gap-1.5 text-[12px] font-medium text-foreground border border-border rounded-full px-4 py-2 hover:bg-muted transition-colors"
      >
        Zobacz szczegóły
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
