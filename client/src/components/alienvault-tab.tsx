import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Bug, Shield, Globe, CheckCircle } from "lucide-react";

export default function AlienVaultTab() {
  const { data: threats } = useQuery({
    queryKey: ["/api/threat-intelligence"],
    refetchInterval: 10000,
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/dashboard-stats"],
    refetchInterval: 5000,
  });

  const { data: userBehavior } = useQuery({
    queryKey: ["/api/user-behavior"],
    queryFn: () => fetch("/api/user-behavior?limit=10").then(res => res.json()),
    refetchInterval: 5000,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-siem-red border-siem-red';
      case 'high': return 'text-siem-amber border-siem-amber';
      case 'medium': return 'text-siem-green border-siem-green';
      case 'low': return 'text-siem-blue-light border-siem-blue-light';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-siem-red text-white';
      case 'high': return 'bg-siem-amber text-white';
      case 'medium': return 'bg-siem-green text-white';
      case 'low': return 'bg-siem-blue-light text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="p-6 bg-siem-dark">
      {/* Threat Intelligence Feed */}
      <Card className="bg-siem-gray border-siem-gray-light mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Threat Intelligence Feed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-siem-dark border-siem-red">
              <CardContent className="p-4">
                <div className="text-center">
                  <Bug className="text-siem-red text-2xl mb-2 mx-auto" />
                  <p className="text-2xl font-bold text-siem-red">{stats?.activethreats || 0}</p>
                  <p className="text-xs text-gray-400">Active Threats</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-amber">
              <CardContent className="p-4">
                <div className="text-center">
                  <Shield className="text-siem-amber text-2xl mb-2 mx-auto" />
                  <p className="text-2xl font-bold text-siem-amber">{stats?.vulnerabilities || 0}</p>
                  <p className="text-xs text-gray-400">Vulnerabilities</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-blue-light">
              <CardContent className="p-4">
                <div className="text-center">
                  <Globe className="text-siem-blue-light text-2xl mb-2 mx-auto" />
                  <p className="text-2xl font-bold text-siem-blue-light">{threats?.length || 0}</p>
                  <p className="text-xs text-gray-400">IOCs</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-green">
              <CardContent className="p-4">
                <div className="text-center">
                  <CheckCircle className="text-siem-green text-2xl mb-2 mx-auto" />
                  <p className="text-2xl font-bold text-siem-green">{stats?.detectionRate || "0.0"}%</p>
                  <p className="text-xs text-gray-400">Detection Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Threat Intelligence Analysis */}
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400" 
              alt="Cybersecurity threat intelligence dashboard" 
              className="w-full h-48 object-cover rounded mb-4"
            />
          </div>

          {/* Recent Threats */}
          <div className="space-y-4">
            <h4 className="font-medium text-siem-red">High Priority Threats</h4>
            {threats?.slice(0, 3).map((threat: any) => (
              <div key={threat.id} className={`bg-siem-dark p-4 rounded border-l-4 ${getSeverityColor(threat.severity)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${getSeverityColor(threat.severity).split(' ')[0]}`}>
                      {threat.threatType}: {threat.indicator}
                    </p>
                    <p className="text-sm text-gray-400">
                      Type: {threat.indicatorType} | Confidence: {threat.confidence}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Source: {threat.source}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getSeverityBadge(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
            {!threats?.length && (
              <div className="bg-siem-dark p-4 rounded border-l-4 border-siem-green text-center">
                <p className="text-siem-green">No active threats detected</p>
                <p className="text-sm text-gray-400 mt-1">Threat intelligence feed is current</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Analysis */}
      <Card className="bg-siem-gray border-siem-gray-light">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Behavioral Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-purple mb-3">User Activity Patterns</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Normal Login Hours</span>
                    <span className="text-siem-green text-sm">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">After Hours Activity</span>
                    <span className="text-siem-amber text-sm">
                      {userBehavior?.filter((b: any) => {
                        const hour = new Date(b.timestamp).getHours();
                        return hour < 8 || hour > 18;
                      }).length || 0} users
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Anomalous Activities</span>
                    <span className="text-siem-red text-sm">
                      {userBehavior?.filter((b: any) => b.anomalyScore && b.anomalyScore > 70).length || 0} activities
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-purple mb-3">Network Behavior</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Baseline Traffic</span>
                    <span className="text-siem-green text-sm">145 MB/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Traffic</span>
                    <span className="text-siem-amber text-sm">189 MB/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Anomaly Score</span>
                    <span className="text-siem-red text-sm">7.2/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
