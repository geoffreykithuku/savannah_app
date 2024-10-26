import { useEffect, useState } from 'react';
import api from '../hooks/api';
import AlbumForm from '../components/AlbumForm';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import PhotoForm from '../components/PhotoForm';
type Album = {
  _id: string;
  title: string;
  userId: string;
};
const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [component, setComponent] = useState<string>('album');

  const fetchAlbums = async () => {
    try {
      const response = await api.get(`/albums/user/${user?._id}`);
      setAlbums(response.data.albums);
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

  const handlePhotoCreated = () => {
    setIsModalOpen(false);
    fetchAlbums();
  };

  // since the modal is used for both album and photo creation, we need to pass the correct
  // form component based on the modal state

  const handleModalContent = (value) => {
    setComponent(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20">
      <span className="flex justify-start items-center gap-5">
        <button
          className="bg-[#351D5B]
         text-white px-4 py-2 rounded my-6"
          onClick={() => {
            setIsModalOpen(true);
            handleModalContent('album');
          }}
        >
          Create Album
        </button>

        {albums.length > 0 && (
          <button
            className="bg-[#351D5B] text-white px-4 py-2 rounded my-6"
            onClick={() => {
              setIsModalOpen(true);
              handleModalContent('photo');
            }}
          >
            Add Photo
          </button>
        )}
      </span>

      {component === 'photo' && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PhotoForm photo={null} onSuccess={handlePhotoCreated} />
        </Modal>
      )}

      {component === 'album' && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AlbumForm
            album={null}
            userId={user?._id}
            onSuccess={handleAlbumCreated}
          />
        </Modal>
      )}
      {loading ? <LoadingSpinner loading={loading} /> : null}
      <h1 className="text-xl font-bold mb-4 text-[#351D5B]">
        Your albums and photos.
      </h1>
      <p>
        You can create albums and add photos to them. Also you can edit photos
        and delete them.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album._id} className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-[#351D5B]">
                {album?.title}
              </h3>
              <Link to={`/albums/${album._id}`} className="text-blue-500">
                View Album
              </Link>
            </div>
          ))
        ) : (
          <p>You have no albums yet.</p>
        )}
      </div>
    </div>
  );
};

export default Albums;
