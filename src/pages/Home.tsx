import { useEffect, useState } from 'react';
import api from '../hooks/api';
import LoadingSpinner from '../components/Spinner';

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

type Album = {
  userId: number;
};

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and albums on component mount
  useEffect(() => {
    const fetchUsersAndAlbums = async () => {
      try {
        // Fetch users
        const usersResponse = await api.get(`/users/all`);
        setUsers(usersResponse.data);

        // Fetch albums
        const albumsResponse = await api.get(`/albums/all`);
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
  const getUserAlbumCount = (userId: number) => {
    return albums.length > 0
      ? albums.filter((album) => album?.userId === userId).length
      : 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20">
      <h1 className="text-xl font-bold py-6 text-[#351D5B]">
        Users along with their albums
      </h1>

      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white rounded shadow hover:shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <h2 className="text-lg font-bold text-[#351D5B]">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="mt-2">
                <strong>Username:</strong> {user?.username}
              </p>
              <p className="mt-2">
                <strong>Albums:</strong> {getUserAlbumCount(user?.id)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
