import { site } from "@/config/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon, YoutubeIcon } from "./Icons";

const icons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
};

/** Renders only the social profiles you've filled in, plus your HAR.com profile. */
export function SocialLinks({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const entries = (Object.keys(icons) as (keyof typeof icons)[]).filter((k) => site.social[k]);
  const cls = dark
    ? "grid size-10 place-items-center rounded-full bg-navy/5 text-navy hover:bg-accent hover:text-navy-deep"
    : "grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-navy-deep";
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <a href={site.harProfileUrl} target="_blank" rel="noopener noreferrer" className={`${cls} !w-auto px-3 text-xs font-bold`}>
        HAR.com
      </a>
      {entries.map((k) => {
        const Icon = icons[k];
        return (
          <a key={k} href={site.social[k]} target="_blank" rel="noopener noreferrer" className={cls} aria-label={k}>
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
