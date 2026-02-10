import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { batches, medicines } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

type AlertTab = 'low-stock' | 'near-expiry' | 'expired';

const Alerts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const initialTab = (searchParams.get('tab') as AlertTab) || 'expired';
  const [tab, setTab] = useState<AlertTab>(initialTab);
  const [disposedIds, setDisposedIds] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('tab') as AlertTab;
    if (t && ['low-stock', 'near-expiry', 'expired'].includes(t)) setTab(t);
  }, [searchParams]);

  const expiredBatches = batches.filter(b => b.status === 'expired' && !disposedIds.has(b.id));
  const nearExpiryBatches = batches.filter(b => b.status === 'near-expiry' && !disposedIds.has(b.id));
  const lowStockMeds = medicines.filter(m => m.status === 'low' || m.status === 'out');

  const tabs: { key: AlertTab; label: string; count: number }[] = [
    { key: 'expired', label: 'Expired', count: expiredBatches.length },
    { key: 'near-expiry', label: 'Near Expiry', count: nearExpiryBatches.length },
    { key: 'low-stock', label: 'Low Stock', count: lowStockMeds.length },
  ];

  const handleDispose = (id: string) => {
    if (confirmDeleteId === id) {
      setDisposedIds(prev => new Set(prev).add(id));
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  const handleRestock = (medicineId: string) => {
    navigate(`/purchases?prefill=${medicineId}`);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">Alerts</h2>

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
              t.key === 'expired' ? 'status-critical' : 'status-warning'
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
              {expiredBatches.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted-foreground py-6">No expired alerts</td></tr>
              ) : expiredBatches.map(b => (
                <tr key={b.id} className="bg-status-critical/5">
                  <td className="font-medium">{b.medicineName}</td>
                  <td>{b.batchNumber}</td>
                  <td>{b.expiryDate}</td>
                  <td className="text-right">{b.quantity}</td>
                  <td>
                    {confirmDeleteId === b.id ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleDispose(b.id)} className="text-xs text-destructive font-bold hover:underline">Confirm Delete</button>
                        <button onClick={() => setConfirmDeleteId(null)} className="text-xs text-muted-foreground hover:underline">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => handleDispose(b.id)} className="text-xs text-destructive font-medium hover:underline">Mark for Disposal</button>
                    )}
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
                <th>Action</th>
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
                    <td>
                      {confirmDeleteId === b.id ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleDispose(b.id)} className="text-xs text-destructive font-bold hover:underline">Confirm</button>
                          <button onClick={() => setConfirmDeleteId(null)} className="text-xs text-muted-foreground hover:underline">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => handleDispose(b.id)} className="text-xs text-destructive font-medium hover:underline">Dispose</button>
                      )}
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
                <th>Action</th>
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
                  <td>
                    <button
                      onClick={() => handleRestock(m.id)}
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      Restock →
                    </button>
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
