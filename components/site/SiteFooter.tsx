import Image from "next/image";
import Link from "next/link";
import { nav, profile, protosemHref } from "@/data/profile";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer surface-dark" aria-labelledby="footer-title">
      <div className="wrap">
        <p className="t-label t-muted" id="footer-title">
          Write to me
        </p>
        <a className="footer__mail" href={`mailto:${profile.email}`}>
          <span>{profile.email}</span>
        </a>

        <div className="footer__cols">
          <div className="footer__col">
            <h2 className="t-label">Index</h2>
            <ul>
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-u">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="t-label">Elsewhere</h2>
            <ul>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="link-u">
                  Email
                </a>
              </li>
              <li>
                <a href={profile.resumePdf} download className="link-u">
                  Résumé (PDF) ↓
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="t-label">ProtoSem</h2>
            <ul>
              <li>
                <a href={protosemHref} className="link-u">
                  The weekly log ↗
                </a>
              </li>
              <li className="t-muted">Internship at Forger Innovations &amp; Ventures, documented week by week.</li>
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="t-label">Based in</h2>
            <ul>
              <li>{profile.city}</li>
              <li className="t-muted">IST · UTC+5:30</li>
            </ul>
          </div>
        </div>

        <div className="footer__adam" aria-hidden="true">
          <Image src="/art/hand-adam-sm.webp" alt="" width={460} height={256} sizes="220px" unoptimized />
          <Image
            src="/art/hand-creator-sm.webp"
            alt=""
            width={413}
            height={255}
            sizes="198px"
            unoptimized
            style={{ width: "min(26.9vw, 198px)" }}
          />
        </div>
        <p className="footer__motto">{profile.motto}</p>

        <div className="footer__base t-label">
          <span>
            © {year} {profile.name}
          </span>
          <a href="#main" className="link-u">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
