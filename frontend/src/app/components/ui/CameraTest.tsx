import { useRef } from "react";

export function CameraTest() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      alert("Камера успешно подключена!");
    } catch (err) {
      console.error("Ошибка доступа к камере:", err);
      alert("Ошибка доступа к камере: " + err);
    }
  };

  return (
    <div>
      <video ref={videoRef} width={400} height={300} autoPlay muted />
      <button onClick={startCamera}>Включить камеру</button>
    </div>
  );
}
