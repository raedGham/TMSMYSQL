import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  return (
    <button
      className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 transition"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}


