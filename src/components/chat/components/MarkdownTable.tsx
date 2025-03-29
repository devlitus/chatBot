type MarkdownComponentProps = {
  children?: React.ReactNode;
};

export const Table = ({ children }: MarkdownComponentProps) => (
  <div className="overflow-x-auto my-4">
    <table className="min-w-full border-collapse border border-[var(--color-accent)] text-sm">
      {children}
    </table>
  </div>
);

export const TableHead = ({ children }: MarkdownComponentProps) => (
  <thead className="bg-[var(--color-bg-secondary)]">{children}</thead>
);

export const TableBody = ({ children }: MarkdownComponentProps) => (
  <tbody className="divide-y divide-[var(--color-accent)]">{children}</tbody>
);

export const TableRow = ({ children }: MarkdownComponentProps) => (
  <tr className="transition-colors hover:bg-[var(--color-bg-secondary)] bg-opacity-50">
    {children}
  </tr>
);

export const TableHeader = ({ children }: MarkdownComponentProps) => (
  <th className="px-6 py-3 text-left border-r border-[var(--color-accent)] last:border-0 font-semibold whitespace-nowrap">
    {children}
  </th>
);

export const TableCell = ({ children }: MarkdownComponentProps) => (
  <td className="px-6 py-3 border-r border-[var(--color-accent)] last:border-0 [&:has(>:is(number))]:text-right whitespace-nowrap">
    {children}
  </td>
);
