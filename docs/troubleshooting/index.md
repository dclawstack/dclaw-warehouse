# Troubleshooting

Common issues and solutions for DClaw Warehouse.

## Quick Diagnostics

```bash
# Check app pods
kubectl get pods -n dclaw-warehouse

# Check logs
kubectl logs -n dclaw-warehouse deployment/dclaw-warehouse-backend

# Check database
kubectl get clusters -n dclaw-warehouse
```

## Sections

- [Common Issues](./common-issues)
- [FAQ](./faq)
