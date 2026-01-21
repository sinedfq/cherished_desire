export function StarBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden ">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute text-gray-500 blur-[0.5px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${15 + Math.random() * 25}px`,
            opacity: 0.15 + Math.random() * 0.15,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          ★
        </div>
      ))}
    </div>
  );
}
