import { BrowserRouter, Routes, Route } from "react-router-dom";
import appRoutes from "./routes/routes";
import Loading from "./components/Loading/Loading";
import "./App.scss";
import OnBoarding1 from "./components/OnBoarding/OnBoarding1";
import OnBoarding2 from "./components/OnBoarding/OnBoarding2";
import Game from "./components/Game/Game";
import Hints from "./components/Hints/Hints";
import Final from "./components/Final/Final";
import Lose from "./components/Lose/Lose";
import Scrolls from "./components/Scrolls/Scrolls";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appRoutes.LOADING} element={<Loading />} />
        <Route path={appRoutes.ONBOARDING1} element={<OnBoarding1 />} />
        <Route path={appRoutes.ONBOARDING2} element={<OnBoarding2 />} />
        <Route path={appRoutes.HINTS} element={<Hints />} />
        <Route path={appRoutes.GAME} element={<Game />} />
        <Route path={appRoutes.LOSE} element={<Lose />} />
        <Route path={appRoutes.FINAL} element={<Final />} />
        <Route path={appRoutes.SCROLLS} element={<Scrolls />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
