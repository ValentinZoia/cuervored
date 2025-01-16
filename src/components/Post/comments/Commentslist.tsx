import { Button } from "@/components/ui/button";
import { PostData } from "@/types/Post";
import { Loader2 } from "lucide-react";
import { memo, Suspense } from "react";
import { useComments } from "@/hooks/useComments";
import dynamic from "next/dynamic";


const Comment = dynamic(() => import("./Comment").then((mod) => mod.Comment), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      aria-label="Cargando comentarios"
      className="flex justify-center p-4"
    >
      <Loader2 className="animate-spin" aria-hidden="true" />
    </div>
  ),
});

// Componente para el estado de carga
const LoadingState = memo(() => (
  <div
    role="status"
    aria-label="Cargando comentarios"
    className="flex justify-center p-4"
  >
    <Loader2 className="animate-spin" aria-hidden="true" />
  </div>
));
LoadingState.displayName = "LoadingState";


// Componente para el estado de error
const ErrorState = memo(() => (
  <div role="alert" className="text-center text-destructive p-4">
    Ocurrió un error al cargar los comentarios
  </div>
));
ErrorState.displayName = "ErrorState";


// Componente para el estado vacío
const EmptyState = memo(() => (
  <p
    className="text-center text-muted-foreground mt-4"
    role="status"
    aria-label="No hay comentarios"
  >
    No hay comentarios todavía.
  </p>
));
EmptyState.displayName = "EmptyState";


// Componente para el botón de cargar más
const LoadMoreButton = memo(
  ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => (
    <Button
      variant="link"
      className="mx-auto block"
      disabled={disabled}
      onClick={onClick}
      aria-label="Cargar comentarios anteriores"
    >
      Cargar comentarios anteriores
    </Button>
  )
);
LoadMoreButton.displayName = "LoadMoreButton";

// Componente para la lista de comentarios
const CommentsList = memo(({ comments }: { comments: any[] }) => (
  <div className="divide-y" role="list" aria-label="Lista de comentarios">
    <Suspense fallback={<LoadingState />}>
    {comments.map((comment) => (
      <div key={comment.id} role="listitem">
        <Comment comment={comment} />
      </div>
    ))}
    </Suspense>
  </div>
));
CommentsList.displayName = "CommentsList";

// Componente principal
export default function CommentsContainer({ post }: { post: PostData }) {
  const {
    comments,
    isLoading,
    isFetching,
    error,
    status,
    fetchNextPage,
    hasNextPage,
  } = useComments(post);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-3" aria-live="polite">
      {hasNextPage && (
        <LoadMoreButton onClick={() => fetchNextPage()} disabled={isFetching} />
      )}

      {status === "pending" && <LoadingState />}

      {status === "success" && !comments.length ? (
        <EmptyState />
      ) : (
        <CommentsList comments={comments} />
      )}
    </div>
  );
}
