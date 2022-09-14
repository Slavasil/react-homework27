import {nanoid} from 'nanoid';
import { ADD_ITEM, SAVE_ITEM, EDIT_ITEM, DELETE_ITEM } from './actions/actionTypes.js';

const initialState = {
  items: [],
  editedItemId: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      let {name, price} = action.payload;
      let newItems = state.items.slice();
      newItems.push({
        id: nanoid(),
        name: name,
        price: price
      });
      return {...state, items: newItems};
    }
    case EDIT_ITEM: {
      let {id} = action.payload;
      return {...state, editedItemId: id};
    }
    case SAVE_ITEM: {
      let {name, price} = action.payload;
      let newItems = state.items.slice();
      newItems.forEach((item) => {
        if (item.id == state.editedItemId) {
          item.name = name;
          item.price = price;
        }
      });
      return {...state, items: newItems, editedItemId: null};
    }
    case DELETE_ITEM: {
      let {id} = action.payload;
      let newItems = state.items.filter((item) => item.id != id);
      return {...state, items: newItems};
    }
  }
  return state;
}
export default reducer;
