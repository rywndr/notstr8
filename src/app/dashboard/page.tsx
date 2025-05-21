import { AreaChartInteractive } from "@/components/dashboard/AreaChartInteractive"
import { PieCh } from "@/components/dashboard/PieChart"

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center p-4">  
            <h1 className="text-4xl font-bold">Charts</h1>
        </div> 
        <div className="p-2 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <PieCh />
                <PieCh />
                <PieCh />
            </div>
            <div className="w-full">
                <AreaChartInteractive />
            </div>
        </div>
    </div>
  )
}

export default Dashboard