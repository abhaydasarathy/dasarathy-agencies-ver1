import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { suppliers, medicines } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface PurchaseItem {
  medicineId: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  costPrice: number;
}

const Purchases = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  const [searchParams] = useSearchParams();
  const [supplierId, setSupplierId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('2026-02-10');
  const [items, setItems] = useState<PurchaseItem[]>([
    { medicineId: '', batchNumber: '', expiryDate: '', quantity: 0, costPrice: 0 },
  ]);

  // Pre-fill from restock flow
  useEffect(() => {
    const prefill = searchParams.get('prefill');
    if (prefill) {
      setItems([{ medicineId: prefill, batchNumber: '', expiryDate: '', quantity: 0, costPrice: 0 }]);
    }
  }, [searchParams]);

  const addRow = () => {
    setItems([...items, { medicineId: '', batchNumber: '', expiryDate: '', quantity: 0, costPrice: 0 }]);
  };

  const removeRow = (index: number) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof PurchaseItem, value: string | number) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.costPrice, 0);

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">Purchase Entry</h2>

      <div className="bg-card border border-border rounded-sm p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Supplier</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="">Select Supplier</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <table className="erp-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Batch Number</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Cost Price (₹)</th>
              <th className="text-right">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  <select
                    value={item.medicineId}
                    onChange={(e) => updateItem(i, 'medicineId', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-input bg-background rounded-sm"
                  >
                    <option value="">Select</option>
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={item.batchNumber}
                    onChange={(e) => updateItem(i, 'batchNumber', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-input bg-background rounded-sm"
                    placeholder="e.g. PCM-2026-001"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={item.expiryDate}
                    onChange={(e) => updateItem(i, 'expiryDate', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-input bg-background rounded-sm"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity || ''}
                    onChange={(e) => updateItem(i, 'quantity', Number(e.target.value))}
                    className="w-20 px-2 py-1 text-sm border border-input bg-background rounded-sm text-right"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={item.costPrice || ''}
                    onChange={(e) => updateItem(i, 'costPrice', Number(e.target.value))}
                    className="w-24 px-2 py-1 text-sm border border-input bg-background rounded-sm text-right"
                  />
                </td>
                <td className="text-right font-medium">₹{(item.quantity * item.costPrice).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => removeRow(i)}
                    disabled={items.length <= 1}
                    className="text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-3">
          <button onClick={addRow} className="text-sm text-primary hover:underline">+ Add Row</button>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Total Purchase Cost</div>
            <div className="text-xl font-bold text-foreground">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:opacity-90">
          Save Purchase
        </button>
      </div>
    </div>
  );
};

export default Purchases;
