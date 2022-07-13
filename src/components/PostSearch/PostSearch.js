import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PostService from "../../services/PostService";

const PostSearch = () => {
    const [posts, setPosts] = useState([]);
    const searchKey = useLocation().state.searchTitle;
    useEffect(() => {
        PostService.findByTitle(searchKey)
            .then(response => {
                setPosts(response.data);
            })
            .catch(e => {
                console.log(e);
            }
            );
    }, [searchKey]);

    const formatDate = createdAt => {
        if (createdAt == null) {
            return moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
    return (
        <div style={{ display: "block", marginLeft: "500px", fontSize: "26px" }}>
            {posts && posts.map((post, index) => (
                <Link className="item border-bottom" to={{ pathname: "/posts/" + post.id }} state={{ index: index }} key={index}
                    style={{ display: "block", width: "500px", textAlign: "left", paddingLeft: "30px" }}>
                    <span><strong>{post.title}</strong></span><br></br>
                    <span>{post.description}</span><br></br>
                    <span style={{ opacity: "0.5" }}><small>Posted by {post.author.username}{" "}
                        on {formatDate(post.createdAt)} - 10 mins read
                    </small></span>
                </Link>
            ))}
        </div>
    );
}

export default PostSearch;