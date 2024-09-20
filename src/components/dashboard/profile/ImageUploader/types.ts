export interface ImageUploaderState {
  previewUrl: string | null;
  previewType: "url" | "file" | null;
  initialImage: string;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

//Reducer actions
export type ImageUploaderAction =
| { type: 'SET_INITIAL_STATE'; payload: { imageSrc: string; typeUpload: 'file' | 'url' | null } }
| { type: 'SET_URL'; payload: { previewUrl: string; typeUpload: 'url' } }
| { type: 'SET_FILE'; payload: { previewType: 'file'; previewUrl: string } }
| { type: 'TOGGLE_DIALOG'; payload: boolean }
| { type: 'REMOVE_PREVIEW' };
