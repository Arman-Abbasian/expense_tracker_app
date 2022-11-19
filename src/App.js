import { ToastContainer } from 'react-toastify';
import styles from './App.module.css';
import Balance from './container/Balance';
import Layout from './layout/Layout';




function App() {
 return(
  <div className='p-4 container mx-auto max-w-xl bg-slate-900 text-gray-200'>
    <Layout>
      <Balance />
      <ToastContainer />
    </Layout>
  </div>
  );
}

export default App;
