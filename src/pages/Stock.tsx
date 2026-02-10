import { batches } from '@/data/mockData';

const Stock = () => {
  // Group batches by medicine
  const grouped = batches.reduce((acc, b) => {
    if (!acc[b.medicineName]) acc[b.medicineName] = [];
    acc[b.medicineName].push(b);
    return acc;
  }, {} as Record<string, typeof batches>);

  const getRowClass = (status: string) => {
    switch (status) {
      case 'expired': return 'bg-status-critical/10';
      case 'near-expiry': return 'bg-status-warning/10';
      case 'low': return 'bg-status-warning/5';
      default: return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'expired': return <span className="status-critical px-2 py-0.5 rounded-sm text-xs font-semibold">EXPIRED</span>;
      case 'near-expiry': return <span className="status-warning px-2 py-0.5 rounded-sm text-xs font-semibold">NEAR EXPIRY</span>;
      case 'low': return <span className="status-warning px-2 py-0.5 rounded-sm text-xs font-semibold">LOW QTY</span>;
      default: return <span className="status-healthy px-2 py-0.5 rounded-sm text-xs font-semibold">OK</span>;
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">Stock / Batch Management</h2>

      {Object.entries(grouped).map(([medicineName, medicineBatches]) => (
        <div key={medicineName} className="mb-4 bg-card border border-border rounded-sm">
          <div className="px-3 py-2 border-b border-border bg-muted/50">
            <h3 className="text-sm font-semibold text-foreground">{medicineName}</h3>
          </div>
          <table className="erp-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Expiry Date</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Cost Price (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {medicineBatches.map(b => (
                <tr key={b.id} className={getRowClass(b.status)}>
                  <td className="font-medium">{b.batchNumber}</td>
                  <td>{b.expiryDate}</td>
                  <td className="text-right">{b.quantity}</td>
                  <td className="text-right">{b.costPrice.toFixed(2)}</td>
                  <td>{getStatusLabel(b.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Stock;
