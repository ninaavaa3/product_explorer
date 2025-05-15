import { useParams, Link } from "react-router";
import { useGetUserByIdQuery } from "../store/api";
import { ArrowLeft } from "lucide-react";
import Loading from "../components/common/Loading";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useGetUserByIdQuery(id || "");

  if (isLoading) {
    return <Loading />;
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error loading user</h2>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const userDetails = [
    {
      label: "Full name",
      value: `${user.name.firstname} ${user.name.lastname}`,
    },
    { label: "Email address", value: user.email },
    { label: "Phone number", value: user.phone },
    {
      label: "Address",
      value: `${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
    },
    {
      label: "Geolocation",
      value: `Lat: ${user.address.geolocation.lat}, Long: ${user.address.geolocation.long}`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Link to="/" className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>
      </header>
      <main>
        <div className=" mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                {user.name.firstname} {user.name.lastname}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">@{user.username}</p>
            </div>
            <div className="border-t border-gray-200">
              <>
                {userDetails.map((detail, index) => (
                  <div
                    key={detail.label}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <p className="text-sm font-medium text-gray-500">{detail.label}</p>
                    <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detail.value}</p>
                  </div>
                ))}
              </>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
