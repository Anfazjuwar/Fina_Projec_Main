// import { Stack } from "@chakra-ui/react";
// import { Skeleton } from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <div className="p-4 space-y-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-11 animate-pulse rounded-xl bg-muted"
        />
      ))}
    </div>
  );
};

export default ChatLoading;
