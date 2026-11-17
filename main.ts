/** AI Money Builder — deterministic planning core.
 * Estimates are planning scenarios, never guarantees of income.
 */
export type Market = "servicos" | "automacao" | "produtos" | "conteudo";
export interface PlanInput { budget: number; market: Market; hoursPerDay: 1|2|4|6; level: "iniciante"|"intermediario"|"avancado"; }
export interface Allocation { reserve: number; tools: number; validation: number; operatingBuffer: number; }
export function allocateBudget(budget: number): Allocation {
  if (!Number.isFinite(budget) || budget < 0) throw new Error("Budget must be a non-negative number");
  const reserve=Math.round(budget*.35), tools=Math.round(budget*.15), validation=Math.round(budget*.20);
  return {reserve,tools,validation,operatingBuffer:budget-reserve-tools-validation};
}
export function buildPlan(input: PlanInput) {
  const allocation=allocateBudget(input.budget);
  const focus: Record<Market,string>={servicos:"Sell a narrowly scoped digital service",automacao:"Validate a repeatable small-business automation",produtos:"Pre-sell a small digital product only after demand validation",conteudo:"Offer a measurable content pilot to a defined niche"};
  return {title:"30-day revenue experiment",focus:focus[input.market],dailyHours:input.hoursPerDay,allocation,phases:[{days:"1-3",goal:"Interview five target customers and identify one painful problem."},{days:"4-7",goal:"Build a tiny demo and a clear fixed-scope offer."},{days:"8-14",goal:"Run personalized outreach and record every response."},{days:"15-21",goal:"Deliver a paid pilot only when a real customer agrees."},{days:"22-30",goal:"Review actual revenue, costs, conversion and decide whether to iterate."}],guardrails:["Never report projected revenue as actual revenue.","Do not spend the reserve before demand is validated.","No guaranteed-income claims; disclose uncertainty and risks."]};
}
