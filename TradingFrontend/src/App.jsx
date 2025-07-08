import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Home/Navbar/Navbar";
import Portfolio from "./pages/Portfolio/Portfolio";
import Wallet from "./pages/Wallet/Wallet";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import PaymentDetails from "./pages/PaymentDetails/PaymentDetails";
import StockDetails from "./pages/StockDetails/StockDetails";
import Watchlist from "./pages/Watchlist/Watchlist";
import Profile from "./pages/Profile/Profile";
import SearchCoin from "./pages/SearchCoin/SearchCoin";
import NotFound from "./pages/NotFound/NotFound";
import Activity from "./pages/Activity/Activity";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const auth = useSelector((store) => store.auth);
  const isLoggedIn = auth.token != null;
  const navigate = useNavigate();

  return (
    <>
      {auth.token == null? <Auth /> : 
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      }
    </>
  );
}

export default App;
