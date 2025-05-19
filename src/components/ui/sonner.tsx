/* src/components/ui/sonner.tsx
   مكوّن التوست من مكتبة Sonner – نسخة خفيفة بلا ThemeProvider */
import { Toaster as Sonner } from "sonner";
import React from "react";

const AppToaster = () => (
  <Sonner
    richColors
    position="top-center"
    toastOptions={{ duration: 4000 }}
  />
);

export default AppToaster;
