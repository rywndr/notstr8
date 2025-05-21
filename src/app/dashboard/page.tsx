import { AreaChartInteractive } from "@/components/dashboard/AreaChartInteractive"
import { PieCh } from "@/components/dashboard/PieChart"

const Dashboard = () => {
  return (
    <>
        <div className="text-center">  
            <h1 className="text-4xl font-bold">Charts</h1>
        </div> 
        <div className = "m-4">
            <div className = "flex justify-around pb-3">
                <PieCh />
                <PieCh />
                <PieCh />
            </div>
            <div className = "flex-1">
                <AreaChartInteractive />
            </div>
        </div>
    </>
  )
}

export default Dashboard