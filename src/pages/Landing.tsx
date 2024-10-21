import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="">
      <section className="bg-[#351D5B] text-white py-20 px-5 text-center border-t h-[70vh] justify-center items-center flex flex-col">
        <h2 className="text-4xl font-bold mb-4">
          Manage Users, Albums, and Photos with Ease
        </h2>
        <p className="text-lg mb-8">
          A simple application to view, manage, and update user data and their
          related albums and photos. Built as a technical assessment for a web
          developer role at SIL.
        </p>
        <NavLink
          to="/login"
          className="bg-[#9FC315] text-[#351D5B] px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300"
        >
          Get Started
        </NavLink>
      </section>

      <section className="py-16 px-5 md:px-20 bg-white text-[#351D5B] h-[70vh] justify-center items-center flex">
        <div className="grid gap-10 md:grid-cols-3 text-center ">
          <div className="shadow p-6 rounded-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Users</h3>
            <p>
              View and manage user information, including their username, email,
              and associated albums.
            </p>
          </div>
          <div className="shadow p-6 rounded-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Albums</h3>
            <p>
              Browse user albums and view detailed information about each one,
              including album titles and related photos.
            </p>
          </div>
          <div className="shadow p-6 rounded-md hover:shadow-lg">
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
};

export default Landing;
