import styles from './App.module.css';
import Balance from './container/Balance';
import Layout from './layout/Layout';
import  { Toaster } from 'react-hot-toast';




function App() {
 return(
  <div className='p-4 container mx-auto max-w-xl text-gray-200'>
    <Layout>
      <Balance />
      <Toaster />
    </Layout>
  </div>
  );
}

export default App;
