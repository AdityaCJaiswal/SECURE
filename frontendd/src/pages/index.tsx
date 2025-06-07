import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header.tsx";
import { MetricCard } from "../components/dashboard/MetricCard";
import { TrafficChart } from "../components/dashboard/TrafficChart";
import { PieChart } from "../components/dashboard/PieChart";
import { BarChart } from "../components/dashboard/BarChart.tsx";
import { CalendarWidget } from "../components/dashboard/CalendarWidget";
import { VisitorTable } from "../components/dashboard/VisitorTable";
import { StatsCard } from "../components/dashboard/StatsCard";
import { metricCards } from "../data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="ml-16 pt-16 p-6">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Hello, Aditya</h1>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section - Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-3 gap-6">
              {metricCards.map((card, index) => (
                <MetricCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  bgColor={card.bgColor}
                  illustration={card.illustration}
                />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6">
              {/* Traffic Line Chart */}
              <TrafficChart />

              {/* Calendar */}
              <CalendarWidget />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-3 gap-6">
              {/* Weekly Traffic Bar Chart */}
              <BarChart />

              {/* Visitor Table */}
              <VisitorTable />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* Traffic Pie Chart */}
            <PieChart />

            {/* Stats Card */}
            <StatsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
