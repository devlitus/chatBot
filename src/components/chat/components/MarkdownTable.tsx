type MarkdownComponentProps = {
  children?: React.ReactNode;
};

export const Table = ({ children }: MarkdownComponentProps) => (
  <div className="overflow-x-auto my-4">
    <table className="min-w-full border-collapse border border-[var(--color-accent)]">
      {children}
    </table>
  </div>
);

export const TableHead = ({ children }: MarkdownComponentProps) => (
  <thead className="bg-[var(--color-bg-secondary)]">{children}</thead>
);

export const TableBody = ({ children }: MarkdownComponentProps) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: MarkdownComponentProps) => (
  <tr className="border-b border-[var(--color-accent)] last:border-0">{children}</tr>
);

export const TableHeader = ({ children }: MarkdownComponentProps) => (
  <th className="px-4 py-2 text-left border-r border-[var(--color-accent)] last:border-0 font-bold">
    {children}
  </th>
);

export const TableCell = ({ children }: MarkdownComponentProps) => (
  <td className="px-4 py-2 border-r border-[var(--color-accent)] last:border-0">
    {children}
  </td>
);
