import {useAuth} from '../../hooks/useAuth'

const Feed = () => {

  const { logout} = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <div>
      <h1 onClick={handleLogout}> Hello from Feed</h1>
    </div>
  );
};

export default Feed;
