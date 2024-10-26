import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../hooks/api';
import LoadingSpinner from '../components/Spinner';

type Photo = {
  _id: string;
  title: string;
  imageUrl: string;
  albumId: string;
};

type Album = {
  _id: string;
  title: string;
  description: string;
};

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        // Fetch album details
        const albumResponse = await api.get(`/albums/${id}`);
        setAlbum(albumResponse.data.album);

        // Fetch album photos
        const photosResponse = await api.get(`/photos/album/${id}`);
        setPhotos(photosResponse.data.photos);
      } catch (error) {
        console.error('Error fetching album or photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20">
      {loading ? <LoadingSpinner loading={loading} /> : null}
      {album && (
        <>
          <h1 className="text-xl font-bold py-6 text-[#351D5B]">
            Album: {album.title}
          </h1>
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-semibold text-[#351D5B]">
              Album Details
            </h2>
            <p>{album.title}</p>
          </div>

          <h2 className="text-xl font-bold mb-4 text-[#351D5B]">Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.length > 0 ? (
              photos.map((photo) => (
                <Link
                  to={`/photos/${photo._id}`}
                  key={photo._id}
                  className="bg-white p-6 rounded shadow"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#351D5B]">
                    {photo.title}
                  </h3>
                </Link>
              ))
            ) : (
              <p>No photos found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumDetails;
