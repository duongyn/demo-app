import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";

const AddNewPost = () => {
    const initialPostState = {
        title: "",
        description: "",
        content: "",
        author: {
            username: ""
        }
    };
    useEffect(() => {
        if(localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user.username);
            setNewPost(newPost => (newPost.author.username = user.username, newPost));
        }
    },[]);

    let navigate = useNavigate();
    const [message, setMessage] = useState("");

    const [createSuccess, setCreateSuccess] = useState(false);

    const [newPost, setNewPost] = useState(initialPostState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setMessage("");
        setNewPost({ ...newPost, [name]: value });
    };

    const createPost = () => {
        PostService.create(newPost)
            .then(response => {
                console.log(response.data);
                setMessage("The Post was created successfully!");
                setCreateSuccess(true);
                setTimeout(() => {
                    navigate('/posts');
                }, 2000);
            })
            .catch(e => {
                if (e.response.status == '401') {
                    setMessage("Login with Admin Role is required to create Post");
                    setCreateSuccess(false);
                }
                else {
                    setMessage("Create failed with Status: ", e.response.status);
                    setCreateSuccess(false);
                    console.log(e.response.body);
                }
            });
    };
    return(<div className="edit-form">
    <h4>Post</h4>
    <form>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={newPost.title}
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
                value={newPost.description}
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
                value={newPost.content}
                onChange={handleInputChange}
            />
        </div>
    </form>
    <button
        type="submit"
        className="btn btn-primary mr-5"
        onClick={createPost}
    >
        Create
    </button>
    {message && (
        <div className="form-group">
            {createSuccess ? (
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            ) : (<div className="alert alert-danger" role="alert">
                {message}
            </div>)
            }
        </div>
    )}

</div>);
}

export default AddNewPost;