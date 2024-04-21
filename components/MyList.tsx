import React from 'react';

export default function MyList({ data }: { data: { id: string, title: string, description: string, videoUrl: string, thumbnailUrl: string, genre: string, duration: string }[] }) {
  return (
    <div className="list-container">
      {data.map((item, index) => (
        <div key={index} className="list-item">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <img src={item.thumbnailUrl} alt={item.title} className="item-thumbnail" /> {/* Renderizando a thumbnail */}
          <p>Gênero: {item.genre}</p> {/* Renderizando o gênero */}
          <p>Duração: {item.duration}</p> {/* Renderizando a duração */}
          {/* Adicionando um player de vídeo para o videoUrl */}
          <video width="320" height="240" controls>
            <source src={item.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
