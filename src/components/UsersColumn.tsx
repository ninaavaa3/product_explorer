"use client";

import { useNavigate } from "react-router";
import { useGetUsersQuery } from "../store/api";
import Loading from "./common/Loading";
import ListItem from "./common/ListItem";

export default function UsersColumn({ searchTerm }: { searchTerm: string }) {
  const navigate = useNavigate();
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 h-64 flex items-center justify-center">
        <p>Error loading users</p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-y-auto h-[calc(100vh-250px)]">
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <ul className="divide-y divide-gray-200 ">
          {filteredUsers.map((user) => {
            const avatarContent = (
              <div className="bg-gray-200 rounded-full flex items-center justify-center w-full h-full">
                <span className="text-gray-500 font-medium">
                  {user.name.firstname[0]}
                  {user.name.lastname[0]}
                </span>
              </div>
            );
            return (
              <ListItem
                key={user.id}
                id={user.id}
                title={`${user.name.firstname} ${user.name.lastname}`}
                subtitle={`@${user.username}`}
                rightText={user.email}
                onClick={() => handleUserClick(user.id)}
                avatarContent={avatarContent}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
