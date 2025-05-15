import React from "react";

interface ListItemProps {
  id: string | number;
  imageUrl?: string;
  avatarContent?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightText?: string | React.ReactNode;
  onClick?: () => void;
}

export default function ListItem({ id, imageUrl, avatarContent, title, subtitle, rightText, onClick }: ListItemProps) {
  return (
    <li key={id} className="py-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onClick}>
      <div className="flex items-center space-x-4">
        {avatarContent ? (
          <div className="flex-shrink-0 h-10 w-10">{avatarContent}</div>
        ) : imageUrl ? (
          <div className="flex-shrink-0 h-12 w-12">
            <img className="h-12 w-12 object-contain" src={imageUrl} alt={title} />
          </div>
        ) : null}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {rightText && <div className="inline-flex items-center text-sm font-semibold text-gray-900">{rightText}</div>}
      </div>
    </li>
  );
}
