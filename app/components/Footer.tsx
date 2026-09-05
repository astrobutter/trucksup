import styles from "./Footer.module.scss";

const QUICK_LINKS = ["Home", "About Us", "Meet Our Team", "Contact", "Terms & Conditions", "Grievance Redressal Policy"];

const SOCIALS = [
  { label: "Facebook", icon: <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.89 2 14.54 2 11.72 2 9.75 3.73 9.75 6.9V9.5H6.5v4h3.25V22h4.25v-8.5Z" /> },
  { label: "YouTube", icon: <path d="M21.6 7.2s-.21-1.5-.86-2.16c-.82-.87-1.74-.87-2.16-.92C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.12c-.42.05-1.34.05-2.16.92C2.6 5.7 2.4 7.2 2.4 7.2S2.2 8.95 2.2 10.7v1.6c0 1.75.2 3.5.2 3.5s.2 1.5.85 2.16c.82.87 1.9.84 2.38.93C7.4 19.98 12 20 12 20s3.6-.01 6.58-.13c.42-.05 1.34-.05 2.16-.92.65-.66.86-2.16.86-2.16s.2-1.75.2-3.5v-1.6c0-1.75-.2-3.5-.2-3.5ZM9.95 14.5v-5.4l4.9 2.71-4.9 2.69Z" /> },
  { label: "Instagram", icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.2" cy="6.8" r="1" /></> },
  { label: "LinkedIn", icon: <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.4A1.96 1.96 0 1 0 5.25 7.3a1.96 1.96 0 0 0 0-3.9ZM20.4 20h-3.37v-6.06c0-1.44-.03-3.3-2.01-3.3-2.02 0-2.33 1.57-2.33 3.2V20H9.32V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" /> },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.about}>
            TrucksUp is a customer-driven company with a proven commitment to excellence and a
            value-based policy in all aspects of its business to satisfy aspiring truck owners,
            business partners, and the transportation industry of India.
          </p>
        </div>

        <div>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul className={styles.links}>
            {QUICK_LINKS.map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Contact</h4>
          <p className={styles.contactLine}>Phone: 7070327070</p>
          <p className={styles.contactLine}>WhatsApp: 7070327070</p>
          <p className={styles.contactLine}>Email: reachus@trucksup.com</p>
        </div>

        <div>
          <h4 className={styles.heading}>Find Us On</h4>
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className={styles.socialBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
          <div className={styles.badges}>
            <div className={styles.badge}>
              <img
                src="/images/badge-google-play.svg"
                alt="Get it on Google Play"
                width={20}
                height={20}
              />
              <span>Get it on Google Play</span>
            </div>
            <div className={styles.badge}>
              <img
                src="/images/badge-app-store.svg"
                alt="Download on the App Store"
                width={20}
                height={20}
              />
              <span>Download on the App Store</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>Copyright @ TrucksUp. All Rights Reserved.</div>
    </footer>
  );
}
