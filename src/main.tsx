import { Analytics } from "@vercel/analytics/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <UserProvider>
      <App />
      <Analytics />
    </UserProvider>
  </>
);
