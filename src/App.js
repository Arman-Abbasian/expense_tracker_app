import styles from './App.module.css';
import Balance from './container/Balance';
import Layout from './layout/Layout';
import  { Toaster } from 'react-hot-toast';


import CostProvider from './Providers/CostProvider';
import CostContext from './components/useContext/CostContext';
import CostsContext from './components/useContext/CostsContext';



function App() {
 return(
  <div className='p-4 container mx-auto max-w-xl text-gray-200'>
    {/* <Layout>
      <Balance />
      <Toaster />
    </Layout> */}
    <Layout>
      <CostProvider>
        <CostContext />
        <CostsContext />
      </CostProvider>
    </Layout>
  </div>
  );
}

export default App;
