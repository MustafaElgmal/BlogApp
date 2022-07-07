import axios from "axios";
const api = axios.create({ baseURL: "https://api.tawwr.com" });
export const getPosts = async () => {
  try {
    const { data } = await api.get("/posts");
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (post) => {
  try {
    const res = await api.post("/posts", post);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (id, comment) => {
  console.log(id);
  try {
    const res = await api.post(`/posts/${id}/comment`, comment);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const addVote = async (id, vote) => {
  try {
    const res = await api.post(`/posts/${id}/vote`, vote);
    return res;
  } catch (e) {
    console.log(e);
  }
};
