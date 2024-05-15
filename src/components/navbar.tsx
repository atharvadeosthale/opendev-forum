import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="py-4 flex justify-between items-center">
      <div className="font-bold text-xl">OpenDev</div>
      <div className="flex items-center gap-3">
        <Button variant="secondary">Login</Button>
        <Button variant="secondary">Create a new account</Button>
        <ThemeToggler />
      </div>
    </div>
  );
}
