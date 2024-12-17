import React from 'react';

const MEMES = [
  {
    id: 1,
    title: "When the pump hits",
    image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800",
    tags: ["crypto", "pump"]
  },
  {
    id: 2,
    title: "Diamond Hands",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
    tags: ["hodl", "diamond"]
  },
  {
    id: 3,
    title: "To The Moon",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800",
    tags: ["moon", "rocket"]
  }
];

export function MemeGrid() {
  return (
    <section id="memes" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Latest Memes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEMES.map((meme) => (
            <div key={meme.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <img src={meme.image} alt={meme.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{meme.title}</h3>
                <div className="flex gap-2">
                  {meme.tags.map((tag) => (
                    <span key={tag} className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}