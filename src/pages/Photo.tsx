import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../hooks/api';
import LoadingSpinner from '../components/Spinner';

type Photo = {
  _id: string;
  title: string;
  url: string;
};

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await api.get(`/photos/${id}`);
        setPhoto(response.data);
        setNewTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching photo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await api.patch(`/photos/${id}`, { title: newTitle });
      setPhoto((prevPhoto) =>
        prevPhoto ? { ...prevPhoto, title: newTitle } : null
      );
      setEditing(false);
    } catch (error) {
      console.error('Error updating photo title:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20">
      {loading ? <LoadingSpinner loading={loading} /> : null}
      {photo && (
        <>
          <h1 className="text-2xl font-bold py-6 text-[#351D5B]">
            Photo Details
          </h1>
          <div className="bg-white p-6 rounded shadow mb-6">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-80 object-cover rounded mb-4"
            />

            {editing ? (
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#351D5B]">
                  {photo.title}
                </h2>
                <button
                  onClick={handleEdit}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit Title
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoDetails;
