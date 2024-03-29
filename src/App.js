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

//import store from './redux/store';
import CostsRedux from './components/useRedux/CostsRedux.jsx';
import FormRedux from './components/useRedux/FormRedux';
import ShowTotalCostsRedux from './components/useRedux/ShowTotalCostsRedux';
import FilterRedux from './components/useRedux/FilterRedux';

import {store} from './feature/store';
import CostsReduxToolkit from './components/useReduxToolkit/CostsReduxToolkit';
import FormReduxToolkit from './components/useReduxToolkit/FormReduxToolkit';
import ShowTotalCostsReduxToolkit from './components/useReduxToolkit/ShowTotalCostsReduxToolkit';
import FilterReduxToolkit from './components/useReduxToolkit/FilterReduxToolkit';
import Component from './components/asyncReducer';


function App() {
 return(
  <div className='p-4 container mx-auto max-w-2xl text-gray-200'>
    {/* <Layout>
      <Balance />
    </Layout> */}

    {/* useContext */}
    {/* <Layout>
      <CostProvider>
        <ShowTotalCostsContext />
        <FilterContext />
        <FormContext />
        <CostsContext />
      </CostProvider>
    </Layout> */}

    {/* redux */}
      {/* <Provider store={store}>
      <Layout>
        <ShowTotalCostsRedux />
        <FormRedux />
        <FilterRedux />
        <CostsRedux />
      </Layout>
      </Provider> */}

      {/* redux toolkit */}
      <Provider store={store}>
        <Layout>
          <ShowTotalCostsReduxToolkit />
          <FormReduxToolkit />
          <FilterReduxToolkit /> 
          <CostsReduxToolkit />
        </Layout>
      </Provider>



      {/* <Component /> */}


    

    <Toaster />
  </div>
  );
}

export default App;
