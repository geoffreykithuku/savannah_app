import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface AlbumFormProps {
    album: { id: number; title: string } | null;
    userId: string;
    onSuccess: () => void;
}
    

const AlbumForm: React.FC<AlbumFormProps> = ({ album, userId, onSuccess }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(album ? album.title : '');
  const isEditMode = Boolean(album);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/albums${isEditMode ? `/${album.id}` : ''}`,
        {
          method: isEditMode ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, userId }),
        }
      );
      if (response.ok) {
        toast.success(isEditMode ? 'Album updated' : 'Album created');
        onSuccess();
        navigate('/albums');
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Operation failed');
      }
    } catch (error) {
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
        className="w-full py-2 bg-blue-500 text-white rounded"
      >
        {isEditMode ? 'Update Album' : 'Create Album'}
      </button>
    </form>
  );
};

export default AlbumForm;
