
import React from "react";
import { FileText } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <FileText className="h-12 w-12 text-toon-orange" />
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;
