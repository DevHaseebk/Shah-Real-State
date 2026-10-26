/**
 * A script that runs while the HTML is parsed, before first paint and before React hydrates.
 * On the client it renders as text/plain so React neither warns nor runs it again.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
