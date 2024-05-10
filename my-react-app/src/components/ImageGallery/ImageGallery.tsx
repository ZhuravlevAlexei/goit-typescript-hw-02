import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryProps } from "../App.types";
import css from "./ImageGallery.module.css";

const ImageGallery: React.FC<ImageGalleryProps> = ({
  gallery,
  onOpenModal,
}) => {
  return (
    <>
      <ul className={css.imageGallery} id="forScroll">
        {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onOpenModal={onOpenModal}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
