import { ImageUploaderState, ImageUploaderAction } from './types'

export const initialState: ImageUploaderState = {
    previewUrl: null,
    previewType: null,
    initialImage: "",
    isOpen: false,
    isLoading: false,
    error: null
}

export function imageUploaderReducer(state: ImageUploaderState, action: ImageUploaderAction): ImageUploaderState {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
          return {
            ...state,
            initialImage: action.payload.imageSrc,
            previewUrl: action.payload.imageSrc,
            previewType: action.payload.typeUpload,
          };
        case 'SET_URL':
          return {
            ...state,
            previewUrl: action.payload.previewUrl,
            previewType: action.payload.typeUpload,
          };
        case 'SET_FILE':
          return {
            ...state,
            previewType: action.payload.previewType,
            previewUrl: action.payload.previewUrl,
          };
        case 'TOGGLE_DIALOG':
          return {
            ...state,
            isOpen: action.payload,
          };
        case 'REMOVE_PREVIEW':
          return {
            ...state,
            previewUrl: null,
            previewType: null,
            initialImage: '',
          };
        default:
          return state;
      }
  }