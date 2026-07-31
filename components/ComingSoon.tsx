export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className="coming-soon">
      <div className="eyebrow">{title}</div>
      <h1 className="section-title" style={{ marginTop: 14 }}>
        This chapter is still being written.
      </h1>
    </section>
  );
}
