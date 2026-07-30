import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-marble/90 backdrop-blur-md border-b border-gray-200/50 py-3 px-4 flex items-center justify-center">

      <h1 className="text-3xl font-black text-brandRed tracking-widest uppercase font-['Dalek'] pt-1">
        Mr. Gyros
      </h1>
      
        <Image 
        src="/logo.png" 
        alt="Mr. Gyros Logo" 
        width={60} 
        height={60} 
        className="object-contain"
        priority // Загружаем логотип в первую очередь
      />
    </header>
  );
};