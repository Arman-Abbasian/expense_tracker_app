import styles from './App.module.css';
import Balance from './container/Balance';
import Layout from './layout/Layout';
import  { Toaster } from 'react-hot-toast';


import CostProvider from './Providers/CostProvider';
import CostContext from './components/useContext/CostContext';
import CostsContext from './components/useContext/CostsContext';
import FormContext from './components/useContext/FormContext';
import ShowTotalCostsContext from './components/useContext/ShowTotalCostsContext';



function App() {
 return(
  <div className='p-4 container mx-auto max-w-xl text-gray-200'>
    {/* <Layout>
      <Balance />
    </Layout> */}

    <Layout>
      <CostProvider>
        <ShowTotalCostsContext />
        <FormContext />
        <CostsContext />
      </CostProvider>
    </Layout>

    <Toaster />
  </div>
  );
}

export default App;
