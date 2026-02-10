import { useState } from 'react';
import { batches, medicines } from '@/data/mockData';

type AlertTab = 'low-stock' | 'near-expiry' | 'expired';

const Alerts = () => {
  const [tab, setTab] = useState<AlertTab>('expired');

  const expiredBatches = batches.filter(b => b.status === 'expired');
  const nearExpiryBatches = batches.filter(b => b.status === 'near-expiry');
  const lowStockMeds = medicines.filter(m => m.status === 'low' || m.status === 'out');

  const tabs: { key: AlertTab; label: string; count: number }[] = [
    { key: 'expired', label: 'Expired', count: expiredBatches.length },
    { key: 'near-expiry', label: 'Near Expiry', count: nearExpiryBatches.length },
    { key: 'low-stock', label: 'Low Stock', count: lowStockMeds.length },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">Alerts</h2>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border mb-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-sm font-semibold ${
              t.key === 'expired' ? 'status-critical' :
              t.key === 'near-expiry' ? 'status-warning' : 'status-warning'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-sm">
        {tab === 'expired' && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Batch</th>
                <th>Expiry Date</th>
                <th className="text-right">Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expiredBatches.map(b => (
                <tr key={b.id} className="bg-status-critical/5">
                  <td className="font-medium">{b.medicineName}</td>
                  <td>{b.batchNumber}</td>
                  <td>{b.expiryDate}</td>
                  <td className="text-right">{b.quantity}</td>
                  <td>
                    <button className="text-xs text-destructive font-medium hover:underline">Mark for Disposal</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'near-expiry' && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Batch</th>
                <th>Expiry Date</th>
                <th className="text-right">Quantity</th>
                <th>Days Left</th>
              </tr>
            </thead>
            <tbody>
              {nearExpiryBatches.map(b => {
                const daysLeft = Math.ceil((new Date(b.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={b.id} className="bg-status-warning/5">
                    <td className="font-medium">{b.medicineName}</td>
                    <td>{b.batchNumber}</td>
                    <td>{b.expiryDate}</td>
                    <td className="text-right">{b.quantity}</td>
                    <td>
                      <span className="status-warning px-2 py-0.5 rounded-sm text-xs font-semibold">
                        {daysLeft} days
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {tab === 'low-stock' && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th className="text-right">Current Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lowStockMeds.map(m => (
                <tr key={m.id} className={m.status === 'out' ? 'bg-status-critical/5' : 'bg-status-warning/5'}>
                  <td className="font-medium">{m.name}</td>
                  <td>{m.category}</td>
                  <td>{m.manufacturer}</td>
                  <td className="text-right">{m.totalStock}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-sm text-xs font-semibold ${
                      m.status === 'out' ? 'status-critical' : 'status-warning'
                    }`}>
                      {m.status === 'out' ? 'OUT OF STOCK' : 'LOW'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Alerts;
