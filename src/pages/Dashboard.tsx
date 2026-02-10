import { useNavigate } from 'react-router-dom';
import KPICard from '@/components/KPICard';
import { recentSales, recentPurchases, batches } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const nearExpiryCount = batches.filter(b => b.status === 'near-expiry').length;
  const expiredCount = batches.filter(b => b.status === 'expired').length;
  const lowStockCount = batches.filter(b => b.status === 'low').length;
  const todaySales = recentSales.filter(s => s.date === '2026-02-10').reduce((sum, s) => sum + s.total, 0);

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">Dashboard</h2>

      <div className="grid grid-cols-5 gap-3 mb-6">
        <div className="cursor-pointer" onClick={() => navigate('/stock')}>
          <KPICard title="Total Stock Value" value="₹4,85,200" subtitle="Across 15 medicines" />
        </div>
        <div className="cursor-pointer" onClick={() => navigate('/alerts?tab=near-expiry')}>
          <KPICard title="Near Expiry" value={nearExpiryCount} subtitle="Within 90 days" variant="warning" />
        </div>
        <div className="cursor-pointer" onClick={() => navigate('/alerts?tab=expired')}>
          <KPICard title="Expired Batches" value={expiredCount} subtitle="Requires action" variant="critical" />
        </div>
        <div className="cursor-pointer" onClick={() => navigate('/alerts?tab=low-stock')}>
          <KPICard title="Low Stock Items" value={lowStockCount} subtitle="Below threshold" variant="warning" />
        </div>
        <div className="cursor-pointer" onClick={() => navigate('/reports')}>
          <KPICard title="Today's Sales" value={`₹${todaySales.toLocaleString()}`} subtitle="2 invoices" variant="healthy" />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-sm">
          <div className="px-3 py-2 border-b border-border">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Recent Purchases</h3>
          </div>
          <table className="erp-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Supplier</th>
                <th>Items</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map(p => (
                <tr key={p.id}>
                  <td>{p.date}</td>
                  <td>{p.supplierName}</td>
                  <td>{p.items}</td>
                  <td className="text-right font-medium">₹{p.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-card border border-border rounded-sm">
          <div className="px-3 py-2 border-b border-border">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Recent Sales</h3>
          </div>
          <table className="erp-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map(s => (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td>{s.customerName}</td>
                  <td>{s.items}</td>
                  <td className="text-right font-medium">₹{s.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 bg-card border border-border rounded-sm">
        <div className="px-3 py-2 border-b border-border">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Expiry Risk Summary</h3>
        </div>
        <table className="erp-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Batch</th>
              <th>Expiry Date</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {batches.filter(b => b.status === 'expired' || b.status === 'near-expiry').map(b => (
              <tr key={b.id} className={b.status === 'expired' ? 'bg-status-critical/5' : 'bg-status-warning/5'}>
                <td>{b.medicineName}</td>
                <td>{b.batchNumber}</td>
                <td>{b.expiryDate}</td>
                <td>{b.quantity}</td>
                <td>
                  <span className={`inline-block px-2 py-0.5 rounded-sm text-xs font-semibold ${
                    b.status === 'expired' ? 'status-critical' : 'status-warning'
                  }`}>
                    {b.status === 'expired' ? 'EXPIRED' : 'NEAR EXPIRY'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
