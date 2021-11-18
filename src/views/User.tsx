import { useMatch } from "react-location";

const Users = () => {
  const { params } = useMatch();
  return <div>Users {params.id}Page</div>;
};

export default Users;
