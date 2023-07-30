"use client";
import Chat from "@/components/chat/Chat";
import Contacts from "@/components/chat/Contacts";
import { TUserWithChat } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";

interface ChatClientProps {
  currentUser?: User | null;
}

const ChatClient: React.FC<ChatClientProps> = ({ currentUser }) => {
  const [receiver, setReceiver] = useState({ receiverId: "", receiverName: "", receiverImage: "" });

  const [layout, setLayout] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const {
    data: users,
    error,
    isLoading,
  } = useSWR("/api/chat", fetcher, {
    refreshInterval: 1000, // 1초마다 재요청
  });

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <main>
      <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr]">
        {/* md 보다 클때는 둘 다 보여야 하고 */}

        {/* md보다 작고 layout이 true라면 contact 안보임 */}
        <section className={`md:flex ${layout && "hidden"}`}>
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>
        {/* md보다 작고 layout이 false라면 chat 안보임 */}
        <section className={`md:flex ${!layout && "hidden"}`}>
          <Chat currentUser={currentUserWithMessage} receiver={receiver} setLayout={setLayout} />
        </section>
      </div>
    </main>
  );
};

export default ChatClient;
