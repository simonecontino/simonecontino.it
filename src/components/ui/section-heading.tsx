type Props = { eyebrow?: string; title: string; text?: string; align?: "left" | "center" };

export function SectionHeading({ eyebrow, title, text, align = "left" }: Props) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
