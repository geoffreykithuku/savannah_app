import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const backend_url = import.meta.env.VITE_BACKEND_URL as string;

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(`${backend_url}/api/users/${id}`);
        setUser(userResponse.data);

        // Fetch user's albums
        const albumsResponse = await axios.get(
          `${backend_url}/api/albums?userId=${id}`
        );
        setAlbums(albumsResponse.data);
      } catch (error) {
        console.error('Error fetching user or albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading user information...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {user && (
        <>
          <h1 className="text-2xl font-bold text-center mb-6 text-[#351D5B]">
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
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </p>
            <p>
              <strong>Company:</strong> {user.company.name}
            </p>
          </div>

          <h2 className="text-xl font-bold mb-4 text-[#351D5B]">Albums</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <div key={album.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-lg font-bold text-[#351D5B]">
                  {album?.title}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
