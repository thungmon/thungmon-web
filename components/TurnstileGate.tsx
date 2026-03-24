"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useCallback, useSyncExternalStore } from "react";

const SESSION_KEY = "turnstile_verified";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function getServerSnapshot() {
  return true; // skip overlay during SSR
}

export default function TurnstileGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  console.log("siteKey", siteKey);
  const verified = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const handleSuccess = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    // dispatch storage event so useSyncExternalStore re-reads
    window.dispatchEvent(new StorageEvent("storage", { key: SESSION_KEY }));
  }, []);

  console.log("Turnstile verified:", verified);
  console.log("Turnstile site key:", siteKey);

  if (verified || !siteKey) {
    return <>{children}</>;
  }

  return (
    <>
      {/* render children behind overlay so layout doesn't jump */}
      {children}

      {/* overlay */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/90 backdrop-blur-sm">
        <p className="text-sm font-medium text-zinc-600">
          กรุณายืนยันตัวตนเพื่อเข้าใช้งาน
        </p>
        <Turnstile siteKey={siteKey} onSuccess={handleSuccess} />
      </div>
    </>
  );
}
