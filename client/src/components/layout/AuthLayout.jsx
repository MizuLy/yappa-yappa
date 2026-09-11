import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <Outlet /> {/* whichever page (Login or Register) renders here */}
    </div>
  );
}
