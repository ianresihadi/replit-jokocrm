import React from 'react';

interface LoadingPostsProps {
  layout?: 'grid' | 'list';
  count?: number;
}

const LoadingPosts = ({ layout = 'grid', count = 6 }: LoadingPostsProps) => {
  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800 animate-pulse">
            <div className="w-full pb-[56.25%] bg-slate-200 dark:bg-slate-700"></div>
            <div className="p-6">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 mr-3"></div>
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="space-y-6">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm animate-pulse">
            <div className="sm:w-1/4 flex-shrink-0">
              <div className="w-full pb-[60%] bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
            <div className="sm:w-3/4">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3 max-w-[100px]"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 mr-3"></div>
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default LoadingPosts;