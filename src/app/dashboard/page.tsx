"use client";
import CardInfo from "@/components/cardInfo";
import Chart from "react-apexcharts";

export default function Dashboard() {

    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      }

      const series = [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
          name: "series-1",
          data: [10, 60, 20, 30, 60, 30, 40, 71]
        }
      ]

    return (
        <div className="grid gap-5">
            <div className="grid sm:grid-cols-4 gap-5">
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-5 min-h-[200px] border border-gray-200 bg-white">
                    <Chart
                        options={options}
                        series={series}
                        type="line"
                        />
                    </div>
                <div className="p-5 min-h-[200px] border border-gray-100 bg-white"></div>
            </div>
        </div>
    )
}
