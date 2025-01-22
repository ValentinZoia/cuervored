import { Button } from "@/components/ui/button";
import { PostData } from "@/types/Post";
import { memo, Suspense } from "react";
import { useComments } from "@/hooks/useComments";
import dynamic from "next/dynamic";
import { LoadMoreSpinner } from "@/components/LoadMoreSpinner";
import { ErrorAlert } from "@/components/ErrorAlert";
import { EmptyState } from "@/components/EmptyState";


const Comment = dynamic(() => import("./Comment").then((mod) => mod.Comment), {
  ssr: false,
  loading: () => (
    <LoadMoreSpinner />
  ),
});


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
    <Suspense fallback={<LoadMoreSpinner />}>
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
    return <LoadMoreSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <div className="space-y-3" aria-live="polite">
      {hasNextPage && (
        <LoadMoreButton onClick={() => fetchNextPage()} disabled={isFetching} />
      )}

      {status === "pending" && <LoadMoreSpinner />}

      {status === "success" && !comments.length ? (
        <EmptyState text="No hay comentarios para mostrar todavia."/>
      ) : (
        <CommentsList comments={comments} />
      )}
    </div>
  );
}
