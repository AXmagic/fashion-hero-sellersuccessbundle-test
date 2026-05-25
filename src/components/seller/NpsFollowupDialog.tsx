import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const schema = z.string().trim().max(500);

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export default function NpsFollowupDialog({ open, onClose, onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      setError("Maksymalnie 500 znaków.");
      return;
    }
    const text = parsed.data;
    if (!text) {
      onClose();
      return;
    }
    onSubmit(text);
    setValue("");
    setError(null);
  };

  const skip = () => {
    setValue("");
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && skip()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl leading-tight">
            Co w Twoim sklepie chcesz naprawić w pierwszej kolejności?
          </DialogTitle>
          <DialogDescription>
            Jedno zdanie wystarczy. Pomoże nam zrozumieć, czego brakuje.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          maxLength={500}
          rows={4}
          placeholder="np. nie wiem, dlaczego klientki zwracają sukienki"
        />
        {error && <p className="text-[12px] text-destructive">{error}</p>}
        <DialogFooter className="gap-2 sm:gap-2">
          <button
            type="button"
            onClick={skip}
            className="text-[13px] text-muted-foreground hover:text-foreground px-4 py-2"
          >
            Pomiń
          </button>
          <button
            type="button"
            onClick={submit}
            className="bg-foreground text-background font-semibold text-[13px] px-5 py-2.5 rounded-full hover:opacity-90"
          >
            Wyślij
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
