import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
// import { Trade } from './pages/Trade';
import { Memes } from './pages/Memes';
import { TokenDetail } from './pages/TokenDetail';
import { CreateTokenForm } from './components/CreateTokenForm';

function App() {
  return (
    <BrowserRouter>
      <div className="h-[92vh] overflow-y-scroll bg-gradient-to-br from-purple-900 via-black to-blue-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/trade" element={<Trade />} /> */}
          <Route path="/memes" element={<Memes />} />
          <Route path="/token/:curveAddr" element={<TokenDetail />} />
          <Route path="/create-token" element={<CreateTokenForm />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;