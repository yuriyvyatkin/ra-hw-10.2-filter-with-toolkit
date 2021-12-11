import './Table.css';
import TableRow from './TableRow/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { removeService } from '../../slices/listSlice';
import { editService } from '../../slices/formSlice';

export default function Table() {
  const services = useSelector((state) => state.list);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const tableLength = 3;

  function handleDeleteClick(id) {
    return dispatch(removeService({ id }));
  }

  function handleEditClick(id) {
    const index = services.findIndex((service) => service.id === id);
    const { name, price } = services[index];

    return dispatch(editService({ name, price, editingMode: { state: true, index } }));
  }

  let filteredList = null;

  if (search.query) {
    filteredList = services.map(({ id, name, price }) => {
      if (!name.startsWith(search.query)) {
        return null;
      }

      return (
        <TableRow
          key={id}
          id={id}
          name={name}
          price={price}
          onDeleteClick={() => handleDeleteClick(id)}
          onEditClick={() => handleEditClick(id)}
        />
      );
    });

    if (!filteredList.filter(Boolean).length) {
      filteredList = (
        <tr>
          <td colSpan={tableLength}>
            По вашему запросу ничего не найдено
          </td>
        </tr>
      );
    }
  }

  const list = services.map(({ id, name, price }) => {
    return (
      <TableRow
        key={id}
        id={id}
        name={name}
        price={price}
        onDeleteClick={() => handleDeleteClick(id)}
        onEditClick={() => handleEditClick(id)}
      />
    );
  })

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>Услуга</th>
          <th>Стоимость (руб.)</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>{filteredList || list}</tbody>
    </table>
  );
}
