'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function User() {
  const [blogs, setBlogs] = useState([])
  const [userEmail, setUserEmail] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs))

    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) setUserEmail(loggedInUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-900 flex flex-col font-sans">
      <nav className="bg-white shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-wide text-blue-700 select-none cursor-default">
            MyBlogApp
          </h1>

          <div className="hidden sm:flex space-x-8 items-center text-gray-600 font-medium text-base">
            <a href="#" className="hover:text-blue-700 transition duration-300 ease-in-out">
              Home
            </a>
            <a href="#" className="hover:text-blue-700 transition duration-300 ease-in-out">
              Write
            </a>
            <a href="#" className="hover:text-blue-700 transition duration-300 ease-in-out">
              Profile
            </a>

            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-md text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 flex flex-col">
        <h2 className="text-5xl font-bold text-center mb-10 text-blue-900 tracking-tight select-none">
       Blogs
        </h2>

        {blogs.length === 0 ? (
          <p className="flex-grow flex items-center justify-center text-lg text-gray-400 font-medium italic">
            No blogs available
          </p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 rounded-lg"
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          >
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-400 ease-in-out flex flex-col"
                tabIndex={0}
                aria-label={`Blog titled ${blog.title}`}
              >
                <div className="relative h-48 w-full rounded-t-3xl overflow-hidden">
                  <img
                    src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg"
                    alt="Blog thumbnail"
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  {/* Optional overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 truncate">{blog.title}</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed line-clamp-5 flex-grow">
                    {blog.content}
                  </p>
                  <button
                    className="mt-6 self-start px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    onClick={() => alert(`Open blog: ${blog.title}`)}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
