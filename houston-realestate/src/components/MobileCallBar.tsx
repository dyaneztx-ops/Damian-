import { site } from "@/config/site";
import { T } from "@/lib/i18n";
import { ChatIcon, PhoneIcon } from "./Icons";

/** Sticky Call / Text bar on phones & tablets. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-black/10 bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
      <a href={`tel:${site.phoneE164}`} className="btn-dark !py-3">
        <PhoneIcon className="size-5" /> <T k="cta.call">Call</T>
      </a>
      <a href={`sms:${site.phoneE164}`} className="btn-primary !py-3">
        <ChatIcon className="size-5" /> <T k="cta.text">Text</T>
      </a>
    </div>
  );
}
