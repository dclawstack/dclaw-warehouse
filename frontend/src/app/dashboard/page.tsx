"use client";

import React, { useState } from "react";
import { Building2, BarChart3 } from "lucide-react";
import { api, WarehouseAnalysis, ZoneLayout } from "@/lib/api";

export default function DashboardPage() {
  const [warehouseId, setWarehouseId] = useState("");
  const [analysis, setAnalysis] = useState<WarehouseAnalysis | null>(null);
  const [layout, setLayout] = useState<ZoneLayout[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLayout(null);
    try {
      const result = await api<WarehouseAnalysis>("/analyses", {
        method: "POST",
        body: JSON.stringify({ warehouse_id: warehouseId }),
      });
      setAnalysis(result);
      const zones = await api<ZoneLayout[]>(`/analyses/${result.id}/layout`);
      setLayout(zones);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white px-6 py-4 flex items-center gap-3">
        <Building2 className="h-6 w-6" style={{ color: "#D97706" }} />
        <h1 className="text-xl font-bold" style={{ color: "#D97706" }}>
          DClaw Warehouse
        </h1>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-semibold text-slate-800">Dashboard</h2>

        <form onSubmit={handleAnalyze} className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <label htmlFor="warehouse" className="mb-1 block text-sm font-medium text-slate-700">
              Warehouse ID
            </label>
            <input
              id="warehouse"
              type="text"
              value={warehouseId}
              onChange={(e) => setWarehouseId(e.target.value)}
              placeholder="WH-001"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#D97706" }}
          >
            <BarChart3 className="h-4 w-4" />
            {loading ? "Analyzing..." : "Analyze Layout"}
          </button>
        </form>

        {analysis && (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Warehouse Analysis</h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Picking efficiency</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{analysis.picking_efficiency}%</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Space utilization</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{analysis.space_utilization}%</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Bottleneck zones</dt>
                <dd className="mt-1 text-sm text-slate-900">{analysis.bottleneck_zones.join(", ")}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Automation potential</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{analysis.automation_potential}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Analysis ID</dt>
                <dd className="mt-1 text-sm font-mono text-slate-900">{analysis.id}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Created at</dt>
                <dd className="mt-1 text-sm text-slate-900">{analysis.created_at}</dd>
              </div>
            </dl>

            {layout && layout.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold text-slate-700">Zone Layout</h4>
                <div className="space-y-2">
                  {layout.map((z, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{z.zone}</div>
                        <div className="text-xs text-slate-500">{z.description}</div>
                      </div>
                      <div className="text-sm font-semibold" style={{ color: "#D97706" }}>{z.utilization_percent}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
