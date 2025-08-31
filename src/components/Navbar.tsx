import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">
          AI Academy
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}