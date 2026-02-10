import { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { medicines, batches } from '@/data/mockData';

interface SaleItem {
  medicineId: string;
  medicineName: string;
  batchId: string;
  batchNumber: string;
  quantity: number;
  price: number;
  maxQty: number;
  warning?: string;
}

const Sales = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<SaleItem[]>([]);
  const [customerName, setCustomerName] = useState('');

  const searchResults = search.length > 1
    ? medicines.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) && m.status !== 'inactive'
      )
    : [];

  const addMedicine = (medicineId: string) => {
    const med = medicines.find(m => m.id === medicineId);
    if (!med) return;

    // FIFO: pick earliest expiry batch that isn't expired
    const availableBatches = batches
      .filter(b => b.medicineId === medicineId && b.quantity > 0 && b.status !== 'expired')
      .sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));

    if (availableBatches.length === 0) return;

    const batch = availableBatches[0];
    const warning = batch.status === 'near-expiry' ? 'Near expiry batch selected' : undefined;

    setItems([...items, {
      medicineId,
      medicineName: med.name,
      batchId: batch.id,
      batchNumber: batch.batchNumber,
      quantity: 1,
      price: batch.costPrice * 1.2, // 20% markup
      maxQty: batch.quantity,
      warning,
    }]);
    setSearch('');
  };

  const updateQuantity = (index: number, qty: number) => {
    const updated = [...items];
    updated[index].quantity = Math.min(qty, updated[index].maxQty);
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">Sales / Billing</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Left: Search + Add */}
        <div className="col-span-2">
          <div className="bg-card border border-border rounded-sm p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Search Medicine</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Type medicine name..."
                  />
                </div>
                {searchResults.length > 0 && (
                  <div className="absolute z-10 mt-1 bg-card border border-border rounded-sm shadow-lg max-h-48 overflow-y-auto w-72">
                    {searchResults.map(m => (
                      <button
                        key={m.id}
                        onClick={() => addMedicine(m.id)}
                        disabled={m.status === 'out'}
                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-muted ${
                          m.status === 'out' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <span className="font-medium">{m.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">Stock: {m.totalStock}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Batch</th>
                  <th>Price (₹)</th>
                  <th>Qty</th>
                  <th className="text-right">Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted-foreground py-8">
                      Search and add medicines to begin billing
                    </td>
                  </tr>
                ) : (
                  items.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="font-medium">{item.medicineName}</div>
                        {item.warning && (
                          <div className="flex items-center gap-1 text-[11px] text-status-warning mt-0.5">
                            <AlertTriangle className="h-3 w-3" /> {item.warning}
                          </div>
                        )}
                      </td>
                      <td className="text-xs">{item.batchNumber}</td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          min={1}
                          max={item.maxQty}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(i, Number(e.target.value))}
                          className="w-16 px-2 py-1 text-sm border border-input bg-background rounded-sm text-right"
                        />
                      </td>
                      <td className="text-right font-medium">₹{(item.quantity * item.price).toFixed(2)}</td>
                      <td>
                        <button onClick={() => removeItem(i)} className="text-xs text-destructive hover:underline">Remove</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Total */}
        <div>
          <div className="bg-card border border-border rounded-sm p-4 sticky top-5">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-4">Invoice Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Qty</span>
                <span className="font-medium">{items.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-xl font-bold">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <button
              disabled={items.length === 0}
              className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
