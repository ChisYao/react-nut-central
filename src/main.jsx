import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SagaDemo from "./redux-saga-demo/main.jsx";
import RouterV6Nut from "./react-router-v6-nut/main.jsx";

import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/*<SagaDemo></SagaDemo>*/}
      <RouterV6Nut></RouterV6Nut>
  </StrictMode>,
)
