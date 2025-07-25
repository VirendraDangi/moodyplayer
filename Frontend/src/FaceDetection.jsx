import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import  axios, { Axios } from"axios"

const FaceDetection = () => {
  const videoRef = useRef();
  const [expression, setExpression] = useState('');
  const [songs, setSongs] = useState([]);

  // Load models and start video on mount
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // models must be in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    };

    loadModels();
  }, []);

  // Start webcam stream
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing webcam:', err));
  };

  // 👇 This is your manual expression detection function
  const detectExpressionOnce = async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) return;

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections && detections.expressions) {
      const exp = Object.entries(detections.expressions)
        .reduce((a, b) => (a[1] > b[1] ? a : b))[0];
      setExpression(exp);
    }
 
      axios.get(`http://localhost:3000/song?mood=${expression}`)
    .then(response=>{
           setSongs(response.data.songs);
      console.log(response.data);
    })
console.log(expression);
  
   
  };
      
      
  return (
   <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-8'>
  
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
  </div>

  {/* Main Content Container */}
  <div className="relative z-10 max-w-7xl mx-auto">
    
    {/* Hero Section */}
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-16">
      
      {/* Video Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <video 
            className='w-full max-w-lg h-64 sm:h-80 rounded-xl object-cover shadow-2xl' 
            ref={videoRef} 
            autoPlay 
            muted 
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="text-center lg:text-left max-w-lg">
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight'>
          Get Songs That Match Your 
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> Mood </span>
          <span className="inline-block animate-bounce">🎶</span>
        </h1>
        
        <p className='text-gray-300 text-lg mb-8 leading-relaxed'>
          Our app detects your mood using facial expressions and instantly recommends songs <br className="hidden sm:block" /> 
          that fit how you feel. Just look at the camera and let the music match your vibe.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={detectExpressionOnce}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative cursor-pointer z-10">Detect Expression</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>

          {expression && (
            <div className="inline-flex items-center px-8 ml-3 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <span className="text-white font-semibold">Expression: </span>
              <span className="text-pink-400 font-bold ml-2">{expression}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Songs Section */}
    <div>
      <div className="text-center mb-12">
        <h1 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
          Recommended Songs
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {songs.map((song, index) => (
            <div
              key={song._id}
              className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h1 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                  🎵 {song.title}
                </h1>
                <h2 className="text-gray-400 text-sm mb-4">
                  👤 {song.artist}
                </h2>
                <audio
                  src={song.audio}
                  controls
                  className="w-full rounded-xl bg-black/30 backdrop-blur-sm"
                />
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10 scale-105"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
</div>
  );
};

export default FaceDetection;
