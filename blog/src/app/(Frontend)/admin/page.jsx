'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]')
    setBlogs(storedBlogs)

    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) setUserEmail(loggedInUser)
  }, [])

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs))
  }, [blogs])

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : ''
  }, [isModalOpen])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    router.push('/login')
  }

  const openCreateModal = () => {
    setTitle('')
    setContent('')
    setEditingId(null)
    setIsModalOpen(true)
  }

  const openEditModal = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (!blog) return
    setTitle(blog.title)
    setContent(blog.content)
    setEditingId(id)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setTitle('')
    setContent('')
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    if (editingId === null) {
      const newBlog = { id: Date.now(), title, content }
      setBlogs([newBlog, ...blogs])
    } else {
      setBlogs(
        blogs.map((b) => b.id === editingId ? { ...b, title, content } : b)
      )
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter((b) => b.id !== id))
      if (editingId === id) closeModal()
    }
  }

  const getImageUrl = (id) => {
    const seed = id % 1000
    return  `https://picsum.photos/seed/${seed}/600/300`
  }

  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-md sticky top-0 z-30">
        <h1 className="text-3xl font-extrabold text-violet-700 tracking-wide">
          Admin Blog Management
        </h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-violet-400"
        >
          Logout
        </button>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-violet-800">Your Blogs</h2>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
          >
            + Create New Blog
          </button>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-xl italic mt-16">
            No blogs yet. Start by creating one!
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-violet-100 rounded-lg">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={getImageUrl(blog.id)}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-violet-900">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 flex-grow">
                    {blog.content.length > 250
                      ? blog.content.slice(0, 250) + '...'
                      : blog.content}
                  </p>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => openEditModal(blog.id)}
                      className="px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-md shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-10 w-full max-w-xl shadow-xl animate-scaleIn"
          >
            <h2 className="text-2xl font-bold text-violet-700 mb-6">
              {editingId ? 'Edit Blog' : 'Create Blog'}
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
              className="w-full p-4 border border-violet-300 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-violet-400"
              required
              autoFocus
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Blog content"
              className="w-full p-4 border border-violet-300 rounded-xl mb-6 focus:outline-none focus:ring-4 focus:ring-violet-400 resize-y"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-sm transition"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease forwards;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #a78bfa; /* violet-400 */
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #f3e8ff; /* violet-100 */
        }
      `}</style>
    </div>
  )
}