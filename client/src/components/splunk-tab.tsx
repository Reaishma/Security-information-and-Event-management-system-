import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Settings } from "lucide-react";

export default function SplunkTab() {
  const [searchQuery, setSearchQuery] = useState("search * | stats count by source");

  const { data: events } = useQuery({
    queryKey: ["/api/security-events"],
    queryFn: () => fetch("/api/security-events?platform=splunk&limit=20").then(res => res.json()),
    refetchInterval: 5000,
  });

  const { data: anomalies } = useQuery({
    queryKey: ["/api/user-behavior/anomalous"],
    refetchInterval: 10000,
  });

  const eventSources = events?.reduce((acc: any, event: any) => {
    acc[event.source] = (acc[event.source] || 0) + 1;
    return acc;
  }, {}) || {};

  const totalEvents = events?.length || 0;
  const sourceEntries = Object.entries(eventSources);
  const topSources = sourceEntries
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([source, count]) => ({
      source,
      percentage: totalEvents > 0 ? Math.round((count as number / totalEvents) * 100) : 0
    }));

  return (
    <div className="p-6 bg-siem-dark">
      {/* Splunk Search Interface */}
      <Card className="bg-siem-gray border-siem-gray-light mb-6">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold mr-4">Search & Reporting</h3>
            <div className="flex-1 relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search * | stats count by source"
                className="w-full bg-siem-dark text-white border-siem-gray-light font-mono text-sm pr-10"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 bg-transparent hover:bg-siem-green/20"
              >
                <Search className="h-4 w-4 text-siem-green" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-green mb-2">Events Timeline</h4>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                  alt="Real-time cybersecurity monitoring" 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-sm text-gray-400">{totalEvents} events in last hour</p>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-green mb-2">Top Sources</h4>
                <div className="space-y-2">
                  {topSources.map(({ source, percentage }) => (
                    <div key={source} className="flex justify-between text-sm">
                      <span className="truncate">{source}</span>
                      <span className="text-siem-green">{percentage}%</span>
                    </div>
                  ))}
                  {topSources.length === 0 && (
                    <div className="text-sm text-gray-400">No sources available</div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-green mb-2">Index Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>main</span>
                    <span className="text-siem-green">99.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>security</span>
                    <span className="text-siem-green">99.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>network</span>
                    <span className="text-siem-amber">98.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Splunk ML Alerts */}
      <Card className="bg-siem-gray border-siem-gray-light">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Machine Learning Alerts</h3>
          <div className="space-y-4">
            {anomalies?.slice(0, 3).map((anomaly: any) => (
              <div key={anomaly.id} className="bg-siem-dark p-4 rounded border-l-4 border-siem-red">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-siem-red">
                      Anomalous User Behavior Detected
                    </p>
                    <p className="text-sm text-gray-400">
                      User: {anomaly.userId} | Confidence: {anomaly.anomalyScore}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ML Model: User Behavior Analytics
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-siem-green hover:text-green-400 hover:bg-siem-green/10"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {!anomalies?.length && (
              <div className="bg-siem-dark p-4 rounded border-l-4 border-siem-green text-center">
                <p className="text-siem-green">No anomalies detected</p>
                <p className="text-sm text-gray-400 mt-1">All systems operating normally</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
