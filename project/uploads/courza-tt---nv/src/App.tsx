import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Institutions from './pages/Institutions';
import ListInstitution from './pages/ListInstitution';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onDiscover={() => setActivePage('discover')} onFAQ={() => {
          const faq = document.getElementById('faq');
          if (faq) faq.scrollIntoView({ behavior: 'smooth' });
        }} />;
      case 'discover':
        return <Discover />;
      case 'institutions':
        return <Institutions />;
      case 'list':
        return <ListInstitution />;
      default:
        return <Home onDiscover={() => setActivePage('discover')} onFAQ={() => {}} />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
