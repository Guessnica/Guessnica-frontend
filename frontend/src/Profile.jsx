import React from 'react';

export default function Profile() {
    return (
        <div className="w-full flex flex-col items-center">

            {/* Blue header */}
            <div className="w-full bg-sky-500 p-6 flex flex-col items-center text-center text-white">
                <div className="w-32 h-32 border-4 border-white rounded-full flex items-center justify-center text-3xl">
                    👤
                </div>
                <div className="mt-2 font-medium text-lg">[username]</div>
            </div>

            {/* Stats top row */}
            <div className="w-[90%] grid grid-cols-2 gap-4 mt-6">
                <div className="border-2 border-sky-500 rounded-xl p-4 text-center">
                    <div className="font-semibold">Correct guesses:</div>
                    <div className="text-xl">99</div>
                </div>

                <div className="border-2 border-sky-500 rounded-xl p-4 text-center">
                    <div className="font-semibold">Incorrect guesses:</div>
                    <div className="text-xl">99</div>
                </div>
            </div>

            {/* Big box */}
            <div className="w-[90%] border-2 border-sky-500 rounded-xl p-6 mt-6">

                <div className="flex justify-between">
                    <div>Guesses in a row:</div>
                    <div>0</div>
                </div>

                <div className="flex justify-between">
                    <div>Total number of guesses:</div>
                    <div>0</div>
                </div>

                <div className="flex justify-between">
                    <div>Best correct guess streak:</div>
                    <div>0</div>
                </div>

                <div className="mt-6">[other miscellaneous info]</div>

                <div className="flex justify-between mt-6">
                    <div>Member since:</div>
                    <div>20.20.2000</div>
                </div>
            </div>
        </div>
    );
}