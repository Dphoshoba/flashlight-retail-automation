interface NavProps {
  current: string;
  setPage: (page: string) => void;
}

export default function Navigation({ current, setPage }: NavProps) {
  const links = ['Dashboard', 'Gallery', 'Manual'];
  return (
    <nav className="flex gap-4 mb-8">
      {links.map(link => (
        <button
          key={link}
          onClick={() => setPage(link)}
          className={`px-4 py-2 rounded-lg ${current === link ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}`}
        >
          {link}
        </button>
      ))}
    </nav>
  );
}
