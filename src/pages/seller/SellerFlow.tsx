import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SellerShell from "@/components/seller/SellerShell";
import Layer1Economics from "@/components/seller/Layer1Economics";
import Layer2Preview from "@/components/seller/Layer2Preview";
import { getProfile } from "@/lib/sellerProfiles";
import { getSessionPrice } from "@/lib/wtpPrice";
import { logEvent } from "@/lib/wtpLog";

export default function SellerFlow() {
  const { profile: profileId } = useParams();
  const profile = getProfile(profileId);
  const navigate = useNavigate();
  const startedRef = useRef(false);

  const price = profile ? getSessionPrice(profile.id) : 399;

  useEffect(() => {
    if (!profile || startedRef.current) return;
    startedRef.current = true;
    logEvent({ type: "session_start", profile: profile.id, price });
  }, [profile, price]);

  if (!profile) return <Navigate to="/seller" replace />;

  const goUnlock = (feature: string) => {
    navigate(`/seller/${profile.id}/unlock?feature=${encodeURIComponent(feature)}`);
  };

  return (
    <SellerShell
      profile={profile}
      pageTitle={`Witaj, ${profile.name}! `}
      pageSub="Oto jak wygląda Twój sklep w skrócie."
    >
      <div className="space-y-10 max-w-[1200px]">
        <Layer1Economics profile={profile} price={price} onUnlock={goUnlock} />
        <Layer2Preview profile={profile} price={price} onUnlock={goUnlock} />
      </div>
    </SellerShell>
  );
}
