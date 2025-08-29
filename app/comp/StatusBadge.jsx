// components/StatusBadge.js
import { CheckCircle, XCircle } from "lucide-react"; // 使用 lucide-react 图标库

export default function StatusBadge({ status }) {
  const isOk = status === "正常";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-sm font-medium ${
        isOk ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {isOk ? (
        <CheckCircle size={16} className="text-white" />
      ) : (
        <XCircle size={16} className="text-white" />
      )}
      {status}
    </span>
  );
}
