import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
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

export default function ConfirmDialog({ open, onOpenChange, profile, price }: Props) {
  useEffect(() => {
    if (open) {
      logEvent({ type: "confirm_view", profile, price });
    }
  }, [open, profile, price]);

  const onConfirm = () => {
    logEvent({ type: "cta_click", profile, price, feature: "confirm_ok" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center gap-3 pt-2">
          <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <DialogTitle className="font-serif text-2xl">Zapisaliśmy Twoje zainteresowanie</DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            Skontaktujemy się z Tobą w ciągu 48 godzin w sprawie oferty.
          </DialogDescription>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className="fh-pill w-full justify-center bg-foreground text-background border-foreground hover:opacity-90 mt-4"
        >
          OK
        </button>
      </DialogContent>
    </Dialog>
  );
}

