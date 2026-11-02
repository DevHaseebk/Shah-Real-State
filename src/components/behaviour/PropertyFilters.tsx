"use client";

import Form from "next/form";
import { useRef } from "react";
import type { PropertyMeta } from "@/content/types";
import { AdaptiveSelect, type SelectOption } from "../ui/AdaptiveSelect";

export interface FilterValues { purpose?: string; type?: string; area?: string; beds?: string; maxPrice?: string; sort?: string }

const BUDGETS = {
  sale: [["5000000", "PKR 50 lakh"], ["10000000", "PKR 1 crore"], ["20000000", "PKR 2 crore"], ["35000000", "PKR 3.5 crore"], ["50000000", "PKR 5 crore"], ["100000000", "PKR 10 crore"]],
  rent: [["30000", "PKR 30,000"], ["50000", "PKR 50,000"], ["80000", "PKR 80,000"], ["120000", "PKR 1.2 lakh"], ["200000", "PKR 2 lakh"], ["400000", "PKR 4 lakh"]],
};

/**
 * Filters as a plain GET form: it works without JavaScript (the button submits it), and with JavaScript each
 * change submits it straight away through next/form, without a full page load.
 */
export function PropertyFilters({ values, meta, areas }: { values: FilterValues; meta: PropertyMeta | null; areas: { name: string; count: number }[] }) {
  const form = useRef<HTMLFormElement>(null);
  const submit = () => form.current?.requestSubmit();
  const purposeHref = (p?: string) => {
    const q = new URLSearchParams(Object.entries({ ...values, purpose: p, maxPrice: undefined }).filter(([, v]) => v) as [string, string][]);
    return `/properties${q.size ? `?${q}` : ""}`;
  };
  const types = meta ? Object.entries(meta.types) : [];
  const groups = types.reduce<Record<string, [string, string][]>>((g, [k, v]) => ((g[v.group] ??= []).push([k, v.label]), g), {});
  const budgets = BUDGETS[values.purpose === "rent" ? "rent" : "sale"];
  const typeOptions: SelectOption[] = [{ value: "", label: "Any type" }, ...Object.entries(groups).flatMap(([group, opts]) => opts.map(([value, label]) => ({ value, label, group })))];

  return (
    <Form ref={form} action="/properties" className="bs-filters" aria-label="Filter properties">
      <nav className="bs-filters__seg" aria-label="Sale or rent">
        <a href={purposeHref()} aria-current={!values.purpose ? "true" : undefined}>All</a>
        <a href={purposeHref("sale")} aria-current={values.purpose === "sale" ? "true" : undefined}>Buy</a>
        <a href={purposeHref("rent")} aria-current={values.purpose === "rent" ? "true" : undefined}>Rent</a>
      </nav>
      {values.purpose && <input type="hidden" name="purpose" value={values.purpose} />}
      <div className="bs-filters__row">
        <div className="bs-field">
          <label htmlFor="f-type">Type</label>
          <AdaptiveSelect id="f-type" label="Type" name="type" options={typeOptions} value={values.type ?? ""} onChange={submit} />
        </div>
        <div className="bs-field">
          <label htmlFor="f-area">Area</label>
          <AdaptiveSelect id="f-area" label="Area" name="area" value={values.area ?? ""} onChange={submit} options={[{value:"",label:"All areas"}, ...areas.map(a => ({value:a.name,label:`${a.name} (${a.count})`})), ...(values.area && !areas.some(a => a.name === values.area) ? [{value:values.area,label:values.area}] : [])]} />
        </div>
        <div className="bs-field">
          <label htmlFor="f-beds">Bedrooms</label>
          <AdaptiveSelect id="f-beds" label="Bedrooms" name="beds" value={values.beds ?? ""} onChange={submit} options={[{value:"",label:"Any"}, ...[1,2,3,4,5].map(n => ({value:String(n),label:`${n}+`}))]} />
        </div>
        <div className="bs-field">
          <label htmlFor="f-max">Budget up to</label>
          <AdaptiveSelect id="f-max" label="Budget up to" name="maxPrice" value={values.maxPrice ?? ""} onChange={submit} options={[{value:"",label:"Any budget"}, ...budgets.map(([value,label]) => ({value,label}))]} />
        </div>
        <div className="bs-field">
          <label htmlFor="f-sort">Sort</label>
          <AdaptiveSelect id="f-sort" label="Sort" name="sort" value={values.sort ?? ""} onChange={submit} options={[{value:"",label:"Newest first"},{value:"price_asc",label:"Lowest price"},{value:"price_desc",label:"Highest price"}]} />
        </div>
        <noscript><button className="bs-btn bs-btn--primary" type="submit">Show results</button></noscript>
      </div>
      {(values.type || values.area || values.beds || values.maxPrice) && (
        <div className="bs-filters__foot">
          <a className="bs-link" href={values.purpose ? `/properties?purpose=${encodeURIComponent(values.purpose)}` : "/properties"}>Clear filters</a>
        </div>
      )}
    </Form>
  );
}
