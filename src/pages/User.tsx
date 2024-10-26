import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../hooks/api';
import LoadingSpinner from '../components/Spinner';

type User = {
  _id: string;
  name: string;
  email: string;
  username: string;
};

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userResponse = await api.get(`/users/${id}`);
        setUser(userResponse.data);

        // Fetch user's albums
        const albumsResponse = await api.get(`/albums/user/${id}`);
        setAlbums(albumsResponse.data.albums);
      } catch (error) {
        console.error('Error fetching user or albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20">
      {loading ? <LoadingSpinner loading={loading} /> : null}
      {user && (
        <>
          <h1 className="text-xl font-bold  py-6 text-[#351D5B]">
            {user.name}'s Profile
          </h1>
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-bold text-[#351D5B]">User Details</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>

          <h2 className="text-xl font-bold mb-4 text-[#351D5B]">Albums</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.length > 0 ? (
              albums.map((album: any) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="bg-white p-6 rounded shadow"
                >
                  <h3 className="text-lg font-semibold text-[#351D5B]">
                    {album.title}
                  </h3>
                  <p>{album.description}</p>
                </Link>
              ))
            ) : (
              <p>This user has no albums yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
