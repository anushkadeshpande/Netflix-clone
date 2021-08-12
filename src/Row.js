import React, { useState, useEffect } from 'react'
import "./Row.css"
import axios from "./axios"
import Modal from 'react-modal';
function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [movieData, setData] = useState({
    id: null,
    mediaType: null
  })
  const [videoKey, setKey] = useState(null);
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  useEffect(() => {
    function fetchVid() {
      if (modalIsOpen === true) {
        fetch(`https://api.themoviedb.org/3/movie/${movieData.id}?api_key=9a1a8c1ad1471e54265d323e97455b26&append_to_response=videos`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            if (data)
              setKey(data.videos?.results[0]?.key);
          });
      }
    }
    fetchVid();
  }, [modalIsOpen]);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d1d'
    }
  };

  const videoWindowSize = () => {
    if (window.innerWidth < 768)
      return { width: window.innerWidth - 50, height: (window.innerHeight - 350) }
    else
      return { width: window.innerWidth - 200, height: (window.innerHeight - 200) }
  }
  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
    setKey(null);
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(movie => (
          (isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              onClick={() => { openModal(); setData({ id: movie.id, mediaType: movie.media_type }) }}
              key={movie.id}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
              alt={movie.name} />
          )
        )}

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >

        <button className="close-button" onClick={closeModal}>x</button>
        {
          videoKey != null ?
            (
              <iframe height={videoWindowSize().height} width={videoWindowSize().width}
                title='Trailer'
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={`https://youtube.com/embed/${videoKey}?autoplay=0`}>
              </iframe>
            ) :
            (<>
              <h1>Trailer not found :-( </h1>

            </>
            )
        }

      </Modal>

    </div>
  )
}
//<768 px
export default Row
