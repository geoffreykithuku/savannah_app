import { useEffect, useState } from 'react';
import api from '../hooks/api';
import LoadingSpinner from '../components/Spinner';
import { Link } from 'react-router-dom';

type User = {
  _id: string;
  name: string;
  email: string;
  username: string;
};

type Album = {
  userId: string;
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
        setAlbums(albumsResponse.data.albums);
      } catch (error) {
        console.error('Error fetching users or albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndAlbums();
  }, []);

  // Function to get album count for a user
  const getUserAlbumCount = (userId: string) => {
    return albums.length > 0
      ? albums.filter((album) => album?.userId === userId).length
      : 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-10 md:px-20 w-full">
      <h1 className="text-xl font-bold py-6 text-[#351D5B]">
        Users along with their albums
      </h1>
      <p className="text-gray-600 mb-6">
        To create your albums and photos, please visit <Link className='
        text-[#a484d8] underline' to="/albums">My Albums</Link> page.
      
      </p>

      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {users.map((user) => (
            <Link
              to={`/users/${user._id}`}
              key={user._id}
              className="p-4 bg-white rounded shadow hover:shadow-md hover:scale-105 transition-transform cursor-pointer w-full min-w-fit"
            >
              <h2 className="text-lg font-bold text-[#351D5B]">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="mt-2">
                <strong>Username:</strong> {user?.username}
              </p>
              <p className="mt-2">
                <strong>Albums:</strong> {getUserAlbumCount(user?._id)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
