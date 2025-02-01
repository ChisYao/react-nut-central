import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SagaDemo from "./redux-saga-demo/main.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <SagaDemo></SagaDemo>
  </StrictMode>,
)
