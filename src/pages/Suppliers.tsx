import { useState } from 'react';
import { Plus, X, Pencil, Trash2 } from 'lucide-react';
import { suppliers as initialSuppliers, Supplier } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const emptySupplier = { name: '', licenseNumber: '', phone: '', email: '', city: '' };

const Suppliers = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  const [supplierList, setSupplierList] = useState<Supplier[]>(initialSuppliers);
  const [showPanel, setShowPanel] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptySupplier);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditId(null);
    setForm(emptySupplier);
    setShowPanel(true);
  };

  const openEdit = (s: Supplier) => {
    setEditId(s.id);
    setForm({ name: s.name, licenseNumber: s.licenseNumber, phone: s.phone, email: s.email, city: s.city });
    setShowPanel(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editId) {
      setSupplierList(prev => prev.map(s => s.id === editId ? { ...s, ...form } : s));
    } else {
      setSupplierList(prev => [...prev, { id: `s${Date.now()}`, ...form }]);
    }
    setShowPanel(false);
    setEditId(null);
    setForm(emptySupplier);
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      setSupplierList(prev => prev.filter(s => s.id !== id));
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Suppliers</h2>
        {isAdmin && (
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" /> Add Supplier
          </button>
        )}
      </div>

      <div className="flex gap-4">
        <div className={showPanel ? 'flex-1' : 'w-full'}>
          <div className="bg-card border border-border rounded-sm">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>License Number</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>City</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {supplierList.map(s => (
                  <tr key={s.id}>
                    <td className="font-medium">{s.name}</td>
                    <td className="text-xs font-mono">{s.licenseNumber}</td>
                    <td>{s.phone}</td>
                    <td>{s.email}</td>
                    <td>{s.city}</td>
                    {isAdmin && (
                      <td>
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(s)} className="text-muted-foreground hover:text-foreground">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          {confirmDeleteId === s.id ? (
                            <>
                              <button onClick={() => handleDelete(s.id)} className="text-xs text-destructive font-bold">Confirm</button>
                              <button onClick={() => setConfirmDeleteId(null)} className="text-xs text-muted-foreground">Cancel</button>
                            </>
                          ) : (
                            <button onClick={() => handleDelete(s.id)} className="text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showPanel && (
          <div className="w-80 bg-card border border-border rounded-sm shrink-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                {editId ? 'Edit Supplier' : 'Add Supplier'}
              </h3>
              <button onClick={() => setShowPanel(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3 space-y-3">
              {(['name', 'licenseNumber', 'phone', 'email', 'city'] as const).map(field => (
                <div key={field}>
                  <label className="block text-xs font-medium text-foreground mb-1 capitalize">
                    {field === 'licenseNumber' ? 'License Number' : field}
                  </label>
                  <input
                    type="text"
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-2 py-1.5 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              ))}
              <button
                onClick={handleSave}
                className="w-full py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:opacity-90 mt-2"
              >
                {editId ? 'Update Supplier' : 'Save Supplier'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
