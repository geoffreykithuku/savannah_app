import { useEffect, useState } from 'react';
import api from '../hooks/api';
import AlbumForm from '../components/AlbumForm';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const fetchAlbums = async () => {
    try {
      const response = await api.get(`/albums/user/${user?._id}`);
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleAlbumCreated = () => {
    setIsModalOpen(false);
    fetchAlbums();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20">
      <button
              className="bg-[#351D5B]
         text-white px-4 py-2 rounded my-6"
        onClick={() => setIsModalOpen(true)}
      >
        Create Album
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AlbumForm
          album={null}
          userId="{user?._id}"
          onSuccess={handleAlbumCreated}
        />
      </Modal>

      {loading ? <LoadingSpinner loading={loading} /> : null}
      <h1 className="text-xl font-bold mb-4 text-[#351D5B]">Your Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album._id} className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-[#351D5B]">
                {album.title}
              </h3>
            </div>
          ))
        ) : (
          <p>No albums found</p>
        )}
      </div>
    </div>
  );
};

export default Albums;
