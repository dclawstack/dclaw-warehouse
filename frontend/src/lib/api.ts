export interface WarehouseAnalysis {
  id: string;
  warehouse_id: string;
  picking_efficiency: number;
  space_utilization: number;
  bottleneck_zones: string[];
  automation_potential: string;
  created_at: string;
}

export interface ZoneLayout {
  zone: string;
  description: string;
  utilization_percent: number;
}

export async function api<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const url = `/api/v1${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };

  const res = await fetch(url, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}
