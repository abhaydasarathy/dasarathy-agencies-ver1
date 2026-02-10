interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: 'default' | 'warning' | 'critical' | 'healthy';
}

const variantStyles: Record<string, string> = {
  default: 'border-l-4 border-l-primary',
  warning: 'border-l-4 border-l-status-warning',
  critical: 'border-l-4 border-l-status-critical',
  healthy: 'border-l-4 border-l-status-healthy',
};

const KPICard = ({ title, value, subtitle, variant = 'default' }: KPICardProps) => {
  return (
    <div className={`kpi-card ${variantStyles[variant]}`}>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{title}</div>
      <div className="text-2xl font-bold mt-1 text-foreground">{value}</div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
    </div>
  );
};

export default KPICard;
