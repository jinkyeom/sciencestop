interface HeroProps {
  category?: string;
  title: string;
  description?: string;
}

export default function Hero({ category, title, description }: HeroProps) {
  const imageQuery = category ? category.toLowerCase() : 'science'
  const bgImage = `https://source.unsplash.com/1600x900/?${imageQuery}`

  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
        {category && (
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-blue-500/80 text-white text-sm font-medium">
            {category}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  )
} 