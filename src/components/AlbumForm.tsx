import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../hooks/api';
import { ClipLoader } from 'react-spinners';
interface AlbumFormProps {
  album: {
    _id: number;
    title: string;
  } | null;
  userId: string;
  onSuccess: () => void;
}

const AlbumForm: React.FC<AlbumFormProps> = ({ album, userId, onSuccess }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(album ? album.title : '');
  const isEditMode = Boolean(album);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        const response = await api.put(`/albums/${album?._id}`, {
          title,
        });
        if (response.status === 200) {
          setLoading(false);
          toast.success('Album updated');
          onSuccess();
          navigate('/albums');
        } else {
          setLoading(false);
          const errorData = response.data;
          toast.error(errorData.msg || 'Operation failed');
        }
        return;
      }

      const response = await api.post(`/albums/create`, {
        title,
        userId,
      });
      if (response.status === 201) {
        setLoading(false);
        toast.success('Album created');
        onSuccess();
        navigate('/albums');
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
        {isEditMode ? 'Edit Album' : 'Create Album'}
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Album Title"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="w-full py-2 bg-[#351D5B]
         text-white rounded"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-5">
            <ClipLoader color="#ffffff" loading={loading} size={20} />{' '}
            <p>{isEditMode ? 'Updating Album' : 'Creating Album'}</p>
          </span>
        ) : isEditMode ? (
          'Update Album'
        ) : (
          'Create Album'
        )}
      </button>
    </form>
  );
};

export default AlbumForm;
