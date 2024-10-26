import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../hooks/api';
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners';

interface PhotoFormProps {
  photo: { _id: number; title: string; url: string } | null;
  onSuccess: () => void;
}
type Album = {
  _id: string;
  title: string;
  userId: string;
};

const PhotoForm: React.FC<PhotoFormProps> = ({ photo, onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState(photo ? photo.title : '');
  const [imageUrl, setImageUrl] = useState(photo ? photo.url : '');
  const [albumId, setAlbumId] = useState<string>('');
  const [albums, setAlbums] = useState<Album[]>([]);
  const isEditMode = Boolean(photo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get(`/albums/user/${user?._id}`);
        setAlbums(response.data.albums);
      } catch (error) {
        toast.error('Failed to fetch albums');
        console.error(error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (isEditMode) {
        const response = await api.put(`/photos/${photo?._id}`, {
          title,
          imageUrl,
          albumId,
        });
        if (response.status === 200) {
          setLoading(false);
          toast.success('Photo updated');
          onSuccess();
          navigate('/photos');
        } else {
          setLoading(false);
          const errorData = response.data;
          toast.error(errorData.msg || 'Operation failed');
        }
        return;
      }
      const response = await api.post(`/photos/create`, {
        title,
        imageUrl,
        albumId,
      });
      if (response.status === 201) {
        setLoading(false);
        toast.success('Photo created');
        onSuccess();
        navigate('/photos');
      } else {
        setLoading(false);
        const errorData = response.data;
        toast.error(errorData.msg || 'Operation failed');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Network error');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white p-4 shadow rounded"
    >
      <h2 className="text-2xl font-semibold">
        {isEditMode ? 'Edit Photo' : 'Create Photo'}
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Photo Title"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <select
        value={albumId}
        onChange={(e) => setAlbumId(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
      >
        <option value="">Select an Album</option>
        {albums.map((album) => (
          <option key={album._id} value={album._id}>
            {album.title}
          </option>
        ))}
      </select>
      <button
        type="submit"
              className="w-full py-2 bg-[#351D5B]
         text-white rounded"
      >
        {loading ? (
          <span className="flex justify-center items-center gap-5">
            <ClipLoader color="#ffffff" loading={loading} size={20} />
            <span className="ml-2">
              {isEditMode ? 'Updating...' : 'Creating...'}
            </span>
          </span>
        ) : isEditMode ? (
          'Update'
        ) : (
          'Create'
        )}
      </button>
    </form>
  );
};

export default PhotoForm;
