import React, { useEffect, useState } from "react";
import axios from "axios";

function MoviesList() {
  const [moviesData, setMoviesData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies/");
        setMoviesData(response.data.data);
      } catch (error) {
        alert("Something went wrong: " + error.message);
      }
    };
    fetchMovies();
  }, []);

  const handleView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/movies/${id}`);
      setSelectedMovie(res.data.data);
      const modal = new window.bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();
    } catch (error) {
      alert("Error fetching movie details.");
    }
  };

 const filteredMovies = moviesData.filter((movie) =>
  movie.title?.toLowerCase().includes(inputValue.toLowerCase())
);

  // Pagination calculate
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search Movie By Title"
          className="form-control"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setCurrentPage(1); // first page 
          }}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Title</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentMovies.length > 0 ? (
            currentMovies.map((item, index) => (
              <tr key={item._id}>
                <td>{indexOfFirstMovie + index + 1}</td>
                <td>{item.title}</td>
                <td>{item.year}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleView(item._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No movies found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePrev}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Movie Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedMovie ? (
                <>
                  <p><strong>Title:</strong> {selectedMovie.title}</p>
                  <p><strong>Year:</strong> {selectedMovie.year}</p>
                  <p><strong>Description:</strong> {selectedMovie.description}</p>
                  <p><strong>Genre:</strong> {selectedMovie.genre}</p>
                </>
              ) : (
                <p>No movie selected.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviesList;
