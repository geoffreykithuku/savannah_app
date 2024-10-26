import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
interface PhotoFormProps {
    photo: { id: number; title: string; url: string } | null;
    albumId: number;
    onSuccess: () => void;
}

const PhotoForm: React.FC<PhotoFormProps> = ({ photo, albumId, onSuccess }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(photo ? photo.title : '');
  const [imageUrl, setImageUrl] = useState(photo ? photo.url : '');
  const isEditMode = Boolean(photo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/photos${isEditMode ? `/${photo?.id}` : ''}`,
        {
          method: isEditMode ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, albumId, url: imageUrl }),
        }
      );
      if (response.ok) {
        toast.success(isEditMode ? 'Photo updated' : 'Photo created');
        onSuccess();
        navigate(`/albums/${albumId}`);
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
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded"
      >
        {isEditMode ? 'Update Photo' : 'Create Photo'}
      </button>
    </form>
  );
};

export default PhotoForm;
