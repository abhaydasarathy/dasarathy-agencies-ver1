// Mock data for Dasarathy Agencies ERP

export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  totalStock: number;
  status: 'healthy' | 'low' | 'out' | 'inactive';
}

export interface Batch {
  id: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  costPrice: number;
  status: 'healthy' | 'near-expiry' | 'expired' | 'low';
}

export interface Supplier {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  city: string;
}

export interface Sale {
  id: string;
  date: string;
  customerName: string;
  items: number;
  total: number;
}

export interface Purchase {
  id: string;
  date: string;
  supplierName: string;
  items: number;
  total: number;
}

export const medicines: Medicine[] = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Analgesic', manufacturer: 'Cipla', totalStock: 2400, status: 'healthy' },
  { id: '2', name: 'Amoxicillin 250mg', category: 'Antibiotic', manufacturer: 'Sun Pharma', totalStock: 850, status: 'healthy' },
  { id: '3', name: 'Metformin 500mg', category: 'Antidiabetic', manufacturer: 'USV', totalStock: 120, status: 'low' },
  { id: '4', name: 'Atorvastatin 10mg', category: 'Cardiovascular', manufacturer: 'Ranbaxy', totalStock: 0, status: 'out' },
  { id: '5', name: 'Omeprazole 20mg', category: 'Gastrointestinal', manufacturer: 'Dr. Reddy\'s', totalStock: 1650, status: 'healthy' },
  { id: '6', name: 'Cetirizine 10mg', category: 'Antihistamine', manufacturer: 'Cipla', totalStock: 3200, status: 'healthy' },
  { id: '7', name: 'Azithromycin 500mg', category: 'Antibiotic', manufacturer: 'Alkem', totalStock: 75, status: 'low' },
  { id: '8', name: 'Losartan 50mg', category: 'Cardiovascular', manufacturer: 'Torrent', totalStock: 980, status: 'healthy' },
  { id: '9', name: 'Ibuprofen 400mg', category: 'Analgesic', manufacturer: 'Mankind', totalStock: 0, status: 'out' },
  { id: '10', name: 'Diclofenac 50mg', category: 'Analgesic', manufacturer: 'Novartis', totalStock: 540, status: 'healthy' },
  { id: '11', name: 'Pantoprazole 40mg', category: 'Gastrointestinal', manufacturer: 'Alkem', totalStock: 1890, status: 'healthy' },
  { id: '12', name: 'Amlodipine 5mg', category: 'Cardiovascular', manufacturer: 'Pfizer', totalStock: 45, status: 'low' },
  { id: '13', name: 'Clopidogrel 75mg', category: 'Cardiovascular', manufacturer: 'Sun Pharma', totalStock: 670, status: 'healthy' },
  { id: '14', name: 'Ranitidine 150mg', category: 'Gastrointestinal', manufacturer: 'GSK', totalStock: 0, status: 'inactive' },
  { id: '15', name: 'Montelukast 10mg', category: 'Respiratory', manufacturer: 'Cipla', totalStock: 290, status: 'healthy' },
];

export const batches: Batch[] = [
  { id: 'b1', medicineId: '1', medicineName: 'Paracetamol 500mg', batchNumber: 'PCM-2024-001', expiryDate: '2025-03-15', quantity: 200, costPrice: 1.20, status: 'near-expiry' },
  { id: 'b2', medicineId: '1', medicineName: 'Paracetamol 500mg', batchNumber: 'PCM-2024-045', expiryDate: '2026-08-20', quantity: 1200, costPrice: 1.25, status: 'healthy' },
  { id: 'b3', medicineId: '1', medicineName: 'Paracetamol 500mg', batchNumber: 'PCM-2025-002', expiryDate: '2027-01-10', quantity: 1000, costPrice: 1.30, status: 'healthy' },
  { id: 'b4', medicineId: '2', medicineName: 'Amoxicillin 250mg', batchNumber: 'AMX-2024-010', expiryDate: '2025-02-01', quantity: 50, costPrice: 3.50, status: 'expired' },
  { id: 'b5', medicineId: '2', medicineName: 'Amoxicillin 250mg', batchNumber: 'AMX-2024-088', expiryDate: '2026-11-30', quantity: 800, costPrice: 3.75, status: 'healthy' },
  { id: 'b6', medicineId: '3', medicineName: 'Metformin 500mg', batchNumber: 'MET-2024-033', expiryDate: '2025-04-20', quantity: 120, costPrice: 2.10, status: 'near-expiry' },
  { id: 'b7', medicineId: '4', medicineName: 'Atorvastatin 10mg', batchNumber: 'ATV-2023-077', expiryDate: '2025-01-05', quantity: 0, costPrice: 5.00, status: 'expired' },
  { id: 'b8', medicineId: '5', medicineName: 'Omeprazole 20mg', batchNumber: 'OMP-2024-055', expiryDate: '2026-06-15', quantity: 1650, costPrice: 2.80, status: 'healthy' },
  { id: 'b9', medicineId: '6', medicineName: 'Cetirizine 10mg', batchNumber: 'CTZ-2025-001', expiryDate: '2027-03-01', quantity: 3200, costPrice: 0.90, status: 'healthy' },
  { id: 'b10', medicineId: '7', medicineName: 'Azithromycin 500mg', batchNumber: 'AZT-2024-022', expiryDate: '2025-05-10', quantity: 75, costPrice: 12.00, status: 'low' },
  { id: 'b11', medicineId: '8', medicineName: 'Losartan 50mg', batchNumber: 'LOS-2024-066', expiryDate: '2026-09-25', quantity: 980, costPrice: 4.20, status: 'healthy' },
  { id: 'b12', medicineId: '9', medicineName: 'Ibuprofen 400mg', batchNumber: 'IBU-2023-099', expiryDate: '2024-12-31', quantity: 0, costPrice: 1.80, status: 'expired' },
  { id: 'b13', medicineId: '12', medicineName: 'Amlodipine 5mg', batchNumber: 'AML-2024-014', expiryDate: '2025-06-01', quantity: 45, costPrice: 3.00, status: 'low' },
];

export const suppliers: Supplier[] = [
  { id: 's1', name: 'MedSupply India Pvt Ltd', licenseNumber: 'DL-TN-2020-001234', phone: '+91 98765 43210', email: 'orders@medsupply.in', city: 'Chennai' },
  { id: 's2', name: 'Pharma Distributors', licenseNumber: 'DL-TN-2019-005678', phone: '+91 94321 56789', email: 'sales@pharmadist.com', city: 'Trichy' },
  { id: 's3', name: 'HealthCare Wholesale', licenseNumber: 'DL-TN-2021-009012', phone: '+91 90876 54321', email: 'info@hcwholesale.in', city: 'Madurai' },
  { id: 's4', name: 'South Indian Pharma Corp', licenseNumber: 'DL-TN-2018-003456', phone: '+91 87654 32109', email: 'contact@sipharma.co.in', city: 'Kumbakonam' },
  { id: 's5', name: 'Apollo Drug House', licenseNumber: 'DL-TN-2022-007890', phone: '+91 76543 21098', email: 'supply@apollodrug.in', city: 'Thanjavur' },
];

export const recentSales: Sale[] = [
  { id: 'sl1', date: '2026-02-10', customerName: 'Krishna Medical', items: 5, total: 4520.00 },
  { id: 'sl2', date: '2026-02-10', customerName: 'City Pharmacy', items: 3, total: 2180.00 },
  { id: 'sl3', date: '2026-02-09', customerName: 'Lakshmi Medicals', items: 8, total: 7650.00 },
  { id: 'sl4', date: '2026-02-09', customerName: 'Balaji Drug House', items: 2, total: 980.00 },
  { id: 'sl5', date: '2026-02-08', customerName: 'Saravana Pharma', items: 6, total: 5340.00 },
];

export const recentPurchases: Purchase[] = [
  { id: 'p1', date: '2026-02-10', supplierName: 'MedSupply India Pvt Ltd', items: 12, total: 45800.00 },
  { id: 'p2', date: '2026-02-08', supplierName: 'Pharma Distributors', items: 8, total: 23400.00 },
  { id: 'p3', date: '2026-02-07', supplierName: 'South Indian Pharma Corp', items: 15, total: 67200.00 },
  { id: 'p4', date: '2026-02-05', supplierName: 'HealthCare Wholesale', items: 5, total: 12900.00 },
];
