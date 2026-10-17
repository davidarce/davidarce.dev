import { useEffect, useMemo, useRef, useState } from "react";
import { THEMES, getTheme, setTheme, type ThemeId } from "../lib/theme";

type Item = {
	id: string;
	label: string;
	group: "Navigate" | "Actions" | "Theme";
	hint?: string;
	run: () => void;
};

const EMAIL = "davidarce2915@gmail.com";

function go(hash: string) {
	const el = hash === "#top" ? document.body : document.querySelector(hash);
	el?.scrollIntoView({ behavior: "smooth" });
	history.replaceState(null, "", hash);
}

export default function CommandPalette() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [sel, setSel] = useState(0);
	const [theme, setThemeState] = useState<ThemeId>("system");
	const inputRef = useRef<HTMLInputElement>(null);

	const items = useMemo<Item[]>(
		() => [
			{ id: "top", label: "Home", group: "Navigate", run: () => go("#top") },
			{ id: "ai", label: "AI Enablement", group: "Navigate", run: () => go("#ai") },
			{ id: "exp", label: "Experience", group: "Navigate", run: () => go("#experience") },
			{ id: "skills", label: "Skills", group: "Navigate", run: () => go("#skills") },
			{ id: "edu", label: "Education", group: "Navigate", run: () => go("#education") },
			{
				id: "gh",
				label: "Open GitHub",
				group: "Actions",
				run: () => window.open("https://github.com/davidarce", "_blank", "noopener"),
			},
			{
				id: "li",
				label: "Open LinkedIn",
				group: "Actions",
				run: () => window.open("https://www.linkedin.com/in/davidarce92", "_blank", "noopener"),
			},
			{
				id: "mail",
				label: "Copy email",
				group: "Actions",
				hint: EMAIL,
				run: () => {
					navigator.clipboard?.writeText(EMAIL).catch(() => {});
				},
			},
			...THEMES.map<Item>((t) => ({
				id: `theme-${t.id}`,
				label: `${t.label} theme`,
				group: "Theme",
				hint: theme === t.id ? "active" : undefined,
				run: () => setTheme(t.id),
			})),
		],
		[theme],
	);

	const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

	const close = () => {
		setOpen(false);
		setQuery("");
		setSel(0);
	};

	useEffect(() => {
		setThemeState(getTheme());
		const onTheme = (e: Event) => setThemeState((e as CustomEvent<ThemeId>).detail);
		const onOpen = () => setOpen(true);
		window.addEventListener("themechange", onTheme);
		window.addEventListener("open-palette", onOpen);
		return () => {
			window.removeEventListener("themechange", onTheme);
			window.removeEventListener("open-palette", onOpen);
		};
	}, []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((p) => !p);
				setSel(0);
				return;
			}
			if (!open) return;
			if (e.key === "Escape") close();
			else if (e.key === "ArrowDown") {
				e.preventDefault();
				setSel((p) => Math.min(p + 1, filtered.length - 1));
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setSel((p) => Math.max(p - 1, 0));
			} else if (e.key === "Enter" && filtered[sel]) {
				e.preventDefault();
				filtered[sel].run();
				close();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, filtered, sel]);

	useEffect(() => setSel(0), [query]);
	useEffect(() => {
		if (open) inputRef.current?.focus();
	}, [open]);

	if (!open) return null;

	let lastGroup = "";
	return (
		<div className="pal-back" onClick={close}>
			<div className="pal" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
				<div className="pal-in">
					<span className="mono" style={{ color: "var(--accent)" }}>
						&gt;
					</span>
					<input
						ref={inputRef}
						type="text"
						placeholder="Type a command..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<span className="kbd">ESC</span>
				</div>
				<div className="pal-list">
					{filtered.length === 0 && (
						<div className="pal-h" style={{ padding: "24px 10px" }}>
							No results
						</div>
					)}
					{filtered.map((item, idx) => {
						const header = item.group !== lastGroup ? item.group : null;
						lastGroup = item.group;
						return (
							<div key={item.id}>
								{header && <div className="pal-h">{header}</div>}
								<button
									type="button"
									className="pal-item"
									data-sel={idx === sel}
									onMouseEnter={() => setSel(idx)}
									onClick={() => {
										item.run();
										close();
									}}
								>
									<span>{item.label}</span>
									{item.hint && <span className="r">{item.hint}</span>}
								</button>
							</div>
						);
					})}
				</div>
				<div className="pal-foot">
					<span>↑↓ navigate · ↵ select</span>
					<span>⌘K toggle</span>
				</div>
			</div>
		</div>
	);
}
