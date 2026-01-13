import React, { useEffect, useState } from "react";

export default function AdminLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [image, setImage] = useState(null);

    const token = localStorage.getItem("jwt");

    useEffect(() => {
        fetchLocations();
    }, []);

    async function fetchLocations() {
        try {
            const res = await fetch("/locations", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setLocations(data ?? []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!image) return;

        const fd = new FormData();
        fd.append("latitude", latitude);
        fd.append("longitude", longitude);
        fd.append("shortDescription", shortDescription);
        fd.append("image", image);

        await fetch("/locations", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: fd,
        });

        setLatitude("");
        setLongitude("");
        setShortDescription("");
        setImage(null);

        fetchLocations();
    }

    async function handleDelete(id) {
        await fetch(`/locations/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        fetchLocations();
    }

    if (loading) {
        return <div className="p-10 text-sky-700">Loading locations…</div>;
    }

    return (
        <div className="w-full min-h-screen bg-neutral-100 p-6">
            <h1 className="text-2xl font-bold text-sky-700 mb-6">
                Manage Locations
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white/90 border-2 border-sky-500 rounded-xl p-6 mb-10 max-w-xl"
            >
                <div className="mb-3">
                    <input
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Latitude"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-3">
                    <input
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Longitude"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-3">
                    <input
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Short description"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="file"
                        onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                        }
                    />
                </div>

                <button className="bg-sky-600 text-white px-4 py-2 rounded">
                    Add location
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.map((l) => (
                    <div
                        key={l.id}
                        className="bg-white/90 border-2 border-sky-500 rounded-xl p-4"
                    >
                        <img
                            src={l.imageUrl}
                            alt=""
                            className="w-full h-40 object-cover rounded mb-3"
                        />

                        <div className="font-semibold mb-1">
                            {l.shortDescription}
                        </div>

                        <div className="text-sm text-gray-700 mb-3">
                            {l.latitude}, {l.longitude}
                        </div>

                        <button
                            onClick={() => handleDelete(l.id)}
                            className="text-red-600 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
