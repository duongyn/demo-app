import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../services/PostService";

const PostDetailPage = () => {
    const params = useParams();
    const id = params.postId;
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    let navigate = useNavigate();
    const [listLength, setListLength] = useState(0);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const initialPostState = {
        id: null,
        title: "",
        description: "",
        content: "",
        author: {
            username: ""
        }
    };
    const [currentPost, setCurrentPost] = useState(initialPostState);
    const [message, setMessage] = useState("");
    const getPost = id => {
        PostService.get(id)
            .then(response => {
                setCurrentPost(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (id) {
            getPost(id);
        }
        //get post lists and length, then set current index
        PostService.getAll().then(response => {
            setListLength(response.data.length);
            setPosts(response.data);
            response.data.forEach((p, i) => {
                if (p.id == Number(id)) {
                    setCurrentIndex(i);
                }
            });
        })
            .catch(e => {
                console.log(e);
            }
            );
    }, [id]);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setMessage("");
        setCurrentPost({ ...currentPost, [name]: value });
    };

    const updatePost = () => {
        PostService.update(currentPost.id, currentPost)
            .then(response => {
                setMessage("The Post was updated successfully!");
                setUpdateSuccess(true);
                setTimeout(() => {
                    navigate('/posts');
                }, 2000);
            })
            .catch(e => {
                if(e.response.status == '401'){
                    setMessage("Login with Admin Role is required to update Post");
                    setUpdateSuccess(false);
                }
                else{
                    setMessage("Update failed with Status: ",e.response.status);
                    setUpdateSuccess(false);
                    console.log(e.response.body);
                }
            });
    };

    const previousPost = () => {
        if (currentIndex != -1) {
            posts.forEach((p, i) => {
                if (i == (currentIndex - 1)) {
                    let previousId = Number(p.id);
                    setMessage("");
                    navigate('/posts/' + previousId);
                }
            });
        }
    }

    const nextPost = () => {
        if (currentIndex != -1) {
            posts.forEach((p, i) => {
                if (i == (currentIndex + 1)) {
                    let nextId = Number(p.id);
                    setMessage("");
                    navigate('/posts/' + nextId);
                }
            });
        }
    }

    return (
        <div>
            {currentPost ? (
                <div className="edit-form">
                    <h4>Post</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentPost.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentPost.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="content"
                                name="content"
                                value={currentPost.content}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={currentPost.author.username}
                                disabled
                            />
                        </div>
                    </form>
                    {currentIndex > 0 && (
                        <button
                            type="button"
                            className="btn btn-primary mr-5"
                            onClick={previousPost}
                        >
                            Previous Post
                        </button>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary mr-5"
                        onClick={updatePost}
                    >
                        Update
                    </button>
                    {currentIndex < listLength - 1 && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={nextPost}
                        >
                            Next Post
                        </button>
                    )}
                    {message && (
                        <div className="form-group">
                            {updateSuccess ? (
                                <div className="alert alert-success" role="alert">
                                    {message}
                                </div>
                            ) : (<div className="alert alert-danger" role="alert">
                                {message}
                            </div>)
                            }
                        </div>
                    )}

                </div>
            ) : (
                <div>
                    <br />
                    <p>Not found Post...</p>
                </div>
            )}
        </div>
    );
}

export default PostDetailPage;