import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { ProfileId } from "@/lib/sellerProfiles";
import type { PricePoint } from "@/lib/wtpPrice";
import { logEvent } from "@/lib/wtpLog";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  profile: ProfileId;
  price: PricePoint;
}

export default function WaitlistDialog({ open, onOpenChange, profile, price }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (open) {
      setConfirmed(false);
      logEvent({ type: "confirm_view", profile, price });
    }
  }, [open, profile, price]);

  const onAccept = () => {
    logEvent({ type: "cta_click", profile, price, feature: "waitlist_accept" });
    setConfirmed(true);
  };

  const onDecline = () => {
    logEvent({ type: "cta_dismiss", profile, price, feature: "waitlist_decline" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!confirmed ? (
          <div className="flex flex-col text-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-full bg-warning/15 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-warning" />
            </div>
            <DialogTitle className="font-serif text-2xl">Dziękujemy za zainteresowanie!</DialogTitle>
            <DialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
              Właśnie dopracowujemy Seller Success Bundle, aby dostarczyć Ci jak najdokładniejsze dane.
              Pakiet będzie dostępny już wkrótce w cenie <span className="text-foreground font-semibold">{price} zł/mies.</span>
            </DialogDescription>
            <p className="text-[13px] mt-1">
              Chcesz otrzymać powiadomienie jako pierwszy i zyskać darmowy dostęp testowy?
            </p>

            <button
              type="button"
              onClick={onAccept}
              className="mt-4 w-full bg-warning text-warning-foreground font-semibold text-[14px] py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Tak, chcę
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="text-[12.5px] text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              Nie, dziękuję
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <DialogTitle className="font-serif text-2xl">Jesteś na liście!</DialogTitle>
            <DialogDescription className="text-[13px] leading-relaxed">
              Odezwiemy się w ciągu 48h.
            </DialogDescription>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="fh-pill w-full justify-center bg-foreground text-background border-foreground hover:opacity-90 mt-2"
            >
              OK
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
