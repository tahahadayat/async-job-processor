import { ReactNode } from "react";

const Cell = ({ children }: { children: ReactNode }) => (
  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
    {children}
  </td>
);

export default Cell;
