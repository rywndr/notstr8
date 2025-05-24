"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { CommunityMember } from "../../../prisma/app/generated/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart"

interface AreaChartInteractiveProps {
  members: CommunityMember[];
  title?: string;
  description?: string;
  dataKey?: keyof CommunityMember;
  label?: string;
  color?: string;
}

// ChartDataItem interface
interface ChartDataItem {
  age?: number;
  category?: string;
  count: number;
  label: string;
}

// Helper function to process age data
const processAgeData = (members: CommunityMember[]) => {
  const ageCounts: { [age: number]: number } = {}
  
  members.forEach((member) => {
    if (member.age !== null && member.age !== undefined) {
      ageCounts[member.age] = (ageCounts[member.age] || 0) + 1
    }
  })
  
  return Object.entries(ageCounts)
    .map(([age, count]) => ({ 
      age: parseInt(age, 10), 
      count,
      label: `Age ${age}` 
    }))
    .sort((a, b) => a.age - b.age)
}

// Helper function to process education data
const processEducationData = (members: CommunityMember[]) => {
  const educationCounts: { [education: string]: number } = {}
  
  members.forEach((member) => {
    if (member.lastEducation) {
      const education = member.lastEducation
      educationCounts[education] = (educationCounts[education] || 0) + 1
    }
  })
  
  return Object.entries(educationCounts)
    .map(([education, count]) => ({ 
      category: education, 
      count,
      label: education.replace('_', ' ')
    }))
}

// Helper function to process employment data
const processEmploymentData = (members: CommunityMember[]) => {
  const employmentCounts: { [employment: string]: number } = {}
  
  members.forEach((member) => {
    if (member.employmentStatus) {
      const employment = member.employmentStatus
      employmentCounts[employment] = (employmentCounts[employment] || 0) + 1
    }
  })
  
  return Object.entries(employmentCounts)
    .map(([employment, count]) => ({ 
      category: employment, 
      count,
      label: employment.replace('_', ' ')
    }))
}

export function AreaChartInteractive({
  members,
  title = "Age Distribution of Community Members",
  description = "Showing the number of community members by age.",
  dataKey = "age",
  label = "Members",
  color = "hsl(var(--chart-1))"
}: AreaChartInteractiveProps) {
  const [chartData, setChartData] = React.useState<ChartDataItem[]>([])

  React.useEffect(() => {
    let processedData: ChartDataItem[] = []
    
    switch (dataKey) {
      case 'age':
        processedData = processAgeData(members)
        break
      case 'lastEducation':
        processedData = processEducationData(members)
        break
      case 'employmentStatus':
        processedData = processEmploymentData(members)
        break
      default:
        processedData = processAgeData(members)
    }
    
    setChartData(processedData)
  }, [members, dataKey])

  // Calc total members
  const totalMembers = chartData.reduce((sum, item) => sum + item.count, 0)

  // Create dynamic chartConfig
  const chartConfig = {
    count: {
      label: `${label}: ${totalMembers}`,
      color: color,
    },
  } satisfies ChartConfig

  // Determine x-axis key based on data type
  const xAxisKey = dataKey === 'age' ? 'age' : 'category'

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b sm:flex-row">
        <div className="grid flex-1 text-center sm:text-left">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={16}
              tickFormatter={(value) => 
                dataKey === 'age' ? `${value}` : value.replace('_', ' ')
              }
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const countData = payload.find(p => p.dataKey === 'count')
                  if (countData) {
                    const countValue = countData.value
                    return (
                      <div className="rounded-lg border bg-background p-2 text-sm shadow-sm">
                        <div className="grid gap-1.5">
                          <div className="font-medium text-foreground">
                            {dataKey === 'age' ? `Age: ${label}` : label?.toString().replace('_', ' ')}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <span
                              className="mr-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-[2px]"
                              style={{ backgroundColor: color }}
                            />
                            {countValue} Member(s)
                          </div>
                        </div>
                      </div>
                    )
                  }
                }
                return null
              }}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillCount)"
              stroke={color}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}