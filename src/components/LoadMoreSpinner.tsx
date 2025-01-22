import { Loader2 } from "lucide-react";
import { memo } from "react";

export const LoadMoreSpinner = memo(() => (
    <div className="w-full flex justify-center py-4">
      <Loader2 className="animate-spin text-blue-500" />
    </div>
  ));
  LoadMoreSpinner.displayName = "LoadMoreSpinner";