import { memo } from "react";

interface EmptyStateProps {
  text: string;
}

export const EmptyState = memo(({ text }: EmptyStateProps) => (
  <p className="text-center mt-4">{text}</p>
));

EmptyState.displayName = 'EmptyState';