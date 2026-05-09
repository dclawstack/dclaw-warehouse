# DClaw Warehouse — v1.2 Feature Roadmap

> Based on: Y Combinator vertical SaaS principles, trending GitHub repos (warehouse-management), AI product research (ShipBob, Extensiv, Logiwa, Fishbowl)

## Pre-Flight Checklist

- [ ] `frontend/package-lock.json` committed after any `npm install` / dependency change
- [ ] `frontend/next-env.d.ts` exists and is committed
- [ ] `docker-compose.yml` healthchecks correct
- [ ] `frontend/Dockerfile` declares `ARG NEXT_PUBLIC_API_URL` before `RUN npm run build`

## v1.0 Feature Inventory (Current)

- [ ] Warehouse zones & bins
- [ ] Receiving workflow
- [ ] Picking & packing
- [ ] Shipping integration
- [ ] Real backend CRUD (no mocks)
- [ ] Docker + Helm deployment
- [ ] Alembic migrations
- [ ] Backend tests

---

## v1.2 Roadmap

### P0 — Must Have (Ship in v1.0, demo-ready)

#### 1. AI Warehouse Copilot (Operations Advisor)
**Description:** AI assistant that monitors warehouse operations, suggests pick routes, and alerts on bottlenecks. "What's the fastest pick route for order #4821?"
- **AI Angle:** Route optimization + operational analytics. RAG over SOPs.
- **Backend:** `/api/v1/ai/warehouse-chat` endpoint. Route optimization engine.
- **Frontend:** AI panel with real-time recommendations.
- **Files:** `backend/app/services/warehouse_ai.py`, `frontend/src/components/warehouse-copilot.tsx`

#### 2. Intelligent Pick Route Optimization
**Description:** AI-optimized pick paths based on order composition, warehouse layout, and traffic.
- **AI Angle:** Graph-based shortest path with congestion prediction.
- **Backend:** Route calculation API. Layout optimization suggestions.
- **Frontend:** Pick list with visual route map.
- **Files:** `backend/app/services/route_optimizer.py`

#### 3. Receiving & Put-Away Workflow
**Description:** Guided receiving: scan ASN, validate quantities, suggest put-away locations.
- **Backend:** Receiving workflow engine. Location suggestion algorithm.
- **Frontend:** Mobile receiving interface. Put-away task list.
- **Files:** `backend/app/services/receiving.py`

#### 4. Real-Time Inventory Visibility
**Description:** Live stock levels by location. Inbound/outbound tracking. Cycle count status.
- **Backend:** Real-time inventory aggregation. Event streaming.
- **Frontend:** Warehouse dashboard with live metrics.
- **Files:** `frontend/src/app/warehouse/dashboard.tsx`

### P1 — Should Have (v1.1–1.2)

#### 5. Wave Picking & Batch Processing
**Description:** Group orders into waves for efficient picking. Batch pick single-SKU orders.
- **Backend:** Wave planning engine. Batch optimization.
- **Frontend:** Wave builder. Pick performance metrics.

#### 6. Packing & Shipping Integration
**Description:** Box size recommendation, label generation, carrier rate shopping.
- **Backend:** Carrier API integration (FedEx, UPS, USPS). Rate comparison.
- **Frontend:** Packing station UI. Label printer integration.

#### 7. Returns & Reverse Logistics
**Description:** Process returns: receive, inspect, restock or dispose. Track return reasons.
- **Backend:** Returns workflow. Quality inspection forms.
- **Frontend:** Returns dashboard. Disposition decision tree.

#### 8. Labor Management & Performance
**Description:** Track picker/packer productivity. Incentive tracking. Labor forecasting.
- **Backend:** Performance metrics calculation.
- **Frontend:** Leaderboard. Shift planning view.

### P2 — Could Have (v1.3+)

#### 9. Warehouse Digital Twin
**Description:** 3D visualization of warehouse with real-time traffic, heatmaps, and simulation.

#### 10. AI-Driven Slotting Optimization
**Description:** AI suggests optimal product locations based on velocity, affinity, and seasonality.

#### 11. Voice Picking Integration
**Description:** Hands-free picking with voice commands and responses.

#### 12. Autonomous Mobile Robot (AMR) Integration
**Description:** API integration with warehouse robots for goods-to-person picking.

---

## Implementation Priority

1. **Week 1–2:** AI Warehouse Copilot (P0.1) + Pick Route Optimization (P0.2)
2. **Week 3–4:** Receiving Workflow (P0.3) + Real-Time Visibility (P0.4)
3. **Week 5–6:** Wave Picking (P1.5) + Shipping Integration (P1.6)
4. **Week 7–8:** Returns Management (P1.7) + Labor Management (P1.8)
