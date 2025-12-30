import React, { useEffect, useState } from 'react';

// interface UserStats {
//   id: string;
//   displayName: string;
//   email: string;
//   roles: string[];
//   riddlesAnswered?: number;
//   totalScore?: number;
//   averageScore?: number;
// }

export default function Profile() {
  const [user, setUser] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8080/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
      setLoading(false);
    }

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Blue header */}
      <div className="w-full bg-sky-500 p-6 flex flex-col items-center text-center text-white">
        <div className="w-32 h-32 border-4 border-white rounded-full flex items-center justify-center text-3xl">
          👤
        </div>
        <div className="mt-2 font-medium text-lg">{user?.displayName}</div>
      </div>

      {/* Stats */}
      <div className="w-[90%] grid grid-cols-2 gap-4 mt-6">
        <div className="border-2 border-sky-500 rounded-xl p-4 text-center">
          <div className="font-semibold">Riddles answered:</div>
          <div className="text-xl">{user?.riddlesAnswered ?? 0}</div>
        </div>
        <div className="border-2 border-sky-500 rounded-xl p-4 text-center">
          <div className="font-semibold">Average score:</div>
          <div className="text-xl">{user?.averageScore ?? 0}</div>
        </div>
      </div>

      {/* More stats box */}
      <div className="w-[90%] border-2 border-sky-500 rounded-xl p-6 mt-6">
        <div className="flex justify-between">
          <div>Total score:</div>
          <div>{user?.totalScore ?? 0}</div>
        </div>

        <div className="flex justify-between mt-6">
          <div>Roles:</div>
          <div>{user?.roles.join(', ')}</div>
        </div>

        <div className="mt-6">[other miscellaneous info]</div>
      </div>
    </div>
  );
}
