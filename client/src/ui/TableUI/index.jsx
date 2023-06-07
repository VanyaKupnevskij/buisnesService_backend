import styles from './style.module.scss';

function TableUI({
  style,
  className = '',
  titles = [],
  contents = [],
  selectedRow = null,
  onClick = () => {},
}) {
  const _className = `${styles.table} ${className}`;

  return (
    <table className={_className} style={style}>
      <thead>
        <tr>
          {titles.map((title) => (
            <th key={title} className={styles.table_title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {contents.map((row, id) => {
          if (!row) return;

          const list = Array.isArray(row) ? row : Object.values(row);

          return (
            <tr
              key={id}
              className={selectedRow === id ? styles.selected : ''}
              onClick={() => onClick(id)}>
              {list.map((data, id) => (
                <td key={id}>{data}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableUI;
