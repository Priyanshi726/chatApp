import React, {useState} from 'react';
import Chat from './Chat';
import Login from './Login';
import Users from './Users';
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';

export default function ChatApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myData, setMyData] = useState(null);

  const onLogin = async () => {
    try {
      const database = getDatabase();
   

      const user = await findUser(username);

 
      if (user) {
        setMyData(user);
      } else {
        const newUserObj = {
          username: 'username',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-nYklUorHjNljDNAkeR3p3jiw8GnGHEwvw&usqp=CAU' + Date.now()+renderTicks ,
          messages: messages.lastMessages
         
        };

        set(ref(database, `users/${username}`), newUserObj);
        setMyData(newUserObj);
      }

     
      const myUserRef = ref(database, `users/${username}`);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        setUsers(data.friends);
        setMyData(prevData => ({
          ...prevData,
          friends: data.friends,
        }));
      });
      setCurrentPage('users');
    } catch (error) {
      alert.error(error);
    }
  };

  const findUser = async name => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));

    return mySnapshot.val();
  };



  const onClickUser = user => {
    setCurrentPage('chat');
    setSelectedUser(user);
  };

  const onAddFriend = async name => {
    try {
     
      const database = getDatabase();

      const user = await findUser(name);

      if (user) {
        if (user.username === myData.username) {
         
          return;
        }

        if (
          myData.friends &&
          myData.friends.findIndex(f => f.username === user.username) > 0
        ) {
       
          return;
        }

       

        const newChatroomRef = push(ref(database, 'chatrooms'), {
          firstUser: myData.username,
          secondUser: user.username,
          messages: [],
        
        });

        const newChatroomId = newChatroomRef.key;

        const userFriends = user.friends || [];
   
        update(ref(database, `users/${user.username}`), {
          friends: [
            ...userFriends,
            {
              username: myData.username,
              avatar: myData.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });

        const myFriends = myData.friends || [];
      
        update(ref(database, `users/${myData.username}`), {
          friends: [
            ...myFriends,
            {
              username: user.username,
              avatar: user.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });
      }
    } catch (error) {
      alert.error(error);
    }
  };

  const onBack = () => {
    setCurrentPage('users');
  };

  switch (currentPage) {
    case 'login':
      return (
        <Login
          onLogin={onLogin}
          username={username}
          setUsername={setUsername}
        />
      );
    case 'users':
      return (
        <Users
          users={users}
          onClickUser={onClickUser}
          userToAdd={userToAdd}
          setUserToAdd={setUserToAdd}
          onAddFriend={onAddFriend}
        />
      );
    case 'chat':
      return (
        <Chat myData={myData} selectedUser={selectedUser} onBack={onBack} />
      );
    default:
      return null;
  }
}