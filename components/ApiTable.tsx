
import React from 'react';
import type { ApiData } from '../types';
import { Chip } from './Chip';

interface ApiTableProps {
  headers: string[];
  data: ApiData[];
}

const headerToKeyMap: { [header: string]: keyof ApiData } = {
  "Model Name": "modelName",
  "Provider": "provider",
  "Access link": "accessLink",
  "Popularity": "popularity",
  "API": "api",
  "Category": "category",
  "Model Names": "modelNames",
  "Authentication Needed?": "authentication",
  "Free Tier / Trial / Paid": "tier",
  "Pricing": "pricing",
  "Rate Limits": "rateLimits",
  "NSFW Restriction": "nsfwRestriction",
  "Latency": "latency",
  "Supported Formats": "supportedFormats",
  "Known Limitations / Weaknesses": "limitations",
  "Notes / Comments": "notes",
};

// FIX: Changed return type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const parseAndRenderLinks = (text: string): React.ReactElement => {
    const parts = text.split(/(\(https?:\/\/[^\s)]+\))/g);
    return (
      <div className="flex flex-col gap-2 items-start">
        {parts.map((part, i) => {
          if (part.startsWith('(http')) {
            const url = part.slice(1, -1);
            return (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 hover:underline inline-flex items-center gap-1.5 transition-colors">
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                <span>{url.length > 50 ? `${url.substring(0, 50)}...` : url}</span>
              </a>
            );
          }
          const cleanedPart = part.replace(/,$/, '').trim();
          return cleanedPart && <span key={i}>{cleanedPart}</span>;
        })}
      </div>
    );
};

// FIX: Changed return type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const renderPopularity = (text: string): React.ReactElement => {
    const match = text.match(/^(High|Moderate|Low|Very High|Medium-High|Low-Medium)/);
    let tag = match ? match[0] : 'N/A';
    const rest = match ? text.replace(tag, '').trim() : text;
    
    let colorClass = 'bg-gray-700 text-gray-300';
    let icon = <i className="fa-solid fa-minus mr-2 text-xs"></i>;
    if (tag.includes('High')) {
        colorClass = 'bg-green-900/80 text-green-200';
        icon = <i className="fa-solid fa-arrow-trend-up mr-2 text-green-400 text-xs"></i>;
    } else if (tag.includes('Moderate') || tag.includes('Medium')) {
        colorClass = 'bg-yellow-900/80 text-yellow-200';
        icon = <i className="fa-solid fa-arrows-left-right mr-2 text-yellow-400 text-xs"></i>;
    } else if (tag.includes('Low')) {
        colorClass = 'bg-red-900/80 text-red-200';
        icon = <i className="fa-solid fa-arrow-trend-down mr-2 text-red-400 text-xs"></i>;
    }

    // Special handling for ranked popularity
    if (!match && /^\d+/.test(text)) {
      tag = text.split(' ')[0];
      colorClass = 'bg-blue-900/80 text-blue-200';
      icon = <i className="fa-solid fa-ranking-star mr-2 text-blue-400 text-xs"></i>
    }


    return (
        <div className="flex flex-col items-start gap-2">
            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                {icon}
                {tag}
            </span>
            {rest && <span className="text-gray-400 text-xs">{rest}</span>}
        </div>
    );
};

// FIX: Changed return type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const renderCellContent = (value: string, header: string): React.ReactElement => {
    switch (header) {
        case 'Access link':
            return parseAndRenderLinks(value);
        case 'Popularity':
            return renderPopularity(value);
        case 'Category':
            return <Chip text={value} colorClass="bg-indigo-900/80 text-indigo-200" />;
        case 'API':
             return <Chip text={value} colorClass={value.includes('Yes') || value.includes('REST')? 'bg-teal-900/80 text-teal-200' : 'bg-gray-700 text-gray-300'} />;
        case 'Authentication Needed?':
            return <Chip text={value} colorClass="bg-sky-900/80 text-sky-200" />;
        default:
            return <>{value}</>;
    }
};

export const ApiTable: React.FC<ApiTableProps> = ({ headers, data }) => {
  return (
    <div className="w-full overflow-x-auto bg-[#1C1B1F] rounded-2xl shadow-2xl shadow-black/30 border border-gray-700/50">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="sticky top-0 z-10 px-6 py-4 text-left font-semibold text-gray-300 uppercase tracking-wider backdrop-blur-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
              {headers.map((header) => {
                const dataKey = headerToKeyMap[header];
                const cellValue = row[dataKey];
                
                let cellClassName = "px-6 py-4 align-top";
                if (['Known Limitations / Weaknesses', 'Notes / Comments', 'Pricing', 'Rate Limits', 'Supported Formats', 'NSFW Restriction'].includes(header)) {
                    cellClassName += " whitespace-normal min-w-[350px] text-gray-300 leading-relaxed";
                } else {
                    cellClassName += " whitespace-nowrap text-gray-200";
                }

                return (
                  <td key={header} className={cellClassName}>
                    {renderCellContent(cellValue, header)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
