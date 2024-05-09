import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "./App.module.css";
import { getPhotosByAxios } from "../services/library";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";

import { status } from "./App.types";

const STATUS_STAGE: status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState<string>(STATUS_STAGE.IDLE);
  const [gallery, setGallery] = useState([]);
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
        const { height: cardHeight } =
          galleryElement.firstElementChild.getBoundingClientRect();
        const scrollY = (cardHeight + 16) * 2;
        window.scrollBy({
          top: scrollY,
          behavior: "smooth",
        });
      }
    }
  }, [gallery, paginationPage]);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setStatus(STATUS_STAGE.PENDING);
    getPhotosByAxios(searchText, paginationPage)
      .then((resp) => {
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
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setStatus(STATUS_STAGE.IDLE);
      });
  }, [searchText, paginationPage]);

  const createSearchText = (searchText) => {
    setSearchText(searchText.trim());
    setStatus(STATUS_STAGE.IDLE);
    setPaginationPage(1);
  };

  const onLoadMore = () => {
    setPaginationPage(paginationPage + 1);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onOpenModal = (picObject) => {
    setShowModal(true);
    setPicUrl(picObject.picUrl);
    setPicTags(picObject.picTags);
  };

  const totalPages = Math.ceil(totalHits / 12);

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

App.propTypes = {
  searchText: PropTypes.string,
  picObjectForModal: PropTypes.objectOf({
    picUrl: PropTypes.string.isRequired,
    picTags: PropTypes.string.isRequired,
  }),
};

export default App;
