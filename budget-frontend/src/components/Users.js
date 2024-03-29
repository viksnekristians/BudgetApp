import { useState, useEffect } from "react"
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('backend users url!!', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data) 
            } catch(err){
                console.err(err);
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[])
  return (
    <div>
        <h2>Users list</h2>
        {users?.length
        ? (
            <ul>
                {users.map((user,i) => <li key={i}>{user?.username}</li>)}
            </ul>
        ) : <p>No users</p>
    }
    </div>
  )
}

export default Users