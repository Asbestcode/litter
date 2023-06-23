import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostPage() {
    const router = useRouter();
    const {id} = router.query;
    const [post, setPost] = useState();

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/post?id='+id)
            .then(response => {
                setPost(response.data)
            })
    }, [id]);

    return ('hello')
}