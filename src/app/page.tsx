import TokenTable from "./components/TokenTable";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<ThemeToggle />
			<div className="container mx-auto px-4 py-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Axiom Token Table
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Real-time cryptocurrency token data and trading
						information
					</p>
				</header>
				<main className="flex flex-col">
					<TokenTable />
				</main>
				<footer className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
					<p className="text-center text-sm text-gray-500 dark:text-gray-400">
						Created by{" "}
						<a
							href="#"
							className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
						>
							Your Name
						</a>
					</p>
				</footer>
			</div>
		</div>
	);
}
