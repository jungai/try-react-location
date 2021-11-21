import { useMatch } from "react-location";
import { LocationGenerics } from "../App";

const Songs = () => {
  const { data } = useMatch<LocationGenerics>();

  console.log("data ->", data.songs);

  return (
    <div>
      <h1>Songs Page</h1>
      {(data.songs || []).map((song) => (
        <li key={song.id}>
          🎵 {song.name} 👩‍🎤 {song.artist}
        </li>
      ))}
    </div>
  );
};

export default Songs;
