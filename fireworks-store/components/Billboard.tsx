import React from 'react';

import { Billboard as BillboardType } from "@/types";
import { cn } from "@/lib/utils";

interface BillboardProps {
    data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div className={cn(data?.imageUrl ? "rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
                : "rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover border-2 border-gray-300")}
                style={{
                    backgroundImage: `url(${data?.imageUrl})`,
                    backgroundBlendMode: 'darken'
                }}>
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    {/* Due to server error reasons, this is only a mockup */}
                    <div className={cn(data?.label ? "text-white font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl" +
                        " max-w-xs" : "font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl" +
                        " max-w-xs")}>
                        {data?.label ?? 'Billboard Label'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard;