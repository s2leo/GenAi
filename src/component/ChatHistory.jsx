import { Clock, FileText, MessageSquare } from "lucide-react";

const ChatHistory = ({ chatHistory, onSelectChat }) => {
  if (!chatHistory || chatHistory.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" />
          Chat History
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500">No chat history yet</p>
          <p className="text-sm text-slate-400 mt-1">
            Your previous conversations will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" />
        Chat History
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-slate-900 text-sm line-clamp-1">
                {chat.title}
              </h4>
              <div className="flex items-center text-xs text-slate-500 ml-2">
                <Clock className="w-3 h-3 mr-1" />
                {chat.timestamp}
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-600">
              <FileText className="w-3 h-3 mr-1" />
              {chat.documentName}
            </div>
            {chat.lastMessage && (
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {chat.lastMessage}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;