import dynamic from "next/dynamic";
import { memo } from "react";







// Dynamic imports para componentes pesados
const Alert = dynamic(() => import("@/components/ui/alert").then(mod => mod.Alert),{ssr:false});
const AlertTitle = dynamic(() => import("@/components/ui/alert").then(mod => mod.AlertTitle),{ssr:false});
const AlertDescription = dynamic(() => import("@/components/ui/alert").then(mod => mod.AlertDescription),{ssr:false});
const AlertCircle = dynamic(() => import("lucide-react").then(mod => mod.AlertCircle),{ssr:false});


export const ErrorAlert = memo(({ error }: { error: Error | unknown }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {error instanceof Error ? error.message : "Unexpected error"}
    </AlertDescription>
  </Alert>
));
ErrorAlert.displayName = 'ErrorAlert';