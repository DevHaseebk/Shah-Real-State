"use client";

import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = { value: string; label: string; group?: string };

export function AdaptiveSelect({ id, label, name, options, value, defaultValue = "", onChange, className = "bs-input", invalid }: {
  id?: string; label: string; name?: string; options: SelectOption[]; value?: string; defaultValue?: string;
  onChange?: (value: string) => void; className?: string; invalid?: boolean;
}) {
  const generated = useId();
  const selectId = id ?? generated;
  const listId = `${selectId}-options`;
  const [localValue, setLocalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 260 });
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const hidden = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const current = value ?? localValue;
  const selected = options.find((option) => option.value === current);

  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const previous = document.body.style.overflow;
    if (mobile) document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); button.current?.focus(); }
      const focusable = Array.from(panel.current?.querySelectorAll<HTMLButtonElement>(".as-close, .as-option") ?? []);
      const active = document.activeElement as HTMLButtonElement;
      const index = focusable.indexOf(active);
      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && index >= 0) {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        focusable[(index + direction + focusable.length) % focusable.length]?.focus();
      }
      if (event.key === "Tab" && mobile && index >= 0) {
        if (event.shiftKey && index === 0) { event.preventDefault(); focusable[focusable.length - 1]?.focus(); }
        else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); focusable[0]?.focus(); }
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!mobile && panel.current && !panel.current.contains(event.target as Node) && !button.current?.contains(event.target as Node)) setOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (!mobile && panel.current && !panel.current.contains(event.target as Node) && !button.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    panel.current?.querySelector<HTMLButtonElement>("[aria-selected='true']")?.focus();
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); document.removeEventListener("focusin", onFocus); };
  }, [open]);

  const choose = (next: string) => {
    if (hidden.current) hidden.current.value = next;
    setLocalValue(next);
    setOpen(false);
    onChange?.(next);
    button.current?.focus();
  };
  const show = () => {
    const bounds = button.current?.getBoundingClientRect();
    setPortalTarget(button.current?.closest("dialog") ?? document.body);
    if (bounds) {
      const width = Math.min(Math.max(bounds.width, 260), window.innerWidth - 16);
      const flip = window.innerHeight - bounds.bottom < 320 && bounds.top > 320;
      setAbove(flip);
      setPosition({ top: flip ? bounds.top - 6 : bounds.bottom + 6, left: Math.max(8, Math.min(bounds.left, window.innerWidth - width - 8)), width });
    }
    setOpen(true);
  };
  const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const menu = <div className={`as-overlay${above ? " as-above" : ""}`} style={mobile ? undefined : position} onPointerDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
    <div ref={panel} className="as-panel" id={listId} role="listbox" aria-label={label}>
      <div className="as-heading"><strong>{label}</strong><button type="button" className="as-close" aria-label="Close options" onClick={() => { setOpen(false); button.current?.focus(); }}>×</button></div>
      <div className="as-options">{options.map((option, index) => <div key={`${option.value}-${index}`}>
        {option.group && (index === 0 || options[index - 1].group !== option.group) && <div className="as-group">{option.group}</div>}
        <button type="button" role="option" aria-selected={option.value === current} className="as-option" onClick={() => choose(option.value)}>{option.label}<span aria-hidden="true">{option.value === current ? "✓" : ""}</span></button>
      </div>)}</div>
    </div>
  </div>;
  return <div className="as-root">
    {name && <input ref={hidden} type="hidden" name={name} value={current} readOnly />}
    <button ref={button} id={selectId} type="button" className={`${className} as-trigger`} aria-label={label} data-invalid={invalid || undefined} aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined} onClick={() => open ? setOpen(false) : show()}>
      <span>{selected?.label ?? options[0]?.label ?? "Select"}</span><span className="as-chevron" aria-hidden="true" />
    </button>
    {open && portalTarget && createPortal(menu, portalTarget)}
  </div>;
}
