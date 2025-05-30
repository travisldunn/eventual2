import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ReferenceLine, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface ChartProps {
  data: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
  title: string;
  year3Value: number;
  showReferenceLine?: boolean;
  referenceLineValue?: number;
  valueColor: string;
}

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

const InsuranceBarChart: React.FC<ChartProps> = ({
  data,
  title,
  year3Value,
  showReferenceLine = false,
  referenceLineValue,
  valueColor
}) => {
  // Calculate domain for Y axis to ensure strike price is visible
  const maxValue = Math.max(...data.map(d => d.value), referenceLineValue || 0);
  const yAxisDomain = [0, Math.ceil(maxValue * 1.1)]; // Add 10% padding

  return (
    <div className="bg-secondary/50 rounded-lg p-4 md:p-6 h-full">
      <h3 className="text-xl font-medium mb-4 md:mb-6 text-center">{title}</h3>
      <div className="h-56 md:h-64 w-full overflow-hidden">
        <ChartContainer
          config={{
            value: { color: "#fff" },
          }}
          className="h-full w-full"
        >
          <BarChart
            data={data}
            margin={{ top: 30, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#333" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9196', fontSize: 12 }}
            />
            <YAxis 
              type="number"
              domain={yAxisDomain}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9196', fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const value = payload[0].value as number;
                  const isAboveStrike = referenceLineValue && value > referenceLineValue;
                  return (
                    <div className="bg-black/90 p-3 rounded-lg border border-white/20">
                      <p className="text-white font-medium">{label}</p>
                      <p className="text-white">
                        Premium: <span className={isAboveStrike ? "text-[#FF3B30]" : "text-[#34C759]"}>
                          ${value.toLocaleString()}
                        </span>
                      </p>
                      {showReferenceLine && referenceLineValue && (
                        <p className="text-[#8E9196] text-sm mt-1">
                          Strike Price: ${referenceLineValue.toLocaleString()}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            {showReferenceLine && referenceLineValue && (
              <ReferenceLine 
                y={referenceLineValue} 
                stroke="#34C759" 
                strokeWidth={2}
                strokeDasharray="3 3"
                isFront={true}
                label={{
                  value: "Strike Price",
                  position: "right",
                  fill: "#34C759",
                  fontSize: 12
                }}
              />
            )}
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              label={{
                position: 'top',
                formatter: (value: number) => `$${value.toLocaleString()}`,
                fill: '#ffffff',
                fontSize: 12
              }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
      <div className="text-center mt-4">
        <p className="font-medium">Year 3 premium: <span style={{ color: valueColor }}>${year3Value.toLocaleString()}</span></p>
        {showReferenceLine && referenceLineValue && (
          <p className="text-sm text-[#8E9196] mt-1">
            Strike Price: ${referenceLineValue.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default InsuranceBarChart;
