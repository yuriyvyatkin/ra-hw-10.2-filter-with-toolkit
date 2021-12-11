import '../Form.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  addService,
  addServiceChanges,
} from '../../../slices/listSlice';
import {
  endServiceEditing,
  changeServiceField,
} from '../../../slices/formSlice';

export default function Form() {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  function handleInputChange({ target: { name, value } }) {
    dispatch(changeServiceField({ name, value }));
  }

  return (
    <form
      className="Form"
      onSubmit={(event) => {
        event.preventDefault();
        const { name, price } = form;

        if (form.editingMode.state) {
          const { index } = form.editingMode;

          dispatch(addServiceChanges({ index, name, price }));
          dispatch(endServiceEditing());
        } else {
          dispatch(addService({ name, price }))
        }
      }}

      onReset={(event) => {
        event.preventDefault();

        dispatch(endServiceEditing());
      }}
    >
      <div className="Form-control">
        <label htmlFor="name">Услуга</label>
        <input
          className="Form-control__name"
          type="text"
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleInputChange}
          placeholder="Например: Замена..."
          autoComplete="off"
        />
      </div>
      <div className="Form-control">
        <label htmlFor="price">Стоимость (руб.)</label>
        <input
          className="Form-control__price"
          type="number"
          id="price"
          name="price"
          min="1"
          max="999999"
          required
          value={form.price}
          onChange={handleInputChange}
        />
      </div>
      <input
        className="Form-control__button-save"
        type="submit"
        value="Сохранить"
      />
      {
        form.editingMode.state
        && <input
            className="Form-control__button-reset"
            type="reset"
            value="Отменить"
          />
      }
    </form>
  );
}
