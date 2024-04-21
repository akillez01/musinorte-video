import React, { useState, useEffect } from 'react';

function MyList() {
  // Inicialize o estado com um array vazio
  const [videos, setVideos] = useState([]);

  // Quando a página é carregada, obtenha os vídeos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVideos = localStorage.getItem('videos');
      if (savedVideos) {
        setVideos(JSON.parse(savedVideos));
      }
    }
  }, []);

  // Função para adicionar um novo vídeo à lista
  const addVideo = (video) => {
    setVideos((currentVideos) => {
      const newVideos = [...currentVideos, video];
      if (typeof window !== 'undefined') {
        localStorage.setItem('videos', JSON.stringify(newVideos));
      }
      return newVideos;
    });
  };

  return (
    <div style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <h1>My List Page</h1>
      {/* Mapeie sobre os vídeos e renderize-os */}
      {videos.map((video, index) => (
        <div key={index} style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden' }}>
          {/* Renderize o vídeo aqui */}
          <video width="320" height="240" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
      {/* Adicione um botão para adicionar um novo vídeo */}
      <button onClick={() => addVideo('https://d1jwbpg1702h6u.cloudfront.net/bal-csn.mp4')} style={{ color: 'white', backgroundColor: 'black', padding: '10px', borderRadius: '5px' }}>Add Video</button>
    </div>
  );
}

export default MyList;
