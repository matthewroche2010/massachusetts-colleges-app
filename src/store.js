import {configureStore} from '@reduxjs/toolkit';
import tableReducer from './components/table/tableSlice';
import infoWindowSlice from './components/infoWindow/infoWindowSlice';

export default configureStore( {
  reducer: {
    tablePage: tableReducer,
    infoWindow: infoWindowSlice,
  },
});

