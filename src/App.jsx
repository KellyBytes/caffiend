import Layout from './components/Layout';
import Hero from './components/Hero';
import CoffeeForm from './components/CoffeeForm';
import Stats from './components/Stats';
import History from './components/History';
import Authentication from './components/Authentication';
import Modal from './components/Modal';

const App = () => {
  const isAuthenticated = false;

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <CoffeeForm />
      {isAuthenticated && authenticatedContent}
    </Layout>
  );
};

export default App;
