// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// const socket = io("http://localhost:5000"); // Adjust if needed

// function AdminChat() {
//   const { user } = useSelector((state) => state.auth); // Admin user
//   const [users, setUsers] = useState([]); // List of users to chat with
//   const [selectedUser, setSelectedUser] = useState(null); // User clicked
//   const [messages, setMessages] = useState([]);
//   const [msg, setMsg] = useState("");
//   const scrollRef = useRef();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/chat/users/list")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setUsers(data.users); // [{ _id, name }]
//         }
//       });
//   }, []);

//   // Fetch chat history
//   const handleUserClick = async (userObj) => {
//     setSelectedUser(userObj);
//     const res = await fetch(`http://localhost:5000/api/chat/${userObj._id}`);
//     const data = await res.json();
//     setMessages(data.messages || []);
//   };

//   const handleSend = () => {
//     if (!msg.trim()) return;

//     const payload = {
//       sender: { _id: user.id, name: user.userName, role: "admin" },
//       receiver: {
//         _id: selectedUser._id,
//         name: selectedUser.name,
//         role: "user",
//       },
//       message: msg,
//     };

//     socket.emit("sendMessage", payload);
//     setMsg("");
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex h-screen">
//       <div className="w-64 p-4 bg-white border-r">
//         <h2 className="mb-2 font-bold">Users</h2>
//         {users.map((u) => (
//           <div
//             key={u._id}
//             onClick={() => handleUserClick(u)}
//             className={`p-2 cursor-pointer rounded ${
//               selectedUser?._id === u._id ? "bg-gray-200" : ""
//             }`}
//           >
//             {u.name}
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col flex-1 bg-gray-50">
//         <div className="flex-1 p-4 space-y-2 overflow-auto">
//           {messages.map((m, idx) => (
//             <div
//               key={idx}
//               className={`p-2 rounded-md max-w-[75%] text-sm ${
//                 m.sender._id === user.id ? "bg-blue-100 ml-auto" : "bg-gray-100"
//               }`}
//             >
//               <strong>{m.sender.name}:</strong> {m.message}
//             </div>
//           ))}
//           <div ref={scrollRef} />
//         </div>

//         {selectedUser && (
//           <div className="flex gap-2 p-4 border-t">
//             <Input
//               placeholder="Type message..."
//               value={msg}
//               onChange={(e) => setMsg(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <Button onClick={handleSend}>Send</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminChat;
