import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { medicines, batches } from '@/data/mockData';

const Medicines = () => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase()) ||
    m.manufacturer.toLowerCase().includes(search.toLowerCase())
  );

  const selectedMedicine = medicines.find(m => m.id === selectedId);
  const selectedBatches = batches.filter(b => b.medicineId === selectedId);

  return (
    <div className="flex gap-4">
      {/* Main Table */}
      <div className={`${selectedId ? 'flex-1' : 'w-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Medicines</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medicines..."
                className="pl-8 pr-3 py-1.5 text-sm border border-input bg-card rounded-sm focus:outline-none focus:ring-1 focus:ring-ring w-56"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:opacity-90">
              <Plus className="h-3.5 w-3.5" /> Add Medicine
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-sm">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th className="text-right">Total Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr
                  key={m.id}
                  onClick={() => setSelectedId(m.id === selectedId ? null : m.id)}
                  className={`cursor-pointer ${m.id === selectedId ? 'bg-accent' : ''}`}
                >
                  <td className="font-medium">{m.name}</td>
                  <td>{m.category}</td>
                  <td>{m.manufacturer}</td>
                  <td className="text-right">{m.totalStock.toLocaleString()}</td>
                  <td>
                    <StatusBadge status={m.status === 'out' ? 'out' : m.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Panel */}
      {selectedId && selectedMedicine && (
        <div className="w-80 bg-card border border-border rounded-sm shrink-0">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">Batch Details</h3>
            <button onClick={() => setSelectedId(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-3 py-2 border-b border-border">
            <div className="font-medium text-sm text-foreground">{selectedMedicine.name}</div>
            <div className="text-xs text-muted-foreground">{selectedMedicine.manufacturer} · {selectedMedicine.category}</div>
          </div>
          <table className="erp-table">
            <thead>
              <tr>
                <th>Batch</th>
                <th>Expiry</th>
                <th className="text-right">Qty</th>
              </tr>
            </thead>
            <tbody>
              {selectedBatches.map(b => (
                <tr key={b.id} className={
                  b.status === 'expired' ? 'bg-status-critical/5' :
                  b.status === 'near-expiry' ? 'bg-status-warning/5' : ''
                }>
                  <td className="text-xs">{b.batchNumber}</td>
                  <td className="text-xs">{b.expiryDate}</td>
                  <td className="text-right text-xs">{b.quantity}</td>
                </tr>
              ))}
              {selectedBatches.length === 0 && (
                <tr><td colSpan={3} className="text-center text-muted-foreground text-xs py-4">No batches found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Medicines;
