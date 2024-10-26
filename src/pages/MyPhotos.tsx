import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../hooks/api';
import PhotoForm from '../components/PhotoForm';
import LoadingSpinner from '../components/Spinner';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPhotos = async () => {
    try {
      const response = await api.get('/photos/user'); 
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await api.get('/albums/user'); // Adjust the endpoint as needed
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchAlbums();
  }, []);

  const handlePhotoCreated = () => {
    setShowForm(false);
    fetchPhotos();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => setShowForm(true)}
      >
        Create Photo
      </button>

      {showForm && (
        <PhotoForm
          photo={null}
          albumId={albums.length > 0 ? albums[0]._id : null}
          onSuccess={handlePhotoCreated}
        />
      )}

      {loading ? <LoadingSpinner loading={loading} /> : null}
      <h1 className="text-xl font-bold mb-4 text-[#351D5B]">Your Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo._id} className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-[#351D5B]">
                {photo.title}
              </h3>
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-32 object-cover mt-2 rounded"
              />
            </div>
          ))
        ) : (
          <p>No photos found</p>
        )}
      </div>
    </div>
  );
};

export default Photos;
