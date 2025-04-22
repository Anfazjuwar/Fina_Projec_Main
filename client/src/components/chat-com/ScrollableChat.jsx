import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "@/config/ChatLogics";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ScrollableChat = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <TooltipProvider>
      <ScrollableFeed className="space-y-1">
        {messages &&
          messages.map((m, i) => (
            <div className="flex items-end gap-2" key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="w-6 h-6 mt-2">
                      <AvatarImage src={m.sender.pic} alt={m.sender.name} />
                      <AvatarFallback>
                        {m.sender.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    {m.sender.name}
                  </TooltipContent>
                </Tooltip>
              )}
              <span
                className={`px-3 py-1 text-sm rounded-2xl max-w-[75%] ${
                  m.sender._id === user._id
                    ? "bg-blue-100 text-black"
                    : "bg-green-100 text-black"
                }`}
                style={{
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </TooltipProvider>
  );
};

export default ScrollableChat;
