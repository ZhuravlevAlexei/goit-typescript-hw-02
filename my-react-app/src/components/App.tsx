import { useEffect, useState } from "react";
import css from "./App.module.css";
import { getPhotosByAxios } from "../services/library";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";

import { GalleryItem, Status, PicObject } from "./App.types";
import { AxiosResponse } from "axios";

const STATUS_STAGE: Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [status, setStatus] = useState<string>(STATUS_STAGE.IDLE);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [paginationPage, setPaginationPage] = useState<number>(0);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [picUrl, setPicUrl] = useState<string>("");
  const [picTags, setPicTags] = useState<string>("");

  useEffect(() => {
    if (gallery.length !== 0) {
      if (paginationPage === 1) {
        window.scrollTo(0, 0);
      } else if (paginationPage > 1) {
        const galleryElement: HTMLBodyElement | null =
          document.querySelector("#forScroll");
        if (galleryElement !== null) {
          const firstChild: Element | null = galleryElement.firstElementChild;
          if (firstChild !== null) {
            const { height: cardHeight }: DOMRect =
              firstChild.getBoundingClientRect();
            const scrollY: number = (cardHeight + 16) * 2;
            window.scrollBy({
              top: scrollY,
              behavior: "smooth",
            });
          }
        }
      }
    }
  }, [gallery, paginationPage]);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setStatus(STATUS_STAGE.PENDING);
    getPhotosByAxios(searchText, paginationPage)
      .then((resp: AxiosResponse) => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        } else {
          setStatus(STATUS_STAGE.RESOLVED);
          setTotalHits(resp.data.totalHits);
          if (paginationPage === 1) {
            setGallery([...resp.data.hits]);
          } else if (paginationPage > 1) {
            setGallery((gallery) => [...gallery, ...resp.data.hits]);
          }
        }
      })
      .catch((error: Error) => {
        console.error(error);
      })
      .finally(() => {
        setStatus(STATUS_STAGE.IDLE);
      });
  }, [searchText, paginationPage]);

  const createSearchText = (searchText: string): void => {
    setSearchText(searchText.trim());
    setStatus(STATUS_STAGE.IDLE);
    setPaginationPage(1);
  };

  const onLoadMore = (): void => {
    setPaginationPage(paginationPage + 1);
  };

  const onCloseModal = (): void => {
    setShowModal(false);
  };

  const onOpenModal = (picObject: PicObject): void => {
    setShowModal(true);
    setPicUrl(picObject.picUrl);
    setPicTags(picObject.picTags);
  };

  const totalPages: number = Math.ceil(totalHits / 12);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={createSearchText} />
      <ImageGallery gallery={gallery} onOpenModal={onOpenModal} />
      {gallery.length !== 0 && paginationPage < totalPages && (
        <Button onClick={onLoadMore} />
      )}
      {status === STATUS_STAGE.PENDING && (
        <div className={paginationPage > 1 ? css.loaderWrapB : css.loaderWrapT}>
          <Loader />
        </div>
      )}
      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={picUrl} alt={picTags} />
        </Modal>
      )}
    </div>
  );
};

export default App;
