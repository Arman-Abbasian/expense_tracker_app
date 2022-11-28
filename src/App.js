import styles from './App.module.css';
import Balance from './container/Balance';
import Layout from './layout/Layout';
import  { Toaster } from 'react-hot-toast';


import CostProvider from './Providers/CostProvider';
import CostContext from './components/useContext/CostContext';
import CostsContext from './components/useContext/CostsContext';
import FormContext from './components/useContext/FormContext';
import ShowTotalCostsContext from './components/useContext/ShowTotalCostsContext';
import FilterContext from './components/useContext/FilterContext';
import CostDetailContext from './components/useContext/CostDetailContext';

import { Provider } from 'react-redux';
import store from './redux/store';
import CostsRedux from './components/useRedux/CostsRedux.jsx';
import FormRedux from './components/useRedux/FormRedux';
import ShowTotalCostsRedux from './components/useRedux/ShowTotalCostsRedux';




function App() {
 return(
  <div className='p-4 container mx-auto max-w-2xl text-gray-200'>
    {/* <Layout>
      <Balance />
    </Layout> */}

    {/* <Layout>
      <CostProvider>
        <ShowTotalCostsContext />
        <FilterContext />
        <FormContext />
        <CostsContext />
      </CostProvider>
    </Layout> */}

    
      <Provider store={store}>
      <Layout>
        <ShowTotalCostsRedux />
        <FormRedux />
        <CostsRedux />
        </Layout>
      </Provider>
    

    <Toaster />
  </div>
  );
}

export default App;
