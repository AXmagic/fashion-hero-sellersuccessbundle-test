import { useEffect } from "react";
import { Sparkles } from "lucide-react";
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
  useEffect(() => {
    if (open) {
      logEvent({ type: "confirm_view", profile, price });
    }
  }, [open, profile, price]);

  const onAccept = () => {
    logEvent({ type: "cta_click", profile, price, feature: "waitlist_accept" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col text-center gap-4 pt-2">
          <div className="w-12 h-12 rounded-full bg-warning/15 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-warning" />
          </div>
          <DialogTitle className="font-serif text-2xl">Dziękujemy za zainteresowanie!</DialogTitle>

          <DialogDescription className="sr-only">
            Informacje o Seller Success Bundle, cenie i okresie próbnym.
          </DialogDescription>

          <div className="text-[13px] leading-relaxed text-muted-foreground text-left space-y-3">
            <p>
              Właśnie dopracowujemy Seller Success Bundle, aby dostarczyć Ci jak najdokładniejsze dane.
            </p>
            <p>
              Pakiet będzie dostępny już wkrótce w cenie{" "}
              <span className="text-foreground font-semibold">{price} zł/mies.</span> Informację o dostępności pakietu wyślemy do Ciebie mailem.
            </p>
            <p>
              Przez pierwsze 14 dni korzystasz bezpłatnie, a po zakończeniu okresu próbnego automatycznie rozpocznie się płatna subskrypcja. Rezygnacja możliwa w dowolnym momencie.
            </p>
          </div>

          <button
            type="button"
            onClick={onAccept}
            className="mt-2 w-full bg-warning text-warning-foreground font-semibold text-[14px] py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

