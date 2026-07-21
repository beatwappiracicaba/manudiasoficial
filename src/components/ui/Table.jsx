export default function Table({ columns, data, renderRow, actions, onEdit, onDelete, emptyMessage = 'Nenhum item encontrado' }) {
  const showActions = actions || (onEdit && onDelete)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => (
              <th key={col.key} className="py-3 px-4 text-sm font-medium text-gray-400 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
            {showActions && (
              <th className="py-3 px-4 text-sm font-medium text-gray-400 uppercase tracking-wider text-right">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (showActions ? 1 : 0)} className="py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row.id || idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {renderRow ? (
                  renderRow(row, idx)
                ) : (
                  columns.map((col) => (
                    <td key={col.key} className="py-4 px-4 text-gray-300">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))
                )}
                {showActions && (
                  <td className="py-4 px-4 text-right">
                    {actions ? actions(row, idx) : (
                      <div className="flex items-center justify-end gap-3">
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(row)}
                            className="text-gold hover:text-white transition-colors"
                          >
                            Editar
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(row)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Excluir
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
