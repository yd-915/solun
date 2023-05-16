import React from 'react'

const WelcomerBlog = (data: any) => {
  return (
    <div className="bg-gray-950">
        <div className="container mx-auto px-4 py-8 md:py-16 h-full flex items-center justify-center">
                <div className="text-white text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-5xl md:h-14 font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    {data.title}
                </h1>
                </div>
        </div>
    </div>
  )
}

export default WelcomerBlog;