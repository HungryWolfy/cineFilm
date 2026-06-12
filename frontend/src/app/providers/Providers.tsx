import {BrowserRouter} from "react-router-dom";
import type {PropsWithChildren} from "react";
import AuthProvider from "@/app/providers/AuthProvider.tsx";

function Providers({children}: PropsWithChildren) {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Providers