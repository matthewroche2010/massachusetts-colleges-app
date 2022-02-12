import {configureStore} from '@reduxjs/toolkit';
import tableReducer from './components/table/tableSlice';

export default configureStore( {
  reducer: {
    table: tableReducer,
  },
});
