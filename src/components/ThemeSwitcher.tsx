import { useEffect, useState } from "react";
import { THEMES, getTheme, setTheme, type ThemeId } from "../lib/theme";

export default function ThemeSwitcher() {
	const [current, setCurrent] = useState<ThemeId>("system");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setCurrent(getTheme());
		setMounted(true);
		const onChange = (e: Event) => setCurrent((e as CustomEvent<ThemeId>).detail);
		window.addEventListener("themechange", onChange);
		return () => window.removeEventListener("themechange", onChange);
	}, []);

	return (
		<div className="themes themes-desktop" role="group" aria-label="Theme">
			{THEMES.map((t) => (
				<button
					key={t.id}
					type="button"
					aria-pressed={mounted && current === t.id}
					onClick={() => setTheme(t.id)}
				>
					{t.label}
				</button>
			))}
		</div>
	);
}
