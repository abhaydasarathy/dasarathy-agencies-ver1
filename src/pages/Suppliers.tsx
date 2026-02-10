import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { suppliers } from '@/data/mockData';

const Suppliers = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Suppliers</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" /> Add Supplier
        </button>
      </div>

      <div className="flex gap-4">
        <div className={showAdd ? 'flex-1' : 'w-full'}>
          <div className="bg-card border border-border rounded-sm">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>License Number</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(s => (
                  <tr key={s.id} className="cursor-pointer">
                    <td className="font-medium">{s.name}</td>
                    <td className="text-xs font-mono">{s.licenseNumber}</td>
                    <td>{s.phone}</td>
                    <td>{s.email}</td>
                    <td>{s.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAdd && (
          <div className="w-80 bg-card border border-border rounded-sm shrink-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">Add Supplier</h3>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3 space-y-3">
              {['Supplier Name', 'License Number', 'Phone', 'Email', 'City'].map(field => (
                <div key={field}>
                  <label className="block text-xs font-medium text-foreground mb-1">{field}</label>
                  <input
                    type="text"
                    className="w-full px-2 py-1.5 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              ))}
              <button className="w-full py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:opacity-90 mt-2">
                Save Supplier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
