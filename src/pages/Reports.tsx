import { useState } from 'react';
import { recentSales, recentPurchases } from '@/data/mockData';

const Reports = () => {
  const [reportType, setReportType] = useState<'sales' | 'purchases'>('sales');
  const [dateFrom, setDateFrom] = useState('2026-02-01');
  const [dateTo, setDateTo] = useState('2026-02-10');

  const filteredSales = recentSales.filter(s => s.date >= dateFrom && s.date <= dateTo);
  const filteredPurchases = recentPurchases.filter(p => p.date >= dateFrom && p.date <= dateTo);

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">Reports</h2>

      {/* Filters */}
      <div className="bg-card border border-border rounded-sm p-4 mb-4">
        <div className="flex items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'sales' | 'purchases')}
              className="px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="sales">Sales Report</option>
              <option value="purchases">Purchase Report</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:opacity-90">
            Generate
          </button>
          <button className="px-4 py-2 border border-border text-sm font-medium rounded-sm hover:bg-muted">
            Export CSV
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-card border border-border rounded-sm">
        {reportType === 'sales' ? (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th className="text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(s => (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td className="font-medium">{s.customerName}</td>
                  <td>{s.items}</td>
                  <td className="text-right font-medium">₹{s.total.toLocaleString()}</td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr><td colSpan={4} className="text-center text-muted-foreground py-6">No records found</td></tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-muted/50 font-semibold">
                <td colSpan={3}>Total</td>
                <td className="text-right">₹{filteredSales.reduce((s, r) => s + r.total, 0).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Supplier</th>
                <th>Items</th>
                <th className="text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map(p => (
                <tr key={p.id}>
                  <td>{p.date}</td>
                  <td className="font-medium">{p.supplierName}</td>
                  <td>{p.items}</td>
                  <td className="text-right font-medium">₹{p.total.toLocaleString()}</td>
                </tr>
              ))}
              {filteredPurchases.length === 0 && (
                <tr><td colSpan={4} className="text-center text-muted-foreground py-6">No records found</td></tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-muted/50 font-semibold">
                <td colSpan={3}>Total</td>
                <td className="text-right">₹{filteredPurchases.reduce((s, r) => s + r.total, 0).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;
