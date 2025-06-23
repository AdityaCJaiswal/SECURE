import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  bgColor: string;
  textColor?: string;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  bgColor, 
  textColor = 'text-white',
  icon 
}) => {
  return (
    <div className={`${bgColor} rounded-2xl p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl`}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`${textColor} text-sm font-medium opacity-90 mb-3`}>{title}</h3>
            <div className={`${textColor} text-3xl font-bold mb-2`}>{value}</div>
            <p className={`${textColor} opacity-80 text-sm`}>
              {subtitle}
            </p>
          </div>
          {icon && (
            <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 transform">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white opacity-5 rounded-full group-hover:opacity-15 transition-opacity duration-300"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default StatsCard;