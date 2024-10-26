import { useEffect, useState } from 'react';
import axios from 'axios';

const backend_url = import.meta.env.VITE_BACKEND_URL as string;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and albums on component mount
  useEffect(() => {
    const fetchUsersAndAlbums = async () => {
      try {
        // Fetch users
        const usersResponse = await axios.get(`${backend_url}/api/users`);
        setUsers(usersResponse.data);

        // Fetch albums
        const albumsResponse = await axios.get(`${backend_url}/api/albums`);
        setAlbums(albumsResponse.data);
      } catch (error) {
        console.error('Error fetching users or albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndAlbums();
  }, []);

  // Function to get album count for a user
  const getUserAlbumCount = (userId) => {
    return albums.filter((album) => album.userId === userId).length;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#351D5B]">
        Users
      </h1>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user.id} className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-bold text-[#351D5B]">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="mt-2">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="mt-2">
                <strong>Albums:</strong> {getUserAlbumCount(user.id)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
