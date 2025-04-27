import api from '../api'; // adjust if needed

export const getBlogs = async (page) => {
  const response = await fetch(`http://127.0.0.1:8001/api/blog_list/?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

export async function getBlog(slug) {
  try {
    const response = await api.get(`blogs/${slug}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUser(data) {
  try {
    const response = await api.post("register_user/", data);
    return response.data;
  } catch (err) {
    console.log(err);
    if (err.status == 400) {
      throw new Error("Username already exists");
    }
    throw new Error(err);
  }
}