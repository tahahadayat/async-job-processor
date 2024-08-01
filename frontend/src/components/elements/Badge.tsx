const Badge = ({ status }: { status: string }) => {
  let color = "";
  switch (status) {
    case "pending":
      color = "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
      break;
    case "resolved":
      color = "bg-green-50 text-green-700 ring-green-600/20";
      break;
    case "rejected":
      color = "bg-red-50 text-red-700 ring-red-600/20";
      break;
    default:
      color = "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
  }

  return (
    <span
      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ${color} ring-1 ring-inset`}
    >
      {status}
    </span>
  );
};

export default Badge;
