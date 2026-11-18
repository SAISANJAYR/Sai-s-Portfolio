/** Re-mounts on every navigation inside the site, giving each page a soft entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
