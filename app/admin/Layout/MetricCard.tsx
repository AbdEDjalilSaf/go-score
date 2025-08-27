import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<React.ComponentProps<'svg'>>;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  subText?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  iconColor = 'text-blue-500',
  subText,
}) => {
  return (
    <div className={`rounded-lg shadow ${bgColor} overflow-hidden`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-md ${iconColor} bg-opacity-10`}>
            {React.cloneElement(icon, {
              className: `h-6 w-6 ${iconColor} ${icon.props.className ?? ''}`.trim()
            })}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className={`text-base sm:text-lg lg:text-xl font-semibold ${textColor}`}>{value}</div>
                {subText && <div className="text-xs sm:text-sm text-gray-500">{subText}</div>}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-xs sm:text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            View details
          </a>
        </div>
      </div>
    </div>
  );
};

export default MetricCard