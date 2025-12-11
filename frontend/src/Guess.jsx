import React, { useState } from 'react';
export default function Guess() {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen((s) => !s);
	return (
		<div className="w-full flex flex-col items-center">

			{/* Górny banner */}
			<div className="w-full bg-sky-500 text-white p-4 flex justify-between items-center">
				<div className="text-sm">
					Time until next riddle: 9 hours
				</div>
				<div className="font-semibold text-lg">
					00.00.0000 Riddle
				</div>
				<div className="opacity-0">
					placeholder
				</div>
			</div>

			{/* Main box */}
			<div className="w-[90%] bg-white border-4 border-sky-500 mt-6 min-h-[600px] p-6 relative">

				{/* Dropdown menu (replaces icon + inputs) */}
				<div className="relative mt-2">
					<button
						type="button"
						aria-haspopup="menu"
						aria-expanded={menuOpen}
						onClick={toggleMenu}
						className="flex items-center gap-2 px-4 py-2 border border-black rounded bg-white hover:bg-gray-100"
					>
						Menu
						<svg className={`w-4 h-4 transform transition-transform ${menuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 011.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
						</svg>
					</button>

					{menuOpen && (
						<ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10">
							<li>
								<button className="w-full text-left px-4 py-2 hover:bg-gray-100">Option 1</button>
							</li>
							<li>
								<button className="w-full text-left px-4 py-2 hover:bg-gray-100">Option 2</button>
							</li>
							<li>
								<button className="w-full text-left px-4 py-2 hover:bg-gray-100">Option 3</button>
							</li>
						</ul>
					)}
				</div>

				{/* Mapa / obrazek */}
				<div className="w-full h-[350px] flex items-center justify-center">
					<div className="w-4 h-4 bg-red-500 rounded-full"></div>
				</div>

				{/* Confirm button */}
				<div className="w-full flex justify-center mt-10">
					<button className="border border-black rounded-lg px-8 py-3 bg-white hover:bg-gray-100">
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}

