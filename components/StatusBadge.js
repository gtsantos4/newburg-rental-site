const statusStyles = {
  new: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-accent-100 text-accent-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};

const statusLabels = {
  new: 'New',
  reviewing: 'Reviewing',
  approved: 'Approved',
  rejected: 'Rejected',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status] || statusStyles.new
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
