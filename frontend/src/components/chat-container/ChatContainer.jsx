import { useChatStore } from "../../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "../chat-header/ChatHeader";
import MessageInput from "../message-input/MessageInput";
import MessageSkeleton from "../skeletons/message-skeleton/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";

const ChatContainer = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const openImagePreview = (imageSrc) => {
    setPreviewImage(imageSrc);
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isImageOnly = message.image && !message.text;
          const isFromMe = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex items-start gap-2 ${isFromMe ? "justify-end" : "justify-start"} mb-4`}
              ref={messageEndRef}
            >
              {/* Profile picture - only show for text messages, not image-only */}
              {!isImageOnly && (
                <div className={`${isFromMe ? "order-2 self-end" : "order-1 self-start"}`}>
                  <div className="size-8 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                      className="size-8 rounded-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className={`flex flex-col ${isFromMe ? "items-end order-1" : "items-start order-2"}`}>
                {/* Message content aligned with profile picture */}
                <div className="flex flex-col">
                  {/* Image only message (now in chat bubble) */}
                  {message.image && !message.text && (
                    <div className={`chat ${isFromMe ? "chat-end" : "chat-start"} w-full`}>
                      <div className="chat-bubble flex flex-col h-full">
                        <div className="flex-grow">
                          <img
                            src={message.image}
                            alt="Shared attachment"
                            className="max-w-[200px] rounded-md max-h-[200px] object-cover cursor-pointer"
                            onClick={() => openImagePreview(message.image)}
                          />
                        </div>
                        {/* Timestamp inside chat bubble, aligned to bottom right */}
                        <div className="text-xs opacity-70 text-right mt-auto">
                          {formatMessageTime(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Text only or text with image message (with chat bubble) */}
                  {(message.text || (message.image && message.text)) && (
                    <div className={`chat ${isFromMe ? "chat-end" : "chat-start"} w-full`}>
                      <div className="chat-bubble flex flex-col h-full">
                        <div className="flex-grow">
                          {message.image && (
                            <img
                              src={message.image}
                              alt="Attachment"
                              className="sm:max-w-[200px] rounded-md mb-2 max-h-[200px] object-cover cursor-pointer"
                              onClick={() => openImagePreview(message.image)}
                            />
                          )}
                          {message.text && <p>{message.text}</p>}
                        </div>
                        {/* Timestamp inside chat bubble, aligned to bottom right */}
                        <div className="text-xs opacity-70 text-right mt-auto">
                          {formatMessageTime(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
             onClick={closeImagePreview}>
          <div className="relative max-w-4xl max-h-4xl p-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 z-10 hover:bg-red-600"
              onClick={closeImagePreview}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatContainer;