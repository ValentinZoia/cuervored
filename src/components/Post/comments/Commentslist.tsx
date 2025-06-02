import { Button } from "@/components/ui/button";
import { CommentData, PostData } from "@/types/Post";
import { useComments } from "@/hooks/useComments";
import { EmptyState } from "@/components/EmptyState";
import { Comment } from "./Comment";

// Componente para el botón de cargar más
const LoadMoreCommentsButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
  <Button
    variant="link"
    className="mx-auto block"
    disabled={disabled}
    onClick={onClick}
    aria-label="Cargar comentarios anteriores"
  >
    Cargar comentarios anteriores
  </Button>
);


export default function CommentsList({ post }: { post: PostData }) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useComments(post);

  const comments: CommentData[] =
    data.pages.flatMap((page) => page.comments) || [];


  if (!comments.length && !hasNextPage) {
    return <EmptyState text="No hay comentarios para mostrar todavia." />;
  }

  return (
    <div className="space-y-3" aria-live="polite">
      {hasNextPage && (
        <LoadMoreCommentsButton
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        />
      )}
      <div className="divide-y" role="list" aria-label="Lista de comentarios">
        {comments.map((comment) => (
          <div key={comment.id} role="listitem">
            <Comment comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
}
