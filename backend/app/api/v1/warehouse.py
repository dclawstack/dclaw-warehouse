import random
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class CreateAnalysisRequest(BaseModel):
    warehouse_id: str


class WarehouseAnalysis(BaseModel):
    id: str
    warehouse_id: str
    picking_efficiency: int
    space_utilization: int
    bottleneck_zones: list[str]
    automation_potential: str
    created_at: str


class ZoneLayout(BaseModel):
    zone: str
    description: str
    utilization_percent: int


@router.post("/analyses")
async def create_analysis(req: CreateAnalysisRequest) -> WarehouseAnalysis:
    return WarehouseAnalysis(
        id=str(uuid.uuid4()),
        warehouse_id=req.warehouse_id,
        picking_efficiency=random.randint(60, 95),
        space_utilization=random.randint(50, 90),
        bottleneck_zones=["Receiving dock"],
        automation_potential="High",
        created_at=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    )


@router.get("/analyses/{analysis_id}/layout")
async def get_analysis_layout(analysis_id: str) -> list[ZoneLayout]:
    return [
        ZoneLayout(zone="Receiving", description="Inbound goods reception", utilization_percent=85),
        ZoneLayout(zone="Storage", description="Pallet racking area", utilization_percent=72),
        ZoneLayout(zone="Picking", description="Order fulfillment zone", utilization_percent=68),
        ZoneLayout(zone="Shipping", description="Outbound dispatch", utilization_percent=90),
    ]
