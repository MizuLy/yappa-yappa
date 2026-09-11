import Logout from "../auth/Logout";

export default function Feed() {
  return (
    <div>
      All posts are here but you can logout by click here {`->`} <Logout />
    </div>
  );
}
