import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../hooks/api';
interface PhotoFormProps {
    photo: { _id: number; title: string; url: string } | null;
    albumId: string;
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
        const response = await api.post(
            `/photos${
            isEditMode ? `/${photo?._id}` : ''
            }`,
            {
            title,
            url: imageUrl,
            albumId,
            }
        );
        if (response.status === 201) {
            toast.success(isEditMode ? 'Photo updated' : 'Photo created');
            onSuccess();
            navigate('/albums');
        } else {
            const errorData = response.data;
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
