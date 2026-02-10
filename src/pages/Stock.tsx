import { useState } from 'react';
import { Pencil, X, Check } from 'lucide-react';
import { batches as initialBatches, Batch } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Stock = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  const [batchList, setBatchList] = useState<Batch[]>(initialBatches);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ quantity: 0, costPrice: 0 });

  const grouped = batchList.reduce((acc, b) => {
    if (!acc[b.medicineName]) acc[b.medicineName] = [];
    acc[b.medicineName].push(b);
    return acc;
  }, {} as Record<string, Batch[]>);

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

  const startEdit = (b: Batch) => {
    setEditingId(b.id);
    setEditForm({ quantity: b.quantity, costPrice: b.costPrice });
  };

  const saveEdit = (id: string) => {
    setBatchList(prev => prev.map(b => b.id === id ? { ...b, quantity: editForm.quantity, costPrice: editForm.costPrice } : b));
    setEditingId(null);
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
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {medicineBatches.map(b => (
                <tr key={b.id} className={getRowClass(b.status)}>
                  <td className="font-medium">{b.batchNumber}</td>
                  <td>{b.expiryDate}</td>
                  <td className="text-right">
                    {editingId === b.id ? (
                      <input type="number" value={editForm.quantity} onChange={(e) => setEditForm({ ...editForm, quantity: Number(e.target.value) })}
                        className="w-20 px-1 py-0.5 text-sm border border-input bg-background rounded-sm text-right" />
                    ) : b.quantity}
                  </td>
                  <td className="text-right">
                    {editingId === b.id ? (
                      <input type="number" step="0.01" value={editForm.costPrice} onChange={(e) => setEditForm({ ...editForm, costPrice: Number(e.target.value) })}
                        className="w-20 px-1 py-0.5 text-sm border border-input bg-background rounded-sm text-right" />
                    ) : b.costPrice.toFixed(2)}
                  </td>
                  <td>{getStatusLabel(b.status)}</td>
                  {isAdmin && (
                    <td>
                      {editingId === b.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => saveEdit(b.id)} className="text-status-healthy hover:opacity-80"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground"><X className="h-3.5 w-3.5" /></button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(b)} className="text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                      )}
                    </td>
                  )}
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
