'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import clsx from 'clsx';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  selectable?: boolean;
}

export function DataTable<T extends { id: string }>({
  data, columns, loading = false, onRowClick, searchable = true, selectable = false,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredData = data.filter((row) => { if (!searchQuery) return true; return Object.values(row).some((val) => String(val).toLowerCase().includes(searchQuery.toLowerCase())); });
  const sortedData = [...filteredData].sort((a, b) => { if (!sortKey) return 0; const aVal = a[sortKey]; const bVal = b[sortKey]; if (aVal === bVal) return 0; if (aVal === null || aVal === undefined) return 1; if (bVal === null || bVal === undefined) return -1; const comparison = aVal < bVal ? -1 : 1; return sortDir === 'asc' ? comparison : -comparison; });
  const pageData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const handleSort = (key: keyof T) => { if (sortKey === key) { setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); } else { setSortKey(key); setSortDir('asc'); } };
  const toggleSelectRow = (id: string) => { const n = new Set(selectedRows); if (n.has(id)) n.delete(id); else n.add(id); setSelectedRows(n); };
  const toggleSelectAll = () => { if (selectedRows.size === pageData.length) setSelectedRows(new Set()); else setSelectedRows(new Set(pageData.map((r) => r.id))); };
  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  return (
    <div className="space-y-4">
      {searchable && (<div className="relative"><Search className="absolute left-3 top-3 text-gray-400" size={20} /><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal" /></div>)}
      <div className="overflow-x-auto border border-gray-200 rounded-lg"><table className="w-full"><thead className="bg-light-bg border-b border-gray-200"><tr>{selectable && (<th className="px-4 py-3"><input type="checkbox" checked={selectedRows.size === pageData.length && pageData.length > 0} onChange={toggleSelectAll} className="w-4 h-4 accent-teal" /></th>)}{columns.map((column) => (<th key={String(column.key)} className={clsx('px-4 py-3 text-left text-sm font-semibold text-navy', column.width)}>{column.sortable ? (<button onClick={() => handleSort(column.key)} className="flex items-center gap-2 hover:text-teal transition-colors">{column.label}{sortKey === column.key ? (sortDir === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />) : null}</button>) : column.label}</th>))}</tr></thead><tbody>{pageData.map((row, idx) => (<tr key={row.id} className={clsx('border-b border-gray-200 hover:bg-light-bg transition-colors', idx % 2 === 0 ? 'bg-white' : 'bg-gray-50', onRowClick && 'cursor-pointer')} onClick={() => onRowClick?.(row)}>{selectable && (<td className="px-4 py-3"><input type="checkbox" checked={selectedRows.has(row.id)} onChange={() => toggleSelectRow(row.id)} onClick={(e) => e.stopPropagation()} className="w-4 h-4 accent-teal" /></td>)}{columns.map((column) => (<td key={String(column.key)} className="px-4 py-3 text-sm text-gray-700">{column.render ? column.render(row[column.key], row) : String(row[column.key] || '')}</td>))}</tr>))}</tbody></table></div>
      {pageData.length === 0 && <div className="text-center py-8 text-gray-500">No results found</div>}
      {totalPages > 1 && (<div className="flex items-center justify-between"><div className="text-sm text-gray-600">Page {currentPage} of {totalPages} ({sortedData.length} results)</div><div className="flex gap-2"><button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-light-bg disabled:opacity-50">Previous</button><button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-light-bg disabled:opacity-50">Next</button></div></div>)}
    </div>
  );
}
