import Home from "./pages/Home";
import Contact from "./pages/Contact";

import AppRouter from "./router";

const App = () => {
  return (
    <div>
      <Home/>
      <Contact/>
      <AppRouter/>
    </div>
  );
};

export default App;