import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
    >
      <ArrowUp size={20} />
    </button>
  );
}

export default BackToTop;