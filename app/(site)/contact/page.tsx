import type { Metadata } from "next";
import SiteFooter from "@/components/site/SiteFooter";
import CopyEmail from "@/components/site/CopyEmail";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SaiSanjay R — email, GitHub and LinkedIn.",
};

const channels = [
  { name: "GitHub", handle: `@${profile.githubHandle}`, href: profile.github, external: true },
  { name: "LinkedIn", handle: profile.linkedinHandle, href: profile.linkedin, external: true },
  { name: "Résumé", handle: "SaiSanjay_R_Resume.pdf", href: profile.resumePdf, download: true },
  { name: "Academic log", handle: "ProtoSem Expedition", href: "/protosem" },
];

export default function ContactPage() {
  return (
    <>
      <main id="main" className="contact">
        <div className="page-head" style={{ flex: 1 }}>
          <div className="wrap">
            <div className="page-head__meta t-label">
              <span>§ Contact</span>
              <span>{profile.city} · IST (UTC+5:30)</span>
            </div>

            <h1 className="t-display">
              Say <span className="t-italic t-accent">hello.</span>
            </h1>
            <p className="t-lead" style={{ marginTop: "2rem" }}>
              If something here resonated with you, I’d love to hear your story too. Email is the best way to reach me.
            </p>

            <div className="contact__mail-row">
              <a href={`mailto:${profile.email}`} className="contact__mail">
                <span>{profile.email}</span>
              </a>
              <CopyEmail email={profile.email} />
            </div>

            <ul className="channels">
              {channels.map((c) => (
                <li className="channel" key={c.name}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(c.download ? { download: true } : {})}
                  >
                    <span className="channel__name t-label">{c.name}</span>
                    <span className="channel__handle">{c.handle}</span>
                    <span className="channel__arr t-label" aria-hidden="true">
                      {c.download ? "↓" : "↗"}
                    </span>
                    {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
