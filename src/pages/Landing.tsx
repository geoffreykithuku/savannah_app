import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <section className="bg-[#351D5B] text-white py-20 px-5 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Manage Users, Albums, and Photos with Ease
        </h2>
        <p className="text-lg mb-8">
          A simple application to view, manage, and update user data and their
          related albums and photos. Built for web developers.
        </p>
        <NavLink
          to="/login"
          className="bg-[#9FC315] text-[#351D5B] px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300"
        >
          Get Started
        </NavLink>
      </section>

      <section className="py-16 px-5 md:px-20 bg-white text-[#351D5B]">
        <div className="grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-3">Users</h3>
            <p>
              View and manage user information, including their username, email,
              and associated albums.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">Albums</h3>
            <p>
              Browse user albums and view detailed information about each one,
              including album titles and related photos.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">Photos</h3>
            <p>
              See all the photos in an album, and edit the titles with ease to
              keep your data organized.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing