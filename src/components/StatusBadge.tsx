import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'healthy' | 'low' | 'out' | 'inactive' | 'near-expiry' | 'expired' | 'warning' | 'critical';
  label?: string;
}

const statusMap: Record<string, { className: string; defaultLabel: string }> = {
  healthy: { className: 'status-healthy', defaultLabel: 'In Stock' },
  low: { className: 'status-warning', defaultLabel: 'Low Stock' },
  out: { className: 'status-critical', defaultLabel: 'Out of Stock' },
  inactive: { className: 'status-inactive', defaultLabel: 'Inactive' },
  'near-expiry': { className: 'status-warning', defaultLabel: 'Near Expiry' },
  expired: { className: 'status-critical', defaultLabel: 'Expired' },
  warning: { className: 'status-warning', defaultLabel: 'Warning' },
  critical: { className: 'status-critical', defaultLabel: 'Critical' },
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const config = statusMap[status] || statusMap.inactive;
  return (
    <span className={cn('inline-block px-2 py-0.5 rounded-sm text-xs font-semibold', config.className)}>
      {label || config.defaultLabel}
    </span>
  );
};

export default StatusBadge;
