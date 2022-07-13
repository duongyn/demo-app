import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PostService from "../../services/PostService";
import Dialog from "./Dialog";

const PostListPage = () => {
    const [posts, setPosts] = useState([]);

    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        //Update
        postTitle: ""
    });

    useEffect(() => {
        getAllPosts();
    }, []);

    const postId = useRef();
    const handleDialog = (message, isLoading, postTitle) => {
        setDialog({
            message,
            isLoading,
            //Update
            postTitle
        });
    };

    const getAllPosts = () => {
        PostService.getAll().then(response => {
            setPosts(response.data);
        })
            .catch(e => {
                console.log(e);
            }
            );
    };

    const handleDelete = (id) => {
        if(localStorage.getItem('user')){
            const index = posts.findIndex((p) => p.id === id);

            handleDialog("Are you sure you want to delete?", true, posts[index].title);
            postId.current = id;
        }
        else{
            alert("Only Admin can delete post");
        }
        //Update
        
    };

    const areUSureDelete = (choose) => {
        if (choose) {
            PostService.remove(postId.current).then(response => {
                alert('Success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
            // setPosts(posts.filter((p) => p.id !== postId.current));
            handleDialog("", false);
        } else {
            handleDialog("", false);
        }
    };

    const formatDate = createdAt => {
        if (createdAt == null) {
            return moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
    return (
        <div style={{ display: "block", marginRight: "auto", marginLeft: "auto", width: "500px", fontSize: "26px" }}>
            {posts && posts.map((post, index) => (
                <div key={index}>
                    <Link className="item border-bottom" to={{ pathname: "/posts/" + post.id }}
                        style={{ display: "block", width: "auto", textAlign: "left", paddingLeft: "30px" }}>
                        <span><strong>{post.title}</strong></span><br></br>
                        <span>{post.description}</span><br></br>
                        <span style={{ opacity: "0.5" }}><small>Posted by {post.author.username}{" "}
                            on {formatDate(post.createdAt)} - 10 mins read
                        </small></span>
                    </Link>
                    <div style={{ display: "block", width: "auto", textAlign: "right" }}>
                        <button className="btn btn-danger"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete Post
                        </button>
                    </div>
                </div>
            ))}
            {dialog.isLoading && (
                <Dialog
                    postTitle={dialog.postTitle}
                    onDialog={areUSureDelete}
                    message={dialog.message}
                />
            )}
        </div>
    );
}

export default PostListPage;