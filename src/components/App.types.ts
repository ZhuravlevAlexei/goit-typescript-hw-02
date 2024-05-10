// import { AxiosHeaders } from "axios";

export interface AnswerWithData {
  // config: {};
  // headers: AxiosHeaders;
  // request: XMLHttpRequest;

  data: {
    total: number;
    totalHits: number;
    hits: GalleryItem[];
  };
  statusText: string;
  status: number;
}

export interface Status {
  IDLE: string;
  PENDING: string;
  RESOLVED: string;
  REJECTED: string;
}

export interface PicObject {
  picUrl: string;
  picTags: string;
}

export interface GalleryItem {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  [key: string]: number | string;
}
export interface ButtonProps {
  onClick(): void;
}

export interface ModalProps {
  onClose(): void;
  children: JSX.Element;
}
export interface SearchbarProps {
  onSubmit(searchText: string): void;
}

export interface ImageGalleryProps {
  gallery: GalleryItem[];
  onOpenModal(picObject: PicObject): void;
}

export interface ImageGalleryItemProps {
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  onOpenModal(picObject: PicObject): void;
}
